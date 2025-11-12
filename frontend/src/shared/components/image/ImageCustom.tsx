"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ImageCustomProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageCustom({ src, alt, className }: ImageCustomProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      src={src || "/images/no-image.png"}
      alt={alt || "Product image"}
      fill
      unoptimized
      loading="lazy"
      sizes="100vw"
      className={`object-cover rounded-2xl transition-opacity duration-1000 ${className || ''}`}
      style={{
        opacity: loaded ? 1 : 0,
      }}
      onLoad={() => setLoaded(true)}
    />
  );
}
