type SectionVisualProps = {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
};

export function SectionVisual({ src, alt, className = "", eager = false }: SectionVisualProps) {
  return (
    <figure className={`section-visual ${className}`.trim()}>
      <ResponsiveImage
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
      />
    </figure>
  );
}
import { ResponsiveImage } from "./ResponsiveImage";
