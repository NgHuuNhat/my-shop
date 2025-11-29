'use client'

import { useCart } from '@/modules/cart/hooks/useCart'
//
import { ShippingInfo } from '@/modules/cart/types/xartType'
import { useOrder } from '@/modules/order/hooks/useOrder'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa'

export default function CartPage() {
    const { addOrder } = useOrder()
    const router = useRouter();
    const { cart, clearCart, removeItem, updateQty } = useCart()
    const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
        province: '',
        district: '',
        address: '',
        name: '',
        phone: '',
        note: '',
    })
    const [paymentMethod, setPaymentMethod] = useState<'COD' | 'BANKING' | null>(null)

    const total = useMemo(() => cart.reduce((s, it) => s + it.totalPrice, 0), [cart])
    const totalQty = useMemo(() => cart.reduce((s, it) => s + it.qty, 0), [cart])

    // // Lưu mỗi khi thay đổi
    // useEffect(() => {
    //     localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
    // }, [shippingInfo]);

    // Khi mount component, đọc lại
    useEffect(() => {
        const stored = localStorage.getItem('shippingInfo');
        if (stored) setShippingInfo(JSON.parse(stored));
    }, []);


    return (
        <div className="flex-1 py-6 sm:py-8 relative bg-gray-100">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center gap-3 mb-6">
                    <h3 className="text-xl font-semibold flex gap-2 items-center justify-center">Giỏ hàng</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        {cart.length === 0 ? (
                            <div className="bg-white rounded-2xl text-center py-16 text-gray-500">
                                Giỏ hàng trống.
                                {/* <Link href={`/products`} className='text-center border-b text-blue-500'>Thêm sản phẩm nhé!</Link> */}
                            </div>
                        ) : (
                            <ul className="space-y-1">
                                {cart.map((item, index) => (
                                    <li key={item.id} className="bg-white flex gap-3 sm:gap-4 items-center p-3 sm:p-4 rounded-2xl">
                                        <div>{index + 1}</div>
                                        <Link href={`/products/${item.id}`} className="relative w-20 h-20 flex-shrink-0 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                                            <Image
                                                src={item.image || '/images/no-image.png'}
                                                alt={item.name || 'Product image'}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </Link>
                                        <div className="flex-1">
                                            <div className="flex items-start gap-2">
                                                <div>
                                                    <h3 className="font-medium">{item.name}</h3>
                                                    <p className="text-sm text-gray-500">${item.price}</p>
                                                </div>
                                                <button onClick={() => removeItem(item.id)} className="cursor-pointer ml-auto text-gray-400 hover:text-red-500 transition">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                            <div className="mt-3 flex items-center gap-3">
                                                <button onClick={() => updateQty(item.id, -1)} className="cursor-pointer p-2 rounded-lg border hover:bg-gray-100">
                                                    <FaMinus />
                                                </button>
                                                <div className="min-w-[36px] text-center">{item.qty}</div>
                                                <button onClick={() => updateQty(item.id, 1)} className="cursor-pointer p-2 rounded-lg border hover:bg-gray-100">
                                                    <FaPlus />
                                                </button>
                                                <div className="ml-4 text-sm text-gray-600">Tạm tính: ${item.totalPrice.toFixed(2)}</div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className='text-center'>
                            <Link href={`/products`} className='cursor-pointer border-b text-blue-500'>Thêm sản phẩm!</Link>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="bg-white rounded-xl p-4 sticky top-4 md:col-span-1 space-y-4">
                    {/* Thông tin đơn hàng */}
                    <div className="text-center font-semibold">Thông tin đơn hàng</div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Sản phẩm</span>
                        <span>{cart.length}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Số lượng</span>
                        <span>{totalQty}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg">
                        <span>Thành tiền</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <hr className="my-4 border-gray-300" />

                    {/* Thông tin người nhận */}
                    <div className="text-center font-semibold">Thông tin người nhận</div>
                    <div className="flex flex-col gap-2 text-sm">
                        <select
                            className={`px-2 py-2 rounded bg-gray-50 focus:outline-none 
                                    ${shippingInfo.province === '' ? 'text-gray-400' : 'text-black'}
                                    `}
                            value={shippingInfo.province}
                            onChange={(e) =>
                                setShippingInfo({ ...shippingInfo, province: e.target.value, district: '' })
                            }
                        >
                            <option value="">Tỉnh / Thành phố</option>
                            <option value="Hà Nội">Hà Nội</option>
                            <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                            <option value="Đà Nẵng">Đà Nẵng</option>
                        </select>

                        <select
                            className={`px-2 py-2 rounded bg-gray-50 focus:outline-none
                                    ${shippingInfo.district === '' ? 'text-gray-400' : 'text-black'}
                                    `}
                            value={shippingInfo.district}
                            onChange={(e) =>
                                setShippingInfo({ ...shippingInfo, district: e.target.value })
                            }
                            disabled={!shippingInfo.province}
                        >
                            <option value="">Phường</option>
                            {shippingInfo.province === 'Hà Nội' && (
                                <>
                                    <option value="Phường Ba Đình">Ba Đình</option>
                                    <option value="Phường Hoàn Kiếm">Hoàn Kiếm</option>
                                    <option value="Phường Đống Đa">Đống Đa</option>
                                </>
                            )}
                            {shippingInfo.province === 'Hồ Chí Minh' && (
                                <>
                                    <option value="Phường Sài Gòn">Phường Sài Gòn</option>
                                    <option value="Phường An Hội Tây">Phường An Hội Tây</option>
                                    <option value="Phường Gia Định">Phường Gia Định</option>
                                </>
                            )}
                            {shippingInfo.province === 'Đà Nẵng' && (
                                <>
                                    <option value="Phường Hải Châu">Hải Châu</option>
                                    <option value="Phường Thanh Khê">Thanh Khê</option>
                                </>
                            )}
                        </select>

                        <input
                            type="text"
                            placeholder="Số nhà + tên đường"
                            className="px-3 py-2 rounded bg-gray-50 focus:outline-none"
                            value={shippingInfo.address}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                        />

                        <input
                            type="text"
                            placeholder="Họ và tên"
                            className="px-3 py-2 rounded bg-gray-50 focus:outline-none"
                            value={shippingInfo.name}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                        />

                        <input
                            type="text"
                            placeholder="Số điện thoại"
                            className="px-3 py-2 rounded bg-gray-50 focus:outline-none"
                            value={shippingInfo.phone}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                        />

                        <input
                            type="text"
                            placeholder="Ghi chú (tùy chọn)"
                            className="px-3 py-2 rounded bg-gray-50 focus:outline-none"
                            value={shippingInfo.note}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, note: e.target.value })}
                        />

                        {/* Phương thức thanh toán */}
                        <select
                            className={`w-full px-2 py-2 rounded bg-gray-50 focus:outline-none
                                ${paymentMethod ? 'text-black' : 'text-gray-400'}
                                `}
                            value={paymentMethod || ''}
                            onChange={(e) => setPaymentMethod(e.target.value as 'COD' | 'BANKING')}
                        >
                            <option value="">Chọn phương thức thanh toán</option>
                            <option value="COD">Thanh toán khi nhận hàng</option>
                            <option value="BANKING">Chuyển khoản</option>
                        </select>
                    </div>

                    {/* Đặt hàng */}
                    <button
                        onClick={() => {
                            if (cart.length === 0) {
                                alert('Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi đặt hàng.')
                                return
                            }
                            if (!shippingInfo.province || !shippingInfo.district || !shippingInfo.name || !shippingInfo.phone || !shippingInfo.address) {
                                alert('Vui lòng điền đầy đủ thông tin nhận hàng.')
                                return
                            }
                            if (!paymentMethod) {
                                alert('Vui lòng chọn phương thức thanh toán.')
                                return
                            }

                            // Xác minh OTP
                            const userOtp = prompt('Nhập mã OTP (demo: 1234)')
                            if (userOtp === '1234') {
                                // 👉 Tạo đơn hàng
                                addOrder({
                                    id: Date.now().toString(),
                                    products: cart.map(c => ({
                                        id: c.id,
                                        name: c.name,
                                        qty: c.qty,
                                        price: c.price,
                                        totalPrice: c.totalPrice,
                                        image: c.image
                                    })),
                                    totalOrderItem: total,
                                    shippingInfo: {
                                        name: shippingInfo.name,
                                        phone: shippingInfo.phone,
                                        province: shippingInfo.province,
                                        district: shippingInfo.district,
                                        address: shippingInfo.address,
                                        note: shippingInfo.note,
                                    },
                                    paymentMethod,
                                    createdAt: new Date().toISOString()
                                });
                                alert('Đặt hàng thành công! Người gửi đang chuẩn bị hàng.')
                                clearCart()
                                localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
                                // setShippingInfo({
                                //     province: '',
                                //     district: '',
                                //     address: '',
                                //     name: '',
                                //     phone: '',
                                //     note: '',
                                // })
                                setPaymentMethod(null)
                                router.push("/order");

                            } else {
                                alert('OTP không đúng.')
                            }
                        }}
                        className="cursor-pointer w-full py-3 mt-2 rounded-xl bg-amber-500 text-white font-bold"
                    >
                        Đặt hàng
                    </button>
                </aside>

            </div>
        </div>
        </div >
    )
}
