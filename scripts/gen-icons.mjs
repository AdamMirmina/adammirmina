// Builds every icon the site serves, from one source image.
//
// The source is Adam's Google account avatar (2026-08-14): a cream disc with a
// geometric "A" and cyan accents, screenshotted against a near-black page. So
// the job is to find the disc inside that screenshot, cut it out cleanly, and
// render the sizes a real device asks for.
//
//   node scripts/gen-icons.mjs <source.png>
//
// Writes app/favicon.ico, app/icon.png and app/apple-icon.png. Next's App
// Router picks all three up by filename and emits the link tags itself.
//
// Two sharp behaviors this deliberately avoids, both of which fail silently and
// have cost real time before:
//   - joinChannel with a raw single-channel mask. A 1-channel raw buffer gets
//     promoted to 3 channels through an operation, joinChannel accepts the
//     wrong-sized buffer without complaining, and the result has no alpha at
//     all. The alpha here is written straight into the RGBA bytes instead.
//   - trim() to find content bounds. It can no-op and return the original
//     dimensions, reporting success. The disc is located by scanning pixels,
//     which is exact and cannot quietly do nothing.

import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = process.argv[2];
if (!SRC) {
  console.error("usage: node scripts/gen-icons.mjs <source.png>");
  process.exit(1);
}

const src = sharp(SRC);
const meta = await src.metadata();
const { data, info } = await src
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;

// The disc is the only bright thing in the frame; the page behind it is
// near-black. Luma separates them with enormous margin, so one threshold is
// enough and a second condition would only be another thing to get wrong.
const BRIGHT = 90;
let minX = W, minY = H, maxX = -1, maxY = -1;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * C;
    const luma = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    if (luma < BRIGHT) continue;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
}
if (maxX < 0) {
  console.error("Found no disc: nothing in the source is brighter than the threshold.");
  process.exit(1);
}

const discW = maxX - minX + 1;
const discH = maxY - minY + 1;
console.log(`source ${W}x${H} (${meta.format}), disc ${discW}x${discH} at ${minX},${minY}`);

// A screenshotted circle is never perfectly square to the pixel. Take the
// larger side, centred, so nothing is clipped.
const side = Math.max(discW, discH);
const cx = minX + discW / 2;
const cy = minY + discH / 2;
const left = Math.max(0, Math.round(cx - side / 2));
const top = Math.max(0, Math.round(cy - side / 2));
const cropW = Math.min(side, W - left);
const cropH = Math.min(side, H - top);

const cropped = await sharp(SRC)
  .ensureAlpha()
  .extract({ left, top, width: cropW, height: cropH })
  .toBuffer();

// Re-open the buffer rather than chaining: an extract chained into another
// content-dependent operation is exactly the pattern that silently no-ops.
//
// ensureAlpha AFTER the resize, not before. A JPEG source carries no alpha, and
// the resize hands back a 3-channel buffer regardless of what the input was
// told to do, so the alpha writes below would land on the wrong byte offsets.
// The assertion is the point: this failed loudly the first time a JPEG was
// used, which is exactly what should happen.
const sq = await sharp(cropped)
  .resize(1024, 1024, { fit: "fill" })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
if (sq.info.channels !== 4 || sq.data.length !== 1024 * 1024 * 4) {
  console.error(
    `Expected a 4-channel 1024x1024 buffer, got ${sq.info.channels} channels ` +
      `and ${sq.data.length} bytes. Refusing to write alpha at guessed offsets.`,
  );
  process.exit(1);
}

// SQUARE, not a disc. Adam, 2026-08-14: "put it back into the original format."
// The avatar file is a square image; Google and YouTube round it in CSS at
// display time, and so does every other surface that wants it round. Cropping
// the corners off here would bake one presentation into the asset and throw away
// pixels that a square-tile context (a Windows tile, a bookmark grid) would use.
// Ship the source shape and let each surface mask it.
//
// The circular-alpha pass this replaced also had to feather a rim to hide the
// screenshot's black background. Sourcing the real file removes the reason it
// existed at all.
const N = 1024;
const disc = await sharp(sq.data, {
  raw: { width: N, height: N, channels: 4 },
})
  .png()
  .toBuffer();

async function png(size) {
  return sharp(disc)
    .resize(size, size, { fit: "cover", kernel: "lanczos3" })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

// ICO carrying PNG payloads, which every browser since IE9 reads. Written by
// hand because sharp has no .ico encoder and this is a 22-line format.
async function ico(sizes) {
  const imgs = await Promise.all(sizes.map(png));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(sizes.length, 4);
  const entries = [];
  let offset = 6 + sizes.length * 16;
  sizes.forEach((s, i) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(s >= 256 ? 0 : s, 0); // 0 means 256
    e.writeUInt8(s >= 256 ? 0 : s, 1);
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // planes
    e.writeUInt16LE(32, 6); // bpp
    e.writeUInt32LE(imgs[i].length, 8);
    e.writeUInt32LE(offset, 12);
    offset += imgs[i].length;
    entries.push(e);
  });
  return Buffer.concat([header, ...entries, ...imgs]);
}

// Sizes are capped near the source resolution on purpose. The screenshot's disc
// is 160px, so a 512 icon is a 3x upscale: visibly soft, three times the bytes,
// and no more detail than a 192. If a higher-resolution original of the avatar
// ever turns up, raise these and regenerate.
const ICO_SIZES = [16, 32, 48];
const ICON = 192;
const APPLE = 180;

await writeFile(join(root, "app/favicon.ico"), await ico(ICO_SIZES));
await writeFile(join(root, "app/icon.png"), await png(ICON));
await writeFile(join(root, "app/apple-icon.png"), await png(APPLE));

// Printed from the values actually used. This line was hardcoded and still said
// 512 after the size dropped to 192, which is the shape of a diagnostic that
// reports what it was told rather than what happened.
console.log(
  `wrote app/favicon.ico (${ICO_SIZES.join(", ")}), ` +
    `app/icon.png (${ICON}), app/apple-icon.png (${APPLE})`,
);
console.log("Now LOOK at the 16px render. Fine texture turns to mush at that size,");
console.log("and a favicon is only ever judged there.");
