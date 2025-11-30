'use client'

import { CartItem } from '@/modules/cart/types/xartType'
import { useOrder } from '@/modules/order/hooks/useOrder'
import { OrderItem } from '@/modules/order/types/orderType'
import Link from 'next/link'
import React, { useState, useMemo } from 'react'
import { FaClipboardList } from 'react-icons/fa'

// export type OrderProduct = {
//     id: string
//     title: string
//     qty: number
//     price: number
// }

// export type OrderItem = {
//     id: string
//     orderCode: string
//     products: OrderProduct[]
//     paymentMethod: 'BANKING' | 'COD'
//     shippingStatus: 'Đang xử lý' | 'Đang vận chuyển' | 'Đã giao'
//     paid?: boolean
//     recipientName: string
//     recipientPhone: string
//     recipientAddress: string
//     orderDate: string
//     deliveredAt?: string // Thời gian giao hàng
//     note?: string
// }


export default function OrderPage() {
    const [search, setSearch] = useState('')
    const { orders } = useOrder()

    // const orders: OrderItem[] = [
    //     {
    //         id: 'o1',
    //         orderCode: 'DH001',
    //         products: [{ id: 'p1', title: 'AirPods Pro', qty: 1, price: 249 }],
    //         paymentMethod: 'BANKING',
    //         shippingStatus: 'Đã giao',
    //         recipientName: 'Nguyễn Văn A',
    //         recipientPhone: '0912345678',
    //         recipientAddress: 'TP.HCM',
    //         orderDate: '2025-11-19 14:30',
    //         deliveredAt: '2025-11-20 10:15',
    //         note: 'Giao giờ hành chính',
    //     },
    //     {
    //         id: 'o2',
    //         orderCode: 'DH002',
    //         products: [{ id: 'p2', title: 'iPhone 14 Case', qty: 2, price: 39 }],
    //         paymentMethod: 'COD',
    //         paid: false,
    //         shippingStatus: 'Đang vận chuyển',
    //         recipientName: 'Trần Thị B',
    //         recipientPhone: '0987654321',
    //         recipientAddress: 'Hà Nội',
    //         orderDate: '2025-11-18 09:15',
    //         note: 'Khách yêu cầu gọi trước',
    //     },
    //     {
    //         id: 'o3',
    //         orderCode: 'DH003',
    //         products: [{ id: 'p3', title: 'MacBook Pro', qty: 1, price: 1999 }],
    //         paymentMethod: 'COD',
    //         paid: true,
    //         shippingStatus: 'Đã giao',
    //         recipientName: 'Lê Văn C',
    //         recipientPhone: '0912345000',
    //         recipientAddress: 'Đà Nẵng',
    //         orderDate: '2025-12-22 16:45',
    //         deliveredAt: '2025-12-23 11:00',
    //         note: 'Hàng dễ vỡ',
    //     },
    //     {
    //         id: 'o4',
    //         orderCode: 'DH004',
    //         products: [{ id: 'p4', title: 'iPad Air', qty: 1, price: 599 }],
    //         paymentMethod: 'BANKING',
    //         shippingStatus: 'Đang vận chuyển',
    //         recipientName: 'Phạm Thị D',
    //         recipientPhone: '0901111222',
    //         recipientAddress: 'HCM',
    //         orderDate: '2025-11-20 11:00',
    //         note: 'Giao trước 12h trưa',
    //     },
    //     {
    //         id: 'o5',
    //         orderCode: 'DH005',
    //         products: [{ id: 'p5', title: 'Apple Watch', qty: 1, price: 399 }],
    //         paymentMethod: 'COD',
    //         paid: false,
    //         shippingStatus: 'Đang xử lý',
    //         recipientName: 'Nguyễn Văn E',
    //         recipientPhone: '0933334444',
    //         recipientAddress: 'Hà Nội',
    //         orderDate: '2025-11-21 15:30',
    //         note: 'Khách nhờ kiểm tra hộp',
    //     },
    //     {
    //         id: 'o6',
    //         orderCode: 'DH006',
    //         products: [{ id: 'p6', title: 'AirPods Max', qty: 1, price: 549 }],
    //         paymentMethod: 'BANKING',
    //         shippingStatus: 'Đã giao',
    //         recipientName: 'Trần Thị F',
    //         recipientPhone: '0944445555',
    //         recipientAddress: 'Huế',
    //         orderDate: '2025-11-22 10:20',
    //         deliveredAt: '2025-11-23 09:00',
    //         note: 'Giao qua bưu điện',
    //     },
    //     {
    //         id: 'o7',
    //         orderCode: 'DH007',
    //         products: [{ id: 'p7', title: 'Mac Mini', qty: 1, price: 699 }],
    //         paymentMethod: 'COD',
    //         paid: true,
    //         shippingStatus: 'Đã giao',
    //         recipientName: 'Lê Văn G',
    //         recipientPhone: '0955556666',
    //         recipientAddress: 'HCM',
    //         orderDate: '2025-11-23 13:45',
    //         deliveredAt: '2025-11-24 14:30',
    //         note: 'Khách yêu cầu đóng gói kỹ',
    //     },
    //     {
    //         id: 'o8',
    //         orderCode: 'DH008',
    //         products: [{ id: 'p8', title: 'iPhone 15', qty: 1, price: 1099 }],
    //         paymentMethod: 'BANKING',
    //         shippingStatus: 'Đang vận chuyển',
    //         recipientName: 'Phạm Thị H',
    //         recipientPhone: '0966667777',
    //         recipientAddress: 'Hà Nội',
    //         orderDate: '2025-11-24 09:50',
    //         note: 'Giao sau 17h',
    //     },
    //     {
    //         id: 'o9',
    //         orderCode: 'DH009',
    //         products: [{ id: 'p9', title: 'iMac', qty: 1, price: 1799 }],
    //         paymentMethod: 'COD',
    //         paid: false,
    //         shippingStatus: 'Đang xử lý',
    //         recipientName: 'Nguyễn Văn I',
    //         recipientPhone: '0977778888',
    //         recipientAddress: 'Đà Nẵng',
    //         orderDate: '2025-11-25 16:10',
    //         note: 'Kiểm tra hóa đơn trước khi giao',
    //     },
    //     {
    //         id: 'o10',
    //         orderCode: 'DH010',
    //         products: [{ id: 'p10', title: 'HomePod', qty: 1, price: 199 }],
    //         paymentMethod: 'BANKING',
    //         shippingStatus: 'Đã giao',
    //         recipientName: 'Trần Thị K',
    //         recipientPhone: '0988889999',
    //         recipientAddress: 'HCM',
    //         orderDate: '2025-11-26 12:30',
    //         deliveredAt: '2025-11-27 10:45',
    //         note: 'Giao tại quầy bưu điện',
    //     },
    // ]



    // Colors

    const paymentColors = {
        paid: 'bg-green-100 text-green-800',
        unpaid: 'bg-red-100 text-red-800',
    }

    const shippingColors = {
        'Đang xử lý': 'bg-yellow-100 text-yellow-800',
        'Đang vận chuyển': 'bg-blue-100 text-blue-800',
        'Đã giao': 'bg-green-100 text-green-800',
    }

    const getPaymentStatus = (order: OrderItem) => {
        if (order.paymentMethod === 'BANKING') {
            return order.paid
                ? { text: '', color: paymentColors.paid }
                : { text: 'Chưa thanh toán', color: paymentColors.unpaid }
        }
        if (order.paymentMethod === 'COD') {
            return order.paid
                ? { text: '', color: paymentColors.paid }
                : { text: 'Chưa thanh toán', color: paymentColors.unpaid }
        }
        return { text: 'Chưa xác định', color: paymentColors.unpaid }
    }

    const sortedOrders = useMemo(() => {
        return [...orders].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }, [orders]);


    // const filteredOrders = useMemo(() => {
    //     let filtered = orders.filter(
    //         (order) =>
    //             order.orderCode.toLowerCase().includes(search.toLowerCase()) ||
    //             order.paymentMethod.toLowerCase().includes(search.toLowerCase()) ||
    //             order.shippingStatus.toLowerCase().includes(search.toLowerCase()) ||
    //             order.recipientName.toLowerCase().includes(search.toLowerCase()) ||
    //             order.recipientPhone.toLowerCase().includes(search.toLowerCase()) ||
    //             order.recipientAddress.toLowerCase().includes(search.toLowerCase()) ||
    //             order.orderDate.toLowerCase().includes(search.toLowerCase()) ||
    //             order.products.some((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    //     )
    //     filtered.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
    //     return filtered
    // }, [search, orders])

    return (
        <div className="flex-1 py-6 px-3 sm:py-8 sm:px-4 min-h-screen bg-gray-100">
            <div className="px-4 md:max-w-xl mx-auto">
                {/* Header */}
                {/* <div className="flex items-center gap-3 mb-6">
                    <h3 className="text-xl  font-semibold flex gap-2 items-center justify-center">Đơn hàng</h3>
                </div> */}

                {/* Search */}
                <div className="mb-6 bg-white rounded-2xl overflow-hidden">
                    <input
                        type="text"
                        placeholder="Tìm theo mã đơn, SĐT, sản phẩm..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-2 focus:outline-none"
                    />
                </div>

                {/* list don hang */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6 md:max-w-xl mx-auto">
                    {sortedOrders.length === 0 ? (
                        <div className="text-center py-16 text-gray-500 text-lg col-span-full">
                            Không tìm thấy đơn hàng nào.
                        </div>
                    ) : (
                        sortedOrders.map((order, index) => {
                            const totalQty = order.products.reduce((s, p) => s + p.qty, 0)
                            const totalAmount = order.products.reduce((s, p) => s + p.totalPrice, 0)
                            const payment = getPaymentStatus(order)

                            return (
                                <li
                                    key={order.id}
                                    className="p-6 rounded-2xl bg-white transition duration-300 col-span-1 list-none"
                                >
                                    {/* Header */}
                                    <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                                        <h3 className="font-bold text-sm">
                                            STT:{index + 1} - Mã đơn:{order.id}
                                        </h3>
                                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${payment.color}`}>
                                            {payment.text} ({order.paymentMethod})
                                        </span>
                                    </div>

                                    {/* Info */}
                                    <div className="flex flex-col sm:flex-row sm:justify-between text-gray-600 text-xs mb-3 gap-2">
                                        <div className=''>
                                            {/* <span>Ngày đặt: {order.createdAt}</span> */}
                                            <span>
                                                Ngày đặt: {new Date(order.createdAt).toLocaleString('vi-VN', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    second: '2-digit',
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                })}
                                            </span>


                                            {/* <span>
                                                {order.shippingStatus === 'Đã giao' && order.deliveredAt && (
                                                    <p>Ngày giao: {order.deliveredAt}</p>
                                                )}
                                            </span> */}
                                        </div>
                                        {/* <span
                                            className={`flex items-center justify-center px-2 py-1 rounded-full text-sm font-medium ${shippingColors[order.shippingStatus]}`}
                                        >
                                            {order.shippingStatus}
                                        </span> */}
                                    </div>

                                    {/* Products */}
                                    <div className="border-t pt-3">
                                        <h4 className="font-medium mb-2 text-gray-700 text-xs">
                                            Sản phẩm: {order.products.length} - Số lượng: {totalQty}
                                        </h4>
                                        <ul className="space-y-1">
                                            {order.products.map((p, index) => (
                                                <li key={p.id} className="flex justify-between text-gray-700">
                                                    <div className='flex items-center text-sm w-full'>
                                                        <Link
                                                            href={`/products/${p.id}`}
                                                            className=" text-blue-500 flex items-center justify-between w-full border-b border-b-white hover:border-b-blue-500 transition-all"
                                                        >
                                                            <span className="flex items-center">
                                                                <span className="text-[10px]">{index + 1}</span>-{p.name} x{p.qty}
                                                            </span>
                                                            <span className="text-sm">${p.totalPrice.toFixed(2)}</span>
                                                        </Link>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Footer */}
                                    <div className="border-t pt-3 mt-3 text-gray-600 text-sm space-y-1">
                                        <p className='font-bold'>Tổng thanh toán: ${totalAmount.toFixed(2)}</p>
                                        <p>Người nhận: {order.shippingInfo.name}</p>
                                        <p>SĐT: {order.shippingInfo.phone}</p>
                                        <p>Địa chỉ: {order.shippingInfo.address}, {order.shippingInfo.district}, {order.shippingInfo.province}</p>
                                        {order.shippingInfo.note && <p>Ghi chú: {order.shippingInfo.note}</p>}
                                    </div>

                                </li>
                            )
                        })
                    )}
                </div>

            </div>
        </div>
    )
}
