"""Project the South African provinces into SVG paths and emit a TypeScript data file.

    python scripts/build-map-data.py scripts/sa-provinces.geojson src/data/mapGeometry.ts

Source geometry: Natural Earth 1:50m admin-1 (public domain), filtered to the nine
South African provinces. Projection: spherical Mercator, scaled to fit the viewBox.
Re-run this only if the geometry or the city list below changes.
"""
import json, math, sys

SRC = sys.argv[1]
OUT = sys.argv[2]

W, PAD = 1000.0, 26.0

ABBR = {
    'Limpopo': 'LP', 'Mpumalanga': 'MP', 'Gauteng': 'GP', 'North West': 'NW',
    'Free State': 'FS', 'KwaZulu-Natal': 'KZN', 'Eastern Cape': 'EC',
    'Western Cape': 'WC', 'Northern Cape': 'NC',
}
ORDER = ['Northern Cape', 'Western Cape', 'Eastern Cape', 'Free State', 'North West',
         'KwaZulu-Natal', 'Mpumalanga', 'Limpopo', 'Gauteng']

# Nudges in degrees where a polygon centroid lands badly.
LABEL_NUDGE = {
    'Western Cape': (-0.3, 0.6), 'Northern Cape': (0.0, 0.3),
    'Gauteng': (-0.5, -0.78), 'KwaZulu-Natal': (-0.25, 0.1),
    'Eastern Cape': (0.1, 0.4), 'Mpumalanga': (0.42, -0.18),
    'Limpopo': (-0.95, 0.35),
}

# id, label, lat, lon, kind, label anchor, label dx, label dy
CITIES = [
    ('polokwane',    'Polokwane',    -23.9045, 29.4689, 'hub',    'middle',  0, -15),
    ('mokopane',     'Mokopane',     -24.1944, 29.0097, 'hub',    'end',   -11,  7),
    ('pretoria',     'Pretoria',     -25.7479, 28.2293, 'hub',    'start',  11,  -6),
    ('johannesburg', 'Johannesburg', -26.2041, 28.0473, 'hub',    'start',  11,  13),
    ('tzaneen',      'Tzaneen',      -23.8333, 30.1667, 'listed', 'start',  11,   5),
    ('rustenburg',   'Rustenburg',   -25.6672, 27.2424, 'listed', 'end',   -10,   1),
    ('bloemfontein', 'Bloemfontein', -29.0852, 26.1596, 'listed', 'end',   -10,   4),
    ('durban',       'Durban',       -29.8587, 31.0218, 'listed', 'start',  10,   4),
    ('mbombela',     'Mbombela',     -25.4753, 30.9694, 'onward', 'start',  10,   4),
    ('cape-town',    'Cape Town',    -33.9249, 18.4241, 'onward', 'start',  10,  14),
    ('gqeberha',     'Gqeberha',     -33.9608, 25.6022, 'onward', 'middle',  0,  20),
]

# The N1 corridor the business runs, north to south.
CORRIDOR = [(-23.9045, 29.4689), (-24.1944, 29.0097), (-24.8853, 28.2894),
            (-25.7479, 28.2293), (-26.2041, 28.0473)]

# from_id, to_id, bow, kind. "listed" routes appear in the published fare list;
# "onward" routes are travel on request, with no published fare.
ARCS = [
    ('tzaneen', 'pretoria', 0.10, 'listed'),
    ('polokwane', 'rustenburg', 0.16, 'listed'),
    ('polokwane', 'bloemfontein', 0.10, 'listed'),
    ('polokwane', 'durban', -0.12, 'listed'),
    ('johannesburg', 'mbombela', 0.13, 'onward'),
    ('johannesburg', 'cape-town', -0.10, 'onward'),
    ('johannesburg', 'gqeberha', 0.11, 'onward'),
]


def merc(lon, lat):
    lat = max(min(lat, 84.0), -84.0)
    return math.radians(lon), math.log(math.tan(math.pi / 4 + math.radians(lat) / 2))


def area(ring):
    s = 0.0
    for i in range(len(ring) - 1):
        s += ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1]
    return abs(s) / 2


def kept_rings(feature):
    """Outer rings big enough to be mainland, plus any holes (Lesotho).

    South Africa's Western Cape feature also carries the Prince Edward Islands,
    2 000 km into the Southern Ocean. Including them would stretch the
    projection over empty sea, so anything that small is dropped.
    """
    g = feature['geometry']
    polys = [g['coordinates']] if g['type'] == 'Polygon' else g['coordinates']
    rings = []
    for poly in polys:
        if area(poly[0]) < 0.05:
            continue
        rings.extend(poly)
    return rings


data = json.load(open(SRC, encoding='utf-8'))
feats = {f['properties']['name']: f for f in data['features']}

xs, ys = [], []
for f in feats.values():
    for ring in kept_rings(f):
        for lon, lat in ring:
            x, y = merc(lon, lat)
            xs.append(x); ys.append(y)

