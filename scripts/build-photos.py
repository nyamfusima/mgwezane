"""Crop, resize and optimise the destination photography, and write the credit manifest.

    python scripts/build-photos.py <source-dir> <meta.json> <project-root>

`source-dir` holds the full-resolution downloads named `<tag>.jpg`; `meta.json` holds
the photographer, licence and source page for each tag. Both are produced by the
sourcing scripts kept with the build notes, not in this repo.
"""
import json, os, sys
from PIL import Image

SRC, META, ROOT = sys.argv[1], sys.argv[2], sys.argv[3]
OUT = os.path.join(ROOT, "public", "assets", "destinations")
JOURNEY = os.path.join(ROOT, "public", "assets", "journeys")
os.makedirs(OUT, exist_ok=True)
os.makedirs(JOURNEY, exist_ok=True)
meta = json.load(open(META, encoding="utf-8"))

# source tag -> (published slug, horizontal focus, vertical focus)
JOBS = [
    # Limpopo
    ("limpopo-bushveld_2",      "limpopo-mountains",      .5, .5),
    ("wildlife_7",              "kruger-national-park",   .5, .5),
    ("magoebaskloof_0",         "magoebaskloof",          .5, .5),
    ("mapungubwe_4",            "mapungubwe",             .5, .5),
    # Mpumalanga
    ("pexels_36168137",          "blyde-river-canyon",     .5, .5),
    ("three-rondavels_3",       "three-rondavels",        .5, .5),
    ("mpumalanga-waterfall_4",  "lisbon-falls",           .5, .5),
    ("mpumalanga-escarpment_0", "bourkes-luck-potholes",  .5, .5),
    ("graskop-gorge_1",         "graskop-gorge",          .5, .5),
    ("pexels_5078889",          "gods-window",            .5, .5),
    # Gauteng
    ("gauteng-city_3",          "johannesburg",           .5, .5),
    ("union-buildings_2",       "union-buildings",        .5, .5),
    ("hartbeespoort_4",         "hartbeespoort-dam",      .5, .55),
    # North West
    ("wildlife-2_1",            "pilanesberg",            .5, .5),
    ("sun-city_7",              "sun-city",               .5, .5),
    # Free State
    ("free-state_4",            "golden-gate-highlands",  .5, .5),
    ("clarens_1",               "clarens",                .5, .5),
    # KwaZulu-Natal
    ("drakensberg_2",           "drakensberg",            .5, .5),
    ("durban_0",                "durban-beachfront",      .5, .5),
    ("howick-falls_0",          "howick-falls",           .5, .45),
    # Eastern Cape
    ("garden-route_2",          "tsitsikamma",            .5, .5),
    ("hole-in-the-wall_0",      "hole-in-the-wall",       .5, .5),
    ("addo_0",                  "addo-elephant-park",     .5, .5),
    # Western Cape
    ("cape-town_0",             "cape-town",              .5, .5),
    ("camps-bay_6",             "camps-bay",              .5, .5),
    ("cape-point_6",            "cape-point",             .5, .5),
    ("cape-coast_0",            "boulders-beach",         .5, .5),
    ("knysna_0",                "knysna-heads",           .5, .5),
    ("stellenbosch_0",          "paarl-winelands",        .5, .5),
    # Northern Cape
    ("northern-cape_1",         "namaqualand",            .5, .5),
    ("augrabies_7",             "augrabies-falls",        .5, .5),
    ("kgalagadi_5",             "kgalagadi",              .5, .5),
]

WIDTHS = [(1100, 74), (600, 72)]
ASPECT = 4 / 3


def crop_resize(im, aspect, fx, fy, width, quality, path):
    w, h = im.size
    # Crop the sides of a source wider than the target, otherwise the top and
    # bottom. The box must stay inside the image or PIL pads it with black.
    tw, th = (round(h * aspect), h) if w / h > aspect else (w, round(w / aspect))
    left = max(0, min(w - tw, round((w - tw) * fx)))
    top = max(0, min(h - th, round((h - th) * fy)))
    out = im.crop((left, top, left + tw, top + th))
    out = out.resize((width, round(width / aspect)), Image.LANCZOS).convert("RGB")
    out.save(path, "JPEG", quality=quality, optimize=True, progressive=True)
    return out.size, os.path.getsize(path)


manifest = []
total = 0
for tag, slug, fx, fy in JOBS:
    im = Image.open(os.path.join(SRC, f"{tag}.jpg"))
    sizes = []
    for width, q in WIDTHS:
        name = f"{slug}.jpg" if width == WIDTHS[0][0] else f"{slug}-600.jpg"
        size, nbytes = crop_resize(im, ASPECT, fx, fy, width, q, os.path.join(OUT, name))
        sizes.append(f"{size[0]}x{size[1]} {nbytes // 1024}KB")
        total += nbytes
    m = meta[tag]
    manifest.append({"file": f"assets/destinations/{slug}.jpg",
                     "subject": m["desc"] or m["title"][5:], "photographer": m["artist"],
                     "license": m["license"], "source": m["page"], "sourceFile": m["title"]})
    print(f"  {slug:<26} {' | '.join(sizes)}")

# Hero and the two full-width photographic bands.
BANDS = [
    # The hero vehicle, framed so the car sits centred in its own panel and is
    # never covered by type: 4:3 for the desktop panel, 4:5 above the copy on a
    # phone. The horizontal focus keeps the Sorento centred in both crops.
    ("pexels_23655821", 4 / 3, .05, .56, (1400, 78, "hero-vehicle.jpg"),
     (900, 74, "hero-vehicle-900.jpg")),
    ("pexels_23655821", 4 / 5, .40, .54, (900, 78, "hero-vehicle-portrait.jpg"),
     (600, 74, "hero-vehicle-portrait-600.jpg")),
    ("scenic-road_0", 16 / 9, .5, .62, (1500, 74, "mountain-road.jpg"),
     (760, 72, "mountain-road-800.jpg")),
    ("kgalagadi_7", 21 / 9, .5, .5, (1600, 72, "kalahari-dusk.jpg"),
     (820, 70, "kalahari-dusk-820.jpg")),
]
for tag, aspect, fx, fy, big, small in BANDS:
    path = os.path.join(SRC, f"{tag}.jpg")
    if not os.path.exists(path):
        print(f"  (skipped {tag}: not downloaded)")
        continue
    im = Image.open(path)
    for width, q, name in (big, small):
        size, nbytes = crop_resize(im, aspect, fx, fy, width, q, os.path.join(JOURNEY, name))
        print(f"  {name:<26} {size[0]}x{size[1]} {nbytes // 1024}KB")
        total += nbytes
    m = meta[tag]
    manifest.append({"file": f"assets/journeys/{big[2]}", "subject": m["desc"] or m["title"][5:],
                     "photographer": m["artist"], "license": m["license"],
                     "source": m["page"], "sourceFile": m["title"]})

dest = os.path.join(ROOT, "public", "assets", "photo-credits.json")
json.dump({
    "note": ("Destination and landscape photography on this website is licensed stock imagery "
             "sourced from Wikimedia Commons under the licences listed below. It was not taken "
             "by Mgwezane Shuttle Services and does not show trips the business has operated. "
             "Brand, poster and vehicle imagery under assets/brand and assets/vehicles was "
             "supplied by the client."),
    "images": manifest,
}, open(dest, "w", encoding="utf-8"), indent=2)
print(f"\n  photo-credits.json           {len(manifest)} entries")
print(f"  total photography            {total // 1024} KB")
