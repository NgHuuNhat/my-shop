import Footer from '@/shared/components/footer/Footer'
import Header from '@/shared/components/header/Header'

export default function layout({ children }: any) {
    return (
        <div className='min-h-screen flex flex-col'>
            <Header />
            <main className="flex-1 flex flex-col">
                {children}
            </main>
        </div>
    )
}
