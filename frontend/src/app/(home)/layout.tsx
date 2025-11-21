
import Header from '@/shared/layouts/header/Header'

export default function layoutHome({ children }: any) {
    return (
        <main className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col">
                {children}
            </main>
        </main>
    )
}
