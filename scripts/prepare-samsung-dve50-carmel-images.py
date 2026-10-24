"""Optimize supplied repair evidence and crop only the model area of the label."""
import sys
from pathlib import Path
from PIL import Image, ImageOps

source = Path(sys.argv[1])
target = Path(__file__).resolve().parents[1] / 'images/repair-cases/samsung-dve50-carmel'
target.mkdir(parents=True, exist_ok=True)
files = [
    ('dryer', 'WhatsApp Image 2026-10-22 at 14.02.40.jpeg'),
    ('model-label', '\u0421\u043d\u0438\u043c\u043e\u043a \u044d\u043a\u0440\u0430\u043d\u0430 2026-10-24 071901.png'),
    ('cabinet-before', 'WhatsApp Image 2026-10-22 at 14.02.41 (1).jpeg'),
    ('broken-element', 'WhatsApp Image 2026-10-22 at 14.02.41 (4).jpeg'),
    ('removed-element', 'WhatsApp Image 2026-10-22 at 14.02.57.jpeg'),
    ('rear-rollers', 'WhatsApp Image 2026-10-22 at 14.02.57 (3).jpeg'),
    ('original-idler', 'WhatsApp Image 2026-10-22 at 14.02.41 (2).jpeg'),
    ('cabinet-after', 'WhatsApp Image 2026-10-22 at 14.02.58 (3).jpeg'),
    ('duct-before', 'WhatsApp Image 2026-10-22 at 14.02.56.jpeg'),
    ('duct-after', 'WhatsApp Image 2026-10-22 at 14.02.58.jpeg'),
    ('felt-before', 'WhatsApp Image 2026-10-22 at 14.02.41 (5).jpeg'),
    ('felt-after', 'WhatsApp Image 2026-10-22 at 14.02.58 (1).jpeg'),
    ('blower-after', 'WhatsApp Image 2026-10-22 at 14.02.58 (2).jpeg'),
    ('controls', 'WhatsApp Image 2026-10-22 at 14.02.40 (1).jpeg'),
    ('roller-diagram', 'SMG-DVE50R5200W--A3-00_1.jpg'),
    ('heater-diagram', 'SMG-DVE50R5200W--A3-00_2.jpg'),
    ('idler-diagram', 'SMG-DVE50R5200W--A3-00_5.jpg'),
]
for name, filename in files:
    with Image.open(source / filename) as original:
        photo = ImageOps.exif_transpose(original).convert('RGB')
        if name == 'model-label':
            photo = photo.crop((30, 40, 395, 136))
        photo.thumbnail((1600, 1800))
        photo.save(target / (name + '.webp'), 'WEBP', quality=90, method=6)
        print(name, *photo.size)
