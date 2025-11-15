import ProductCard from "@/modules/product/components/ProductCard";
import { ProductType } from "@/modules/product/types/productType";
import Footer from "@/shared/components/footer/Footer";
import ImageCustom from "@/shared/components/image/ImageCustom";
import Link from "next/link";

export default async function HomePage() {
  const fallbackProducts: ProductType[] = [
    { id: "1", name: "Product 1", price: "120000", thumbnail: "https://picsum.photos/900/1000?random=1" },
    { id: "2", name: "Product 2", price: "95000", thumbnail: "https://picsum.photos/900/1000?random=2" },
    { id: "3", name: "Product 3", price: "145000", thumbnail: "https://picsum.photos/900/1000?random=3" },
    { id: "4", name: "Product 4", price: "80000", thumbnail: "https://picsum.photos/900/1000?random=4" },
  ];

  const products: ProductType[] = await (
    fetch(
      `https://691078c77686c0e9c20a6dc4.mockapi.io/api/product?page=${1}&limit=${4}`,
      { next: { revalidate: 60 } }
    )
      .then((res) => (res.ok ? res.json() : []))
      .catch(() => [])
  );

  const list = products.length ? products : fallbackProducts;

  return (
    <>
      <main className="w-full">

        {/* SECTION 1: HERO */}
        <section className="relative w-full h-[95vh] overflow-hidden bg-black">
          <div className="absolute inset-0 bg-gray-200">
            <ImageCustom src="https://picsum.photos/1900/1100?random=90" alt="Hero Banner" className="object-cover w-full h-full" />
          </div>
          <div className="absolute inset-0 px-6 md:px-20 flex flex-col justify-center text-white max-w-3xl">
            <h1 className="text-6xl md:text-8xl font-extrabold leading-tight drop-shadow-xl">UNLEASH YOUR ENERGY</h1>
            <p className="mt-6 text-xl text-gray-200 max-w-xl">Thiết kế cho tốc độ. Công nghệ cho tương lai. Bộ sưu tập mới nhất đã ra mắt.</p>
            <div className="mt-10">
              <Link href="/products" className="px-10 py-4 bg-white text-black text-lg font-semibold rounded-full hover:bg-gray-200 transition">Shop the Collection</Link>
            </div>
          </div>
        </section>

        {/* SECTION 2: TRENDING NOW */}
        <section className="px-6 mt-32 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Trending Now</h2>
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="relative min-w-[330px] h-[420px] rounded-3xl overflow-hidden bg-gray-200 flex-shrink-0">
                <ImageCustom src={`https://picsum.photos/700/900?random=${i}`} alt="Trending Banner" className="object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: COLLECTION */}
        <section className="px-6 mt-32 max-w-7xl mx-auto">
          <h1 className="sr-only">Nike Collection: Men, Women, and Kids</h1>
          <h2 className="text-4xl font-bold mb-8">Collection</h2>
          <div className="grid md:grid-cols-3 gap-2">
            {[
              { title: "Men's Collection", img: 21 },
              { title: "Women's Collection", img: 32 },
              { title: "Kids' Collection", img: 43 },
            ].map((c, i) => (
              <div key={i} className="h-[440px] rounded-2xl overflow-hidden bg-gray-200 relative">
                <ImageCustom src={`https://picsum.photos/900/900?random=${c.img}`} alt={c.title} className="object-cover w-full h-full" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-3xl font-bold">{c.title}</h3>
                  <Link href="/products" className="inline-block mt-3 px-6 py-2 bg-white text-black rounded-full hover:bg-gray-300">Shop Now</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: FEATURED PRODUCTS */}
        <section className="px-6 mt-32 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold">Featured Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-10">
            {list.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* SECTION 5: FINAL CTA */}
        <section className="text-center mt-40 mb-32 px-6">
          <h2 className="text-4xl font-bold">Ready to level up your style?</h2>
          <p className="mt-4 text-gray-600 text-lg max-w-xl mx-auto">Trải nghiệm bộ sưu tập mới nhất với công nghệ vượt trội & thiết kế hiện đại.</p>
          <Link href="/products" className="mt-8 inline-block bg-black text-white px-10 py-4 text-lg font-semibold rounded-full hover:bg-gray-800">Start Shopping</Link>
        </section>

      </main>
      <Footer />
    </>
  );
}
