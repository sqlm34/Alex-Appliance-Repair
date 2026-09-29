"""Check the generated Carmel story, assets and discovery metadata."""
from pathlib import Path
from html.parser import HTMLParser
import json
from PIL import Image

root = Path(__file__).resolve().parents[1]
slug = 'carmel-samsung-rf260beaesr-fan-noise-defrost-drain'
html = (root / 'repair-cases' / (slug + '.html')).read_text(encoding='utf-8')

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.schemas = []
        self.schema = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.schema = ''

    def handle_data(self, data):
        if self.schema is not None:
            self.schema += data

    def handle_endtag(self, tag):
        if tag == 'script' and self.schema is not None:
            self.schemas.append(json.loads(self.schema))
            self.schema = None

page = Page()
page.feed(html)
assert sum(tag == 'h1' for tag, _ in page.tags) == 1
canonical = 'https://alex-repair.com/repair-cases/' + slug + '.html'
assert any(tag == 'link' and a.get('rel') == 'canonical' and a.get('href') == canonical for tag, a in page.tags)
assert {'BlogPosting', 'BreadcrumbList'} <= {item['@type'] for schema in page.schemas for item in schema.get('@graph', [])}
images = [a for tag, a in page.tags if tag == 'img' and 'samsung-fan-carmel/' in a.get('src', '')]
assert len(images) == 14
assert len({a['src'] for a in images}) == 14
for attrs in images:
    assert attrs.get('alt')
    with Image.open(root / attrs['src'].lstrip('/')) as photo:
        assert photo.size == (int(attrs['width']), int(attrs['height']))
for phrase in ['RF260BEAESR/AA', 'Carmel, Indiana', 'forced defrost cycle', 'rear drain tubes were removed', 'temperature sensor', 'existing defrost heating element']:
    assert phrase in html, phrase
assert 'JKKM4BBDA00424D' not in html
assert '/carmel/refrigerator-repair-services.html' in html
assert 'href="/carmel.html">View service coverage' in html
for filename in ['blog.html', 'recent-work.html']:
    assert slug in (root / filename).read_text(encoding='utf-8')
for filename in ['sitemap.xml', 'sitemap-images.xml']:
    assert (root / filename).read_text(encoding='utf-8').count('<loc>' + canonical + '</loc>') == 1
print('PASS: model, content, 14 image dimensions, schema, canonical, local links and sitemap discovery')
