"""Prepare original service images, retaining their content and proportions."""
import sys
from pathlib import Path
from PIL import Image, ImageOps

source = Path(sys.argv[1])
target = Path(__file__).resolve().parents[1] / 'images/repair-cases/lg-ice-light-mccordsville'
target.mkdir(parents=True, exist_ok=True)
files = [
    ('refrigerator', '09.55.26'),
    ('model-label', '09.55.29'),
    ('ice-behind-connector', '09.55.27 (4)'),
    ('ice-behind-assembly', '09.55.27 (9)'),
    ('rear-valve-access', '09.55.26 (3)'),
    ('old-and-new-valves', '09.55.26 (6)'),
    ('empty-ice-compartment', '09.55.27 (5)'),
    ('ice-maker-replacement', '09.55.28'),
    ('installed-ice-maker', '09.55.28 (1)'),
    ('unlit-door-light', '09.55.28 (3)'),
    ('removed-led', '09.55.28 (6)'),
    ('replacement-led', '09.55.28 (8)'),
    ('right-hinge-wiring-repair', '09.55.29 (1)'),
]
files = [(name, 'WhatsApp Image 2026-10-18 at ' + stamp + '.jpeg') for name, stamp in files]
files += [('valve-diagram', 'LGE-LFXC24726S--ASTCNA2_7.jpg'),
          ('ice-maker-diagram', 'LGE-LFXC24726S--ASTCNA2_8.jpg'),
          ('light-diagram', 'LGE-LFXC24726S--ASTCNA2_3.jpg')]
for name, filename in files:
    with Image.open(source / filename) as original:
        photo = ImageOps.exif_transpose(original).convert('RGB')
        if name == 'model-label':
            photo = photo.crop((550, 560, 1025, 740))
        photo.thumbnail((1600, 1800))
        photo.save(target / (name + '.webp'), 'WEBP', quality=90, method=6)
        print(name, *photo.size)
