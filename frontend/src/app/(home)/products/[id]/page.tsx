import ProductCard from '@/modules/product/components/ProductCard'
import { ProductDetailProps, ProductType } from '@/modules/product/types/productType'
import Error from '@/shared/components/error/Error'
import ImageCustom from '@/shared/components/image/ImageCustom'
import Image from 'next/image'

export default async function ProductDetail({ params }: ProductDetailProps) {
    const { id } = await params

    const product: ProductType = await fetch(`https://691078c77686c0e9c20a6dc4.mockapi.io/api/product/${id}`, {
        next: { revalidate: 60 }
    })
        .then(res => res.ok ? res.json() : null)
        .then(data => data ? data : null)
        .catch(() => null)

    if (!product) {
        return (
            <Error />
        )
    }

    return (
        <div className="max-w-6xl mx-auto flex flex-col">

            {/* Breadcrumb */}
            <div className="py-4 px-4 text-sm text-gray-500">
                <a href="/" className="hover:text-blue-600 transition">Home</a> {`>`}
                <a href="/products" className="hover:text-blue-600 transition"> Products</a> {`>`}
                <span className="text-gray-700 font-medium"> {product.name}</span>
            </div>

            {/* Ảnh + Thông tin */}
            <div className="px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

                {/* Ảnh sản phẩm */}
                <div className="rounded-2xl cursor-pointer relative w-full pb-[100%] bg-gray-200 overflow-hidden">
                    {/* <Image
                        src={product.thumbnail || "/images/no-image.png"}       // URL ảnh
                        alt={product.name || "Product image"}            // alt text
                        fill                          // thay thế cho w-full h-full + absolute
                        className="rounded-2xl cursor-pointer object-cover transition-transform duration-300 hover:scale-105"
                        sizes="100vw"                 // responsive
                        unoptimized={true}           // nếu muốn tối ưu Next.js
                        loading="eager"
                    /> */}
                    <ImageCustom
                        src={product.thumbnail || "/images/no-image.png"}       // URL ảnh
                        alt={product.name || "Product image"}            // alt text
                    // fill                          // thay thế cho w-full h-full + absolute
                    // className="rounded-2xl cursor-pointer object-cover transition-transform duration-300 hover:scale-105"
                    // sizes="100vw"                 // responsive
                    // unoptimized={false}           // nếu muốn tối ưu Next.js
                    // loading="eager"
                    />
                </div>

                {/* Thông tin sản phẩm */}
                <div className="flex flex-col justify-between h-full">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug break-words">
                            {product.name}
                        </h1>

                        <div className="mt-4 flex items-center gap-3">
                            <p className="text-3xl font-bold text-gray-600">
                                {Number(product.price).toLocaleString('vi-VN')}₫
                            </p>
                        </div>

                        {product.description && (
                            <p className="mt-4 text-gray-700 leading-relaxed whitespace-pre-line">
                                {product.description}
                            </p>
                        )}
                    </div>

                    {/* Nút hành động */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <button className="flex-1 px-5 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition">
                            Thêm vào giỏ hàng
                        </button>
                        <button className="flex-1 px-5 py-3 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition">
                            Mua ngay
                        </button>
                    </div>
                </div>

            </div>

            {/* Sản phẩm tương tự */}
            <div className='py-10 px-4'>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Sản phẩm tương tự</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <ProductCard key={i} product={product} />
                    ))}
                </div>
            </div>

        </div>

    )
}