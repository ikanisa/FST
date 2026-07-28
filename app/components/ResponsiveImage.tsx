import type { ImgHTMLAttributes } from "react";

type ResponsiveImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "srcSet" | "width" | "height"
> & {
  src: string;
  alt: string;
  sizes?: string;
};

function responsiveSources(src: string) {
  if (!src.endsWith(".webp")) return undefined;
  const stem = src.slice(0, -5);
  return `${stem}-640.webp 640w, ${stem}-960.webp 960w, ${src} 1536w`;
}

export function ResponsiveImage({
  src,
  alt,
  sizes = "(max-width: 720px) 100vw, (max-width: 1200px) 70vw, 960px",
  ...props
}: ResponsiveImageProps) {
  return (
    <img
      src={src}
      srcSet={responsiveSources(src)}
      sizes={sizes}
      alt={alt}
      width={1536}
      height={1024}
      {...props}
    />
  );
}
