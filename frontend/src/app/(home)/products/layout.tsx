import Footer from '@/shared/layouts/footer/Footer'

export default function layout({ children }: any) {
    return (
        <main>
            {children}
            <Footer />
        </main>
    )
}
