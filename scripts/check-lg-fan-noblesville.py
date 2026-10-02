"""Focused metadata, media and publication checks for the LG fan repair story."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import urlopen
import json
import sys
import xml.etree.ElementTree as ET
from PIL import Image

root = Path(__file__).resolve().parents[1]
relative = 'repair-cases/noblesville-lg-gr-l228nksm-freezer-fan-error.html'
url = 'https://alex-repair.com/' + relative


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.tags = []
        self.schemas = []
        self.in_schema = False
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if tag == 'script':
            self.in_schema = attrs.get('type') == 'application/ld+json'

    def handle_endtag(self, tag):
        if tag == 'script':
            self.in_schema = False

    def handle_data(self, data):
        if self.in_schema:
            self.schemas.append(json.loads(data))


html = (root / relative).read_text(encoding='utf-8')
page = Page(html)
assert sum(t == 'h1' for t, _ in page.tags) == 1
assert sum(t == 'title' for t, _ in page.tags) == 1
meta = {a.get('name', a.get('property')): a.get('content') for t, a in page.tags if t == 'meta'}
assert 'noindex' not in meta['robots']
assert 'Noblesville' in meta['description'] and 'GR-L228NKSM' in meta['description']
assert meta['og:url'] == url and meta['og:type'] == 'article'
assert [a['href'] for t, a in page.tags if t == 'link' and a.get('rel') == 'canonical'] == [url]
schema = page.schemas[0]['@graph']
assert {s['@type'] for s in schema} == {'BlogPosting', 'BreadcrumbList'}
article = next(s for s in schema if s['@type'] == 'BlogPosting')
assert article['url'] == article['mainEntityOfPage'] == url
assert article['datePublished'] == article['dateModified'] == '2026-10-02'
assert article['author']['name'] == 'Alex Appliance Repair'
assert 'GR-L228NKSM (ASBCNA0)' in html
assert 'View Noblesville service coverage' in html
assert 'View Fishers service coverage' not in html
photos = [(a['src'].lstrip('/'), a) for t, a in page.tags if t == 'img' and 'lg-fan-noblesville/' in a.get('src', '')]
assert len(photos) == 9
for source, attrs in photos:
    assert attrs.get('alt')
    with Image.open(root / source) as img:
        assert img.size == (int(attrs['width']), int(attrs['height'])), source
for tag, attrs in page.tags:
    for key in ('href', 'src'):
        target = urlparse(urljoin(url, attrs.get(key, '')))
        if key in attrs and target.netloc == 'alex-repair.com':
            assert (root / (target.path.lstrip('/') or 'index.html')).exists(), target.path
for filename in ('blog.html', 'recent-work.html', 'noblesville/refrigerator-repair-services.html'):
    assert relative in (root / filename).read_text(encoding='utf-8')
for filename in ('sitemap.xml', 'sitemap-images.xml'):
    tree = ET.parse(root / filename)
    assert len(tree.findall('.//{*}loc[.="' + url + '"]')) == 1
assert 'Sitemap: https://alex-repair.com/sitemap.xml' in (root / 'robots.txt').read_text()
print('PASS: model, metadata, schema, 9 image dimensions/alts, local links and sitemaps')

if '--live' in sys.argv:
    files = [relative, 'css/lg-fan-noblesville.css', 'blog.html', 'recent-work.html',
             'noblesville/refrigerator-repair-services.html', 'sitemap.xml', 'sitemap-images.xml', 'robots.txt']
    files += [p for p, _ in photos]
    for filename in files:
        with urlopen('https://alex-repair.com/' + filename, timeout=30) as response:
            assert response.status == 200
            assert 'noindex' not in response.headers.get('X-Robots-Tag', '').lower()
            remote = response.read()
        local = (root / filename).read_bytes()
        if not filename.endswith('.webp'):
            remote, local = [b.replace(b'\r\n', b'\n') for b in (remote, local)]
        assert remote == local, 'Live content differs: ' + filename
        print('LIVE OK:', filename)
