import React from "react";
import { ProductCardProps } from "../types/productType";
import Link from "next/link";
import Image from "next/image";

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col w-full cursor-pointer mb-3"
    >
      {/* IMAGE WRAPPER */}
      <div className="relative w-full aspect-square bg-[#f2f4f5] overflow-hidden">
        <Image
          src={product.image || "/images/no-image.png"}
          alt={product.name || "Product image"}
          fill
          // className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      {/* TEXT INFO */}
      <div className="mt-3">
        <p className="text-lg font-bold">{product.price}₫</p>

        <h3 className="mt-1 text-[17px] font-medium text-black line-clamp-1">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm mt-0.5">
          {"Product"}
        </p>

        <p className="text-gray-500 text-sm">{product ? ` colours` : "1 colour"}</p>

        {/* <p className="text-sm text-black mt-1">Trending</p> */}
      </div>
    </Link>
  );
};

export default React.memo(ProductCard);
