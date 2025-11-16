import { ProductType } from "@/modules/product/types/productType";
import ImageCustom from "@/shared/components/image/ImageCustom";
import Link from "next/link";

export default async function HomePage() {
  const fallbackProducts: ProductType[] = [
    { id: "1", name: "Product 1", price: "120000", thumbnail: "https://picsum.photos/900/1000?random=1" },
    { id: "2", name: "Product 2", price: "95000", thumbnail: "https://picsum.photos/900/1000?random=2" },
    { id: "3", name: "Product 3", price: "145000", thumbnail: "https://picsum.photos/900/1000?random=3" },
    { id: "4", name: "Product 4", price: "80000", thumbnail: "https://picsum.photos/900/1000?random=4" },
  ];

  const totalPages = 10;
  const randomPage = Math.floor(Math.random() * totalPages) + 1;

  const products: ProductType[] = await (
    fetch(
      `https://691078c77686c0e9c20a6dc4.mockapi.io/api/product?page=${randomPage}&limit=${6}`,
      { next: { revalidate: 60 } }
    )
      .then((res) => (res.ok ? res.json() : []))
      .catch(() => [])
  );

  const list = products.length ? products : fallbackProducts;

  return (
    <main className="flex-1 w-full">
      {/* SECTION 1: HERO */}
      <section className="relative w-full h-[90vh] overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gray-200">
          <ImageCustom loading="eager" src="/jpg/hero-banner.jpg" alt="Hero Banner" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
        </div>
        <div className="absolute inset-0 px-6 md:px-20 flex flex-col justify-center text-white max-w-3xl">
          <h1 className="text-6xl md:text-6xl font-extrabold leading-tight drop-shadow-xl">UNLEASH YOUR ENERGY</h1>
          <p className="mt-6 text-xl text-gray-200 max-w-xl">Thiết kế cho tốc độ. Công nghệ cho tương lai. Bộ sưu tập mới nhất đã ra mắt.</p>
          <div className="mt-10">
            <Link href="/products" className="px-10 py-4 bg-white text-black text-lg font-semibold rounded-full hover:bg-gray-200 transition">Sản phẩm</Link>
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* 🔥 SECTION 2: SHOP BY CATEGORY */}
      {/* ====================================================== */}
      <section className="px-6 mt-32 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-10">Danh mục</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">

          {[
            { name: "Shoes", img: 51 },
            { name: "Apparel", img: 52 },
            { name: "Accessories", img: 53 },
            { name: "Sportswear", img: 54 },
          ].map((cat, i) => (
            <div key={i} className="w-full h-[260px] rounded-2xl overflow-hidden bg-gray-200 relative">
              <ImageCustom
                src={`https://picsum.photos/700/700?random=${cat.img}`}
                alt={cat.name}
                className="object-cover w-full h-full"
              />

              <div className="absolute inset-0 bg-black/30"></div>

              <p className="absolute bottom-4 left-4 text-white text-xl font-semibold drop-shadow">
                {cat.name}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* SECTION 3: TRENDING NOW */}
      <section className="px-6 mt-32 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">Xu hướng</h2>
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="relative min-w-[330px] h-[420px] rounded-3xl overflow-hidden bg-gray-200 flex-shrink-0">
              <ImageCustom src={`https://picsum.photos/700/900?random=${i}`} alt="Trending Banner" className="object-cover w-full h-full" />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: FEATURED PRODUCTS */}
      <section className="px-6 mt-32 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">Sản phẩm nổi bật</h2>
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
          {list.map((i) => (
            <Link href={`/products/${i.id}`} key={i.id} className="relative min-w-[330px] h-[420px] rounded-3xl overflow-hidden bg-gray-200 flex-shrink-0">
              <ImageCustom src={i.thumbnail || `https://picsum.photos/700/900?random=${i}`} alt="Trending Banner" className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-l font-bold">{i.name}</h3>
                <h6 className="text-xl font-bold">{i.price}₫</h6>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 5: FINAL CTA */}
      <section className="text-center my-32 px-6">
        <h2 className="text-4xl font-bold">Ready to level up your style?</h2>
        <p className="mt-4 text-gray-600 text-lg max-w-xl mx-auto">Trải nghiệm bộ sưu tập mới nhất với công nghệ vượt trội & thiết kế hiện đại.</p>
        <Link href="/products" className="mt-8 inline-block bg-black text-white px-10 py-4 text-lg font-semibold rounded-full hover:bg-gray-800">Sản phẩm</Link>
      </section>

    </main>
  );
}
