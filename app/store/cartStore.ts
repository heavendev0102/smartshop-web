import { mapProductToCartItem } from './../util/cartMapper';
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartStore } from "../util/type";
import api from "../util/apiClient";
import { Product, BackendCartItem } from '../util/type';
const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      isCartOpen: false,

      openCart: () => set({ isCartOpen: true }),

      closeCart: () => set({ isCartOpen: false }),


      addToCart: async (product: Product, qty: number) => {

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
              mapProductToCartItem(product, qty),
            ],
          };
        });

        const token = localStorage.getItem("access_token");

        if (token) {
          await api.post("/api/v1/cart/items", {
            product_id: product.id,
            quantity: qty,
          });
        }
      },

      mergeGuestCart: async () => {

        const token = localStorage.getItem("access_token");

        if (!token) return;

        const guestCart = get().cartItems;

        if (guestCart.length === 0) return;

        try {
          // get existing db cart
          const response = await api.get("/api/v1/cart/");

          const dbCart = response.data.items;

          for (const guestItem of guestCart) {

            // check if product already exists in db
            const existingItem = dbCart.find(
              (dbItem: BackendCartItem) =>
                dbItem.product_id === guestItem.id
            );

            // PRODUCT ALREADY EXISTS
            if (existingItem) {
              await api.put( `/api/v1/cart/items/${existingItem.id}`,
                {
                  quantity:
                    existingItem.quantity +
                    guestItem.quantity,
                }
              );

            }

            // NEW PRODUCT
            else {
              await api.post( "/api/v1/cart/items",{
                  product_id: guestItem.id,
                  quantity: guestItem.quantity,
                }
              );
            }
          }

          // fetch updated db cart
          await get().fetchCart();

        } catch (error) {
          console.log(error);
        }
      },

      clearCart: () => set({ cartItems: [] }),

      fetchCart: async () => {

        const token = localStorage.getItem("access_token");

        if (!token) return;

        try {

          const response = await api.get("/api/v1/cart/");

          const backendCart = response.data.items.map(
            (item: BackendCartItem) => ({
              id: item.product.id,
              cart_item_id: item.id,

              name: item.product.name,

              image: item.product.image_url,

              price: Number(item.product.current_price),

              stock: item.product.stock,

              quantity: item.quantity,
            })
          );

          set({
            cartItems: backendCart,
          });

        } catch (error) {
          console.log(error);
        }
      },
      getTotalQty: () => {
        return get().cartItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
      },

      removeItem: async (id) => {

        const item = get().cartItems.find(
          (item) => item.id === Number(id)
        );

        // remove from local state first
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item.id !== Number(id)
          ),
        }));

        const token = localStorage.getItem("access_token");

        // if logged in -> remove from db
        if (token && item?.cart_item_id) {
          try {
            await api.delete(
              `/api/v1/cart/items/${item.cart_item_id}`
            );
          } catch (error) {
            console.log(error);
          }
        }
      },

      updateQty: async (id, newQty) => {

        if (newQty <= 0) {
          get().removeItem(id);
          return;
        }

        // update local zustand state instantly
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === Number(id)
              ? {
                ...item,
                quantity: newQty,
              }
              : item
          ),
        }));

        const token = localStorage.getItem("access_token");

        // if logged in -> sync backend
        if (token) {

          const item = get().cartItems.find(
            (item) => item.id === Number(id)
          );

          if (!item?.cart_item_id) return;

          try {

            await api.put(
              `/api/v1/cart/items/${item.cart_item_id}`,
              {
                quantity: newQty,
              }
            );

          } catch (error) {
            console.log(error);
          }
        }
      },

    }),

    {
      name: "cart-storage",
    }
  )
);

export default useCartStore;