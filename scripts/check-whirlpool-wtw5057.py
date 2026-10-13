"""Validate the Fishers capacitor story before publication."""
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse
import xml.etree.ElementTree as ET
from PIL import Image

root = Path(__file__).resolve().parents[1]
relative = 'repair-cases/fishers-whirlpool-wtw5057lw0-washer-not-spinning-capacitor-replacement.html'
url = 'https://alex-repair.com/' + relative

class Page(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.tags, self.schemas = [], []
        self.structured = False
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if tag == 'script':
            self.structured = attrs.get('type') == 'application/ld+json'

    def handle_endtag(self, tag):
        if tag == 'script':
            self.structured = False

    def handle_data(self, data):
        if self.structured:
            self.schemas.append(json.loads(data))

source = (root / relative).read_text(encoding='utf-8')
page = Page(source)
assert sum(t == 'h1' for t, _ in page.tags) == 1
meta = {a.get('name', a.get('property')): a.get('content') for t, a in page.tags if t == 'meta'}
assert 'noindex' not in meta['robots']
assert all(x in meta['description'] for x in ('Fishers', 'WTW5057LW0', 'capacitor'))
assert meta['og:url'] == url and meta['og:type'] == 'article'
assert [a['href'] for t, a in page.tags if t == 'link' and a.get('rel') == 'canonical'] == [url]
article = next(s for s in page.schemas[0]['@graph'] if s['@type'] == 'BlogPosting')
assert article['mainEntityOfPage'] == url and len(article['image']) == 13
assert article['datePublished'] == article['dateModified'] == '2026-10-13'
assert 'CC3303041' not in source
assert 'View Fishers service coverage' in source
body = source.split('<article class="case-body editorial-story">')[1].split('</article>')[0]
photos = [a for t, a in Page(body).tags if t == 'img']
assert len(photos) == 13
assert photos[0]['src'].endswith('/capacitor-diagram.webp')
assert photos[0].get('fetchpriority') == 'high'
for a in photos:
    assert a['alt'] and 'object-fit:contain' in a['style']
    with Image.open(root / urlparse(urljoin(url, a['src'])).path.lstrip('/')) as photo:
        assert photo.size == (int(a['width']), int(a['height']))
for _, a in page.tags:
    for key in ('href', 'src'):
        target = urlparse(urljoin(url, a.get(key, '')))
        if key in a and target.netloc == 'alex-repair.com':
            assert (root / (target.path.lstrip('/') or 'index.html')).exists(), target.path
for filename in ('blog.html', 'recent-work.html'):
    assert relative in (root / filename).read_text(encoding='utf-8')
for filename in ('sitemap.xml', 'sitemap-images.xml'):
    assert len(ET.parse(root / filename).findall('.//{*}loc[.="' + url + '"]')) == 1
assert 'Rinse and Spin' in body and 'Wash Cycle' in body
assert 'warranty' not in body.lower()
print('PASS: 13 images, opening diagram, model crop, local links, metadata, schema, cycle tests and sitemaps')
