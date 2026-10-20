"""Check service copy and preserve SEO/routing contracts across tracked pages."""
import importlib.util
import json
from pathlib import Path
import re
import subprocess
import xml.etree.ElementTree as ET

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('scope',ROOT/'scripts/update-microwave-scope.py')
scope=importlib.util.module_from_spec(spec)
spec.loader.exec_module(scope)
baseline_path=ROOT/'previews/microwave-scope-baseline.json'
baseline=json.loads(baseline_path.read_text()) if baseline_path.exists() else {}
files=subprocess.check_output(['git','ls-files','*.html'],cwd=ROOT,text=True).splitlines()
checked=0
for filename in files:
    source=(ROOT/filename).read_text(encoding='utf-8')
    if 'microwave' not in source.lower(): continue
    doc=scope.Document(source)
    if filename in baseline:
        b=baseline[filename]
        assert [n.attrs.get('href') for n in doc.nodes if n.tag=='link' and n.attrs.get('rel')=='canonical']==b['canonical'], filename+' canonical changed'
        assert [n.attrs.get('content') for n in doc.nodes if n.tag=='meta' and n.attrs.get('name')=='robots']==b['robots'], filename+' robots changed'
        assert [n.attrs.get('src') for n in doc.nodes if n.tag=='script' and 'src' in n.attrs]==b['scripts'], filename+' scripts changed'
        if 'microwave' not in filename:
            def normalize_microwave(url):
                if url and re.search(r'(?:^|/)microwave-repair(?:-services)?\.html$', url): return 'microwave-service'
                return url
            assert [normalize_microwave(n.attrs.get('href')) for n in doc.nodes if n.tag=='a']==[normalize_microwave(url) for url in b['links']],filename+' unrelated links changed'
    for n in doc.nodes:
        if n.tag=='script' and n.attrs.get('type')=='application/ld+json': json.loads(source[n.inner:n.end])
        if n.tag=='a': assert doc.text(n).strip()!='Microwave Repair', filename+' unqualified service link'
    assert 'built-in built-in' not in source.lower(),filename
    assert 'built-in and over-the-range' not in source.lower(),filename
    if filename in ['microwave-repair.html','noblesville/microwave-repair-services.html']:
        headings=[doc.text(n) for n in doc.nodes if n.tag=='h1']
        assert len(headings)==1 and scope.LABEL in headings[0],filename
        assert 'We do not service over-the-range' in source,filename
        questions={}
        for n in doc.nodes:
            if n.tag=='details':
                q=next((doc.text(c) for c in n.children if c.tag=='summary'),None)
                a=next((doc.text(c) for c in n.children if c.tag=='p'),None)
                if q and a: questions[q]=a
        for n in doc.nodes:
            if n.tag=='script' and n.attrs.get('type')=='application/ld+json':
                schema=json.loads(source[n.inner:n.end])
                for item in schema.get('@graph',[]):
                    if item.get('@type')=='FAQPage':
                        for q in item['mainEntity']: assert questions[q['name']]==q['acceptedAnswer']['text'],filename+' FAQ mismatch'
    checked+=1

ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
current=ET.parse(ROOT/'sitemap.xml')
previous=ET.fromstring(subprocess.check_output(['git','show','HEAD:sitemap.xml'],cwd=ROOT))
before={e.text for e in previous.findall('.//s:loc',ns)}
after={e.text for e in current.findall('.//s:loc',ns)}
restored={f'https://alex-repair.com/{city}/microwave-repair-services.html' for city in ['carmel','fishers','westfield','mccordsville','zionsville']}
assert before <= after and after-before <= restored,'Unrelated sitemap URLs changed'
for name in ['robots.txt']:
    assert (ROOT/name).read_bytes().replace(b'\r\n',b'\n')==subprocess.check_output(['git','show','HEAD:'+name],cwd=ROOT).replace(b'\r\n',b'\n'),name+' changed'
print(f'PASS {checked} pages: canonical, robots, script URLs, navigation targets, JSON-LD, scope, FAQs and sitemap URLs')
