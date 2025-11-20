import Footer from '@/shared/layout/footer/Footer'

export default function layout({ children }: any) {
    return (
        <main>
            {children}
            <Footer />
        </main>
    )
}
