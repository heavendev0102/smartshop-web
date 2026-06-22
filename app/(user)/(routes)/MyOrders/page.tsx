"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import api from "@/app/util/apiClient";

interface Product {
    product_id: number;
    product_name: string;
    quantity: number;
    unit_price: string;
    line_total: string;
}

interface Order {
    order_id: number;
    order_status: string;
    payment_method: string;
    total: string;
    delivery_date: string;
    created_date: string;
    products: Product[];
}

export default function OrdersPage() {
    const router = useRouter();

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);



    const fetchOrders = async () => {
        try {
            const response = await api.get(
                "/api/v1/orders/"
            );

            setOrders(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        setTimeout(() => {
            fetchOrders();
        }, 0)

    }, []);
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading Orders...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-5xl mx-auto">

                <h1 className="text-3xl font-bold mb-8">
                    My Orders
                </h1>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl p-10 text-center shadow">
                        <h2 className="text-xl font-semibold">
                            No Orders Found
                        </h2>

                        <button
                            onClick={() =>
                                router.push("/")
                            }
                            className="mt-5 px-6 py-3 bg-black text-white rounded-xl"
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div
                                key={order.order_id}
                                className="bg-white rounded-2xl shadow p-6"
                            >
                                {/* Header */}
                                <div className="flex flex-wrap justify-between gap-4 border-b pb-4">
                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Order ID
                                        </p>

                                        <p className="font-semibold">
                                            ORD-{String(order.order_id).padStart(6, "0")}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Total
                                        </p>

                                        <p className="font-semibold text-green-600">
                                            ₹{order.total}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Payment
                                        </p>

                                        <p className="capitalize font-semibold">
                                            {order.payment_method.replace(
                                                "_",
                                                " "
                                            )}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Status
                                        </p>

                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                            {
                                                order.order_status
                                            }
                                        </span>
                                    </div>

                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Delivery
                                        </p>

                                        <p className="font-semibold">
                                            {
                                                order.delivery_date
                                            }
                                        </p>
                                    </div>
                                </div>

                                {/* Products */}
                                <div className="mt-5 space-y-4">
                                    {order.products.map(
                                        (product) => (
                                            <div
                                                key={
                                                    product.product_id
                                                }
                                                className="flex justify-between items-center border rounded-xl p-4"
                                            >
                                                
                                                <div>
                                                    <h3 className="font-semibold">
                                                        {
                                                            product.product_name
                                                        }
                                                    </h3>

                                                    <p className="text-sm text-gray-500">
                                                        Qty:{" "}
                                                        {
                                                            product.quantity
                                                        }
                                                    </p>
                                                </div>

                                                <div className="text-right">
                                                    <p className="font-semibold">
                                                        ₹
                                                        {
                                                            product.line_total
                                                        }
                                                    </p>

                                                    <p className="text-sm text-gray-500">
                                                        ₹
                                                        {
                                                            product.unit_price
                                                        }
                                                        /item
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}