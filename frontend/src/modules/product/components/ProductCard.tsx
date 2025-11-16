import React from "react";
import { ProductCardProps } from "../types/productType";
import Link from "next/link";
import Image from "next/image";

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col w-full rounded-2xl cursor-pointer"
    >
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg bg-gray-200">
        {/* Ảnh scale khi hover */}
        <Image
          src={product.thumbnail || "/images/no-image.png"}
          alt={product.name || "Product image"}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Text */}
        <div className="absolute bottom-3 left-3 text-white">
          <h2 className="text-sm font-black line-clamp-2">{product.name}</h2>
          <p className="mt-1 text-base font-bold">{product.price}₫</p>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(ProductCard);
