"use client";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler, useWatch, } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiError } from "@/app/util/type";
import api from "@/app/util/apiClient";
import { StorefrontData, CategorySlug, SectionSlug, } from "@/app/util/type";
import { productSchema } from "@/app/util/validation";
import { ProductFormValues } from "@/app/util/validation";
import { useProducts } from "@/app/hook/useProducts";
import { toast } from "sonner";
const AddProductForm = () => {
    const emptyFormValues: ProductFormValues = {
        name: "",
        image_url: "",
        current_price: 0,
        original_price: 0,
        discount_percent: 0,
        category_slugs: [],
        section_slugs: [],
    };
    const { addProduct, editProduct } = useProducts();
    const { register, handleSubmit, setValue, control, reset, formState: { errors }, } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: emptyFormValues,
    });

    const [productId, setProductId] = useState("");
    const [categories, setCategories] = useState<CategorySlug[]>([]);
    const [sections, setSections] = useState<SectionSlug[]>([]);
    const [storeLoading, setStoreLoading] = useState(true);
    const [apiError, setApiError] = useState<string | null>(null);
    const image_url = useWatch({
        control,
        name: "image_url",
    });

    const original_price = useWatch({
        control,
        name: "original_price",
    });

    const discount_percent = useWatch({
        control,
        name: "discount_percent",
    });

    const category_slugs = useWatch({
        control,
        name: "category_slugs",
    });

    const section_slugs = useWatch({
        control,
        name: "section_slugs",
    });

    // ---------------- FETCH STOREFRONT ----------------
    useEffect(() => {
        async function fetchStorefront() {
            try {
                const res = await api.get<StorefrontData>("/api/v1/storefront/");
                const data = res.data;

                setCategories(data.categories || []);

                const extracted: SectionSlug[] = [];

                if (data.new_arrivals) {
                    extracted.push(data.new_arrivals);
                }
                if (data.bestsellers) {
                    extracted.push(data.bestsellers);
                }
                if (data.featured) {
                    extracted.push(data.featured);
                }

                setSections(extracted);
            } catch (err) {
                console.error("Storefront error:", err);
            } finally {
                setStoreLoading(false);
            }
        }

        fetchStorefront();
    }, []);

    useEffect(() => {
        if (!productId.trim()) return;

        const fetchProduct = async () => {
            try {
                setApiError(null);

                const res = await api.get(
                    `/api/v1/products/${productId}`
                );

                const product = res.data;

                reset({
                    name: product.name || "",

                    image_url:
                        product.image_url || "",

                    current_price:
                        Number(product.current_price) || 0,

                    original_price:
                        Number(product.original_price) || 0,

                    discount_percent:
                        product.discount_percent || 0,

                    category_slugs:
                        product.categories?.map(
                            (cat: CategorySlug) => cat.slug
                        ) || [],

                    section_slugs:
                        product.sections?.map(
                            (sec: SectionSlug) => sec.slug
                        ) || [],
                });

                toast.success(
                    "Product loaded successfully!"
                );
            } catch (error) {
                const axiosError =
                    error as AxiosError<ApiError>;

                const msg =
                    axiosError.response?.data?.message ||
                    axiosError.response?.data?.detail ||
                    axiosError.message ||
                    "Failed to load product";

                setApiError(msg);
            }
        };

        const timeout = setTimeout(() => {
            fetchProduct();
        }, 500);

        return () => clearTimeout(timeout);
    }, [productId, reset]);

    // ---------------- AUTO PRICE CALCULATION ----------------
    useEffect(() => {
        if (!original_price || !discount_percent) {
            setValue("current_price", 0);
            return;
        }

        const price =
            original_price -
            (original_price * Number(discount_percent)) / 100;

        setValue("current_price", Math.round(price));
    }, [original_price, discount_percent, setValue]);

    // ---------------- CHECKBOX HANDLERS ----------------
    const toggleCategory = (slug: string) => {
        const exists = category_slugs.includes(slug);

        setValue(
            "category_slugs",
            exists
                ? category_slugs.filter((s) => s !== slug)
                : [...category_slugs, slug]
        );
    };

    const toggleSection = (slug: string) => {
        const exists = section_slugs.includes(slug);

        setValue(
            "section_slugs",
            exists
                ? section_slugs.filter((s) => s !== slug)
                : [...section_slugs, slug]
        );
    };

    // ---------------- SUBMIT ----------------

    const onSubmit: SubmitHandler<ProductFormValues> = (
        data
    ) => {
        setApiError(null);

        // EDIT PRODUCT
        if (productId.trim()) {
            editProduct.mutate(
                {
                    id: productId,
                    product: data,
                },
                {
                    onSuccess: () => {
                        toast.success(
                            "Product updated successfully!"
                        );

                        reset(emptyFormValues);
                        setProductId("");
                    },

                    onError: (
                        error
                    ) => {
                        const axiosError =
                            error as AxiosError<ApiError>;
                        const msg =
                            axiosError.response?.data?.message ||
                            axiosError.response?.data?.detail ||
                            axiosError.message ||
                            "Something went wrong";

                        setApiError(msg);
                    },
                }
            );

            return;
        }

        // ADD PRODUCT
        addProduct.mutate(data, {
            onSuccess: () => {
                toast.success(
                    "Product added successfully!"
                );

                reset(emptyFormValues);
            },

            onError: (
                error: AxiosError<ApiError>
            ) => {
                const msg =
                    error.response?.data?.message ||
                    error.response?.data?.detail ||
                    error.message ||
                    "Something went wrong";

                setApiError(msg);
            },
        });
    };

    // ---------------- LOADING ----------------
    if (storeLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
            </div>
        );
    }

    // ---------------- UI ----------------
    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="bg-white shadow-xl rounded-3xl p-8 space-y-6">
                <h1 className="text-3xl font-bold">{productId
                    ? "Update Product" : "Add Product"}</h1> <div>
                    <input
                        value={productId}
                        onChange={(e) =>
                            setProductId(e.target.value)
                        }
                        placeholder="Enter Product ID to Edit (optional)"
                        className="w-full border p-3 rounded-xl"
                    />
                </div>
                {apiError && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-xl mb-4">
                        {apiError}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* NAME */}
                    <div>
                        <input
                            {...register("name")}
                            placeholder="Product name"
                            className="w-full border p-3 rounded-xl"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* IMAGE */}
                    <div>
                        <input
                            {...register("image_url")}
                            placeholder="Image URL"
                            className="w-full border p-3 rounded-xl"
                        />
                        {errors.image_url && (
                            <p className="text-red-500 text-sm">
                                {errors.image_url.message}
                            </p>
                        )}
                    </div>

                    {/* PREVIEW */}
                    {image_url && (
                        <Image
                            src={image_url}
                            alt="preview"
                            width={120}
                            height={120}
                            className="rounded-xl border"
                            unoptimized
                        />
                    )}

                    {/* PRICES */}
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <input
                                {...register("current_price", { valueAsNumber: true })}
                                readOnly
                                className="w-full border p-3 rounded-xl bg-gray-100"
                            />
                        </div>

                        <div>
                            <input
                                {...register("original_price", {
                                    valueAsNumber: true,
                                })}
                                placeholder="Original price"
                                className="w-full border p-3 rounded-xl"
                            />
                            {errors.original_price && (
                                <p className="text-red-500 text-sm">
                                    {errors.original_price.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <input
                                {...register("discount_percent", {
                                    valueAsNumber: true,
                                })}
                                placeholder="Discount %"
                                className="w-full border p-3 rounded-xl"
                            />
                        </div>
                    </div>

                    {/* CATEGORIES */}
                    <div>
                        <h2 className="font-semibold mb-2">Categories</h2>

                        <div className="grid grid-cols-2 gap-2">
                            {categories.map((cat) => (
                                <label
                                    key={cat.id}
                                    className="flex items-center gap-2 border p-2 rounded-xl"
                                >
                                    <input
                                        type="checkbox"
                                        checked={category_slugs.includes(cat.slug)}
                                        onChange={() => toggleCategory(cat.slug)}
                                    />
                                    {cat.name}
                                </label>
                            ))}
                        </div>

                        {errors.category_slugs && (
                            <p className="text-red-500 text-sm">
                                {errors.category_slugs.message}
                            </p>
                        )}
                    </div>

                    {/* SECTIONS */}
                    <div>
                        <h2 className="font-semibold mb-2">Sections</h2>

                        <div className="grid grid-cols-2 gap-2">
                            {sections.map((sec) => (
                                <label
                                    key={sec.slug}
                                    className="flex items-center gap-2 border p-2 rounded-xl"
                                >
                                    <input
                                        type="checkbox"
                                        checked={section_slugs.includes(sec.slug)}
                                        onChange={() => toggleSection(sec.slug)}
                                    />
                                    {sec.name}
                                </label>
                            ))}
                        </div>
                        {errors.section_slugs && (
                            <p className="text-red-500 text-sm">
                                {errors.section_slugs.message}
                            </p>
                        )}
                    </div>

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        disabled={
                            addProduct.isPending ||
                            editProduct.isPending
                        }
                        className="w-full bg-black text-white p-3 rounded-xl"
                    >
                        {productId
                            ? editProduct.isPending
                                ? "Updating..."
                                : "Update Product"
                            : addProduct.isPending
                                ? "Adding..."
                                : "Add Product"}
                    </button>
                </form>
            </div>

        </div>


    );
};

export default AddProductForm;