"""Optimize the supplied Cafe service photographs without altering repair details."""
from pathlib import Path
import sys
from PIL import Image, ImageOps

source = Path(sys.argv[1])
destination = Path(__file__).resolve().parents[1] / "images/repair-cases/cafe-freezer-drain-carmel"
destination.mkdir(parents=True, exist_ok=True)
photos = [
    ("20.22.30.jpeg", "cafe-cve28dp2njs1-freezer-ice-before", (230, 140, 950, 1360)),
    ("20.22.29.jpeg", "cafe-cve28dp2njs1-model", (280, 410, 580, 456)),
    ("20.22.30 (1).jpeg", "ice-sheet-on-freezer-floor", None),
    ("20.22.30 (2).jpeg", "frost-on-freezer-rear-cover", None),
    ("20.22.29 (4).jpeg", "removed-freezer-panel-and-ice", (70, 520, 1090, 1530)),
    ("20.22.29 (2).jpeg", "rear-refrigerator-service-access", None),
    ("20.22.29 (1).jpeg", "cafe-freezer-during-defrost-service", (180, 140, 910, 1560)),
]
for suffix, name, crop in photos:
    original = source / ("WhatsApp Image 2026-09-09 at " + suffix)
    with Image.open(original) as opened:
        photo = ImageOps.exif_transpose(opened).convert("RGB")
        if crop:
            photo = photo.crop(crop)
        photo.thumbnail((1400, 1400), Image.Resampling.LANCZOS)
        target = destination / (name + ".webp")
        photo.save(target, "WEBP", quality=80, method=6)
        print(f"{target.name}: {photo.width}x{photo.height}, {target.stat().st_size} bytes")
