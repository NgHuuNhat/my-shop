import { ProductType } from "@/modules/product/types/productType";
import Footer from "@/shared/components/footer/Footer";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  const fallbackProducts: ProductType[] = [
    { id: "1", name: "Product 1", price: "120000", thumbnail: "https://picsum.photos/900/1000?random=1" },
    { id: "2", name: "Product 2", price: "95000", thumbnail: "https://picsum.photos/900/1000?random=2" },
    { id: "3", name: "Product 3", price: "145000", thumbnail: "https://picsum.photos/900/1000?random=3" },
    { id: "4", name: "Product 4", price: "80000", thumbnail: "https://picsum.photos/900/1000?random=4" },
  ];

  const randomPage = Math.floor(Math.random() * 10) + 1;

  const products: ProductType[] = await fetch(
    `https://691078c77686c0e9c20a6dc4.mockapi.io/api/product?page=${randomPage}&limit=6`,
    { next: { revalidate: 60 } }
  )
    .then((res) => (res.ok ? res.json() : []))
    .catch(() => []);

  const list = products.length ? products : fallbackProducts;

  return (
    <main className="">
      <div className="">

        {/* ====================== HERO ====================== */}
        <section className="relative w-full h-[90vh] overflow-hidden">
          <Image
            loading="eager"
            src="https://picsum.photos/1900/1100?random=90"
            alt="Hero Banner"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute inset-0 flex flex-col justify-center px-4 max-w-3xl mx-auto text-white">
            <h1 className="text-6xl font-extrabold leading-tight drop-shadow-xl">
              UNLEASH YOUR ENERGY
            </h1>
            <p className="mt-6 text-xl text-gray-200 max-w-xl">
              Thiết kế cho tốc độ. Công nghệ cho tương lai. Bộ sưu tập mới đã ra mắt.
            </p>
            <Link
              href="/products"
              className="mt-10 px-10 py-4 bg-white text-black text-lg font-semibold rounded-full hover:bg-gray-200 transition"
            >
              Products
            </Link>
          </div>
        </section>

        {/* ====================== CATEGORY ====================== */}
        <section className="w-full mt-32">
          <h2 className="text-4xl font-bold mb-10 px-4 max-w-7xl mx-auto">Danh mục</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px]">
            {[
              { name: "Shoes", img: 51 },
              { name: "Apparel", img: 52 },
              { name: "Accessories", img: 53 },
              { name: "Sportswear", img: 54 },
            ].map((cat, i) => (
              <div key={i} className="relative w-full h-[260px] overflow-hidden">
                <Image
                  src={`https://picsum.photos/700/700?random=${cat.img}`}
                  alt={cat.name}
                  fill
                  sizes="(max-width:768px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <p className="absolute bottom-4 left-4 text-white text-xl font-semibold drop-shadow">
                  {cat.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ====================== TRENDING ====================== */}
        <section className="w-full mt-32">
          <h2 className="text-4xl font-bold mb-10 px-4 max-w-7xl mx-auto">Xu hướng</h2>

          <div className="flex gap-[1px] overflow-x-auto no-scrollbar py-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="relative min-w-[330px] h-[420px] overflow-hidden flex-shrink-0 bg-gray-200">
                <Image
                  src={`https://picsum.photos/700/900?random=${i}`}
                  alt="Trending Banner"
                  fill
                  sizes="(max-width:600px) 80vw, 330px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ====================== FEATURED PRODUCTS ====================== */}
        <section className="w-full mt-32">
          <h2 className="text-4xl font-bold mb-10 px-4 max-w-7xl mx-auto">Sản phẩm nổi bật</h2>

          <div className="flex gap-[1px] overflow-x-auto no-scrollbar py-2">
            {list.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.id}`}
                className="relative min-w-[330px] h-[420px] overflow-hidden flex-shrink-0"
              >
                <Image
                  src={item.thumbnail || ''}
                  alt={item.name || ''}
                  fill
                  sizes="(max-width:600px) 80vw, 330px"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-black/20" />

                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <h6 className="text-xl font-bold">{item.price}₫</h6>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ====================== FINAL CTA ====================== */}
        <section className="text-center my-32 px-4">
          <h2 className="text-4xl font-bold">Ready to level up your style?</h2>
          <p className="mt-4 text-gray-600 text-lg max-w-xl mx-auto">
            Trải nghiệm bộ sưu tập mới nhất với thiết kế hiện đại.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-block bg-black text-white px-10 py-4 text-lg font-semibold rounded-full hover:bg-gray-800"
          >
            Products
          </Link>
        </section>
      </div>

      <Footer />
    </main>
  );
}
