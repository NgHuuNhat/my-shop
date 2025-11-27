import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "../types/CartType";
import { ProductType } from "@/modules/products/types/productType";

type CartStore = {
    cart: CartItem[];
    addToCart: (product: ProductType) => void;
    clearCart: () => void;
    cartLength: () => number;
    removeItem: (id: string) => void;
    updateQty: (id: string, delta: number) => void
};

export const useCart = create<CartStore>()(
    persist((set, get) => ({
        cart: [],

        addToCart: (product) => {
            const { cart } = get();
            const existing = cart.find((p) => p.id === product.id);
            let newCart: CartItem[];

            if (existing) {
                newCart = cart.map((p) =>
                    p.id === product.id
                        ? { ...p, qty: p.qty + 1, totalPrice: Number(p.price) * (p.qty + 1) }
                        : p
                );
            } else {
                const newItem: CartItem = { ...product, qty: 1, totalPrice: Number(product.price) };
                newCart = [...cart, newItem];
            }

            set({ cart: newCart });
        },

        clearCart: () => {
            set({ cart: [] });
        },

        cartLength: () => {
            const { cart } = get();
            return cart.reduce((sum, item) => sum + item.qty, 0);
        },

        removeItem: (id) => {
            const { cart } = get();
            const newCart = cart.filter((p) => p.id !== id)
            set({ cart: newCart });
        },

        updateQty: (id: string, delta: number) => {
            const { cart } = get();
            const newCart = cart.map((p) => {
                if (p.id === id) {
                    const newQty = Math.max(1, p.qty + delta);
                    return { ...p, qty: newQty, totalPrice: newQty * Number(p.price) };
                }
                return p;
            });
            set({ cart: newCart });
        },

    }),
        {
            name: "cart",
        }
    )
);
