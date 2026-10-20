"""Apply the service-scope correction without reserializing unrelated HTML.

HTMLParser provides source spans; only text, descriptive attributes and JSON-LD
copy are edited. URLs, scripts, redirects and indexability remain unchanged.
"""
import argparse
import html
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
DATE = '2026-10-19'
LABEL = 'Built-in Microwave + Oven Combo Repair'
SCOPE = ('We repair only built-in combination units that integrate a microwave with a wall oven in cabinetry. '
         'We do not repair over-the-range microwaves mounted above gas or electric cooktops, countertop microwaves, '
         'microwave drawers or standalone built-in microwaves without an integrated oven.')
TOOLS_IMAGE = 'images/about-appliance-repair-tools-logo.webp'


def microwave_photo(value):
    return bool(re.search(r'/(?:[^/]*microwave[^/]*\.(?:webp|png|jpe?g))(?:\?.*)?$', '/'+value,re.I)) and 'icon' not in value and 'white' not in value
SUMMARY = ('Diagnosis and repair for the microwave section of built-in microwave/wall-oven combination units only. '
           'Over-the-range, countertop, drawer and standalone microwaves are not serviced.')
PREPARATION = ('Confirm that the microwave is part of a built-in microwave/wall-oven combination unit. '
               'Share the model number, cabinet access and whether the problem affects the microwave, oven or both. '
               'Do not remove the appliance or its covers to obtain this information.')
WORTH = ('For a built-in microwave/wall-oven combination, repair options depend on diagnosis, appliance condition, '
         'parts availability and the installed cost of a suitable replacement. We explain the estimate before approved work.')
NO = ('No. Our microwave service is limited to built-in microwave/wall-oven combination units. '
      'We do not service over-the-range, countertop, drawer or standalone built-in microwaves.')

PHRASES = {
 'Diagnosis for built-in and over-the-range microwaves that will not heat, start, turn, vent or respond to the controls.': SUMMARY,
 'Built-in and over-the-range units are often practical to repair when the cabinet, cavity and installation are in good condition.': WORTH,
 'Built-in and over-the-range models are often worth diagnosing, while countertop models depend on age and value.': WORTH,
 'Service availability depends on model, parts and repair economics. Built-in and over-the-range units are the primary focus.': NO,
 'Do you repair countertop microwaves?': 'Do you repair over-the-range or standalone microwaves?',
 'Vent fan or light fails': 'Cooling fan or cavity light fails',
 'Motors, bulbs, sockets, relays and control outputs are evaluated on over-the-range models.': 'We evaluate cooling fans and cavity lighting in supported built-in microwave/wall-oven combination units.',
 'vent fans and lights': 'cooling fans and cavity lights',
 'many built-in or over-the-range microwaves': 'built-in microwave/wall-oven combination units only',
 'Identify a countertop, over-the-range, drawer or built-in microwave and describe the controls, door and heating symptom. Do not remove the cabinet or bypass door interlocks; internal components require professional handling even after the appliance is unplugged.': PREPARATION,
 'Microwaves, drawer microwaves, cooking appliances and compact kitchen equipment.': 'Cooking appliance model support is confirmed before booking. Microwave service is limited to built-in microwave/wall-oven combination units.',
 'Sharp repair is often associated with built-in, over-the-range and drawer microwave products. Door interlocks, control response, installation access and high-voltage safety shape the diagnostic process.': 'Please confirm the exact model before requesting Sharp service. A drawer, countertop, over-the-range or standalone built-in microwave is outside our service scope, even when fitted into cabinetry.',
 'A countertop microwave and a built-in unit can have very different repair decisions. Before choosing a microwave repair provider near Carmel, identify the installation, describe the symptom and confirm that the company supports the model. Avoid buying a replacement part based only on a symptom such as “runs but does not heat.”': SCOPE + ' Before choosing a repair provider near Carmel, confirm model support and describe the symptom.',
 'Tell the provider whether the appliance is countertop, over-the-range, a drawer unit or built into cabinetry. Include the brand and model number from an accessible label. Describe any trim kit, cabinet access or installation issue that could affect removal. Do not pull out a heavy built-in appliance or remove covers just to obtain a label.': PREPARATION + ' A microwave fitted into a cabinet by itself is not the same as an integrated microwave/wall-oven combination.',
 'How to compare microwave repair options in Carmel, prepare model details and decide whether diagnosis makes sense for your appliance.': 'Compare built-in microwave + oven combo repair in Carmel: confirm the installation, model support, diagnosis and estimate before booking.',
}

