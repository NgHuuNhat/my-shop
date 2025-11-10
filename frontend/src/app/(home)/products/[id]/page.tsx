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
        <div className='p-4 max-w-4xl mx-auto flex flex-col gap-4'>
            <div className="relative w-full pb-[60%] rounded-lg overflow-hidden">
                <img src={product.thumbnail} alt={product.name} className='absolute inset-0 w-full h-full object-cover rounded-lg' />
            </div>
            <h1 className='text-2xl font-semibold text-gray-900'>{product.name}</h1>
            <p className='text-xl text-gray-700'>{product.price}₫</p>
            {product.description && <p className='text-gray-600'>{product.description}</p>}
            <div className='flex gap-3 mt-4'>
                <button className='flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition'>Thêm vào giỏ hàng</button>
                <button className='flex-1 px-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition'>Mua ngay</button>
            </div>
        </div>
    )
}