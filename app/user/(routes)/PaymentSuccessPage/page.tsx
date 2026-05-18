"use client";
import { useEffect, useState } from "react";
import { useCheckoutStore } from "@/app/store/checkOutStore";
import { OrderType } from "@/app/util/type";
function Page() {

    const [latestOrder, setLatestOrder] = useState<OrderType>();
    const { shipDetails } = useCheckoutStore();

    useEffect(() => {
      setTimeout(()=>{
          const orders = JSON.parse(
            localStorage.getItem("orders") || "[]"
        );
        setLatestOrder(orders[orders.length - 1]);
      },0)
    }, []);

    if (!latestOrder) {
        return <div>Loading...</div>;
    }

    return (
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
                        <span className="text-gray-500">Order ID</span>
                        <span className="font-semibold text-gray-900">
                            {latestOrder.orderId}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Payment Method</span>
                        <span className="font-semibold text-gray-900">
                            {latestOrder.paymentMethod}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">Amount Paid</span>
                        <span className="font-semibold text-green-600">
                            ₹{latestOrder.totalAmount}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-500">
                            Estimated Delivery
                        </span>

                        <span className="font-semibold text-gray-900">
                            {shipDetails.estimatedDays} Days
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;