GUIDE = '''<h2>Built-in Microwave and Wall Oven Combinations Only</h2>
<p>Our microwave repair service covers a microwave integrated with a wall oven as one built-in combination appliance installed in cabinetry. These units have a microwave compartment and a separate oven compartment. A microwave mounted over a gas or electric range is not this type of appliance.</p>
<p>We do not repair over-the-range microwaves, countertop models, microwave drawers or standalone built-in microwaves. A trim kit or cabinet installation alone does not make a microwave eligible for this service. Share the model number and installation details so we can confirm support before scheduling.</p>
<h2>Symptoms We Evaluate</h2>
<p>Tell us if the microwave section will not start, runs without heating, stops during a cycle, shows an error, has an unresponsive display or has a door or turntable problem. Also mention whether the wall oven still works. The symptom guides diagnosis; it does not identify a failed part by itself.</p>
<p>On supported models, diagnosis may involve door interlocks, controls, power circuits, heating components, cooling fans and cavity lighting. The technician determines the appropriate checks for the exact model before recommending parts.</p>
<h2>Prepare for a Built-in Appliance Service Visit</h2>
<ul><li>Provide the brand and complete model number if the label is safely accessible.</li><li>Describe which compartment is affected: microwave, oven or both.</li><li>Record error messages and when the problem occurs.</li><li>Mention cabinet trim, access restrictions and any previous work.</li></ul>
<p>Do not remove the appliance from the cabinet or open its electrical covers. Internal microwave work requires professional handling. Stop using the appliance if it sparks, smokes, smells electrical or has a damaged door; do not repeat test cycles or bypass safety switches.</p>
<h2>Repair or Replace the Combination Unit?</h2>
<p>Compare the diagnosed repair and available parts with the complete installed cost of an appropriate replacement. Cabinet fit, the condition of both compartments and model support matter. A countertop microwave price is not a useful comparison for an integrated wall-oven combination, and a fixed age or price percentage cannot decide every case.</p>
<p>We confirm model support, explain the diagnosis and estimate, and check the appliance after approved work. We do not promise that every brand or model can be repaired.</p>
<h2>Schedule Built-in Microwave/Oven Combo Repair</h2>
<p>Call <a href="tel:+14632488429">(463) 248-8429</a> or request service online for an eligible combination appliance. We serve Carmel, Fishers, Westfield, Noblesville, McCordsville and Zionsville, subject to appointment availability.</p>'''

