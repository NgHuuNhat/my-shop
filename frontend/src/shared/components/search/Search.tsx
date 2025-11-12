import React from 'react'

const Search = () => {
    return (
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-3 p-4 py-10 max-w-7xl mx-auto">

            {/* Ô tìm kiếm */}
            <input
                type="text"
                placeholder="🔍 Tìm sản phẩm..."
                className="flex-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition text-gray-700 placeholder-gray-400"
            />

            {/* Bộ lọc giá */}
            <div className="relative w-full md:w-full lg:w-[200px]">
                <select
                    className="appearance-none w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition text-gray-700 bg-white cursor-pointer"
                >
                    <option value="all">Tất cả mức giá</option>
                    <option value="low">Dưới 500.000₫</option>
                    <option value="mid">Từ 500.000₫ đến 2.000.000₫</option>
                    <option value="high">Trên 2.000.000₫</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▾</span>
            </div>

            {/* Bộ lọc danh mục */}
            <div className="relative w-full md:w-full lg:w-[250px]">
                <select
                    className="appearance-none w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition text-gray-700 bg-white cursor-pointer"
                >
                    <option value="all">Tất cả danh mục sản phẩm</option>
                    <option value="phone">Điện thoại thông minh</option>
                    <option value="laptop">Laptop / MacBook</option>
                    <option value="tablet">Máy tính bảng</option>
                    <option value="accessory">Phụ kiện công nghệ</option>
                    <option value="sound">Tai nghe / Loa Bluetooth</option>
                    <option value="watch">Đồng hồ thông minh</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▾</span>
            </div>
        </div>
    )
}

export default React.memo(Search);