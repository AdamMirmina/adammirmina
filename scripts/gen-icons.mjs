// Builds every icon the site serves, from one source image.
//
// The source is the seamless mark on its light plate, generated in the
// seamless repo by its own `scripts/gen-icons.mjs` as `public/icon-512-light.png`
// (the AM monogram with the infinity ribbon, navy on white). The previous
// source was a cream disc with a geometric "A"; that version of this script
// is in git history under e1f022a.
//
//   node scripts/gen-icons.mjs ../semester/public/icon-512-light.png
//
// Writes app/favicon.ico, app/icon.png and app/apple-icon.png. Next's App
// Router picks all three up by filename and emits the link tags itself.
//
// The plate is already drawn at 512, so every size is a plain resize. The ICO
// is packed by hand (a 6-byte header, a 16-byte entry per size, then each PNG
// verbatim) because browsers request /favicon.ico by name whatever the link
// tags say, and no dependency is worth one file format.

import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = process.argv[2];
if (!SRC) {
  console.error("usage: node scripts/gen-icons.mjs <icon-512-light.png>");
  process.exit(1);
}

const meta = await sharp(SRC).metadata();
if (meta.width !== 512 || meta.height !== 512 || !meta.hasAlpha) {
  console.error(`expected a 512x512 RGBA source, got ${meta.width}x${meta.height} alpha=${meta.hasAlpha}`);
  process.exit(1);
}

const at = (size) => sharp(SRC).resize(size, size, { fit: "fill" }).png({ compressionLevel: 9 }).toBuffer();

function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const dir = Buffer.alloc(16 * images.length);
  let offset = header.length + dir.length;
  images.forEach(({ size, buf }, i) => {
    const e = i * 16;
    dir.writeUInt8(size, e);
    dir.writeUInt8(size, e + 1);
    dir.writeUInt16LE(1, e + 4);
    dir.writeUInt16LE(32, e + 6);
    dir.writeUInt32LE(buf.length, e + 8);
    dir.writeUInt32LE(offset, e + 12);
    offset += buf.length;
  });
  return Buffer.concat([header, dir, ...images.map((i) => i.buf)]);
}

const [i16, i32, i48, i192, i180] = await Promise.all([at(16), at(32), at(48), at(192), at(180)]);
await writeFile(join(root, "app", "favicon.ico"), ico([{ size: 16, buf: i16 }, { size: 32, buf: i32 }, { size: 48, buf: i48 }]));
await writeFile(join(root, "app", "icon.png"), i192);
await writeFile(join(root, "app", "apple-icon.png"), i180);

// Verify against the written files rather than trusting the resize: the plate
// is white, so a corner pixel is transparent and the centre is not.
for (const [name, size] of [["icon.png", 192], ["apple-icon.png", 180]]) {
  const { data, info } = await sharp(join(root, "app", name)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const px = (x, y) => data[(y * info.width + x) * 4 + 3];
  if (info.width !== size || px(1, 1) !== 0 || px(size >> 1, size >> 1) !== 255) {
    console.error(`${name}: unexpected shape (${info.width}px, corner alpha ${px(1, 1)}, centre alpha ${px(size >> 1, size >> 1)})`);
    process.exit(1);
  }
}
console.log("wrote app/favicon.ico, app/icon.png, app/apple-icon.png from", SRC);
