"""Create optimized web copies without changing the repair photographs."""
from pathlib import Path
import sys
from PIL import Image, ImageOps

source = Path(sys.argv[1])
destination = Path(__file__).resolve().parents[1] / 'images/repair-cases/kenmore-drawer-fishers'
destination.mkdir(parents=True, exist_ok=True)
photos = [
    ('10.45.57 (1).jpeg', 'kenmore-washer-open'),
    ('10.45.57.jpeg', 'water-inlet-valves'),
    ('10.45.56 (1).jpeg', 'original-dispenser-connections'),
    ('10.45.57 (3).jpeg', 'dc97-07125z-replacement-assembly'),
    ('10.45.57 (4).jpeg', 'new-drawer-housing-positioned'),
    ('10.45.58 (1).jpeg', 'housing-hose-and-clamp'),
    ('10.46.04.jpeg', 'assembly-and-hose-routing'),
    ('Untitled-1.jpg', 'drawer-assembly-reference'),
]
for filename, name in photos:
    filename = filename if filename.endswith('.jpg') else 'WhatsApp Image 2026-09-27 at ' + filename
    with Image.open(source / filename) as opened:
        photo = ImageOps.exif_transpose(opened).convert('RGB')
        photo.thumbnail((1400, 1600), Image.Resampling.LANCZOS)
        photo.save(destination / (name + '.webp'), 'WEBP', quality=84, method=6)
        print(name, photo.size)
