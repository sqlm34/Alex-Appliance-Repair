"""Prepare original service photographs; preserve the supplied files unchanged."""
import sys
from pathlib import Path
from PIL import Image, ImageOps

source = Path(sys.argv[1])
destination = Path(__file__).resolve().parent.parent / "images/repair-cases/lg-wm9000hva-noblesville"
destination.mkdir(parents=True, exist_ok=True)
photos = {
    "washer-reassembled": "08.28.35 (2)",
    "washer-before-repair": "08.28.21",
    "front-panel-removed": "08.28.22 (2)",
    "original-pump-connection": "08.28.22 (3)",
    "removed-pump-assembly": "08.28.23 (1)",
    "removed-drain-pump": "08.28.33 (2)",
    "drain-pump-replacement": "08.28.33 (4)",
    "replacement-pump-in-cabinet": "08.28.33 (5)",
    "pump-hoses-reconnected": "08.28.34 (1)",
    "filter-cap-reinstalled": "08.28.35",
    "control-panel-testing": "08.28.36",
}
for name, timestamp in photos.items():
    with Image.open(source / f"WhatsApp Image 2026-10-13 at {timestamp}.jpeg") as original:
        photo = ImageOps.exif_transpose(original).convert("RGB")
        photo.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
        photo.save(destination / f"{name}.webp", quality=84, method=6)
        print(name, photo.size)

with Image.open(source / "LGE-WM4270HVA_1.jpg") as original:
    diagram = ImageOps.exif_transpose(original).convert("RGB")
    diagram.save(destination / "drain-pump-diagram.webp", lossless=True, method=6)
    print("drain-pump-diagram", diagram.size)

with Image.open(source / "WhatsApp Image 2026-10-13 at 08.28.21 (1).jpeg") as original:
    label = ImageOps.exif_transpose(original).convert("RGB").crop((173, 682, 453, 726))
    label.save(destination / "wm9000hva-model-label.webp", lossless=True)
    print("wm9000hva-model-label", label.size)
