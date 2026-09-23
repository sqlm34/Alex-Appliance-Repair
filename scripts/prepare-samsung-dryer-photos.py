"""Optimize selected original Samsung service photos without changing their content."""
from pathlib import Path
import sys
from PIL import Image, ImageOps

source = Path(sys.argv[1])
destination = Path(__file__).resolve().parents[1] / 'images/repair-cases/samsung-dv330aew-mccordsville'
destination.mkdir(parents=True, exist_ok=True)
photos = [
    ('14.13.04.jpeg', 'samsung-dv330aew-dryer'),
    ('14.13.04 (3).jpeg', 'dryer-drum-removed'),
    ('14.13.05 (1).jpeg', 'seized-idler-pulley'),
    ('14.13.13.jpeg', 'old-and-new-idler-assemblies'),
    ('14.13.13 (2).jpeg', 'replacement-idler-installed'),
    ('14.13.14 (1).jpeg', 'new-drive-belt-on-drum'),
    ('14.13.05 (4).jpeg', 'blower-cover-before-cleaning'),
    ('14.13.12.jpeg', 'blower-cover-after-cleaning'),
    ('50037778-00005.jpg', 'idler-pulley-layout-diagram'),
]
for filename, name in photos:
    filename = filename if filename.endswith('.jpg') else 'WhatsApp Image 2026-09-23 at ' + filename
    with Image.open(source / filename) as opened:
        photo = ImageOps.exif_transpose(opened).convert('RGB')
        photo.thumbnail((1400, 1600), Image.Resampling.LANCZOS)
        photo.save(destination / (name + '.webp'), 'WEBP', quality=84, method=6)
        print(name, photo.size)