ARTICLES = {
 'blog-microwave-repair-guide.html': (
  'Built-in Microwave/Oven Combo: Repair or Replace?',
  'Understand built-in microwave/oven combo symptoms, safe checks and repair decisions. Service excludes over-the-range and standalone microwaves.',
  '''<h2>Confirm the Appliance Type Before Booking</h2><p>Alex Appliance Repair services only microwaves integrated with a wall oven in a built-in combination unit. A microwave over a range, a countertop model, a microwave drawer or a standalone microwave in a trim kit is outside our service scope.</p>
<h2>Microwave Runs but Does Not Heat</h2><p>Record whether the controls, timer and turntable respond, and whether the separate oven compartment works. Several faults can produce a no-heat symptom. A technician needs to identify the model and inspect it before recommending a heating component or control repair.</p>
<h2>Door, Display and Turntable Problems</h2><p>Describe a latch that will not close, an unresponsive keypad, an error message or a turntable that does not move. Do not force the door or defeat an interlock. Consult the owner's manual for normal settings such as the control lock; do not open electrical panels.</p>
<h2>When to Stop Using the Appliance</h2><p>Stop use if there are sparks, smoke, an electrical smell or door damage. Do not run repeated tests. Internal microwave components require professional handling even after power has been disconnected.</p>
<h2>Compare Repair with the Installed Replacement Cost</h2><p>A built-in combination appliance is not equivalent to an inexpensive countertop microwave. Consider the condition of both compartments, cabinet dimensions, parts availability, removal and installation costs, and the technician's estimate. There is no universal age limit or repair-price percentage that makes the decision for every unit.</p>
<h2>Prepare for Diagnosis</h2><p>Provide the complete model number if accessible without moving the appliance, the symptoms and any error messages. Mention whether the microwave section, wall oven or both are affected and describe cabinet access.</p>
<h2>Request Service for a Supported Combination Unit</h2><p>See our <a href="https://alex-repair.com/microwave-repair.html">built-in microwave/oven combo repair service</a> or <a href="https://alex-repair.com/locations.html">local service areas</a>. Call <a href="tel:+14632488429">(463) 248-8429</a> to confirm model support before booking.</p>'''),
 'top-5-common-microwave-problems-and-how-to-fix-them.html': (
  '5 Built-in Microwave/Oven Combo Problems: Safe Next Steps',
  'Five microwave-section problems in built-in microwave/oven combos: heating, starting, turntable, sparking and controls. Learn what to report before service.',
  '''<p>This guide concerns the microwave section of a built-in microwave/wall-oven combination appliance. Our service does not cover over-the-range, countertop, drawer or standalone built-in microwaves.</p>
<h2>1. Microwave Runs Without Heating</h2><p>Note whether the display and timer work and whether the oven compartment operates normally. A no-heat symptom can have more than one cause; do not order internal parts based on the symptom alone.</p>
<h2>2. Microwave Will Not Start</h2><p>Check the owner's manual for the normal control-lock setting and note any error message. Report whether the whole combination appliance is unresponsive or only the microwave section. Do not bypass a door switch or open the control panel.</p>
<h2>3. Turntable Does Not Move</h2><p>If your model uses a turntable, follow its manual to check the seating of removable tray parts with the appliance off and cool. If the problem remains, describe it when requesting diagnosis rather than accessing the drive components.</p>
<h2>4. Sparking, Smoke or an Electrical Smell</h2><p>Stop using the appliance and do not repeat a cycle to reproduce the fault. Report what you observed and any visible cavity or door damage. Internal inspection is a professional task.</p>
<h2>5. Controls or Display Do Not Respond</h2><p>Record the displayed code, which buttons are affected and whether the problem is intermittent. Mention any recent power interruption or repair. This information helps the technician plan model-specific diagnosis.</p>
<h2>What Not to Do Yourself</h2><p>Do not remove microwave covers, inspect internal wiring, replace high-voltage components or defeat interlocks. Do not pull the combination unit from its cabinet for a model photograph. Microwave components require professional handling even after disconnection.</p>
<h2>Arrange Built-in Combination Appliance Service</h2><p>Share the model number, cabinet access and whether the microwave, oven or both are affected. See <a href="https://alex-repair.com/microwave-repair.html">built-in microwave/oven combo repair</a> for service details in Fishers and nearby communities, or <a href="https://alex-repair.com/locations.html">check service coverage</a>.</p>'''),
}

