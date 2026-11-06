import sys
import numpy as np, cv2
from PIL import Image

SRC, MARK, OUT, DBG = sys.argv[1:5]
img = np.asarray(Image.open(SRC).convert('RGB')).astype(np.float32)
H, W, _ = img.shape
R, G, B = img[..., 0], img[..., 1], img[..., 2]
lum = 0.299 * R + 0.587 * G + 0.114 * B

# Region that contains the old monogram (plus margin)
x0, y0, x1, y1 = 590, 238, 950, 556

# --- wall vs person: wall is cool blue-grey, people are warm / very dark / very bright
wall = ((B - R) >= -1) & ((B - G) >= -1) & (lum > 33) & (lum < 125)
wall = wall.astype(np.uint8)
# old frame's bottom lines are darker than the wall but still neutral grey; suit is near-black
strip = np.zeros_like(wall); strip[512:556, 590:950] = 1
wall |= (strip.astype(bool) & (lum > 17) & (np.abs(R - B) <= 6) & (np.abs(R - G) <= 6)).astype(np.uint8)
wall = cv2.morphologyEx(wall, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
wall = cv2.morphologyEx(wall, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
# keep only the big connected wall component
n, lab, stats, _ = cv2.connectedComponentsWithStats(wall, 8)
big = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
wall = (lab == big).astype(np.uint8)
# fill tiny holes inside the wall (logo dark lines / noise), not people
inv = 1 - wall
n2, lab2, st2, _ = cv2.connectedComponentsWithStats(inv, 8)
for i in range(1, n2):
    if st2[i, cv2.CC_STAT_AREA] < 400:
        wall[lab2 == i] = 1
person = 1 - wall
# shrink wall slightly so we never paint over hair/skin edges
person_d = cv2.dilate(person, np.ones((3, 3), np.uint8))

region = np.zeros((H, W), np.uint8); region[y0:y1, x0:x1] = 1
fill = (region & (1 - person_d)).astype(np.float32)

# --- smooth background estimate from wall pixels OUTSIDE the logo region
known = (wall & (1 - cv2.dilate(region, np.ones((15, 15), np.uint8)))).astype(np.float32)
sig = 60
num = cv2.GaussianBlur(img * known[..., None], (0, 0), sig)
den = cv2.GaussianBlur(known, (0, 0), sig)[..., None] + 1e-6
smooth = num / den

# --- texture: high-frequency grain borrowed from a clean wall patch on the left
ph, pw = y1 - y0, x1 - x0
patch = img[20:20 + ph, 1090:1090 + pw]
grain = patch - cv2.GaussianBlur(patch, (0, 0), 6)
synth = smooth.copy()
synth[y0:y1, x0:x1] += grain

alpha = cv2.GaussianBlur(fill, (0, 0), 1.2)[..., None]
alpha *= region[..., None]  # keep hard outer edge inside region, but region edges are on wall
# soften the outer rectangle border so it blends with the untouched wall
edge = np.zeros((H, W), np.float32); edge[y0 + 12:y1 - 12, x0 + 12:x1 - 12] = 1
edge = cv2.GaussianBlur(edge, (0, 0), 6)
alpha = np.minimum(alpha, (edge * (1 - person_d) + 0)[..., None]) if False else alpha * np.clip(edge * 1.0 + 0, 0, 1)[..., None] + 0
clean = img * (1 - alpha) + synth * alpha

# --- new mark, engraved into the wall
m = np.asarray(Image.open(MARK).convert('RGBA')).astype(np.float32) / 255
mlum = 0.299 * m[..., 0] + 0.587 * m[..., 1] + 0.114 * m[..., 2]
ink = np.clip((1 - mlum) * 1.6, 0, 1) * m[..., 3]           # navy + gold strokes
gold = np.clip((m[..., 0] - m[..., 2]) * 2.5, 0, 1) * m[..., 3]  # ampersand
S = int(sys.argv[5]) if len(sys.argv) > 5 else 300
cx, cy = 772, 400
ink = cv2.resize(ink, (S, S), interpolation=cv2.INTER_AREA)
gold = cv2.resize(gold, (S, S), interpolation=cv2.INTER_AREA)
mx0, my0 = cx - S // 2, cy - S // 2
full = np.zeros((H, W), np.float32); full[my0:my0 + S, mx0:mx0 + S] = ink
fg = np.zeros((H, W), np.float32); fg[my0:my0 + S, mx0:mx0 + S] = gold
full = cv2.GaussianBlur(full, (0, 0), 0.8)
# bevel: highlight on top-left, shadow on bottom-right
hi = np.roll(np.roll(full, -1, 0), -1, 1) - full
sh = full - np.roll(np.roll(full, 1, 0), 1, 1)
occl = cv2.GaussianBlur((1 - person_d).astype(np.float32), (0, 0), 0.8)
lift = np.array([24, 25, 29], np.float32)       # cool light-slate face
goldlift = np.array([30, 22, 4], np.float32)    # faint warm tint on the &
out = clean.copy()
out += (full[..., None] * lift + fg[..., None] * goldlift) * occl[..., None]
out += (np.clip(hi, 0, 1)[..., None] * 18 - np.clip(-sh, 0, 1)[..., None] * 0) * occl[..., None]
out -= (np.clip(sh, 0, 1)[..., None] * 14) * occl[..., None] * 0
out = np.clip(out, 0, 255).astype(np.uint8)
Image.fromarray(out).save(OUT, quality=92, subsampling=0)

dbg = np.concatenate([np.clip(clean, 0, 255).astype(np.uint8)[y0 - 40:y1 + 40, x0 - 60:x1 + 60],
                      out[y0 - 40:y1 + 40, x0 - 60:x1 + 60]], 1)
Image.fromarray(dbg).save(DBG)
Image.fromarray((person * 255).astype(np.uint8)[y0:y1, x0:x1]).save(DBG.replace('.png', '_mask.png'))
