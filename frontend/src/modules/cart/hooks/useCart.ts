import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "../types/CartType";
import { ProductType } from "@/modules/products/types/productType";

type CartStore = {
    cart: CartItem[];
    addToCart: (product: ProductType) => void;
    removeToCart: () => void;
    cartLength: () => number;
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
        
        removeToCart: () => { },

        cartLength: () => {
            const { cart } = get();
            return cart.reduce((sum, item) => sum + item.qty, 0);
        },
    }),
        {
            name: "cart",
        }
    )
);
