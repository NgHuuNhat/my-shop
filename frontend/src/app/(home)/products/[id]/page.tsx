import { ProductDetailProps, ProductType } from '@/modules/product/types/productType'
import Error from '@/shared/error/Error'

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
        <div className='p-4 max-w-4xl mx-auto'>
            <img src={product.thumbnail} alt={product.name} className='w-full h-80 object-cover rounded-lg' />
            <h1 className='mt-4 text-2xl font-bold'>{product.name}</h1>
            <p className='mt-2 text-xl text-gray-700'>{product.price}₫</p>
            {product.description && <p className='mt-4 text-gray-600'>{product.description}</p>}
            <div className='flex gap-2 mt-4'>
                <button className='px-4 py-2 bg-blue-500 text-white rounded'>Thêm vào giỏ hàng</button>
                <button className='px-4 py-2 bg-green-500 text-white rounded'>Mua ngay</button>
            </div>
        </div>
    )
}