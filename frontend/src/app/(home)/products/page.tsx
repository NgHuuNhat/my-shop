import ProductList from '@/modules/product/components/ProductList'
import { ProductPageProps, ProductType } from '@/modules/product/types/productType'
import Filter from '@/shared/components/filter/Filter'
import Pagination from '@/shared/components/pagination/Pagination'
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@/shared/components/pagination/paginationConstant'
import Search from '@/shared/components/search/Search'
import React from 'react'

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
  if (currentPrice) {
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
    <div>
      {/* desktop */}
      <div className='hidden lg:grid grid-cols-4 max-w-7xl mx-auto px-4'>
        <div className='col-span-1'><Filter /></div>
        <div className='col-span-3'>
          <div className=''><Search /></div>
          <div>
            {(currentSearch || currentPrice) && (
              <p className="w-full max-w-7xl mx-auto px-4 pb-0 text-sm mt-[-20px]">
                Có {filteredProducts().length} kết quả...
              </p>
            )}
          </div>
          <div className=''><ProductList products={filteredProducts()} /></div>
          <div>
            {(currentSearch || price) ? (
              <div className="flex justify-center items-center gap-4 py-10 w-full max-w-7xl mx-auto"></div>
            ) : (
              <Pagination data={products} />
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className='lg:hidden'>
        <div className='pt-5'><Search /></div>

        <div className='flex items-center justify-between px-4 py-4'>
          <div>
            {(currentSearch || currentPrice) && (
              <p className="w-full max-w-7xl mx-auto pb-0 text-sm">
                Có {filteredProducts().length} kết quả
              </p>
            ) || (
                <p className="w-full max-w-7xl mx-auto pb-0 text-sm">
                  Trang {currentPage}
                </p>
              )}
          </div>
          <div className=''><Filter /></div>
        </div>

        <div className=''><ProductList products={filteredProducts()} /></div>
        <div>
          {(currentSearch || price) ? (
            <div className="flex justify-center items-center gap-4 py-10 w-full max-w-7xl mx-auto"></div>
          ) : (
            <Pagination data={products} />
          )}
        </div>
      </div>
    </div>
  )
}
