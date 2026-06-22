"use client";

import Image from "next/image";
import { Heart, Trash2, X } from "lucide-react";
import useWishlistStore from "@/app/store/wishListStore";
import { useWishlist } from "@/app/hook/useWishList";
import { BackendCartItem } from "@/app/util/type";

export default function MiniWishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { isWishlistOpen, closeWishlist } = useWishlistStore();

  return (
    <>
      {/* Overlay */}
      {isWishlistOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={closeWishlist}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[380px] bg-white z-50 shadow-2xl
        transition-transform duration-300 ease-in-out
        ${isWishlistOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full">

          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b">
            <div>
              <h2 className="text-xl font-bold">
                My Wishlist
              </h2>

              <p className="text-sm text-gray-500">
                {wishlist.length} item(s)
              </p>
            </div>

            <button
              onClick={closeWishlist}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Wishlist Items */}
          <div className="flex-1 overflow-y-auto">
            {wishlist.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full px-6">
                <Heart
                  size={70}
                  className="text-gray-300"
                  strokeWidth={1.5}
                />

                <h3 className="mt-4 text-lg font-semibold">
                  Your Wishlist is Empty
                </h3>

                <p className="text-gray-500 text-center text-sm mt-2">
                  Save your favourite products here and
                  shop them later.
                </p>
              </div>
            ) : (
              wishlist.map((item: BackendCartItem) => (
                <div
                  key={item.id}
                  className="p-4 border-b hover:bg-gray-50 transition"
                >
                  <div className="flex gap-3">

                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                      <Image
                        src={item.product.image_url}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-2">
                        {item.product.name}
                      </p>

                      <p className="mt-2 text-lg font-bold text-green-600">
                        ₹{item.product.current_price}
                      </p>

                      <button
                        onClick={() =>
                          removeFromWishlist(item.id)
                        }
                        className="flex items-center gap-1 text-red-500 text-sm mt-2 hover:text-red-600"
                      >
                        <Trash2 size={15} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

     
        </div>
      </div>
    </>
  );
}