import Link from 'next/link'

export default function MenuMobile({ open, setOpen, content }: { open: boolean; setOpen: (v: boolean) => void; content?: any }) {
    const closeMenu = () => setOpen(false)

    // Slide từ trái sang phải
    const slideFromLeft = (open: boolean) =>
        open ? 'translate-x-0 left-0' : '-translate-x-full left-0';

    // Slide từ phải sang trái
    const slideFromRight = (open: boolean) =>
        open ? 'translate-x-0 right-0' : 'translate-x-full right-0';


    return (
        <>
            {/* Menu Panel */}
            <div
                className={`
          fixed top-0 h-full w-[80%] max-w-xs bg-white shadow-xl z-70
          transform transition-transform duration-300
           ${slideFromRight(open)} 
          lg:hidden
        `}
            >
                {/* Header */}
                <div className="sticky top-0 h-[50px] flex items-center justify-between px-4 bg-white">
                    <h3 className="font-bold flex items-center gap-2 text-lg">
                        {/* <FaBars /> Menu */}
                    </h3>
                    <button onClick={closeMenu} className="text-4xl font-bold text-gray-900">
                        ×
                    </button>
                </div>

                {/* Content */}
                {content ? (
                    <nav className="flex flex-col text-xl px-6">
                        {content}
                    </nav>
                ) : (
                    <nav className="flex flex-col text-xl px-6">
                        <Link
                            href="/"
                            onClick={closeMenu}
                            className="p-4 font-bold text-[#111] hover:text-[#707072] transition-colors"
                        >
                            Home
                        </Link>

                        <Link
                            href="/products"
                            onClick={closeMenu}
                            className="p-4 font-bold text-[#111] hover:text-[#707072] transition-colors"
                        >
                            Products
                        </Link>
                    </nav>
                )}

                {/* Content */}
                {/* <nav className="flex flex-col text-xl px-6">
                    <Link
                        href="/"
                        onClick={closeMenu}
                        className="p-4 font-bold text-[#111] hover:text-[#707072] transition-colors"
                    >
                        Home
                    </Link>

                    <Link
                        href="/products"
                        onClick={closeMenu}
                        className="p-4 font-bold text-[#111] hover:text-[#707072] transition-colors"
                    >
                        Products
                    </Link>
                </nav> */}
            </div>

            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-60"
                    onClick={closeMenu}
                />
            )}
        </>
    )
}
