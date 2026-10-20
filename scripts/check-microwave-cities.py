"""Validate local navigation, city metadata and Apache redirects together."""
import importlib
import json
import re
import subprocess
import xml.etree.ElementTree as ET

links=importlib.import_module('fix-microwave-city-links')
scope=links.scope
ROOT=links.ROOT
names=dict(zip(links.CITIES, ['Carmel','Fishers','Westfield','Noblesville','McCordsville','Zionsville']))
config=(ROOT/'.htaccess').read_text()
previous=subprocess.check_output(['git','show','HEAD:.htaccess'],cwd=ROOT,text=True)

def redirect(source,path):
    for line in source.splitlines():
        parts=line.split()
        if len(parts)==4 and parts[0]=='RedirectMatch':
            match=re.search(parts[2],path)
            if match:
                return re.sub(r'\$(\d+)',lambda m:match.group(int(m[1])),parts[3])
        if len(parts)==4 and parts[0]=='Redirect' and path.startswith(parts[2]):
            return parts[3]+path[len(parts[2]):]
    return None

urls={n.text for n in ET.parse(ROOT/'sitemap.xml').findall('{*}url/{*}loc')}
for city,name in names.items():
    path=f'{city}/microwave-repair-services.html'
    source=(ROOT/path).read_text(encoding='utf-8')
    doc=scope.Document(source)
    url=links.city_url(city)
    assert redirect(config,'/'+path) is None,path+' redirects'
    assert url in urls,path+' absent from sitemap'
    assert [doc.text(n) for n in doc.nodes if n.tag=='h1']==[f'{scope.LABEL} in {name}, IN'],path
    assert name in next(doc.text(n) for n in doc.nodes if n.tag=='title'),path
    assert [n.attrs['href'] for n in doc.nodes if n.tag=='link' and n.attrs.get('rel')=='canonical']==[url],path
    assert not any('noindex' in n.attrs.get('content','') for n in doc.nodes if n.tag=='meta' and n.attrs.get('name')=='robots'),path
    schema=[json.loads(source[n.inner:n.end]) for n in doc.nodes if n.tag=='script' and n.attrs.get('type')=='application/ld+json']
    assert any(url in json.dumps(item) and name in json.dumps(item) for item in schema),path
    hub=scope.Document((ROOT/(city+'.html')).read_text(encoding='utf-8'))
    assert any(n.tag=='a' and n.attrs.get('href')==url for n in hub.nodes),city+' hub missing link'
    for service in ['cooktop','dishwasher','dryer','freezer','refrigerator','stove','washer']:
        other=f'/{city}/{service}-repair-services.html'
        assert redirect(config,other)==redirect(previous,other),other+' unrelated redirect changed'

count=0
for filename in subprocess.check_output(['git','ls-files','*.html'],cwd=ROOT,text=True).splitlines():
    source=(ROOT/filename).read_text(encoding='utf-8')
    doc=scope.Document(source)
    for node in doc.nodes:
        if node.tag=='a' and 'microwave' in node.attrs.get('href',''):
            city=links.menu_city(node)
            if city:
                assert node.attrs['href']==links.city_url(city),filename+' wrong city link'
                count+=1
print(f'PASS six city pages, metadata, sitemap, redirects and {count} city-menu links')
