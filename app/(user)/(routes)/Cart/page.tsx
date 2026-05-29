"use client";
import apple_watch from "../../../../public/Home/ProductList/apple_watch.png"
import useCartStore from "@/app/store/cartStore";
import Image from "next/image";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { CircleCheckBig } from "lucide-react";
import { useState , useEffect } from "react";
const Page = () => {
    const router = useRouter();
    const [showError, setShowError] = useState(false);
    const { cartItems, updateQty, removeItem, getTotalQty , fetchCart } = useCartStore();
    const totalPrice = cartItems.reduce((sum, currentItem) => {
        return sum + currentItem.price * currentItem.quantity;
    }, 0);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setMounted(true);
            fetchCart();
        }, 1);
    }, []);
   const handleBuyNow = () => {
    const token = localStorage.getItem("access_token");
    if (cartItems.length === 0) {
        setShowError(true);
        return;
    }
    if (!token) {
        localStorage.setItem("redirect_after_login", "/CheckOut");
        router.push("/login");
        return; 
    }
    router.push("/CheckOut");
};
 if (!mounted) return null;
    return (
        <>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12 mb-5">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm p-4">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-200 rounded-xl text-sm md:text-base">
                                    <th className="p-4 text-left rounded-l-xl">Product</th>
                                    <th className="p-4 text-left">Price</th>
                                    <th className="p-4 text-left">Quantity</th>
                                    <th className="p-4 text-left">Subtotal</th>
                                    <th className="rounded-r-xl"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-16 text-gray-500 text-lg">
                                            🛒 Your cart is empty
                                        </td>
                                    </tr>
                                ) : (
                                    cartItems.map((product) => (
                                        <tr key={product.id} className="border-b">

                                            <td className="p-4 flex items-center gap-4">
                                                <Image src={product.image || apple_watch} width={70} height={70} className="rounded-lg" alt="" />
                                                <span>{product.name}</span>
                                            </td>

                                            <td className="p-4">₹{product.price}</td>
                                            <td className="p-4">
                                                <div className="inline-flex items-center border border-gray-300 rounded-full overflow-hidden text-sm">
                                                    <button
                                                        onClick={() => updateQty(product!.id!, product.quantity - 1)}
                                                        disabled={product.quantity <= 1}
                                                        className="px-2 py-1 text-gray-600 hover:bg-black hover:text-white transition disabled:opacity-30"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="px-3 py-1 font-medium bg-gray-100">
                                                        {product.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQty(product!.id!, product.quantity + 1)}
                                                        disabled={product.quantity >= (product?.stock ?? 0)}
                                                        className="px-2 py-1 text-gray-600 hover:bg-black hover:text-white transition disabled:opacity-30"
                                                    >
                                                        +
                                                    </button>

                                                </div>
                                            </td>

                                            <td className="p-4 font-semibold">
                                                ₹{product.price * product.quantity}
                                            </td>

                                            <td className="p-4">
                                                <Trash className="cursor-pointer text-gray-400 hover:text-red-500" onClick={() => removeItem(product.id)} />
                                            </td>

                                        </tr>
                                    ))
                                )}
                            </tbody>

                        </table>

                    </div>
                </div>


                <div className="lg:sticky lg:top-24 h-fit">

                    <div className="bg-white rounded-2xl shadow-lg p-6 border">

                        <p className="text-sm text-gray-600 flex items-center gap-2">
                            <CircleCheckBig className="text-green-500" size={16} />
                            FREE Delivery available
                        </p>

                        <div className="border-t my-4"></div>

                        <div className="flex justify-between">
                            <span className="font-semibold">Subtotal ({getTotalQty()} items)</span>
                            <span>₹{totalPrice}</span>
                        </div>

                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                            <span>Delivery</span>
                            <span className="text-green-600">FREE</span>
                        </div>

                        <div className="border-t my-4"></div>

                        <div className="flex justify-between font-semibold text-lg">
                            <span>Total</span>
                            <span>₹{totalPrice}</span>
                        </div>

                        {/* <button className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:bg-gray-800" disabled={cartItems.length === 0} onClick={goToCheckOut}>  proceed to checkout
                        </button> */}
                        <button
                            onClick={() => handleBuyNow()}
                            className={`w-full mt-6  text-white py-3 rounded-xl hover:bg-gray-800 ${cartItems.length === 0
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-black"
                                }`}
                        >
                            proceed to checkout
                        </button>

                        {showError && cartItems.length === 0 && (
                            <p className="text-red-500 mt-2 text-sm text-center">
                                Your Cart is empty
                            </p>
                        )}
                    </div>
                </div>

            </div>


        </>
    )
}

export default Page

