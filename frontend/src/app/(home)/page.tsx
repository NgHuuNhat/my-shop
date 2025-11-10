import { ProductType } from "@/modules/product/types/productType";
import Footer from "@/shared/footer/Footer";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  const featuredProducts = [
    { id: '1', name: 'Product 1', price: 120000, thumbnail: 'https://picsum.photos/300?random=1' },
    { id: '2', name: 'Product 2', price: 95000, thumbnail: 'https://picsum.photos/300?random=2' },
    { id: '3', name: 'Product 3', price: 145000, thumbnail: 'https://picsum.photos/300?random=3' },
    { id: '4', name: 'Product 4', price: 80000, thumbnail: 'https://picsum.photos/300?random=4' },
  ]

  const products: ProductType[] = await fetch('https://691078c77686c0e9c20a6dc4.mockapi.io/api/product?page=1&limit=4', {
    next: { revalidate: 60 },
  })
    .then(res => res.ok ? res.json() : null)
    .then(data => Array.isArray(data) ? data : [])
    .catch(() => [])

  const productsRender = products ? products : featuredProducts

  return (
    <>
      <div className="flex-1 flex flex-col items-center justify-center">
        <main className="flex flex-col items-center justify-center px-6 py-12 space-y-16 max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="w-full flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                Welcome to My E-Commerce Store
              </h1>
              <p className="text-lg sm:text-xl text-gray-600">
                Discover amazing products, fast shipping, and unbeatable prices.
              </p>
              <Link
                href="/products"
                className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
              >
                Browse Products
              </Link>
            </div>
            <div className="flex-1 relative w-full h-64 sm:h-80 md:h-96">
              <Image
                src="https://picsum.photos/600/400?grayscale"
                alt="Hero Product"
                fill
                className="object-cover rounded-lg"
                unoptimized
              />
            </div>
          </section>

          {/* Features Section */}
          <section className="w-full grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">Fast Delivery</h2>
              <p className="text-gray-600 text-sm">Get your products delivered in record time.</p>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">Best Prices</h2>
              <p className="text-gray-600 text-sm">We offer competitive prices on all products.</p>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">Customer Support</h2>
              <p className="text-gray-600 text-sm">24/7 support for all your needs.</p>
            </div>
          </section>

          {/* Featured Products */}
          <section className="w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {productsRender.map(p => (
                <Link key={p.id} href="/products" className="group flex flex-col items-start hover:scale-105 transition-transform duration-200">
                  <div className="relative w-full pb-[100%] overflow-hidden rounded-lg">
                    <Image
                      src={p.thumbnail}
                      alt={p.name}
                      fill
                      className="object-cover rounded-lg transition-transform duration-200 group-hover:scale-110"
                      unoptimized
                    />
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-gray-900 truncate">{p.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{p.price}₫</p>
                </Link>
              ))}
            </div>
          </section>

          {/* About / SEO Text */}
          <section className="w-full space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">About Our Store</h2>
            <p className="text-gray-600 leading-relaxed">
              At My E-Commerce Store, we are committed to providing high-quality products to our customers.
              Explore a wide range of items, from electronics to fashion, all curated for your convenience.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to make online shopping simple, fast, and enjoyable. We prioritize customer satisfaction
              and strive to bring the best experience possible.
            </p>
          </section>

          {/* Call to Action */}
          <section className="w-full text-center">
            <Link
              href="/products"
              className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
            >
              Start Shopping
            </Link>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
