"""Keep microwave links in city navigation and city content on the chosen route."""
import argparse
import importlib
import json
import re
import subprocess
from urllib.parse import urljoin, urlparse

scope = importlib.import_module('update-microwave-scope')
ROOT = scope.ROOT
BASE = 'https://alex-repair.com/'
CITIES = ('carmel', 'fishers', 'westfield', 'noblesville', 'mccordsville', 'zionsville')
recovery_source = (ROOT / 'scripts/apply-seo-recovery.mjs').read_text(encoding='utf-8')
retired_services = json.loads(re.search(r'const retiredServices = (\[[\s\S]*?\]);', recovery_source)[1])
RETIRED = {f'/{city}/{service}-repair-services.html': BASE + service + '-repair.html' for city, service in retired_services}


def city_url(city):
    return BASE + city + '/microwave-repair-services.html'


def page_city(filename):
    for city in CITIES:
        if filename == city + '.html' or filename.startswith(city + '/'):
            return city
    return None


def menu_city(node):
    parent = node.parent
    while parent:
        if parent.tag == 'li':
            for child in parent.children:
                if child.tag == 'a':
                    path = urlparse(child.attrs.get('href', '')).path.lstrip('/')
                    for city in CITIES:
                        if path == city + '.html':
                            return city
        parent = parent.parent
    return None


def update(filename, source):
    doc = scope.Document(source)
    local_city = page_city(filename)
    edits = []
    for node in doc.nodes:
        if node.tag == 'a':
            href = node.attrs.get('href', '')
            url = urlparse(urljoin(BASE + filename, href))
            if filename.endswith('/microwave-repair-services.html') and url.netloc == 'alex-repair.com' and url.path in RETIRED:
                tag = source[node.start:node.inner]
                match = re.search(r'\bhref\s*=\s*([\"\'])(.*?)\1', tag, re.S)
                edits.append((node.start + match.start(2), node.start + match.end(2), RETIRED[url.path]))
                continue
            if url.netloc != 'alex-repair.com' or not re.fullmatch(r'/(?:[a-z]+/)?microwave-repair(?:-services)?\.html', url.path):
                continue
            city = menu_city(node)
            # Global navigation's city groups override the current page's city.
            ancestor = node.parent
            in_navigation = False
            while ancestor:
                in_navigation |= ancestor.tag == 'nav'
                ancestor = ancestor.parent
            city = city or (local_city if not in_navigation else None)
            if city and href != city_url(city):
                tag = source[node.start:node.inner]
                match = re.search(r'\bhref\s*=\s*([\"\'])(.*?)\1', tag, re.S)
                assert match, filename
                edits.append((node.start + match.start(2), node.start + match.end(2), city_url(city)))
        elif node.tag == 'script' and node.attrs.get('type') == 'application/ld+json' and local_city:
            raw = source[node.inner:node.end]
            data = json.loads(raw)
            def visit(value):
                if isinstance(value, dict): return {k: visit(v) for k, v in value.items()}
                if isinstance(value, list): return [visit(v) for v in value]
                return city_url(local_city) if value == BASE + 'microwave-repair.html' else value
            updated = visit(data)
            if updated != data:
                edits.append((node.inner, node.end, '\n' + json.dumps(updated, ensure_ascii=False, indent=2) + '\n'))
    for start, end, value in sorted(edits, reverse=True):
        source = source[:start] + value + source[end:]
    return source


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    changed = []
    for filename in subprocess.check_output(['git', 'ls-files', '*.html'], cwd=ROOT, text=True).splitlines():
        path = ROOT / filename
        with path.open(encoding='utf-8', newline='') as handle: source = handle.read()
        updated = update(filename, source)
        if updated != source:
            changed.append(filename)
            if not args.check:
                with path.open('w', encoding='utf-8', newline='') as handle: handle.write(updated)
    print(json.dumps({'changed': len(changed)}, indent=2))
    if args.check and changed: raise SystemExit(1)
