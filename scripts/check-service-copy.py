"""Audit public copy and generators for removed service promises and markup regressions."""
import html
import json
import re
import subprocess
from html.parser import HTMLParser
from pathlib import Path

root = Path(__file__).resolve().parents[1]
files = subprocess.check_output(['git', 'ls-files', '-z'], cwd=root).decode().split('\0')
changed = set(subprocess.check_output(['git', '-c', 'core.safecrlf=false', 'diff', '--name-only'], cwd=root).decode().splitlines())
errors = []

class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.tags, self.schemas, self.text = [], [], []
        self.script = False
        self.structured = False
        self.buffer = ''
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if tag == 'script':
            self.script = True
            self.structured = attrs.get('type') == 'application/ld+json'
            self.buffer = ''

    def handle_data(self, data):
        if self.structured:
            self.buffer += data
        elif not self.script:
            self.text.append(data)

    def handle_endtag(self, tag):
        if tag == 'script':
            if self.structured:
                self.schemas.append(json.loads(self.buffer))
            self.script = self.structured = False

for file in files:
    if not file.endswith(('.html', '.mjs', '.js', '.json', '.csv')) or file == 'scripts/check-service-copy.py':
        continue
    source = (root / file).read_text(encoding='utf-8')
    normalized = html.unescape(re.sub(r'<[^>]*>', ' ', source))
    prohibited = [
        r'\b(?:12|twelve)[\s\-\u2010-\u2014]*months?\b',
        r'\b(?:one|1|full)[\s\-\u2010-\u2014]*year.{0,60}warrant',
        r'(?:satisfaction\s+guarantee|guaranteed\s+repairs|warranty on (?:parts|repairs))',
        r'(?:our warranty|repairs are backed by.{0,30}warranty|no (?:extra|additional) cost)',
    ]
    for pattern in prohibited:
        if re.search(pattern, normalized, re.I):
            errors.append(f'{file}: prohibited service promise: {pattern}')
    if not file.endswith('.html'):
        continue
    try:
        page = Page(source)
        if file in changed:
            old = Page(subprocess.check_output(['git', 'show', f'HEAD:{file}'], cwd=root).decode('utf-8'))
            for tag, key in [('a', 'href'), ('img', 'src'), ('link', 'href')]:
                before = [a.get(key) for t, a in old.tags if t == tag]
                after = [a.get(key) for t, a in page.tags if t == tag]
                assert before == after, f'{tag} {key} changed'
            assert sum(t == 'h1' for t, _ in old.tags) == sum(t == 'h1' for t, _ in page.tags), 'H1 count changed'
            visible = ' '.join(' '.join(page.text).split())
            def check_schema(value):
                if isinstance(value, list):
                    for item in value:
                        check_schema(item)
                elif isinstance(value, dict):
                    if value.get('@type') == 'Question' and re.search(r'(repair quality|expect from your repair)', value.get('name', '')):
                        assert value['name'] in visible, 'New FAQ question not visible'
                        assert value['acceptedAnswer']['text'] in visible, 'New FAQ answer not visible'
                    for item in value.values():
                        check_schema(item)
            check_schema(page.schemas)
    except (AssertionError, ValueError) as error:
        errors.append(f'{file}: {error}')

print(json.dumps({'htmlPagesChecked': sum(f.endswith('.html') for f in files), 'errors': errors}, indent=2))
if errors:
    raise SystemExit(1)