def copy_text(value):
    value = re.sub(r'Same-day Sharp appliance repair in ([^,]+), IN for microwave drawers, built-in microwaves and compact kitchen appliances\.', r'Sharp appliance service inquiries in \1, IN. Microwave service is limited to integrated microwave/wall-oven combinations; confirm model eligibility before booking.', value)
    value = value.replace('motors, bulbs, sockets, relays and control outputs are evaluated on over-the-range models.', 'cooling fans and cavity lighting are evaluated in supported built-in microwave/wall-oven combination units.')
    for old, new in PHRASES.items():
        value = value.replace(old, new)
    # Qualify service labels, not technical references to microwave energy or parts.
    value = re.sub(r'(?<![\w/-])microwave(?: oven)? repair\b', lambda m: LABEL if m[0][0].isupper() else LABEL.lower(), value, flags=re.I)
    value = re.sub(r'(?<![\w/-])microwave service\b', 'built-in microwave/oven combo service', value, flags=re.I)
    if re.search(r'refrigerators|washers|dishwashers|cooktops',value,re.I) and not re.search(r'over-the-range|countertop|drawer',value,re.I):
        value = re.sub(r'(?<![\w/-])microwaves\b', 'built-in microwave/oven combination units', value)
    value = value.replace('stove, microwave, cooktop', 'stove, built-in microwave/oven combo, cooktop')
    value = re.sub(r'\bbuilt-in built-in\b','built-in',value,flags=re.I)
    value = value.replace('Built-in Microwave/Oven Combo Repair',LABEL).replace('built-in microwave/oven combo repair',LABEL.lower())
    return value


class Node:
    def __init__(self, tag, attrs, start, inner, parent=None):
        self.tag, self.attrs, self.start, self.inner, self.parent = tag, dict(attrs), start, inner, parent
        self.end = self.stop = inner
        self.children = []


class Document(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=False)
        self.source = source
        self.lines = [0] + [m.end() for m in re.finditer('\n', source)]
        self.nodes, self.stack, self.texts = [], [], []
        self.feed(source)

    def source_offset(self):
        line, col = self.getpos()
        return self.lines[line - 1] + col

    def handle_starttag(self, tag, attrs):
        pos = self.source_offset()
        node = Node(tag, attrs, pos, pos + len(self.get_starttag_text()), self.stack[-1] if self.stack else None)
        if node.parent:
            node.parent.children.append(node)
        self.nodes.append(node)
        if tag not in {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if self.stack and self.stack[-1].tag == tag:
            self.stack.pop()

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i].tag == tag:
                for node in self.stack[i:]:
                    node.end = self.source_offset()
                    node.stop = self.source.index('>', node.end) + 1
                del self.stack[i:]
                break

    def handle_data(self, data):
        self.texts.append((self.source_offset(), self.source_offset()+len(data), self.stack[-1] if self.stack else None))

    def text(self, node):
        return html.unescape(re.sub('<[^>]+>', '', self.source[node.inner:node.end])).strip()


