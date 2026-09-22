"""Validate the published-story inputs, markup, links and sitemap entries."""
from pathlib import Path
from html.parser import HTMLParser
import json
import xml.etree.ElementTree as ET
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SLUG = 'carmel-lg-wm3997hwa-drain-pump'
PAGE = ROOT / 'repair-cases' / (SLUG + '.html')
URL = 'https://alex-repair.com/repair-cases/' + SLUG + '.html'

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.schemas = []
        self.active = False
        self.data = ''
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.active = True
            self.data = ''
    def handle_data(self, data):
        if self.active:
            self.data += data
    def handle_endtag(self, tag):
        if tag == 'script' and self.active:
            self.schemas.append(json.loads(self.data))
            self.active = False

page = Page()
html = PAGE.read_text(encoding='utf8')
page.feed(html)
assert sum(t == 'h1' for t, _ in page.tags) == 1
assert [a['href'] for t, a in page.tags if t == 'link' and a.get('rel') == 'canonical'] == [URL]
assert len(page.schemas) == 1
graph = page.schemas[0]['@graph']
assert {g['@type'] for g in graph} == {'BlogPosting', 'BreadcrumbList'}
article = next(g for g in graph if g['@type'] == 'BlogPosting')
assert article['url'] == URL and article['datePublished'] == '2026-09-22'
assert len(article['image']) == 7
assert 'WM3997HWA /01' in html
assert 'Chen Su' not in html and '704KWVQ6S647' not in html
assert not any('noindex' in a.get('content', '') for t, a in page.tags if t == 'meta' and a.get('name') == 'robots')
for tag, attrs in page.tags:
    for key in ('src', 'href'):
        value = attrs.get(key, '')
        if value.startswith('/') and not value.startswith('//'):
            target = ROOT / value.lstrip('/').split('?')[0].split('#')[0]
            assert target.exists(), value
    if tag == 'img' and 'lg-wm3997hwa-drain-pump-carmel' in attrs.get('src', ''):
        assert attrs.get('alt')
        with Image.open(ROOT / attrs['src'].lstrip('/')) as photo:
            assert photo.size == (int(attrs['width']), int(attrs['height']))
for filename in ('sitemap.xml', 'sitemap-images.xml'):
    tree = ET.parse(ROOT / filename)
    matches = [e for e in tree.getroot() if e.find('{*}loc').text == URL]
    assert len(matches) == 1, filename
for filename in ('blog.html', 'recent-work.html'):
    assert URL in (ROOT / filename).read_text(encoding='utf8')
print('PASS: schema, canonical, H1, model, privacy, local links/assets, image dimensions, blog/archive and sitemaps')
