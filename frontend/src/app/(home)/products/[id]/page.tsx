import ProductCard from '@/modules/product/components/ProductCard'
import { ProductDetailProps, ProductType } from '@/modules/product/types/productType'
import Error from '@/shared/components/error/Error'
import ImageCustom from '@/shared/components/image/ImageCustom'
import { FaShoppingCart, FaCoins } from 'react-icons/fa'


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
                {/* Ảnh + Thông tin */}
                <div className="flex flex-col">
                    {/* Ảnh chính */}
                    <div className="rounded cursor-pointer relative w-full pb-[100%] bg-gray-200 overflow-hidden ">
                        <ImageCustom
                            src={product.thumbnail || "/images/no-image.png"}
                            alt={product.name || "Product image"}
                        />
                    </div>
                    {/* Thumbnail list */}
                    <div className="flex flex-nowrap overflow-x-auto gap-2 py-2 justify-between items-center">
                        {[product.thumbnail, product.thumbnail, product.thumbnail, product.thumbnail, product.thumbnail, product.thumbnail, product.thumbnail].map((img, i) => (
                            <div
                                key={i}
                                className="bg-gray-200 relative w-20 h-20 rounded overflow-hidden cursor-pointer flex-shrink-0 transition-transform hover:scale-105"
                            >
                                <ImageCustom src={img || "/images/no-image.png"} alt={`thumb-${i}`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Thông tin sản phẩm */}
                <div className="flex flex-col justify-between h-full">
                    <div>
                        {/* Thông tin sản phẩm */}
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
                        <button className="cursor-pointer flex-1 px-5 py-5 bg-gray-950 text-white font-bold rounded-full hover:bg-[#707072] transition">
                            <span className='flex justify-center items-center gap-1 transition-colors'>Buy Now <FaCoins /></span>
                        </button>
                        <button className="cursor-pointer flex-1 px-5 py-5 bg-white text-black border-2 border-gray-300 font-bold rounded-full hover:border-black transition">
                            <span className='flex justify-center items-center gap-1 transition-colors'>Add to Cart <FaShoppingCart /></span>
                        </button>
                    </div>
                </div>

            </div>

            {/* Mô tả chi tiết dài */}
            <div className="pt-10 px-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Chi tiết sản phẩm</h3>

                {/* Paragraphs */}
                <p className="text-gray-700 leading-relaxed mb-3">
                    {`Sản phẩm được thiết kế với chất liệu cao cấp, độ bền cao và kiểu dáng hiện đại phù hợp với nhu cầu sử dụng hàng ngày.`}
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                    {`Công nghệ tiên tiến giúp sản phẩm vận hành mượt mà, tiết kiệm năng lượng và thân thiện với môi trường.`}
                </p>

                {/* List tính năng / thông số */}
                <ul className="list-disc list-inside text-gray-700 mb-3">
                    {`Chất liệu: Cao cấp", "Kích thước: 30x20x10cm", "Màu sắc: Đỏ, Xanh, Đen", "Bảo hành: 12 tháng.`}
                </ul>

                {/* Optional: chú thích nhỏ */}
                {/* {product.detailNote && (
                    <p className="text-gray-500 text-sm italic">{product.detailNote}</p>
                )} */}
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