def update_page(filename, source):
    doc = Document(source)
    edits = []
    content_changed = False

    def add(start, end, value):
        if source[start:end] != value:
            edits.append((start, end, value))

    def inside(node, tag):
        while node:
            if node.tag == tag:
                return True
            node = node.parent
        return False

    dedicated = 'microwave' in filename
    service = dedicated and not filename.startswith(('blog-', 'top-', 'finding-'))
    city = next((c.title() if c != 'mccordsville' else 'McCordsville' for c in ['carmel','fishers','westfield','noblesville','mccordsville','zionsville'] if c in filename), None)
    title = (f'Microwave/Oven Combo Repair | {city}, IN' if city else 'Built-in Microwave + Oven Combo Repair | Indianapolis') if service else None
    description = (f'Built-in microwave/wall-oven combo repair in {city or "the Indianapolis area"}. No over-the-range, countertop or standalone microwave service. Confirm model support.') if service else None
    if filename in ARTICLES:
        title, description, body = ARTICLES[filename]
        node = next(n for n in doc.nodes if 'alex-article-body' in n.attrs.get('class','').split())
        add(node.inner,node.end,copy_text(body))
        content_changed = True
    if filename == 'microwave-repair-fishers-indiana.html':
        node=next(n for n in doc.nodes if 'alex-article-body' in n.attrs.get('class','').split())
        add(node.inner,node.end,copy_text(GUIDE))
        content_changed=True
    if filename.startswith('finding-reliable-microwave-'):
        title = 'Microwave/Oven Combo Repair Near Carmel: What to Ask'
        description = PHRASES['How to compare microwave repair options in Carmel, prepare model details and decide whether diagnosis makes sense for your appliance.']
    if filename == 'microwave-repair.html':
        start = source.index('<!-- CORE-GUIDE-START -->') + len('<!-- CORE-GUIDE-START -->')
        end = source.index('<!-- CORE-GUIDE-END -->')
        add(start,end,'\n'+copy_text(GUIDE)+'\n    ')
        content_changed = True

    for node in doc.nodes:
        text = doc.text(node)
        if node.tag == 'img' and microwave_photo(node.attrs.get('src','')):
            tag=source[node.start:node.inner]
            attrs={'src':'../'*filename.count('/')+TOOLS_IMAGE,'alt':'Alex Appliance Repair tools and company logo','width':'1000','height':'800'}
            for key,value in attrs.items():
                tag=re.sub(r'\b'+key+r'\s*=\s*([\"\']).*?\1',lambda m:key+'="'+value+'"',tag,flags=re.S)
            add(node.start,node.inner,tag)
            if inside(node,'main'): content_changed=True
        if node.tag == 'meta' and node.attrs.get('property',node.attrs.get('name')) in {'og:image','twitter:image'} and microwave_photo(node.attrs.get('content','')):
            tag=source[node.start:node.inner]
            tag=re.sub(r'\bcontent\s*=\s*([\"\']).*?\1',lambda m:'content="https://alex-repair.com/'+TOOLS_IMAGE+'"',tag)
            add(node.start,node.inner,tag)
        if dedicated and node.tag == 'h1':
            heading = title if not service else LABEL + f' in {city + ", IN" if city else "the Indianapolis Area"}'
            if heading:
                add(node.inner,node.end,html.escape(heading))
        if dedicated and 'local-hero-lead' in node.attrs.get('class','').split():
            lead = SUMMARY + (f' Service available in {city}, Indiana.' if city else '') if service else (description or SCOPE)
            add(node.inner,node.end,html.escape(lead))
            content_changed = True
        if title and node.tag == 'title':
            add(node.inner,node.end,html.escape(title))

        # Retired brand pages still exist on disk; remove unsupported product claims
        # without relabeling actual countertop/drawer model numbers as combo models.
        if re.search(r'/(?:sharp|thermador)-appliance-repair\.html$', filename) and node.tag in {'p','li','h2','h3'}:
            if re.search(r'over-the-range|countertop microwave|microwave drawer|drawer microwave|drawer sensor|drawer alignment',text,re.I):
                replacement = 'Microwave Service Eligibility' if node.tag.startswith('h') else copy_text(SCOPE)
                if not any(child.tag in {'p','li','h2','h3','ul'} for child in node.children):
                    add(node.inner,node.end,html.escape(replacement))
                    content_changed = True

        if node.tag == 'script' and node.attrs.get('type') == 'application/ld+json':
            raw = source[node.inner:node.end]
            data = json.loads(raw)
            def visit(value, key=''):
                if isinstance(value, list): return [visit(v,key) for v in value]
                if isinstance(value, dict):
                    result = {k:visit(v,k) for k,v in value.items()}
                    if dedicated and result.get('@type') in {'Service','BlogPosting','Article'}:
                        if description: result['description'] = description
                        if title and 'headline' in result: result['headline'] = title
                        if result.get('@type') in {'BlogPosting','Article'}: result['dateModified'] = DATE
                    return result
                if isinstance(value,str) and key in {'image','contentUrl','thumbnailUrl'} and microwave_photo(value):
                    return 'https://alex-repair.com/'+TOOLS_IMAGE
                if isinstance(value,str) and key not in {'url','@id','item','image','logo','contentUrl','thumbnailUrl','mainEntityOfPage'} and not value.startswith(('http:', 'https:', '/')):
                    if 'sharp-appliance' in filename and re.search('countertop microwave|microwave drawer|drawer microwave',value,re.I): return copy_text(SCOPE)
                    return copy_text(value)
                return value
            updated = visit(data)
            if data != updated:
                add(node.inner,node.end,'\n'+json.dumps(updated,ensure_ascii=False,indent=2)+'\n')

        # Change only descriptive attributes; leave link targets, IDs and asset URLs intact.
        starttag = source[node.start:node.inner]
        for match in re.finditer(r'\b(alt|title|aria-label|content)\s*=\s*([\"\'])(.*?)\2',starttag,re.S):
            attr, quote, raw = match.groups()
            if attr == 'content' and node.attrs.get('name',node.attrs.get('property','')) not in {'description','og:title','og:description','twitter:title','twitter:description'}:
                continue
            value = html.unescape(raw)
            new = copy_text(value)
            if title and attr == 'content' and node.attrs.get('name',node.attrs.get('property','')) in {'og:title','twitter:title'}: new=title
            if description and attr == 'content' and node.attrs.get('name',node.attrs.get('property','')) in {'description','og:description','twitter:description'}: new=description
            if new != value: add(node.start+match.start(3),node.start+match.end(3),html.escape(new,quote=True))

    for start,end,parent in doc.texts:
        if parent and parent.tag in {'script','style'}: continue
        raw = source[start:end]
        new = copy_text(raw)
        if raw != new:
            add(start,end,new)
            if inside(parent,'main') and not inside(parent,'nav'): content_changed=True

    # Outer editorial replacements take precedence over nested text edits.
    selected=[]
    for edit in sorted(edits,key=lambda e:(e[0],-e[1])):
        if selected and edit[0] < selected[-1][1]: continue
        selected.append(edit)
    for start,end,value in reversed(selected): source=source[:start]+value+source[end:]
    return source, content_changed


