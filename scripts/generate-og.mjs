import sharp from "sharp";

const width = 1200;
const height = 630;

const background = Buffer.from(`
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#FBFAF7"/>
  <circle cx="1120" cy="2" r="195" fill="#F0F0FF"/>
  <circle cx="-12" cy="642" r="170" fill="#FFF0E9"/>
  <text x="600" y="478" text-anchor="middle" fill="#102635"
    font-family="Arial, sans-serif" font-size="42" font-weight="400">
    Make the next move workable.
  </text>
</svg>`);

const logo = await sharp("public/brand/fst-logo.svg")
  .resize({ width: 760 })
  .png()
  .toBuffer();

await sharp(background)
  .composite([{ input: logo, left: 220, top: 170 }])
  .jpeg({ quality: 92, chromaSubsampling: "4:4:4", progressive: true })
  .toFile("public/og.jpg");

console.log("generated public/og.jpg at 1200x630");
