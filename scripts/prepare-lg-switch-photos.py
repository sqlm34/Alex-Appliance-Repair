"""Optimize selected LG range service photos and supplied reference artwork."""
from pathlib import Path
import sys
from PIL import Image, ImageOps

source = Path(sys.argv[1])
destination = Path(__file__).resolve().parents[1] / 'images/repair-cases/lg-switch-mccordsville'
destination.mkdir(parents=True, exist_ok=True)
photos = [
    ('06.26.37 (1).jpeg', 'lg-lde4413st-range'),
    ('06.26.38 (4).jpeg', 'front-control-panel-open'),
    ('06.26.38 (5).jpeg', 'surface-element-switches'),
    ('06.26.38 (1).jpeg', 'removed-switch'),
    ('06.26.39 (1).jpeg', 'replacement-switch-in-package'),
    ('06.26.44 (1).jpeg', 'radiant-element-heating'),
    ('LGE-LDE4413ST--AS2LLGA_7.jpg', 'switch-location-diagram'),
]
for filename, name in photos:
    if filename.endswith('.jpeg'):
        filename = 'WhatsApp Image 2026-10-01 at ' + filename
    with Image.open(source / filename) as opened:
        photo = ImageOps.exif_transpose(opened).convert('RGB')
        photo.thumbnail((1400, 1600), Image.Resampling.LANCZOS)
        photo.save(destination / (name + '.webp'), 'WEBP', quality=84, method=6)
        print(name, photo.size)
