"""Validate the LG repair story and optionally compare deployed media and pages."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, urljoin
from urllib.request import urlopen
from PIL import Image
import json
import sys
import xml.etree.ElementTree as ET

root = Path(__file__).resolve().parents[1]
relative = 'repair-cases/carmel-lg-wm4270hva-washer-not-draining-noisy-drain-pump.html'
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

    def handle_data(self, data):
        if self.schema:
            self.schemas.append(json.loads(data))

html = (root / relative).read_text(encoding='utf-8')
page = Page(html)
assert sum(t == 'h1' for t, _ in page.tags) == 1
assert sum(t == 'title' for t, _ in page.tags) == 1
meta = {a.get('name', a.get('property')): a.get('content') for t, a in page.tags if t == 'meta'}
assert 'noindex' not in meta['robots']
assert 'Carmel' in meta['description'] and 'WM4270HVA' in meta['description']
assert meta['og:url'] == url and meta['og:type'] == 'article'
assert [a['href'] for t, a in page.tags if t == 'link' and a.get('rel') == 'canonical'] == [url]
article = next(s for s in page.schemas[0]['@graph'] if s['@type'] == 'BlogPosting')
assert article['mainEntityOfPage'] == url
assert article['datePublished'] == article['dateModified'] == '2026-10-08'
assert 'logo-flag.js?v=20261005-shader-v3' in html
for excluded in ('412PNUR10934', '4681EA2001T'):
    assert excluded not in html
body = html.split('<article class="case-body editorial-story">')[1].split('</article>')[0]
assert body.index('drain-pump-diagram.webp') < body.index('wm4270hva-model.webp') < body.index('washer-before.webp')
photos = [a for t, a in Page(body).tags if t == 'img']
assert len(photos) == 11
assert photos[0].get('fetchpriority') == 'high'
photo_paths = []
for a in photos:
    assert a.get('alt') and 'object-fit:contain!important' in a['style']
    filename = urlparse(urljoin(url, a['src'])).path.lstrip('/')
    photo_paths.append(filename)
    with Image.open(root / filename) as img:
        assert img.size == (int(a['width']), int(a['height']))
for _, attrs in page.tags:
    for key in ('href', 'src'):
        target = urlparse(urljoin(url, attrs.get(key, '')))
        if key in attrs and target.netloc == 'alex-repair.com':
            assert (root / (target.path.lstrip('/') or 'index.html')).exists(), target.path
for filename in ('blog.html', 'recent-work.html', 'carmel.html'):
    assert relative in (root / filename).read_text(encoding='utf-8')
for filename in ('sitemap.xml', 'sitemap-images.xml'):
    assert len(ET.parse(root / filename).findall('.//{*}loc[.="' + url + '"]')) == 1
print('PASS: 11 images, top diagram, model crop dimensions, metadata, schema, links and sitemaps')
if '--live' in sys.argv:
    files = [relative, 'blog.html', 'recent-work.html', 'carmel.html', 'sitemap.xml', 'sitemap-images.xml'] + photo_paths
    for filename in files:
        with urlopen('https://alex-repair.com/' + filename, timeout=30) as response:
            assert response.status == 200
            assert 'noindex' not in response.headers.get('X-Robots-Tag', '').lower()
            remote = response.read()
        local = (root / filename).read_bytes()
        if not filename.endswith('.webp'):
            remote, local = [b.replace(b'\r\n', b'\n') for b in (remote, local)]
        assert remote == local, filename
        print('LIVE OK:', filename, flush=True)
