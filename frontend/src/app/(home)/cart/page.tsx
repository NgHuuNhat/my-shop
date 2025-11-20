'use client'

import React, { useMemo, useState } from 'react'
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa'

export type CartItem = {
    id: string
    title: string
    price: number
    qty: number
    img?: string
}

export default function CartPage() {
    const [cart, setCart] = useState<CartItem[]>([
        { id: 'p1', title: 'AirPods Pro (mock)', price: 249, qty: 1 },
        { id: 'p2', title: 'iPhone 14 Case (mock)', price: 39, qty: 2 },
    ])

    const [coupon, setCoupon] = useState('')
    const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)

    const subtotal = useMemo(
        () => cart.reduce((s, it) => s + it.price * it.qty, 0),
        [cart]
    )

    const totalQty = useMemo(
        () => cart.reduce((s, it) => s + it.qty, 0),
        [cart]
    )

    const discount = useMemo(() => {
        if (appliedCoupon === 'SALE10') return Math.round(subtotal * 0.1)
        return 0
    }, [appliedCoupon, subtotal])

    const total = subtotal - discount

    function updateQty(id: string, delta: number) {
        setCart((c) =>
            c.map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it)).filter(Boolean)
        )
    }

    function removeItem(id: string) {
        setCart((c) => c.filter((it) => it.id !== id))
    }

    function clearCart() {
        setCart([])
    }

    function applyCoupon() {
        const code = coupon.trim().toUpperCase()
        if (!code) return
        if (code === 'SALE10') {
            setAppliedCoupon('SALE10')
            setCoupon('')
        } else {
            alert('Mã không hợp lệ. Dùng: SALE10 để thử. ')
        }
    }

    function handleCheckout() {
        if (cart.length === 0) {
            alert('Giỏ hàng rỗng — thêm sản phẩm trước khi thanh toán.')
            return
        }
        alert(`Thanh toán: ${total} USD (demo)`)
        clearCart()
    }

    return (
        <div className="flex-1 py-6 sm:py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center gap-3 mb-6">
                    <h1 className="text-xl lg:text-2xl font-semibold flex gap-2"><FaShoppingCart />Giỏ hàng của bạn</h1>
                    <p className="ml-auto text-sm text-gray-500">Bạn có {cart.length} sản phẩm</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <div className="lg:col-span-2">
                        {cart.length === 0 ? (
                            <div className="text-center py-16 text-gray-500">
                                Giỏ hàng trống. Thêm sản phẩm nhé!
                            </div>
                        ) : (
                            <ul className="space-y-4">
                                {cart.map((item) => (
                                    <li key={item.id} className="flex gap-3 sm:gap-4 items-center p-3 sm:p-4 rounded-xl border">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg bg-gray-100 flex items-center justify-center">
                                            <span className="text-xs text-gray-400">Ảnh</span>
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-start gap-2">
                                                <div>
                                                    <h3 className="font-medium">{item.title}</h3>
                                                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="ml-auto text-gray-400 hover:text-red-500 transition"
                                                    aria-label={`Xoá ${item.title}`}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>

                                            <div className="mt-3 flex items-center gap-3">
                                                <button
                                                    onClick={() => updateQty(item.id, -1)}
                                                    className="p-2 rounded-lg border hover:bg-gray-100"
                                                    aria-label="giảm"
                                                >
                                                    <FaMinus />
                                                </button>
                                                <div className="min-w-[36px] text-center">{item.qty}</div>
                                                <button
                                                    onClick={() => updateQty(item.id, +1)}
                                                    className="p-2 rounded-lg border hover:bg-gray-100"
                                                    aria-label="tăng"
                                                >
                                                    <FaPlus />
                                                </button>

                                                <div className="ml-4 text-sm text-gray-600">Tạm tính: ${(item.price * item.qty).toFixed(2)}</div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="mt-6 flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={clearCart}
                                className="w-full sm:w-auto px-4 py-2 rounded-lg border hover:bg-red-50 text-red-600"
                            >
                                Xoá tất cả
                            </button>

                            <button
                                onClick={() => alert('Tiếp tục mua sắm (demo)')}
                                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                            >
                                Tiếp tục mua sắm
                            </button>
                        </div>
                    </div>

                    <aside className="rounded-xl border p-4 sticky top-4 md:col-span-1">
                        <h4 className="font-medium mb-4">Tóm tắt đơn hàng</h4>

                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Tổng sản phẩm</span>
                            <span>{cart.length}</span>
                        </div>

                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Tổng số lượng</span>
                            <span>{totalQty}</span>
                        </div>

                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Tạm tính</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Giảm giá</span>
                            <span>-${discount.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between font-semibold text-lg mb-4">
                            <span>Tổng</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <div className="mb-3">
                            <label className="text-sm text-gray-600 block mb-2">Mã giảm giá</label>
                            <div className="flex gap-2">
                                <input
                                    value={coupon}
                                    onChange={(e) => setCoupon(e.target.value)}
                                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring"
                                    placeholder="Nhập mã (ví dụ SALE10)"
                                />
                                <button onClick={applyCoupon} className="px-4 py-2 rounded-lg bg-gray-800 text-white">
                                    Áp dụng
                                </button>
                            </div>
                            {appliedCoupon && <p className="mt-2 text-sm text-green-600">Đã áp dụng: {appliedCoupon}</p>}
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="w-full py-3 rounded-xl bg-amber-500 text-white font-medium shadow hover:opacity-95"
                        >
                            Thanh toán ${total.toFixed(2)}
                        </button>

                        <p className="mt-3 text-xs text-gray-500">Bưu phí và thuế sẽ được tính ở bước tiếp theo.</p>
                    </aside>
                </div>
            </div>
        </div>
    )
}