import { ProductDetailProps, ProductType } from '@/modules/product/types/productType'
import Error from '@/shared/error/Error'
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
        // <div className='p-4 max-w-4xl mx-auto flex flex-col gap-4'>
        //     <div className="relative w-full pb-[60%] rounded-lg overflow-hidden">
        //         <img src={product.thumbnail} alt={product.name} className='absolute inset-0 w-full h-full object-cover rounded-lg' />
        //     </div>
        //     <h1 className='text-2xl font-semibold text-gray-900'>{product.name}</h1>
        //     <p className='text-xl text-gray-700'>{product.price}₫</p>
        //     {product.description && <p className='text-gray-600'>{product.description}</p>}
        //     <div className='flex gap-3 mt-4'>
        //         <button className='flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition'>Thêm vào giỏ hàng</button>
        //         <button className='flex-1 px-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition'>Mua ngay</button>
        //     </div>
        // </div>

        <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-10">

            {/* Breadcrumb */}
            <div className="text-sm text-gray-500">
                <a href="/" className="hover:text-blue-600 transition">Trang chủ</a> /
                <a href="/products" className="hover:text-blue-600 transition"> Sản phẩm</a> /
                <span className="text-gray-700 font-medium"> {product.name}</span>
            </div>

            {/* Ảnh + Thông tin */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

                {/* Ảnh sản phẩm */}
                <div className="relative w-full pb-[100%] bg-gray-50 overflow-hidden">
                    <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>

                {/* Thông tin sản phẩm */}
                <div className="flex flex-col justify-between h-full">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug break-words">
                            {product.name}
                        </h1>

                        <div className="mt-4 flex items-center gap-3">
                            <p className="text-3xl font-bold text-red-600">
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
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Sản phẩm tương tự</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="cursor-pointer">
                            <div className="relative w-full pb-[100%] bg-gray-50 overflow-hidden">
                                <img
                                    src={product.thumbnail}
                                    alt={product.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                            <h3 className="mt-2 text-sm font-medium text-gray-900 truncate">{product.name}</h3>
                            <p className="text-sm text-red-600 font-semibold">{Number(product.price).toLocaleString('vi-VN')}₫</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>



    )
}