'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';

const Search = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(searchParams.get("search") || "");

    // mỗi khi searchParams thay đổi → update value
    useEffect(() => {
        setValue(searchParams.get("search") || "");
    }, [searchParams]);

    // Debounce: cập nhật URL sau 300ms
    useEffect(() => {
        const delay = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (value == '') {
                params.delete("search");
            } else {
                params.delete("page");
                params.delete("limit");
                params.set("search", value);
            }
            router.replace(`?${params.toString()}`, { scroll: false });
        }, 700);
        return () => clearTimeout(delay);
    }, [value]);

    return (
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-3 px-4 py-3 lg:py-10 max-w-7xl mx-auto">

            {/* Ô tìm kiếm */}
            <form onSubmit={(e) => e.preventDefault()} className="px-4 group overflow-hidden border border-gray-200 flex-1 flex gap-1 w-full rounded-2xl focus:outline-none focus-within:border-gray-950 focus-within:text-gray-950 transition-color text-gray-700 placeholder-gray-400">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder='Tìm kiếm sản phẩm...'
                    className="flex-1 w-full py-2 rounded-lg focus:outline-none transition text-gray-700 placeholder-gray-400"
                />
                <div
                    className={`flex justify-center items-center transition-colors
                    ${value.trim().length > 0 ? "text-gray-950" : "text-gray-400"}
                    `}
                >
                    <FaSearch />
                </div>
            </form>

            {/* Sap xep */}
            <div className="relative w-full md:w-full lg:w-[200px]">
                <select
                    className="appearance-none w-full px-4 py-2 border border-gray-200 rounded-2xl focus:outline-none transition text-gray-400 cursor-pointer "
                >
                    <option value="all">Mới nhất</option>
                    <option value="low">Cũ nhất</option>
                    <option value="mid">Giá tăng dần</option>
                    <option value="high">Giá giảm dần</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▾</span>
            </div>

            {/* Bộ lọc danh mục */}
            {/* <div className="relative w-full md:w-full lg:w-[250px]">
                <select
                    className="appearance-none w-full px-4 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:border-gray-400 transition text-gray-700 bg-white cursor-pointer"
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
            </div> */}
        </div >
    )
}

export default React.memo(Search);