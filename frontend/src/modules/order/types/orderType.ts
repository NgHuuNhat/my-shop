import { CartItem, ShippingInfo } from "@/modules/cart/types/xartType";

export interface OrderItem {
    id: string;
    products: CartItem[];
    shippingInfo: ShippingInfo;
    totalOrderItem: number;
    paymentMethod: "COD" | "BANKING";
    paid?: boolean;
    createdAt: string;
}

export interface OrderStore {
    orders: OrderItem[];
    addOrder: (order: OrderItem) => void;
    ordersLength: () => number;
}