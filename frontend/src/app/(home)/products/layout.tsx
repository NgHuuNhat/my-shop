import Footer from '@/shared/components/layout/footer/Footer'

export default function layout({ children }: any) {
    return (
        <main>
            {children}
            <Footer />
        </main>
    )
}
