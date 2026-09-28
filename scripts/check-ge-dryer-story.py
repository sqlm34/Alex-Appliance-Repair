"""Validate the GE repair story, original photos, links and SEO integration."""
from pathlib import Path
from html.parser import HTMLParser
import json
import xml.etree.ElementTree as ET
from PIL import Image

root = Path(__file__).resolve().parents[1]
slug = 'north-indianapolis-ge-gfdn110el0ww-dryer-belt-thermostat'
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
assert article['url'] == url and article['datePublished'] == '2026-09-28'
assert len(set(article['image'])) == 17
for fact in ('GFDN110EL0WW', 'north side of Indianapolis', 'broken drive belt',
             'failed thermostat', 'possible contributing factor',
             'front support slides', 'drum rotated and the dryer heated properly'):
    assert fact in html, fact
assert 'View Fishers service coverage' not in html
assert not any('noindex' in a.get('content', '') for t, a in page.tags if t == 'meta')
photos = []
for tag, attrs in page.tags:
    for key in ('href', 'src'):
        value = attrs.get(key, '')
        if value.startswith('/') and not value.startswith('//'):
            assert (root / value.lstrip('/').split('?')[0].split('#')[0]).exists(), value
    if tag == 'img' and 'ge-dryer-indianapolis' in attrs.get('src', ''):
        photos.append(attrs['src'])
        assert attrs.get('alt')
        with Image.open(root / attrs['src'].lstrip('/')) as photo:
            assert photo.size == (int(attrs['width']), int(attrs['height']))
assert len(photos) == len(set(photos)) == 17
for area in ('cabinet', 'front-panel', 'blower', 'heater-area'):
    before = next(i for i, p in enumerate(photos) if area + '-before-cleaning' in p)
    assert area + '-after-cleaning' in photos[before + 1]
for filename in ('sitemap.xml', 'sitemap-images.xml'):
    assert sum(e.find('{*}loc').text == url for e in ET.parse(root / filename).getroot()) == 1
for filename in ('blog.html', 'recent-work.html'):
    assert url in (root / filename).read_text(encoding='utf8')
archive = (root / 'recent-work.html').read_text(encoding='utf8')
assert archive.count('data-filter-value="indianapolis"') == 1
assert 'data-city="indianapolis"' in archive
print('PASS: facts, 17 images, 4 before/after pairs, dimensions, links, schema, city filter and sitemaps')
