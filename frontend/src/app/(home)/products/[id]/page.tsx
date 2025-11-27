import ButtonAddToCart from '@/modules/products/[id]/components/ButtonAddToCart'
import ProductCard from '@/modules/products/components/ProductCard'
import { productAPI } from '@/modules/products/services/productApi'
import { ProductType } from '@/modules/products/types/productType'
import Error from '@/shared/ui/error/Error'
import Image from 'next/image'
import { FaCoins } from 'react-icons/fa'


export default async function ProductDetail({ params }: { params: { id: string } }) {
    const { id } = await params

    const product: ProductType = await productAPI.getDetail({ id })

    if (!product) {
        return (
            <Error />
        )
    }

    return (
        <div className="min-h-screen max-w-6xl mx-auto flex flex-col">

            {/* Breadcrumb */}
            <div className="py-2 lg:py-5 px-4 text-sm text-gray-500">
                <a href="/" className="hover:text-gray-950 transition">Home</a> {`>`}
                <a href="/products" className="hover:text-gray-950 transition"> Products</a> {`>`}
                <span className="text-gray-700 font-medium"> {product.name}</span>
            </div>

            {/* Ảnh + Thông tin */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                {/* Ảnh + Thông tin */}
                <div className="flex flex-col md:ps-4">
                    {/* Ảnh chính */}
                    <div className="cursor-pointer relative w-full pb-[100%] bg-gray-200 overflow-hidden ">
                        <Image
                            src={product.image || "/images/no-image.png"}
                            alt={product.name || "Product image"}
                            fill
                            className='object-cover'
                            loading='eager'
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                    {/* Thumbnail list */}
                    <div className="flex flex-nowrap overflow-x-auto gap-[1px] py-[1px] items-center">
                        {[product.image, product.image, product.image, product.image, product.image, product.image, product.image, product.image, product.image, product.image, product.image].map((img, i) => (
                            <div
                                key={i}
                                className="bg-gray-200 relative w-15 h-15 overflow-hidden cursor-pointer flex-shrink-0 transition-transform"
                            >
                                <Image src={img || "/images/no-image.png"} alt={`thumb-${i}`} fill className='object-cover' />
                                <div className="absolute inset-0 hover:bg-black/20"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Thông tin sản phẩm */}
                <div className="px-4 flex flex-col justify-between h-full">
                    <div>
                        {/* Thông tin sản phẩm */}
                        <div>
                            <h1 className="text-xl md:text-2xl font-semibold text-gray-900 leading-snug break-words">
                                {product.name}
                            </h1>

                            <div className="mt-4 flex items-center gap-3">
                                <p className="text-4xl font-bold text-gray-600">
                                    {Number(product.price).toLocaleString('vi-VN')}₫
                                </p>
                            </div>

                            {product.description && (
                                <p className="mt-4 text-gray-700 leading-relaxed whitespace-pre-line">
                                    {product.description}
                                </p>
                            )}
                        </div>

                        {/* select */}
                        <div>
                            {/* Chọn màu */}
                            <div className="mt-5">
                                <h3 className="font-semibold mb-2 text-gray-800">Select color:</h3>
                                <div className="flex gap-3">
                                    {["Đỏ", "Xanh", "Đen"].map((color) => (
                                        <button
                                            key={color}
                                            className="cursor-pointer px-4 py-2 border rounded-full text-sm hover:bg-gray-100 transition"
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Chọn size */}
                            <div className="mt-5">
                                <h3 className="font-semibold mb-2 text-gray-800">Select size:</h3>
                                <div className="flex gap-3">
                                    {["S", "M", "L", "XL"].map((size) => (
                                        <button
                                            key={size}
                                            className="cursor-pointer px-4 py-2 border rounded-full text-sm hover:bg-gray-100 transition"
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Nút hành động */}
                    <div className="mt-6 flex flex-col gap-3">
                        {/* <button className="cursor-pointer flex-1 px-5 py-5 bg-gray-950 text-white font-bold rounded-full hover:bg-[#707072] transition">
                            <span className='flex justify-center items-center gap-1 transition-colors'>Buy Now <FaCoins /></span>
                        </button> */}
                        {/* <button className="cursor-pointer flex-1 px-5 py-5 bg-white text-black border-2 border-gray-300 font-bold rounded-full hover:border-black transition">
                            <span className='flex justify-center items-center gap-1 transition-colors'>Add to Cart <FaShoppingCart /></span>
                        </button> */}
                        <ButtonAddToCart product={product} />
                    </div>
                </div>

            </div>

            {/* Mô tả chi tiết dài */}
            <div className="pt-20 px-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Chi tiết sản phẩm</h3>

                {/* Paragraphs */}
                <p className="text-gray-700 leading-relaxed">
                    {"Sản phẩm được thiết kế với chất liệu cao cấp, độ bền cao và kiểu dáng hiện đại phù hợp với nhu cầu sử dụng hàng ngày."}
                </p>
                <p className="text-gray-700 leading-relaxed">
                    {"Công nghệ tiên tiến giúp sản phẩm vận hành mượt mà, tiết kiệm năng lượng và thân thiện với môi trường."}
                </p>

                {/* List tính năng / thông số */}
                <ul className="list-disc list-inside text-gray-700 flex flex-col gap-4 mt-4">
                    {(["Chất liệu: Cao cấp", "Kích thước: 30x20x10cm", "Màu sắc: Đỏ, Xanh, Đen", "Bảo hành: 12 tháng"]).map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </div>

            {/* Sản phẩm tương tự */}
            <div className='py-20'>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 px-4">Sản phẩm tương tự</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[1px]">
                    {[...Array(4)].map((_, i) => (
                        <ProductCard key={i} product={product} />
                    ))}
                </div>
            </div>

        </div>
    )
}