import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "../types/CartType";

type CartStore = {
    cart: CartItem[];
    addToCart: (item: Omit<CartItem, "qty" | "totalPrice">) => void;
    cartLength: () => number;
};

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: [],
            addToCart: (item) => {
                const { cart } = get();
                const existing = cart.find((p) => p.id === item.id);
                let newCart: CartItem[];

                if (existing) {
                    newCart = cart.map((p) =>
                        p.id === item.id
                            ? { ...p, qty: p.qty + 1, totalPrice: Number(p.price) * (p.qty + 1) }
                            : p
                    );
                } else {
                    const newItem: CartItem = { ...item, qty: 1, totalPrice: Number(item.price) };
                    newCart = [...cart, newItem];
                }

                set({ cart: newCart });
            },
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
