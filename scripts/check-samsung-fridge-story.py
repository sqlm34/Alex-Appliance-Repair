"""Validate the refrigerator story, original photo coverage and generated SEO."""
from pathlib import Path
from html.parser import HTMLParser
import json
import xml.etree.ElementTree as ET
from PIL import Image

root = Path(__file__).resolve().parents[1]
slug = 'fishers-samsung-rfg237aawp-refrigerator-fan-motor-sensor'
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
assert len(page.schemas) == 1
graph = page.schemas[0]['@graph']
assert {item['@type'] for item in graph} == {'BlogPosting', 'BreadcrumbList'}
article = next(item for item in graph if item['@type'] == 'BlogPosting')
assert article['url'] == url and article['datePublished'] == '2026-09-24'
assert len(set(article['image'])) == 11
assert 'RFG237AAWP/XAA' in html and 'Fishers, Indiana' in html
assert '37 degrees Fahrenheit' in html and 'sensor was also replaced' in html
assert 'C29542BC500100' not in html and 'just in case' not in html.lower()
assert not any('noindex' in a.get('content', '') for t, a in page.tags if t == 'meta' and a.get('name') == 'robots')
photos = 0
for tag, attrs in page.tags:
    for key in ('href', 'src'):
        value = attrs.get(key, '')
        if value.startswith('/') and not value.startswith('//'):
            assert (root / value.lstrip('/').split('?')[0].split('#')[0]).exists(), value
    if tag == 'img' and 'samsung-rfg237aawp-fishers' in attrs.get('src', ''):
        photos += 1
        assert attrs.get('alt')
        with Image.open(root / attrs['src'].lstrip('/')) as photo:
            assert photo.size == (int(attrs['width']), int(attrs['height']))
assert photos == 11
for filename in ('sitemap.xml', 'sitemap-images.xml'):
    matches = [e for e in ET.parse(root / filename).getroot() if e.find('{*}loc').text == url]
    assert len(matches) == 1
for filename in ('blog.html', 'recent-work.html'):
    assert url in (root / filename).read_text(encoding='utf8')
print('PASS: model, repair details, privacy, 11 images/dimensions, links, metadata, schema, listings and sitemaps')
