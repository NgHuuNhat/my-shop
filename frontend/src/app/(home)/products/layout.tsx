'use client'
import FilterSidebar from '@/shared/components/filter/Filter'
import Footer from '@/shared/components/footer/Footer'
import Search from '@/shared/components/search/Search'
import { usePathname } from 'next/navigation'

export default function Layout({ children }: any) {
    const pathname = usePathname()
    const show = pathname === '/products'

    return (
        <>
            {show ? (
                <div className="flex flex-col w-full max-w-7xl mx-auto">
                    <div className="flex flex-wrap w-full">
                        <Search />
                        <FilterSidebar />
                        {children}
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col w-full max-w-7xl mx-auto">
                    <div className="flex-1 flex">
                        {children}
                    </div>
                </div>
            )}
        </>



    )
}