def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--check',action='store_true')
    args=parser.parse_args()
    files=subprocess.check_output(['git','ls-files','*.html'],cwd=ROOT,text=True).splitlines()
    changed=[]
    dates_path=ROOT/'scripts/content-dates.json'
    dates=json.loads(dates_path.read_text(encoding='utf-8'))
    baseline={}
    for name in files:
        path=ROOT/name
        with path.open(encoding='utf-8',newline='') as f: original=f.read()
        if 'microwave' not in original.lower(): continue
        doc=Document(original)
        baseline[name]={
          'canonical':[n.attrs.get('href') for n in doc.nodes if n.tag=='link' and n.attrs.get('rel')=='canonical'],
          'robots':[n.attrs.get('content') for n in doc.nodes if n.tag=='meta' and n.attrs.get('name')=='robots'],
          'scripts':[n.attrs.get('src') for n in doc.nodes if n.tag=='script' and 'src' in n.attrs],
          'links':[n.attrs.get('href') for n in doc.nodes if n.tag=='a'],
        }
        updated,body_changed=update_page(name,original)
        if updated!=original:
            changed.append(name)
            if not args.check:
                with path.open('w',encoding='utf-8',newline='') as f: f.write(updated)
            if body_changed: dates[name]=DATE
    if not args.check:
        snapshot=ROOT/'previews/microwave-scope-baseline.json'
        snapshot.parent.mkdir(exist_ok=True)
        if not snapshot.exists(): snapshot.write_text(json.dumps(baseline,indent=2),encoding='utf-8')
        dates_path.write_text(json.dumps(dates,indent=2)+'\n',encoding='utf-8')
    print(json.dumps({'changed':len(changed),'files':changed},indent=2))
    if args.check and changed: raise SystemExit(1)


if __name__=='__main__': main()
