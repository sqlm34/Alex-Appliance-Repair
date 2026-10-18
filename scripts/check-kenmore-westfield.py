"""Validate the Kenmore gasket story and its real service media."""
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse
from PIL import Image

root = Path(__file__).resolve().parents[1]
relative = 'repair-cases/westfield-kenmore-elite-79641582411-washer-door-gasket-replacement.html'
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
assert all(x in meta['description'] for x in ('Westfield', '796.41582.411', 'gasket'))
assert 'noindex' not in meta['robots']
assert meta['og:url'] == url and meta['og:type'] == 'article'
assert [a['href'] for t, a in page.tags if t == 'link' and a.get('rel') == 'canonical'] == [url]
article = next(s for s in page.schemas[0]['@graph'] if s['@type'] == 'BlogPosting')
assert article['mainEntityOfPage'] == url and len(article['image']) == 15
assert article['datePublished'] == '2026-10-18'
body = source.split('<article class="case-body editorial-story">')[1].split('</article>')[0]
photos = [a for t, a in Page(body).tags if t == 'img']
assert len(photos) == 15 and photos[0].get('fetchpriority') == 'high'
for a in photos:
    assert a['alt'] and 'object-fit:contain' in a['style']
    with Image.open(root / urlparse(urljoin(url, a['src'])).path.lstrip('/')) as photo:
        assert photo.size == (int(a['width']), int(a['height']))
for _, a in page.tags:
    for key in ('href', 'src'):
        target = urlparse(urljoin(url, a.get(key, '')))
        if key in a and target.netloc == 'alex-repair.com':
            assert (root / (target.path.lstrip('/') or 'index.html')).exists(), target.path
for filename in ('blog.html', 'recent-work.html', 'sitemap.xml', 'sitemap-images.xml'):
    assert relative in (root / filename).read_text(encoding='utf-8')
assert all(x not in source for x in ('MDS47123608', 'WM4270HVA', '603PNRT7J262'))
assert 'no leaks were observed' in body and 'warranty' not in body.lower()
print('PASS: 15 images, dimensions, model, metadata, schema, local links, sitemaps and repair facts')
