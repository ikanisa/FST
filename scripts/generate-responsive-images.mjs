import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const publicDirectory = path.resolve("public");
const widths = [640, 960];
const originals = (await readdir(publicDirectory))
  .filter((file) => file.endsWith(".webp"))
  .filter((file) => !/-\d+\.webp$/.test(file));

await Promise.all(
  originals.flatMap((file) =>
    widths.map(async (width) => {
      const output = file.replace(/\.webp$/, `-${width}.webp`);
      await sharp(path.join(publicDirectory, file))
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 78, effort: 5 })
        .toFile(path.join(publicDirectory, output));
    }),
  ),
);

console.log(`Generated ${originals.length * widths.length} responsive image variants.`);
