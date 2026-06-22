"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import api from "@/app/util/apiClient";
interface OrderType {
    order_id: number;
    payment_method: string;
    amount_paid: string;
    estimated_delivery: string;
    order_status: string;
}

function Page() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const orderId = searchParams.get("orderId");

    const [order, setOrder] =
        useState<OrderType | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await api.get(
                    `/api/v1/orders/${orderId}`
                );

                setOrder(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrder();
        }
    }, [orderId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Order not found
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center">

                    <div className="flex justify-center">
                        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className="w-12 h-12 text-green-600"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12.75l6 6 9-13.5"
                                />
                            </svg>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mt-6">
                        Payment Successful
                    </h1>

                    <p className="text-gray-500 mt-3 leading-relaxed">
                        Your order has been placed successfully.
                    </p>

                    <div className="bg-gray-50 rounded-2xl p-5 mt-8 text-left space-y-4 border border-gray-200">

                        <div className="flex justify-between items-center">
                            <span className="text-gray-500">
                                Order ID
                            </span>

                            <span className="font-semibold text-gray-900">
                                ORD-{order.order_id}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-500">
                                Payment Method
                            </span>

                            <span className="font-semibold text-gray-900 capitalize">
                                {order.payment_method.replace(
                                    "_",
                                    " "
                                )}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-500">
                                Amount Paid
                            </span>

                            <span className="font-semibold text-green-600">
                                ₹{order.amount_paid}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-500">
                                Estimated Delivery
                            </span>

                            <span className="font-semibold text-gray-900">
                                {order.estimated_delivery}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-gray-500">
                                Order Status
                            </span>

                            <span className="font-semibold text-green-600 capitalize">
                                {order.order_status}
                            </span>
                        </div>
                         <div className="mt-8 flex flex-col gap-3">
                <button
                    onClick={() =>
                        router.push(`/MyOrders`)
                    }
                    className="w-full bg-black text-white py-3 rounded-xl font-semibold"
                >
                    View My Order
                </button>

                <button
                    onClick={() =>
                        router.push("/")
                    }
                    className="w-full border border-gray-300 py-3 rounded-xl font-semibold"
                >
                    Continue Shopping
                </button>
            </div>
                    </div>
                </div>
            </div>
           
        </>
    );
}

export default Page;