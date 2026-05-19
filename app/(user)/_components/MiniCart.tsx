"use client";

import useCartStore from "@/app/store/cartStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MiniCart() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateQty,
    getTotalQty,
  } = useCartStore();

  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 1);

  }, []);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  if (!mounted) return null;
  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={closeCart}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl 
        transform transition-transform duration-300
        ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >

        {/*  FLEX COLUMN LAYOUT */}
        <div className="flex flex-col h-full">

          {/*  TOP (FIXED - NO SCROLL) */}
          <div className="p-4 border-b bg-white">

            <p className="font-semibold text-lg">
              Subtotal ({getTotalQty()} items)
            </p>

            <p className="text-xl font-bold text-green-600">
              ₹{totalPrice}
            </p>

            <button
              onClick={() => {
                closeCart();
                router.push("/Cart");
              }}
              className="w-full mt-3 bg-black text-white py-2 rounded-lg hover:bg-gray-800"
            >
              Go to Cart
            </button>

          </div>

          {/*  SCROLLABLE PRODUCT LIST */}
          <div className="flex-1 overflow-y-auto">

            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 mt-10">
                Your cart is empty
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border-b flex gap-3"
                >

                  {/* Image */}
                  <Image
                    src={item.image}
                    alt=""
                    width={60}
                    height={60}
                    className="rounded"
                  />

                  {/* Details */}
                  <div className="flex-1">

                    <p className="text-sm line-clamp-2">
                      {item.name}
                    </p>

                    <p className="text-sm font-semibold mt-1">
                      ₹{item.price}
                    </p>

                    {/* Qty Badge */}
                    <div className="inline-flex items-center border rounded-full text-sm mt-2">

                      <button
                        onClick={() =>
                          updateQty(item.id, item.quantity - 1)
                        }
                        className="px-2"
                      >
                        −
                      </button>

                      <span className="px-2">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQty(item.id, item.quantity + 1)
                        }
                        className="px-2"
                      >
                        +
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