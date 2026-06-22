import { create } from "zustand";

interface WishlistStore {
  isWishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
}

const useWishlistStore = create<WishlistStore>((set) => ({
  isWishlistOpen: false,

  openWishlist: () =>
    set({ isWishlistOpen: true }),

  closeWishlist: () =>
    set({ isWishlistOpen: false }),
}));

export default useWishlistStore;