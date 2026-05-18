import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartStore } from "../util/type";

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      isCartOpen: false,

      openCart: () => set({ isCartOpen: true }),

      closeCart: () => set({ isCartOpen: false }),

      addToCart: (product, qty) =>
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) => item.id === product.id
          );

          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: item.quantity + qty,
                    }
                  : item
              ),
            };
          }

          return {
            cartItems: [
              ...state.cartItems,
              {
                ...product,
                quantity: qty,
              },
            ],
          };
        }),

      clearCart: () => set({ cartItems: [] }),

      getTotalQty: () => {
        return get().cartItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
      },

      removeItem: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item.id !== Number(id)
          ),
        })),

      updateQty: (id, newQty) => {
        if (newQty <= 0) {
          get().removeItem(id);
        } else {
          set((state) => ({
            cartItems: state.cartItems.map((item) =>
              item.id === Number(id)
                ? {
                    ...item,
                    quantity: Math.max(0, newQty),
                  }
                : item
            ),
          }));
        }
      },
    }),

    {
      name: "cart-storage",
    }
  )
);

export default useCartStore;