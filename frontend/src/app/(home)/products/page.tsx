import ProductList from "@/modules/product/components/ProductList"
import { ProductType } from "@/modules/product/types/productType"
import Loading from "@/shared/loading/Loading"

export default async function ProductPage() {
  const products: ProductType[] = await fetch('https://691078c77686c0e9c20a6dc4.mockapi.io/api/product', {
    next: { revalidate: 60 },
  })
    .then(res => res.ok ? res.json() : null)
    .then(data => Array.isArray(data) ? data : [])
    .catch(() => [])

  return (
    <div className='flex-1 flex flex-col items-center justify-center'>
      <ProductList products={products} />
    </div>
  )
}
