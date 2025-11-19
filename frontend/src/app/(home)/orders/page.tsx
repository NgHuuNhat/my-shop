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
    shippingStatus: 'Đang xử lý' | 'Đang vận chuyển' | 'Đã giao'
    recipientName: string    // thêm tên người nhận
    recipientPhone: string
    recipientAddress: string
    orderDate: string // "YYYY-MM-DD HH:mm"
    note?: string
}

export default function OrderPage() {
    const [search, setSearch] = useState('')

    const [orders] = useState<OrderItem[]>([
        { id: 'o1', orderCode: 'DH001', products: [{ id: 'p1', title: 'AirPods Pro', qty: 1, price: 249 }], paymentMethod: 'BANKING', status: 'PAID', shippingStatus: 'Đã giao', recipientName: 'Nguyễn Văn A', recipientPhone: '0912345678', recipientAddress: 'TP.HCM', orderDate: '2025-11-19 14:30', note: 'Giao giờ hành chính' },
        { id: 'o2', orderCode: 'DH002', products: [{ id: 'p2', title: 'iPhone 14 Case', qty: 2, price: 39 }], paymentMethod: 'COD', status: 'PAID', shippingStatus: 'Đang vận chuyển', recipientName: 'Trần Thị B', recipientPhone: '0987654321', recipientAddress: 'Hà Nội', orderDate: '2025-11-18 09:15', note: 'Khách yêu cầu gọi trước' },
        { id: 'o3', orderCode: 'DH003', products: [{ id: 'p3', title: 'MacBook Pro', qty: 1, price: 1999 }], paymentMethod: 'BANKING', status: 'UNPAID', shippingStatus: 'Đang xử lý', recipientName: 'Lê Văn C', recipientPhone: '0912345000', recipientAddress: 'Đà Nẵng', orderDate: '2025-12-22 16:45', note: 'Hàng dễ vỡ' },
        { id: 'o4', orderCode: 'DH004', products: [{ id: 'p4', title: 'iPad Air', qty: 1, price: 599 }], paymentMethod: 'COD', status: 'PROCESSING', shippingStatus: 'Đang xử lý', recipientName: 'Phạm Thị D', recipientPhone: '0901111222', recipientAddress: 'HCM', orderDate: '2025-11-20 11:00', note: 'Giao trước 12h trưa' },
        { id: 'o5', orderCode: 'DH005', products: [{ id: 'p5', title: 'Apple Watch', qty: 1, price: 399 }], paymentMethod: 'BANKING', status: 'PAID', shippingStatus: 'Đã giao', recipientName: 'Nguyễn Văn E', recipientPhone: '0933334444', recipientAddress: 'Hà Nội', orderDate: '2025-11-21 15:30', note: 'Khách nhờ kiểm tra hộp' },
        { id: 'o6', orderCode: 'DH006', products: [{ id: 'p6', title: 'AirPods Max', qty: 1, price: 549 }], paymentMethod: 'COD', status: 'UNPAID', shippingStatus: 'Đang xử lý', recipientName: 'Trần Thị F', recipientPhone: '0944445555', recipientAddress: 'Huế', orderDate: '2025-11-22 10:20', note: 'Giao qua bưu điện' },
        { id: 'o7', orderCode: 'DH007', products: [{ id: 'p7', title: 'Mac Mini', qty: 1, price: 699 }], paymentMethod: 'BANKING', status: 'PROCESSING', shippingStatus: 'Đang xử lý', recipientName: 'Lê Văn G', recipientPhone: '0955556666', recipientAddress: 'HCM', orderDate: '2025-11-23 13:45', note: 'Khách yêu cầu đóng gói kỹ' },
        { id: 'o8', orderCode: 'DH008', products: [{ id: 'p8', title: 'iPhone 15', qty: 1, price: 1099 }], paymentMethod: 'COD', status: 'SHIPPING', shippingStatus: 'Đang vận chuyển', recipientName: 'Phạm Thị H', recipientPhone: '0966667777', recipientAddress: 'Hà Nội', orderDate: '2025-11-24 09:50', note: 'Giao sau 17h' },
        { id: 'o9', orderCode: 'DH009', products: [{ id: 'p9', title: 'iMac', qty: 1, price: 1799 }], paymentMethod: 'BANKING', status: 'PAID', shippingStatus: 'Đã giao', recipientName: 'Nguyễn Văn I', recipientPhone: '0977778888', recipientAddress: 'Đà Nẵng', orderDate: '2025-11-25 16:10', note: 'Kiểm tra hóa đơn trước khi giao' },
        { id: 'o10', orderCode: 'DH010', products: [{ id: 'p10', title: 'HomePod', qty: 1, price: 199 }], paymentMethod: 'COD', status: 'UNPAID', shippingStatus: 'Đang xử lý', recipientName: 'Trần Thị K', recipientPhone: '0988889999', recipientAddress: 'HCM', orderDate: '2025-11-26 12:30', note: 'Giao tại quầy bưu điện' },
    ])

    // màu thanh toán
    const paymentColors = {
        PAID: 'bg-green-100 text-green-800',
        UNPAID: 'bg-red-100 text-red-800',
    }

    const shippingColors: Record<string, string> = {
        'Đang xử lý': 'bg-yellow-100 text-yellow-800',
        'Đang vận chuyển': 'bg-blue-100 text-blue-800',
        'Đã giao': 'bg-green-100 text-green-800',
    }

    // ghi chú thanh toán và màu
    const getPaymentInfo = (order: OrderItem) => {
        let note = ''
        let color = ''
        if (order.paymentMethod === 'BANKING') {
            note = 'Đã thanh toán'
            color = paymentColors.PAID
        } else if (order.paymentMethod === 'COD') {
            if (order.shippingStatus === 'Đang xử lý') {
                note = 'Chưa thanh toán'
                color = paymentColors.UNPAID
            } else {
                note = 'Đã thanh toán'
                color = paymentColors.PAID
            }
        }
        return { note, color }
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
        <div className="flex-1 py-6 px-3 sm:py-8 sm:px-4 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl lg:text-2xl font-semibold">Đơn hàng của bạn</h1>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
                        Tổng số đơn: {filteredOrders.length}
                    </span>
                </div>

                {/* Search box */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Tìm theo mã đơn, SĐT, sản phẩm..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>

                {filteredOrders.length === 0 ? (
                    <div className="text-center py-16 text-gray-500 text-lg">Không tìm thấy đơn hàng nào.</div>
                ) : (
                    <ul className="space-y-6">
                        {filteredOrders.map((order, index) => {
                            const totalQty = order.products.reduce((s, p) => s + p.qty, 0)
                            const totalAmount = order.products.reduce((s, p) => s + p.qty * p.price, 0)
                            const { note, color } = getPaymentInfo(order)

                            return (
                                <li
                                    key={order.id}
                                    className="p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
                                >
                                    {/* Header card */}
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="font-medium text-lg">
                                            {index + 1}. {order.orderCode}
                                        </h3>
                                        <span
                                            className={`px-2 py-1 rounded-full text-sm font-medium ${color}`}
                                        >
                                            {note} ({order.paymentMethod})
                                        </span>
                                    </div>

                                    {/* Info */}
                                    <div className="flex flex-col sm:flex-row sm:justify-between text-gray-600 text-sm mb-3">
                                        <span>Ngày đặt: {order.orderDate}</span>
                                        <span
                                            className={`mt-1 sm:mt-0 px-2 py-1 rounded-full text-sm font-medium ${shippingColors[order.shippingStatus]}`}
                                        >
                                            {order.shippingStatus}
                                        </span>
                                    </div>

                                    {/* Products */}
                                    <div className="border-t pt-3">
                                        <h4 className="font-medium mb-2 text-gray-700">
                                            Sản phẩm ({order.products.length} loại, tổng số lượng: {totalQty})
                                        </h4>
                                        <ul className="space-y-1">
                                            {order.products.map((p) => (
                                                <li key={p.id} className="flex justify-between text-gray-700">
                                                    <span>
                                                        {p.title} x {p.qty}
                                                    </span>
                                                    <span>${(p.price * p.qty).toFixed(2)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Footer */}
                                    <div className="border-t pt-3 mt-3 text-gray-600 text-sm space-y-1">
                                        <p>Tổng thanh toán: ${totalAmount.toFixed(2)}</p>
                                        <p>Người nhận: {order.recipientName}</p>
                                        <p>SĐT người nhận: {order.recipientPhone}</p>
                                        <p>Địa chỉ nhận: {order.recipientAddress}</p>
                                        {order.note && <p>Ghi chú: {order.note}</p>}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        </div>
    )
}
