"""Check both dryer articles, including top diagrams and published assets."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, urljoin
from urllib.request import urlopen
from PIL import Image
import json
import sys
import xml.etree.ElementTree as ET

root = Path(__file__).resolve().parents[1]
relative = 'repair-cases/mccordsville-maytag-medb835dc4-dryer-rollers-idler-repair.html'
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
assert 'McCordsville' in meta['description'] and 'MEDB835DC4' in meta['description']
assert meta['og:url'] == url and meta['og:type'] == 'article'
assert [a['href'] for t, a in page.tags if t == 'link' and a.get('rel') == 'canonical'] == [url]
article = next(s for s in page.schemas[0]['@graph'] if s['@type'] == 'BlogPosting')
assert article['mainEntityOfPage'] == url
assert article['datePublished'] == article['dateModified'] == '2026-10-05'
assert 'View McCordsville service coverage' in html
assert 'View Fishers service coverage' not in html
assert 'M93927631' not in html
body = html.split('<article class="case-body editorial-story">')[1].split('</article>')[0]
assert body.index('reference-idler-diagram.webp') < body.index('reference-roller-diagram.webp') < body.index('medb835dc4-model.webp')
assert 'not an exact parts diagram' in body and 'three at the front and two at the rear' in body
assert 'felt seals were cleaned, not replaced' in body
photos = [a for t, a in Page(body).tags if t == 'img']
assert len(photos) == 17
for a in photos:
    assert a.get('alt') and 'object-fit:contain!important' in a['style']
    with Image.open(root / a['src'].lstrip('/')) as img:
        assert img.size == (int(a['width']), int(a['height']))
for _, attrs in page.tags:
    for key in ('href', 'src'):
        target = urlparse(urljoin(url, attrs.get(key, '')))
        if key in attrs and target.netloc == 'alex-repair.com':
            assert (root / (target.path.lstrip('/') or 'index.html')).exists(), target.path
for filename in ('blog.html', 'recent-work.html', 'mccordsville.html'):
    assert relative in (root / filename).read_text(encoding='utf-8')
for filename in ('sitemap.xml', 'sitemap-images.xml'):
    assert len(ET.parse(root / filename).findall('.//{*}loc[.="' + url + '"]')) == 1
old = 'repair-cases/westfield-whirlpool-wed5800bw0-dryer-noise-rollers-idler-pulley.html'
oldbody = (root / old).read_text(encoding='utf-8').split('<article class="case-body editorial-story">')[1]
assert oldbody.index('cabinet-idler-parts-diagram.webp') < oldbody.index('drum-roller-parts-diagram.webp') < oldbody.index('whirlpool-cabrio-service-visit.webp')
print('PASS: 17 complete images, metadata, schema, local links, sitemaps and top diagrams in both articles')
if '--live' in sys.argv:
    files = [relative, old, 'blog.html', 'recent-work.html', 'mccordsville.html', 'sitemap.xml', 'sitemap-images.xml'] + [a['src'].lstrip('/') for a in photos]
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
