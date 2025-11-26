import { ProductType } from '@/modules/products/types/productType';
import Footer from '@/shared/layouts/footer/Footer';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// ====================== HERO COMPONENT ======================
const Hero = () => (
  <section className="relative w-full h-screen" aria-label="Banner chính">
    <Image
      src="https://picsum.photos/1900/1100?random=1"
      alt="Bộ sưu tập giày và áo thời trang mới"
      fill
      className="object-cover"
      priority
      loading='eager'
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
    <div className="absolute inset-0 bg-black/30" />
    <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 max-w-7xl mx-auto text-white">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-xl">
        UNLEASH YOUR ENERGY
      </h1>
      <p className="mt-4 md:mt-6 text-lg md:text-xl text-gray-200 max-w-xl">
        Thiết kế cho tốc độ. Công nghệ cho tương lai. Bộ sưu tập mới đã ra mắt.
      </p>
      <Link
        href="/products"
        className="flex items-center gap-1 mt-6 md:mt-10 px-6 md:px-10 py-3 md:py-4 bg-white text-black text-base md:text-lg font-semibold rounded-full hover:bg-gray-200 transition"
        aria-label="Xem tất cả sản phẩm"
      >
        Xem sản phẩm
      </Link>
    </div>
  </section>
);

// ====================== CATEGORY SECTION ======================
const CategorySection = () => {
  const categories = [
    { name: "Shoes", img: 61, href: "/products?category=shoes" },
    { name: "Apparel", img: 62, href: "/products?category=apparel" },
    { name: "Accessories", img: 63, href: "/products?category=accessories" },
    { name: "Sportswear", img: 64, href: "/products?category=sportswear" },
  ];

  return (
    <section className="w-full mt-12 md:mt-16 px-4 max-w-7xl mx-auto" aria-label="Danh mục sản phẩm">
      <h2 className="text-2xl font-bold mb-6 md:mb-10">Danh mục</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
        {categories.map((cat, i) => (
          <Link key={i} href={cat.href} className="relative w-full h-[220px] sm:h-[240px] md:h-[260px] overflow-hidden group">
            <Image
              src={`https://picsum.photos/700/700?random=${cat.img}`}
              alt={`Danh mục ${cat.name}`}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              loading='eager'
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/25" />
            <h3 className="absolute bottom-3 left-3 text-white text-lg md:text-xl font-semibold drop-shadow">
              {cat.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

// ====================== TRENDING SECTION ======================
const TrendingSection = () => (
  <section className="w-full mt-12 md:mt-16 px-4 max-w-7xl mx-auto" aria-label="Sản phẩm xu hướng">
    <h2 className="text-2xl font-bold mb-6 md:mb-10">Xu hướng</h2>
    <div className="flex gap-1 overflow-x-auto no-scrollbar py-2" role="list">
      {[5, 6, 7, 8, 9, 10].map((i) => (
        <article
          key={i}
          className="relative min-w-[250px] sm:min-w-[280px] md:min-w-[330px] h-[350px] sm:h-[380px] md:h-[420px] flex-shrink-0 bg-gray-200 overflow-hidden"
          role="listitem"
        >
          <Image
            src={`https://picsum.photos/700/900?random=${i}`}
            alt={`Sản phẩm xu hướng ${i}`}
            fill
            className="object-cover"
            loading='eager'
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </article>
      ))}
    </div>
  </section>
);

// ====================== FEATURED PRODUCTS ======================
interface FeaturedProductsProps {
  products: ProductType[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => (
  <section className="w-full mt-12 md:mt-16 px-4 max-w-7xl mx-auto" aria-label="Sản phẩm nổi bật">
    <h2 className="text-2xl font-bold mb-6 md:mb-10">Sản phẩm nổi bật</h2>
    <div className="flex gap-1 overflow-x-auto no-scrollbar py-2" role="list">
      {products.map((item) => (
        <Link
          key={item.id}
          href={`/product/${item.id}`}
          className="relative min-w-[250px] sm:min-w-[280px] md:min-w-[330px] h-[350px] sm:h-[380px] md:h-[420px] flex-shrink-0 group overflow-hidden"
          aria-label={`Xem chi tiết sản phẩm ${item.name}`}
          role="listitem"
        >
          <Image
            src={item.image || 'https://picsum.photos/700/900'}
            alt={item.name || 'Sản phẩm nổi bật'}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
            loading='eager'
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-base md:text-lg font-bold">{item.name}</h3>
            <p className="text-lg md:text-xl font-bold">{item.price}₫</p>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

// ====================== FINAL CTA ======================
const FinalCTA = () => (
  <section className="text-center my-12 md:my-20 px-4" aria-label="Khám phá bộ sưu tập thời trang mới">
    <h2 className="text-2xl md:text-3xl font-bold">
      Khám phá bộ sưu tập thời trang mới nhất
    </h2>
    <p className="mt-4 text-gray-600 text-lg max-w-xl mx-auto">
      Cập nhật những thiết kế hiện đại, phong cách và chất lượng cao. Mua sắm sản phẩm thời trang chính hãng ngay hôm nay!
    </p>
    <Link
      href="/products"
      aria-label="Xem tất cả sản phẩm thời trang"
      className="mt-6 md:mt-8 inline-block bg-black text-white px-6 md:px-10 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full hover:bg-gray-800 transition"
    >
      Xem sản phẩm
    </Link>
  </section>
);

// ====================== HOME PAGE ======================
export default async function HomePage() {
  let products: ProductType[] = [];

  try {
    const res = await fetch(
      `https://691078c77686c0e9c20a6dc4.mockapi.io/api/product?page=1&limit=6`,
      { next: { revalidate: 60 } }
    );
    if (res.ok) products = await res.json();
  } catch (error) {
    console.error("Lỗi fetch sản phẩm:", error);
  }

  return (
    <main>
      <Hero />
      <CategorySection />
      <TrendingSection />
      <FeaturedProducts products={products} />
      <FinalCTA />
      <Footer />
    </main>
  );
}
