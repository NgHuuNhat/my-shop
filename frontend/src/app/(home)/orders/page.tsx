'use client'

import React, { useState, useMemo } from 'react'

export type OrderProduct = {
    id: string
    title: string
    qty: number
    price: number
}

export type OrderItem = {
    id: string
    orderCode: string
    products: OrderProduct[]
    paymentMethod: 'BANKING' | 'COD'
    status: 'PAID' | 'UNPAID' | 'PROCESSING' | 'SHIPPING'
    shippingStatus: 'Chưa gửi' | 'Đang vận chuyển' | 'Đã giao'
    recipientPhone: string
    recipientAddress: string
    orderDate: string // định dạng "YYYY-MM-DD HH:mm"
    note?: string
}

export default function OrderPage() {
    const [search, setSearch] = useState('')

    // Sample data
    const [orders] = useState<OrderItem[]>([
        {
            id: 'o1',
            orderCode: 'DH001',
            products: [
                { id: 'p1', title: 'AirPods Pro', qty: 1, price: 249 },
                { id: 'p2', title: 'iPhone 14 Case', qty: 2, price: 39 },
            ],
            paymentMethod: 'BANKING',
            status: 'PAID',
            shippingStatus: 'Đã giao',
            recipientPhone: '0912345678',
            recipientAddress: '123 Lê Lợi, TP.HCM',
            orderDate: '2025-11-19 14:30',
            note: 'Giao hàng giờ hành chính',
        },
        {
            id: 'o2',
            orderCode: 'DH002',
            products: [{ id: 'p3', title: 'MacBook Pro', qty: 1, price: 1999 }],
            paymentMethod: 'COD',
            status: 'PROCESSING',
            shippingStatus: 'Đang xử lý',
            recipientPhone: '0987654321',
            recipientAddress: '456 Trần Hưng Đạo, Hà Nội',
            orderDate: '2025-11-18 09:15',
        },
        {
            id: 'o3',
            orderCode: 'DH003',
            products: [
                { id: 'p1', title: 'AirPods Pro', qty: 1, price: 249 },
                { id: 'p2', title: 'iPhone 14 Case', qty: 2, price: 39 },
            ],
            paymentMethod: 'BANKING',
            status: 'PAID',
            shippingStatus: 'Đang vận chuyển',
            recipientPhone: '0912345000',
            recipientAddress: 'TP.HCM',
            orderDate: '2025-12-22 16:45',
            note: 'Giao hàng giờ hành chính',
        },
    ])

    function renderPaymentStatus(order: OrderItem) {
        switch (order.status) {
            case 'PAID':
                return (
                    <span className="text-green-600 font-semibold">
                        Đã thanh toán ({order.paymentMethod === 'BANKING' ? 'Banking' : 'COD'})
                    </span>
                )
            case 'UNPAID':
                return <span className="text-red-600 font-semibold">Chưa thanh toán (Banking)</span>
            case 'PROCESSING':
                return <span className="text-yellow-600 font-semibold">Đang xử lý (COD)</span>
            case 'SHIPPING':
                return <span className="text-blue-600 font-semibold">Đang vận chuyển</span>
            default:
                return null
        }
    }

    const filteredOrders = useMemo(() => {
        let filtered = orders.filter(
            (order) =>
                order.orderCode.toLowerCase().includes(search.toLowerCase()) ||
                order.recipientPhone.includes(search) ||
                order.products.some((p) => p.title.toLowerCase().includes(search.toLowerCase()))
        )
        filtered.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
        return filtered
    }, [search, orders])

    return (
        <div className="flex-1 py-6 px-3 sm:py-8 sm:px-4">
            <div className="max-w-7xl mx-auto bg-white">
                {/* Header: Tiêu đề + tổng số đơn */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl lg:text-3xl font-semibold">Đơn hàng của bạn</h1>
                    <span className="text-gray-600 font-medium">
                        Tổng số đơn: {filteredOrders.length}
                    </span>
                </div>

                {/* Search box */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Tìm theo mã đơn, SĐT, sản phẩm..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
                    />
                </div>

                {filteredOrders.length === 0 ? (
                    <div className="text-center py-16 text-gray-500">Không tìm thấy đơn hàng nào.</div>
                ) : (
                    <ul className="space-y-6">
                        {filteredOrders.map((order, index) => {
                            const totalQty = order.products.reduce((s, p) => s + p.qty, 0)
                            const totalAmount = order.products.reduce((s, p) => s + p.qty * p.price, 0)

                            return (
                                <li key={order.id} className="p-4 rounded-xl border bg-gray-50 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-medium text-lg">
                                            {index + 1}. Mã đơn: {order.orderCode}
                                        </h3>
                                        {renderPaymentStatus(order)}
                                    </div>

                                    <p className="text-sm text-gray-500">
                                        Ngày đặt: {order.orderDate}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Trạng thái vận chuyển: {order.shippingStatus}
                                    </p>

                                    <div className="border-t pt-2">
                                        <h4 className="font-medium mb-1">
                                            Sản phẩm ({order.products.length} loại, tổng số lượng: {totalQty})
                                        </h4>
                                        <ul className="space-y-1">
                                            {order.products.map((p) => (
                                                <li key={p.id} className="flex justify-between text-sm text-gray-700">
                                                    <span>
                                                        {p.title} x {p.qty}
                                                    </span>
                                                    <span>${(p.price * p.qty).toFixed(2)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <p className="text-sm text-gray-500 mt-2">
                                        Tổng thanh toán: ${totalAmount.toFixed(2)}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        SĐT người nhận: {order.recipientPhone}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Địa chỉ nhận: {order.recipientAddress}
                                    </p>
                                    {order.note && <p className="text-sm text-gray-500">Ghi chú: {order.note}</p>}
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        </div>
    )
}
