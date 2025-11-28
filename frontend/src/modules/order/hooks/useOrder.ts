import { create } from "zustand";
import { persist } from "zustand/middleware";
import { OrderStore } from "../types/orderType";

export const useOrder = create<OrderStore>()(
    persist((set, get) => ({
        orders: [],

        addOrder: (order) => {
            const { orders } = get();
            const newOrder = [...orders, order];
            set({ orders: newOrder })
        },
        
        ordersLength: () => {
            const { orders } = get();
            return orders.length;
        },
    }),
        {
            name: "order",
        }
    )
);
