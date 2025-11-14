import ProductList from "@/modules/product/components/ProductList"
import { ProductPageProps, ProductType } from "@/modules/product/types/productType"
import Pagination from "@/shared/components/pagination/Pagination"
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/shared/components/pagination/paginationConstant"

export default async function ProductsPage({ searchParams }: ProductPageProps) {
  const { page, limit, search }: any = await searchParams
  const currentPage = Number(page) || DEFAULT_PAGE
  const currentLimit = Number(limit) || DEFAULT_LIMIT
  const currenSearch = search || ''

  // `https://691078c77686c0e9c20a6dc4.mockapi.io/api/product?search=${currenSearch}&page=${currentPage}&limit=${currentLimit}`

  const urlApi = currenSearch
    ? `https://691078c77686c0e9c20a6dc4.mockapi.io/api/product?search=${currenSearch}`
    : `https://691078c77686c0e9c20a6dc4.mockapi.io/api/product?page=${currentPage}&limit=${currentLimit}`

  const products: ProductType[] = await (
    fetch(urlApi, { next: { revalidate: 60 } })
      .then(res => res.ok ? res.json() : null)
      .then(data => Array.isArray(data) ? data : [])
      .catch(() => [])
  );

  return (
    <div className="flex-1 flex flex-col">
      {currenSearch && <p className="w-full max-w-7xl mx-auto px-4 pb-2">Có {products.length} kết quả tìm kiếm...</p>}
      <ProductList products={products} />
      {currenSearch ? (
        <div className="flex justify-center items-center gap-4 py-10 w-full max-w-7xl mx-auto"></div>
      ) : (
        <Pagination data={products} />
      )}
    </div>
  )
}
