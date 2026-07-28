import sharp from "sharp";

const width = 1200;
const height = 630;
const overlay = Buffer.from(`
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" x2="1">
      <stop offset="0" stop-color="#10233F" stop-opacity="0.96"/>
      <stop offset="0.62" stop-color="#10233F" stop-opacity="0.72"/>
      <stop offset="1" stop-color="#10233F" stop-opacity="0.18"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#shade)"/>
  <rect x="72" y="68" width="56" height="7" rx="3.5" fill="#C96E4B"/>
  <text x="72" y="145" fill="#F7F2E9" font-family="Manrope, Arial, sans-serif" font-size="52" font-weight="600" letter-spacing="9">FST</text>
  <text x="72" y="292" fill="#FFFFFF" font-family="Georgia, serif" font-size="70" font-weight="500">Make the next</text>
  <text x="72" y="374" fill="#FFFFFF" font-family="Georgia, serif" font-size="70" font-weight="500">move workable.</text>
  <text x="76" y="486" fill="#DCE8F7" font-family="Manrope, Arial, sans-serif" font-size="23" font-weight="500" letter-spacing="3">ADVISORY · FINANCE · APPLICATIONS</text>
</svg>`);

await sharp("tmp/imagegen/fst-hero.png")
  .resize(width, height, { fit: "cover", position: "attention" })
  .composite([{ input: overlay, top: 0, left: 0 }])
  .jpeg({ quality: 90, chromaSubsampling: "4:4:4" })
  .toFile("public/og.jpg");

console.log("generated public/og.jpg at 1200x630");
