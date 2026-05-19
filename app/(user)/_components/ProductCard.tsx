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
    const productID = new URLSearchParams({
      id: id,
    }).toString();

    router.push(`/ProductDetail?${productID}`);
  }

  const imageSrc =
    product.image_url?.trim()
      ? product.image_url
      : "/common/placeholder.png";

  return (
    <div
      className="group bg-gray-100 rounded-3xl p-4 h-full flex flex-col justify-between shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 overflow-hidden"
    >
      {/* Wishlist */}
      <div className="flex justify-end">
        <button
          onClick={() => toggleWishlist(product.id)}
          className="text-red-500 text-xl"
        >
          {wishlist.includes(product.id)
            ? "❤️"
            : "🤍"}
        </button>
      </div>

      {/* Product Image */}
      <div
        className="relative h-52 w-full cursor-pointer"
        onClick={() =>
          productDetails(product.id.toString())
        }
      >
        <Image
          src={imageSrc}
          alt={product.name}
          fill
        //   sizes="(max-width:768px) 100vw, 25vw"
          className="object-contain transition-transform duration-500 group-hover:scale-110"
        />
        
      </div>

      {/* Product Name */}
      <h3 className="mt-3 text-center font-bold text-sm sm:text-base line-clamp-2">
        {product.name}
      </h3>

      {/* Price */}
      <div className="mt-3 flex flex-col items-center">
        <div className="flex items-center gap-3">
          <p className="text-lg font-bold text-black">
            ${product.current_price}
          </p>

          {product.discount_percent > 0 && (
            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
              {product.discount_percent}% OFF
            </span>
          )}
        </div>

        {product.discount_percent > 0 && (
          <p className="text-sm text-gray-400 line-through">
            ${product.original_price}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;