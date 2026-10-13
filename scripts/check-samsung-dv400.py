"""Validate the Fishers dryer story and its original-media references."""
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse
import xml.etree.ElementTree as ET
from PIL import Image

root = Path(__file__).resolve().parents[1]
relative = 'repair-cases/fishers-samsung-dv400ewhdwr-dryer-not-starting-idler-pulley-repair.html'
url = 'https://alex-repair.com/' + relative

class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.tags, self.schemas = [], []
        self.schema = False
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if tag == 'script':
            self.schema = attrs.get('type') == 'application/ld+json'

    def handle_endtag(self, tag):
        if tag == 'script':
            self.schema = False

    def handle_data(self, text):
        if self.schema:
            self.schemas.append(json.loads(text))

html = (root / relative).read_text(encoding='utf-8')
page = Page(html)
assert sum(tag == 'h1' for tag, _ in page.tags) == 1
meta = {a.get('name', a.get('property')): a.get('content') for t, a in page.tags if t == 'meta'}
assert 'noindex' not in meta['robots']
assert 'Fishers' in meta['description'] and 'DV400EWHDWR/AA' in meta['description']
assert meta['og:url'] == url and meta['og:type'] == 'article'
assert [a['href'] for t, a in page.tags if t == 'link' and a.get('rel') == 'canonical'] == [url]
article = next(s for s in page.schemas[0]['@graph'] if s['@type'] == 'BlogPosting')
assert article['mainEntityOfPage'] == url
assert article['datePublished'] == article['dateModified'] == '2026-10-13'
assert len(article['image']) == 20
assert 'Y69J5AUF305765P' not in html
assert 'View Fishers service coverage' in html
body = html.split('<article class="case-body editorial-story">')[1].split('</article>')[0]
assert 'Adler' not in body and 'all four' in body and 'heating element' in body
photos = [a for t, a in Page(body).tags if t == 'img']
assert len(photos) == 20
assert photos[0]['src'].endswith('/idler-diagram.webp')
assert photos[0].get('fetchpriority') == 'high'
for attrs in photos:
    assert attrs['alt'] and 'object-fit:contain' in attrs['style']
    path = urlparse(urljoin(url, attrs['src'])).path.lstrip('/')
    with Image.open(root / path) as image:
        assert image.size == (int(attrs['width']), int(attrs['height']))
for _, attrs in page.tags:
    for key in ('href', 'src'):
        target = urlparse(urljoin(url, attrs.get(key, '')))
        if key in attrs and target.netloc == 'alex-repair.com':
            assert (root / (target.path.lstrip('/') or 'index.html')).exists(), target.path
for filename in ('blog.html', 'recent-work.html'):
    assert relative in (root / filename).read_text(encoding='utf-8')
for filename in ('sitemap.xml', 'sitemap-images.xml'):
    assert len(ET.parse(root / filename).findall('.//{*}loc[.="' + url + '"]')) == 1
print('PASS: 20 images including 3 diagrams, dimensions, local links, model, canonical, metadata, schema and sitemaps')
