"""Optimize supplied service photographs for the GE control-board story."""
import sys
from pathlib import Path
from PIL import Image, ImageOps

source = Path(sys.argv[1])
target = Path(__file__).resolve().parents[1] / 'images/repair-cases/ge-control-board-carmel'
target.mkdir(parents=True, exist_ok=True)
photos = [
    ('washer', '14.00.55'),
    ('washer-open', '14.01.14'),
    ('control-housing', '14.01.16'),
    ('original-board-connections', '14.01.21'),
    ('old-and-new-boards', '14.01.25'),
    ('replacement-board', '14.01.26'),
    ('installed-board', '14.01.27'),
    ('dryer-restacked', '14.01.30'),
    ('gas-connection-check', '14.01.28'),
    ('vent-reconnected', '14.01.33'),
    ('completed-installation', '14.01.36'),
]
files = [(name, 'WhatsApp Image 2026-10-22 at ' + stamp + '.jpeg') for name, stamp in photos]
files += [('model-label', 'WhatsApp Image 2026-10-23 at 07.05.46.jpeg'),
          ('control-board-diagram', 'GEN-GFW550SSN3WW_3.jpg')]
for name, filename in files:
    with Image.open(source / filename) as original:
        photo = ImageOps.exif_transpose(original).convert('RGB')
        if name == 'model-label':
            photo = photo.crop((70, 760, 835, 1020))
        photo.thumbnail((1600, 1800))
        photo.save(target / (name + '.webp'), 'WEBP', quality=90, method=6)
        print(name, *photo.size)
