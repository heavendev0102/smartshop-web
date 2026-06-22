import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/app/util/apiClient";
import { Product } from "../util/type";

export interface WishlistItem {
    id: number; // wishlist item id
    product: Product;
}
const token = typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;

export const useWishlist = () => {
    const queryClient = useQueryClient();

    // Get Wishlist
    const { data: wishlist = [], isLoading } = useQuery({
        queryKey: ["wishlist"],
        queryFn: async () => {
            const res = await api.get("/api/v1/wishlist");
            return res.data;
        },
        enabled: !!token,
    });

    // Add Product
    const addMutation = useMutation({
        mutationFn: async (productId: number) => {
            return api.post("/api/v1/wishlist/items", {
                product_id: productId,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["wishlist"],
            });
        },
    });

    // Remove Product
    const removeMutation = useMutation({
        mutationFn: async (wishlistItemId: number) => {
            return api.delete(
                `/api/v1/wishlist/items/${wishlistItemId}`
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["wishlist"],
            });
        },
    });

    // Check Product
    const checkProduct = async (productId: number) => {
        const res = await api.get(
            `/api/v1/wishlist/check/${productId}`
        );

        return res.data;
    };

    return {
        wishlist,
        isLoading,
        addToWishlist: addMutation.mutate,
        removeFromWishlist: removeMutation.mutate,
        checkProduct,
    };
};