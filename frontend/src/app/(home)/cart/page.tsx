'use client'

import { useCart } from '@/modules/cart/hooks/useCart'
import { CartItem } from '@/modules/cart/types/CartType'
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa'

export default function CartPage() {

    const usecart = useCart((s) => s.cart);


    const [cart, setCart] = useState<CartItem[]>(usecart)

    useEffect(() => {
        setCart(usecart)
    }, [usecart])

    const [coupon, setCoupon] = useState('')
    const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
    const [checkoutStep, setCheckoutStep] = useState<'cart'>('cart')
    const [shippingInfo, setShippingInfo] = useState({ name: '', phone: '', address: '', note: '' })
    const [paymentMethod, setPaymentMethod] = useState<'COD' | 'Banking' | null>(null)
    const [otp, setOtp] = useState('')
    const [showCheckoutModal, setShowCheckoutModal] = useState(false)
    const [checkoutModalStep, setCheckoutModalStep] = useState<'shipping' | 'payment' | 'confirm'>('shipping')
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const subtotal = useMemo(() => cart.reduce((s: any, it: any) => s + it.totalPrice, 0), [cart])
    const totalQty = useMemo(() => cart.reduce((s: any, it: any) => s + it.qty, 0), [cart])
    const discount = useMemo(() => (appliedCoupon === 'SALE10' ? Math.round(subtotal * 0.1) : 0), [appliedCoupon, subtotal])
    const total = subtotal - discount

    // useEffect(() => {
    //     const stored = localStorage.getItem("cart");
    //     if (stored) setCart(JSON.parse(stored));
    // }, []);

    function updateQty(id: string, delta: number) {
        setCart((c: any) => c.map((it: any) => (it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it)))
    }
    function removeItem(id: string) {
        setCart((c: any) => c.filter((it: any) => it.id !== id))
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
        } else alert('Mã không hợp lệ. Dùng: SALE10 để thử.')
    }

    function startCheckout() {
        if (cart.length === 0) {
            alert('Giỏ hàng rỗng — thêm sản phẩm trước khi thanh toán.')
            return
        }
        setShowCheckoutModal(true)
        setCheckoutModalStep('shipping')
    }

    function handleShippingNext() {
        const { name, phone, address } = shippingInfo
        if (!name || !phone || !address) {
            alert('Vui lòng điền đầy đủ thông tin giao hàng.')
            return
        }
        setCheckoutModalStep('payment')
    }

    function handleConfirmPayment() {
        if (!paymentMethod) {
            alert('Vui lòng chọn phương thức thanh toán.')
            return
        }
        setCheckoutModalStep('confirm')
    }

    function verifyOtp() {
        if (otp === '1234') {
            setSuccessMessage('Đặt hàng thành công! Người gửi đang chuẩn bị hàng.')
            resetCart()
        } else alert('OTP không đúng.')
    }

    function completeBanking() {
        setSuccessMessage('Đặt hàng thành công! Người gửi đang chuẩn bị hàng.')
        resetCart()
    }

    function resetCart() {
        setShowCheckoutModal(false)
        // clearCart()
        setShippingInfo({ name: '', phone: '', address: '', note: '' })
        setPaymentMethod(null)
        setOtp('')
        setCheckoutModalStep('shipping')
    }

    return (
        <div className="flex-1 py-6 sm:py-8 relative">
            <div className="max-w-7xl mx-auto px-4">
                {/* ===== Cart Step ===== */}
                <div className="flex items-center gap-3 mb-6">
                    <h1 className="text-xl lg:text-2xl font-semibold flex gap-2 items-center justify-center">
                        <FaShoppingCart /> Giỏ hàng của bạn
                    </h1>
                    <p className="ml-auto text-sm text-gray-500">Bạn có {cart.length} sản phẩm</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <div className="lg:col-span-2">
                        {cart.length === 0 ? (
                            <div className="text-center py-16 text-gray-500">Giỏ hàng trống. Thêm sản phẩm nhé!</div>
                        ) : (
                            <ul className="space-y-4">
                                {cart.map((item) => (
                                    <li key={item.id} className="flex gap-3 sm:gap-4 items-center p-3 sm:p-4 rounded-xl border">
                                        <div className="relative w-30 h-30 flex-shrink-0 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                                            <Image
                                                src={item.image ? item.image : "/images/no-image.png"}
                                                alt={item.name || "Product image"} fill loading='eager' className='object-cover'
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start gap-2">
                                                <div>
                                                    <h3 className="font-medium">{item.name}</h3>
                                                    <p className="text-sm text-gray-500">${item.price}</p>
                                                </div>
                                                <button onClick={() => removeItem(item.id)} className="ml-auto text-gray-400 hover:text-red-500 transition">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                            <div className="mt-3 flex items-center gap-3">
                                                <button onClick={() => updateQty(item.id, -1)} className="p-2 rounded-lg border hover:bg-gray-100">
                                                    <FaMinus />
                                                </button>
                                                <div className="min-w-[36px] text-center">{item.qty}</div>
                                                <button onClick={() => updateQty(item.id, +1)} className="p-2 rounded-lg border hover:bg-gray-100">
                                                    <FaPlus />
                                                </button>
                                                <div className="ml-4 text-sm text-gray-600">Tạm tính: ${item.totalPrice.toFixed(2)}</div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="mt-6 flex flex-col sm:flex-row gap-3">
                            <button onClick={clearCart} className="w-full sm:w-auto px-4 py-2 rounded-lg border hover:bg-red-50 text-red-600">
                                Xoá tất cả
                            </button>
                            <button onClick={() => alert('Tiếp tục mua sắm (demo)')} className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">
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
                                <input value={coupon} onChange={(e) => setCoupon(e.target.value)} className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring" placeholder="Nhập mã (ví dụ SALE10)" />
                                <button onClick={applyCoupon} className="px-4 py-2 rounded-lg bg-gray-800 text-white">Áp dụng</button>
                            </div>
                            {appliedCoupon && <p className="mt-2 text-sm text-green-600">Đã áp dụng: {appliedCoupon}</p>}
                        </div>
                        <button onClick={startCheckout} className="w-full py-3 rounded-xl bg-amber-500 text-white font-medium shadow hover:opacity-95">
                            Tiến hành thanh toán ${total.toFixed(2)}
                        </button>
                        <p className="mt-3 text-xs text-gray-500">Bưu phí và thuế sẽ được tính ở bước tiếp theo.</p>
                    </aside>
                </div>
            </div>

            {/* ===== Modal Checkout Multi-step ===== */}
            {showCheckoutModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-100">
                        {checkoutModalStep === 'shipping' && (
                            <>
                                <h3 className="text-lg font-semibold mb-3">Thông tin giao hàng</h3>
                                <div className="flex flex-col gap-3">
                                    <input placeholder="Họ tên" className="px-3 py-2 border rounded-lg" value={shippingInfo.name} onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })} />
                                    <input placeholder="Số điện thoại" className="px-3 py-2 border rounded-lg" value={shippingInfo.phone} onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })} />
                                    <input placeholder="Địa chỉ" className="px-3 py-2 border rounded-lg" value={shippingInfo.address} onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })} />
                                    <textarea placeholder="Ghi chú (tuỳ chọn)" className="px-3 py-2 border rounded-lg" value={shippingInfo.note} onChange={(e) => setShippingInfo({ ...shippingInfo, note: e.target.value })} />
                                    <div className="flex gap-3 mt-2">
                                        <button onClick={() => setShowCheckoutModal(false)} className="flex-1 py-2 rounded-lg border hover:bg-gray-100">Hủy</button>
                                        <button onClick={handleShippingNext} className="flex-1 py-2 rounded-lg bg-amber-500 text-white">Tiếp theo</button>
                                    </div>
                                </div>
                            </>
                        )}

                        {checkoutModalStep === 'payment' && (
                            <>
                                <h3 className="text-lg font-semibold mb-3">Chọn phương thức thanh toán</h3>
                                <div className="flex flex-col gap-3 mb-4">
                                    <button onClick={() => setPaymentMethod('COD')} className={`py-2 rounded-lg border ${paymentMethod === 'COD' ? 'bg-amber-500 text-white' : 'hover:bg-gray-100'}`}>
                                        Thanh toán khi nhận hàng (COD)
                                    </button>
                                    <button onClick={() => setPaymentMethod('Banking')} className={`py-2 rounded-lg border ${paymentMethod === 'Banking' ? 'bg-amber-500 text-white' : 'hover:bg-gray-100'}`}>
                                        Chuyển khoản / Ngân hàng
                                    </button>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => setCheckoutModalStep('shipping')} className="flex-1 py-2 rounded-lg border hover:bg-gray-100">Quay lại</button>
                                    <button onClick={handleConfirmPayment} className="flex-1 py-2 rounded-lg bg-amber-500 text-white">Xác nhận</button>
                                </div>
                            </>
                        )}

                        {checkoutModalStep === 'confirm' && paymentMethod === 'COD' && (
                            <>
                                <h3 className="text-lg font-semibold mb-3">Xác minh OTP</h3>
                                <p className="text-sm mb-3">Nhập mã OTP (demo: 1234)</p>
                                <input value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full border px-3 py-2 rounded-lg mb-4" placeholder="OTP" />
                                <div className="flex gap-3">
                                    <button onClick={() => setCheckoutModalStep('payment')} className="flex-1 py-2 rounded-lg border hover:bg-gray-100">Quay lại</button>
                                    <button onClick={verifyOtp} className="flex-1 py-2 rounded-lg bg-amber-500 text-white">Xác nhận</button>
                                </div>
                            </>
                        )}

                        {checkoutModalStep === 'confirm' && paymentMethod === 'Banking' && (
                            <>
                                <h3 className="text-lg font-semibold mb-3">Quét mã QR để thanh toán</h3>
                                <div className="border p-4 mb-4">[QR CODE DEMO]</div>
                                <button onClick={completeBanking} className="w-full py-2 rounded-lg bg-amber-500 text-white">Thanh toán xong</button>
                                <button onClick={() => setCheckoutModalStep('payment')} className="w-full py-2 mt-2 rounded-lg border hover:bg-gray-100">Quay lại</button>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* ===== Success Message ===== */}
            {successMessage && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow z-50">
                    {successMessage}
                    <button onClick={() => setSuccessMessage(null)} className="ml-2 font-bold">✕</button>
                </div>
            )}
        </div>
    )
}
