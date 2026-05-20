"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "@/app/util/apiClient";
import { ProductFormValues } from "../util/validation";
import { ApiError } from "../util/type";

export const useProducts = () => {
    const queryClient = useQueryClient();

    const addProduct = useMutation({
        mutationFn: async (data: ProductFormValues) => {
            const payload = {
                ...data,
                discount_percent:
                    Number(data.discount_percent),
            };

            const res = await api.post("/api/v1/products/", payload);
            return res.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },

        onError: (error: AxiosError<ApiError>) => {
            console.log("❌ Error:", error);

            const message =
                error.response?.data?.message ||
                error.response?.data?.detail ||
                "Something went wrong";

            alert(message);
        },
    });

    const editProduct = useMutation({
        mutationFn: async ({
            product,
            id,
        }: {
            product: Partial<ProductFormValues>;
            id: string;
        }) => {
            const res = await api.put(
                `/api/v1/products/${id}`,
                product
            );

            return res.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
                exact: false,
            });
        },
    });
    return { addProduct, editProduct };
};