import { ProductType } from "@/modules/products/types/productType";

export interface CartItem {
    id: string;
    name: string;
    price: string;
    image: string;
    qty: number;
    totalPrice: number;
};

export interface CartStore {
    cart: CartItem[];
    addToCart: (product: ProductType) => void;
    clearCart: () => void;
    cartLength: () => number;
    removeItem: (id: string) => void;
    updateQty: (id: string, delta: number) => void;
};

export interface ShippingInfo {
    province: string;
    district: string;
    address: string;
    name: string;
    phone: string;
    note: string;
}