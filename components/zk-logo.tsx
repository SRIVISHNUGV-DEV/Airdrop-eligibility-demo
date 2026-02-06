import Image from "next/image";

type ZKLogoProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

export function ZKLogo({ size = 20, className = "", priority = false }: ZKLogoProps) {
  return (
    <Image
      src="/zk-logo.png"
      alt="ZK logo"
      width={size}
      height={size}
      priority={priority}
      className={`object-contain ${className}`}
    />
  );
}
