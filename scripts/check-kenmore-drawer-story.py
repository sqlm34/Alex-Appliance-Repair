"""Check the new story's facts, links, assets and generated metadata."""
from pathlib import Path
from html.parser import HTMLParser
import json
import xml.etree.ElementTree as ET
from PIL import Image

root = Path(__file__).resolve().parents[1]
slug = 'fishers-kenmore-washer-softener-drawer-dc97-07125z'
url = 'https://alex-repair.com/repair-cases/' + slug + '.html'

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.schemas = [], []
        self.active, self.data = False, ''
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.active, self.data = True, ''
    def handle_data(self, data):
        if self.active:
            self.data += data
    def handle_endtag(self, tag):
        if tag == 'script' and self.active:
            self.schemas.append(json.loads(self.data))
            self.active = False

html = (root / 'repair-cases' / (slug + '.html')).read_text(encoding='utf8')
page = Page()
page.feed(html)
assert sum(t == 'h1' for t, a in page.tags) == 1
assert [a['href'] for t, a in page.tags if t == 'link' and a.get('rel') == 'canonical'] == [url]
graph = page.schemas[0]['@graph']
assert {x['@type'] for x in graph} == {'BlogPosting', 'BreadcrumbList'}
article = next(x for x in graph if x['@type'] == 'BlogPosting')
assert article['url'] == url and article['datePublished'] == '2026-09-27'
assert len(set(article['image'])) == 8
for fact in ('Kenmore 402-49032011', 'DC97-07125Z', '15-year-old', 'Fishers, Indiana', 'nonworking water valve', 'fabric softener'):
    assert fact in html, fact
assert 'Y0G854AZ700539R' not in html
assert not any('noindex' in a.get('content', '') for t, a in page.tags if t == 'meta')
photos = 0
for tag, attrs in page.tags:
    for key in ('href', 'src'):
        value = attrs.get(key, '')
        if value.startswith('/') and not value.startswith('//'):
            assert (root / value.lstrip('/').split('?')[0].split('#')[0]).exists(), value
    if tag == 'img' and 'kenmore-drawer-fishers' in attrs.get('src', ''):
        photos += 1
        assert attrs.get('alt')
        with Image.open(root / attrs['src'].lstrip('/')) as photo:
            assert photo.size == (int(attrs['width']), int(attrs['height']))
assert photos == 8
for filename in ('sitemap.xml', 'sitemap-images.xml'):
    assert sum(e.find('{*}loc').text == url for e in ET.parse(root / filename).getroot()) == 1
for filename in ('blog.html', 'recent-work.html'):
    assert url in (root / filename).read_text(encoding='utf8')
print('PASS: confirmed facts, 8 images, dimensions, links, schema, listings and sitemaps')