x0, x1, y0, y1 = min(xs), max(xs), min(ys), max(ys)
scale = (W - 2 * PAD) / (x1 - x0)
H = (y1 - y0) * scale + 2 * PAD


def project(lon, lat):
    x, y = merc(lon, lat)
    return ((x - x0) * scale + PAD, (y1 - y) * scale + PAD)


def ring_path(ring):
    pts = [project(lon, lat) for lon, lat in ring]
    out = [pts[0]]
    for p in pts[1:]:
        if abs(p[0] - out[-1][0]) + abs(p[1] - out[-1][1]) > 0.45:
            out.append(p)
    if len(out) < 4:
        out = pts
    return 'M' + 'L'.join(f'{x:.1f} {y:.1f}' for x, y in out) + 'Z'


provinces = []
for name in ORDER:
    rings = kept_rings(feats[name])
    d = ''.join(ring_path(r) for r in rings)
    big = max(rings, key=area)
    cx = sum(p[0] for p in big) / len(big)
    cy = sum(p[1] for p in big) / len(big)
    dx, dy = LABEL_NUDGE.get(name, (0, 0))
    lx, ly = project(cx + dx, cy + dy)
    provinces.append({'id': name.lower().replace(' ', '-'), 'name': name, 'abbr': ABBR[name],
                      'd': d, 'labelX': round(lx, 1), 'labelY': round(ly, 1)})
    print(f'  {name:<16} {len(d):>6} chars  label {lx:6.1f},{ly:6.1f}')

cities, pos = [], {}
for cid, label, lat, lon, kind, anchor, ldx, ldy in CITIES:
    x, y = project(lon, lat)
    pos[cid] = (x, y)
    cities.append({'id': cid, 'name': label, 'x': round(x, 1), 'y': round(y, 1),
                   'kind': kind, 'anchor': anchor, 'dx': ldx, 'dy': ldy})


def smooth(points, tension=8.0):
    """Catmull-Rom through the points, emitted as cubic beziers."""
    p = points
    d = f'M{p[0][0]:.1f} {p[0][1]:.1f}'
    for i in range(len(p) - 1):
        p0 = p[i - 1] if i > 0 else p[i]
        p1, p2 = p[i], p[i + 1]
        p3 = p[i + 2] if i + 2 < len(p) else p2
        c1 = (p1[0] + (p2[0] - p0[0]) / tension, p1[1] + (p2[1] - p0[1]) / tension)
        c2 = (p2[0] - (p3[0] - p1[0]) / tension, p2[1] - (p3[1] - p1[1]) / tension)
        d += f'C{c1[0]:.1f} {c1[1]:.1f},{c2[0]:.1f} {c2[1]:.1f},{p2[0]:.1f} {p2[1]:.1f}'
    return d


corridor = smooth([project(lon, lat) for lat, lon in CORRIDOR])

arcs = []
for from_id, to_id, bow, kind in ARCS:
    ax, ay = pos[from_id]
    bx, by = pos[to_id]
    mx, my = (ax + bx) / 2, (ay + by) / 2
    nx, ny = -(by - ay), (bx - ax)
    arcs.append({'id': f'{from_id}-{to_id}', 'from': from_id, 'to': to_id, 'kind': kind,
                 'd': f'M{ax:.1f} {ay:.1f}Q{mx + nx * bow:.1f} {my + ny * bow:.1f},{bx:.1f} {by:.1f}'})

ts = f'''/**
 * Map geometry for the South Africa section.
 *
 * Province outlines are projected from Natural Earth 1:50m admin-1 boundaries
 * (public domain) with a spherical Mercator projection, generated by
 * `scripts/build-map-data.py`. City markers are real coordinates run through the
 * same projection, so each town sits where it actually is.
 *
 * The corridor is the N1 route between Polokwane and Johannesburg. The arcs are
 * drawn, not surveyed: they show which destinations are reachable, not the roads
 * taken to them. Nothing here tracks a vehicle.
 */

export type Province = {{
  id: string
  name: string
  abbr: string
  d: string
  labelX: number
  labelY: number
}}

export type MapCity = {{
  id: string
  name: string
  x: number
  y: number
  /** hub: a stop on the corridor. listed: a published fare. onward: on request. */
  kind: 'hub' | 'listed' | 'onward'
  anchor: 'start' | 'middle' | 'end'
  dx: number
  dy: number
}}

export type MapArc = {{
  id: string
  from: string
  to: string
  kind: 'listed' | 'onward'
  d: string
}}

export const mapViewBox = {{ width: {W:.0f}, height: {H:.0f} }}

export const provinces: Province[] = {json.dumps(provinces, indent=2)}

export const mapCities: MapCity[] = {json.dumps(cities, indent=2)}

/** The Polokwane to Johannesburg corridor, north to south. */
export const corridorPath = {json.dumps(corridor)}

export const mapArcs: MapArc[] = {json.dumps(arcs, indent=2)}
'''

open(OUT, 'w', encoding='utf-8').write(ts)
print(f'\nviewBox 0 0 {W:.0f} {H:.0f}')
print(f'wrote {OUT}  ({len(ts) // 1024} KB)')
