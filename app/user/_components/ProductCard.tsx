"use client";
import { Product } from "@/app/util/type";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
const ProductCard = ({ product }: { product: Product }) => {
    const [wishlist, setWishlist] = useState<number[]>([]);
    const router = useRouter();
    const toggleWishlist = (id: number) => {
        setWishlist((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };
    function productDetails(id: string) {
        const productID = new URLSearchParams({ id: id }).toString();
        router.push(`/user/ProductDetail?${productID}`);
    }
    return (

        <>
            <div
                key={product.id}
                className=" group bg-gray-100 rounded-3xl p-4 h-full flex flex-col justify-between shadow-sm hover:shadow-2xl hover:-translate-y-2  transition-all duration-300 border border-gray-100 overflow-hidden" >
                <div className="flex justify-end">
                    <button
                        onClick={() => toggleWishlist(product.id)}
                        className="text-red-500"
                    >
                        {wishlist.includes(product.id) ? "❤️" : "🤍"}
                    </button>
                </div>
                <div className="relative h-40 w-full" onClick={() => productDetails(product.id.toString())}>
                    <Image src={product.image} alt={product.name} fill className=" object-contain transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="mt-3 text-center font-bold text-sm sm:text-base line-clamp-2">
                    {product.description}
                </h3>
                <div className="mt-3 flex flex-col items-center">
                    <div className="flex items-center gap-3">
                        <p className="text-lg font-bold text-black">
                            ${product.discountPrice!.toFixed(2)}
                        </p>
                        {product.discount! > 0 && (
                            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                                {product.discount}% OFF
                            </span>
                        )}
                    </div>
                    {product.discount! > 0 && (
                        <p className="text-sm text-gray-400 line-through">
                            ${product.price!.toFixed(2)}
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}

export default ProductCard