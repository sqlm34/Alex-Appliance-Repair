"""Prepare original repair photos and a model-only label crop."""
from pathlib import Path
import sys
from PIL import Image, ImageOps

source = Path(sys.argv[1])
destination = Path(__file__).resolve().parents[1] / 'images/repair-cases/lg-dryer-noblesville'
destination.mkdir(parents=True, exist_ok=True)
photos = [
    ('09.31.44 (1).jpeg', 'lg-dryer-service-visit'),
    ('09.31.46 (1).jpeg', 'drum-removed'),
    ('09.31.45.jpeg', 'rear-rollers-and-cabinet'),
    ('09.31.45 (1).jpeg', 'rear-support-roller-one'),
    ('09.31.45 (2).jpeg', 'rear-support-roller-two'),
    ('09.31.46.jpeg', 'idler-pulley-and-motor'),
    ('09.31.50.jpeg', 'dryer-reassembled-test'),
    ('LGC-4561EL3002A_8.webp', 'idler-pulley-reference'),
    ('LGE-4581EL2002L_0.jpg', 'roller-parts-reference'),
    ('LGE-DLEX4200B--ABLEEUS_2.jpg', 'drum-support-parts-diagram'),
]
for filename, name in photos:
    if filename.endswith('.jpeg'):
        filename = 'WhatsApp Image 2026-10-04 at ' + filename
    with Image.open(source / filename) as opened:
        photo = ImageOps.exif_transpose(opened).convert('RGB')
        photo.thumbnail((1400, 1600), Image.Resampling.LANCZOS)
        photo.save(destination / (name + '.webp'), 'WEBP', quality=84, method=6)
        print(name, photo.size)

with Image.open(source / 'WhatsApp Image 2026-10-04 at 09.31.44.jpeg') as opened:
    label = ImageOps.exif_transpose(opened).convert('RGB')
    # Coordinates scale with the original image; retain only the actual model line.
    w, h = label.size
    label = label.crop((int(w*0.245), int(h*0.422), int(w*0.415), int(h*0.447)))
    label.save(destination / 'dlex4200b-model-label.webp', 'WEBP', lossless=True, method=6)
    print('dlex4200b-model-label', label.size)
