type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className = "", priority = false }: BrandLogoProps) {
  return (
    <img
      className={`brand-logo-image ${className}`.trim()}
      src="/brand/fst-logo.svg"
      alt="FST"
      width="1109"
      height="281"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
}
