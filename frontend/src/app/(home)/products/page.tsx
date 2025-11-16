import ProductList from "@/modules/product/components/ProductList"
import { ProductPageProps, ProductType } from "@/modules/product/types/productType"
import Footer from "@/shared/components/footer/Footer"
import Pagination from "@/shared/components/pagination/Pagination"
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/shared/components/pagination/paginationConstant"

export default async function ProductsPage({ searchParams }: ProductPageProps) {
  const { page, limit, search, price }: any = await searchParams
  const currentPage = Number(page) || DEFAULT_PAGE
  const currentLimit = Number(limit) || DEFAULT_LIMIT
  const currentSearch = search || ''
  const currentPrice = price || ''

  // build query params
  const queryParams = new URLSearchParams()
  queryParams.set('page', currentPage.toString())
  queryParams.set('limit', currentLimit.toString())
  if (currentSearch) {
    queryParams.set('search', currentSearch)
    queryParams.delete('page')
    queryParams.delete('limit')
  }

  const urlApi = `https://691078c77686c0e9c20a6dc4.mockapi.io/api/product?${queryParams.toString()}`

  const products: ProductType[] = await (
    fetch(urlApi, { next: { revalidate: 60 } })
      .then(res => res.ok ? res.json() : null)
      .then(data => Array.isArray(data) ? data : [])
      .catch(() => [])
  );

  const filteredProducts = () => {
    if (!currentPrice) return products;
    let min: number, max: number;
    if (currentPrice.includes('-')) {
      [min, max] = currentPrice.split('-').map(Number);
    }
    return products.filter((p: any) => {
      const priceNum = parseFloat(p.price);
      if (!max) return priceNum >= min;
      return priceNum >= min && priceNum <= max;
    });
  }

  return (
    <div className="flex-1 flex flex-col">

      {/* ket qua tim kiem */}
      {(currentSearch || currentPrice) && (
        <p className="w-full max-w-7xl mx-auto px-4 pb-2 mt-[-28px] text-sm">
          Có {filteredProducts().length} sản phẩm...
        </p>
      )}

      {/* producst-list */}
      <ProductList products={filteredProducts()} />

      {/* pagination */}
      {(currentSearch || price) ? (
        <div className="flex justify-center items-center gap-4 py-10 w-full max-w-7xl mx-auto"></div>
      ) : (
        <Pagination data={products} />
      )}
    </div>
  )
}
