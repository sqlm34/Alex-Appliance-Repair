"""Check the Noblesville story's metadata, model crop, links and deployed files."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import urlopen
import json
import sys
import xml.etree.ElementTree as ET
from PIL import Image

root = Path(__file__).resolve().parents[1]
relative = 'repair-cases/noblesville-lg-dlex4200b-dryer-squeaking-rollers-idler-pulley.html'
url = 'https://alex-repair.com/' + relative

class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.tags, self.schemas = [], []
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
assert 'Noblesville' in meta['description'] and 'DLEX4200B' in meta['description']
assert meta['og:url'] == url and meta['og:type'] == 'article'
assert [a['href'] for t, a in page.tags if t == 'link' and a.get('rel') == 'canonical'] == [url]
schema = page.schemas[0]['@graph']
assert {s['@type'] for s in schema} == {'BlogPosting', 'BreadcrumbList'}
article = next(s for s in schema if s['@type'] == 'BlogPosting')
assert article['datePublished'] == article['dateModified'] == '2026-10-04'
assert article['mainEntityOfPage'] == url
assert 'View Noblesville service coverage' in html
assert 'View Fishers service coverage' not in html
assert '207KWGG8C663' not in html
photos = [(a['src'].lstrip('/'), a) for t, a in page.tags if t == 'img' and 'lg-dryer-noblesville/' in a.get('src', '')]
assert len(photos) == 11
assert any('model-label.webp' in p for p, _ in photos)
for source, attrs in photos:
    assert attrs.get('alt')
    with Image.open(root / source) as img:
        assert img.size == (int(attrs['width']), int(attrs['height'])), source
for tag, attrs in page.tags:
    for key in ('href', 'src'):
        target = urlparse(urljoin(url, attrs.get(key, '')))
        if key in attrs and target.netloc == 'alex-repair.com':
            assert (root / (target.path.lstrip('/') or 'index.html')).exists(), target.path
for filename in ('blog.html', 'recent-work.html', 'noblesville.html'):
    assert relative in (root / filename).read_text(encoding='utf-8')
for filename in ('sitemap.xml', 'sitemap-images.xml'):
    assert len(ET.parse(root / filename).findall('.//{*}loc[.="' + url + '"]')) == 1
print('PASS: model crop, 11 images, metadata, schema, links and sitemaps')

if '--live' in sys.argv:
    files = [relative, 'css/lg-fan-noblesville.css', 'blog.html', 'recent-work.html', 'noblesville.html',
             'sitemap.xml', 'sitemap-images.xml', 'robots.txt'] + [p for p, _ in photos]
    for filename in files:
        with urlopen('https://alex-repair.com/' + filename, timeout=30) as response:
            assert response.status == 200
            assert 'noindex' not in response.headers.get('X-Robots-Tag', '').lower()
            remote = response.read()
        local = (root / filename).read_bytes()
        if not filename.endswith('.webp'):
            remote, local = [b.replace(b'\r\n', b'\n') for b in (remote, local)]
        assert remote == local, 'Live content differs: ' + filename
        print('LIVE OK:', filename, flush=True)
