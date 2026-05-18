"use client";
import Image from "next/image";
import useCartStore from "@/app/store/cartStore";
import { useState } from "react";
import paypal from "../../../public/Home/paypal.png";
import { useCheckoutStore } from "@/app/store/checkOutStore";
import Script from "next/script";
import { useRouter } from "next/navigation";
type FormDataType = {
    cardName: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
};

type ErrorType = {
    cardName: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
};
export default function Payment({ onBack }: { onBack: () => void }) {
    const [formData, setFormData] = useState<FormDataType>({
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    });

    const [errors, setErrors] = useState<ErrorType>({
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    });
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        let updatedValue = value;

        // Only numbers for card number
        if (name === "cardNumber") {
            updatedValue = value.replace(/\D/g, "").slice(0, 16);
        }

        // Only numbers for CVV
        if (name === "cvv") {
            updatedValue = value.replace(/\D/g, "").slice(0, 3);
        }

        // Expiry format MM/YY
        if (name === "expiry") {
            updatedValue = value
                .replace(/\D/g, "")
                .slice(0, 4);

            if (updatedValue.length >= 3) {
                updatedValue =
                    updatedValue.slice(0, 2) +
                    "/" +
                    updatedValue.slice(2);
            }
        }

        setFormData((prev) => ({
            ...prev,
            [name]: updatedValue,
        }));

        // Remove error while typing
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const [paymentType, setPaymentType] = useState("Credit Card");
    const router = useRouter();
    const {
        setPaymentMethod,
        addressDetails,
        shippingMethod,
        clearSelectedAddressId,
        clearShippingMethod
    } = useCheckoutStore();

    const { cartItems, clearCart } = useCartStore();
    const handlePayments = () => {
        const newErrors: ErrorType = {
            cardName: "",
            cardNumber: "",
            expiry: "",
            cvv: "",
        };

        let isValid = true;
        if (paymentType === "PayPal") {
            window.open("https://www.paypal.com/");
            return;
        }

        // Redirect PayPal Credit
        if (paymentType === "PayPal Credit") {
            window.open("https://www.paypal.com/us/digital-wallet/ways-to-pay/buy-now-pay-later");
            return;
        }
        if (paymentType === "Credit Card") {
            if (!formData.cardName.trim()) {
                newErrors.cardName =
                    "Card holder name is required";
                isValid = false;
            }

            if (!formData.cardNumber.trim()) {
                newErrors.cardNumber =
                    "Card number is required";
                isValid = false;
            } else if (
                formData.cardNumber.length !== 16
            ) {
                newErrors.cardNumber =
                    "Card number must be 16 digits";
                isValid = false;
            }

            if (!formData.expiry.trim()) {
                newErrors.expiry = "Expiry date is required";
                isValid = false;
            } else {
                const expiryRegex =
                    /^(0[1-9]|1[0-2])\/\d{2}$/;

                if (!expiryRegex.test(formData.expiry)) {
                    newErrors.expiry =
                        "Expiry must be in MM/YY format";
                    isValid = false;
                } else {
                    const [month, year] =
                        formData.expiry.split("/");

                    const expiryMonth = parseInt(month);
                    const expiryYear =
                        2000 + parseInt(year);

                    const currentDate = new Date();

                    const currentMonth =
                        currentDate.getMonth() + 1;

                    const currentYear =
                        currentDate.getFullYear();

                    // Check expired
                    if (
                        expiryYear < currentYear ||
                        (expiryYear === currentYear &&
                            expiryMonth < currentMonth)
                    ) {
                        newErrors.expiry =
                            "Card has expired";
                        isValid = false;
                    }
                }
            }
            if (!formData.cvv.trim()) {
                newErrors.cvv = "CVV is required";
                isValid = false;
            } else if (formData.cvv.length !== 3) {
                newErrors.cvv =
                    "CVV must be 3 digits";
                isValid = false;
            }
        }

        setErrors(newErrors);

        if (!isValid) return;
        const currentUser = JSON.parse(
            localStorage.getItem("currentUser") || "{}"
        );
        // Demo Order
        const order = {
            orderId: "ORD-" + new Date().getTime(),
            userId: currentUser.id,
            userName: currentUser.firstName + " " + currentUser.lastName,
            items: cartItems.map((item) => ({
                productId: item.id,
                name: item.name,
            })),
            totalAmount: totalPrice,
            paymentMethod: paymentType,

            paymentDetails:
                paymentType === "Credit Card"
                    ? {
                        cardHolder:
                            formData.cardName,
                        last4:
                            formData.cardNumber.slice(
                                -4
                            ),
                    }
                    : {
                        method: paymentType,
                    },
        };
        const storedOrders = localStorage.getItem("orders");
        const orders = storedOrders ? JSON.parse(storedOrders) : [];
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));
        // Reset form
        setFormData({
            cardName: "",
            cardNumber: "",
            expiry: "",
            cvv: "",
        });
        clearCart();
        clearSelectedAddressId();
        clearShippingMethod();
        // Redirect
        router.push("/user/PaymentSuccessPage");
    };
    const handlePaymentMethodChange = (method: string) => {
        setPaymentType(method);
        setPaymentMethod(method);
    }
    const totalPrice = cartItems.reduce((sum, currentItem) => {
        return sum + currentItem.price * currentItem.quantity;
    }, 0);


    return (
        <div className=" bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* LEFT - SUMMARY */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4">Summary</h2>

                    {/* Products */}
                    <div className="space-y-4">
                        {cartItems.map((item, i) => (
                            <div
                                key={i}
                                className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                                <span className="text-sm">{item.name}</span>
                                {/* <span className="font-medium">Qty.{item.quantity}</span> */}
                                <span className="font-medium">Rs.{item.price.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    {/* Address */}
                    <div className="mt-6 text-sm text-gray-600">
                        <p className="font-medium mb-1">Address</p>
                        <p>{addressDetails.address}</p>
                    </div>

                    {/* Shipment */}
                    <div className="mt-4 text-sm text-gray-600">
                        <p className="font-medium mb-1">Shipment method</p>
                        <p>{shippingMethod}</p>
                    </div>
                    {/*  */}
                    {/* Price Details */}
                    <div className="mt-6 space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>Rs.{totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Estimated Tax</span>
                            <span>Rs.50</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping & Handling</span>
                            <span>Rs.29</span>
                        </div>

                        <div className="flex justify-between font-semibold text-base mt-3">
                            <span>Total</span>
                            <span>Rs.{(totalPrice + 50 + 29).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT - PAYMENT */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4">Payment</h2>

                    {/* Tabs */}
                    <div className="flex gap-6 border-b mb-6">
                        {["Credit Card", "PayPal", "PayPal Credit"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handlePaymentMethodChange(tab)}
                                className={`pb-2 text-sm ${paymentType === tab
                                    ? "border-b-2 border-black font-medium"
                                    : "text-gray-400"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* CARD PREVIEW */}
                    {/* CONTENT BASED ON TAB */}
                    {paymentType === "Credit Card" && (
                        <>
                            <div className="bg-black text-white rounded-xl p-6 mb-6 relative overflow-hidden">
                                <div className="text-sm opacity-70 mb-6">Cardholder</div>
                                <div className="tracking-widest text-lg">
                                    4085 9536 8475 9530
                                </div>

                                <div className="absolute bottom-4 right-4 flex gap-1">
                                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                                    <div className="w-4 h-4 bg-yellow-400 rounded-full -ml-2"></div>
                                </div>
                            </div>

                            {/* FORM */}
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Cardholder Name"
                                    name="cardName"
                                    className="w-full border rounded-md px-3 py-2"
                                    value={
                                        formData.cardName
                                    }
                                    onChange={handleChange}
                                />
                                {errors.cardName && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.cardName}
                                    </p>
                                )}
                                <input
                                    type="text"
                                    placeholder="Card Number"
                                    name="cardNumber"
                                    className="w-full border rounded-md px-3 py-2"
                                    value={
                                        formData.cardNumber
                                    }
                                    onChange={handleChange}
                                />
                                {errors.cardNumber && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.cardNumber}
                                    </p>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Exp. Date"
                                            className="border rounded-md px-3 py-2"
                                            name="expiry"
                                            value={
                                                formData.expiry
                                            }
                                            onChange={handleChange}
                                        />
                                        {errors.expiry && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.expiry}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="CVV"
                                            className="border rounded-md px-3 py-2"
                                            name="cvv"
                                            value={
                                                formData.cvv
                                            }
                                            onChange={handleChange}
                                        />
                                        {errors.cvv && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.cvv}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <label className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" defaultChecked />
                                    Same as billing address
                                </label>
                            </div>
                        </>
                    )}

                    {paymentType === "PayPal" && (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                            <Image
                                src={paypal}
                                alt="paypal"
                                width={160}
                                height={160}
                                className="w-40 mb-4"
                            />
                            <p className="text-gray-600 mb-4">
                                You will be redirected to PayPal to complete your purchase securely.
                            </p>
                            <button className="bg-blue-500 text-white px-6 py-2 rounded-md">
                                Continue with PayPal
                            </button>
                        </div>
                    )}

                    {paymentType === "PayPal Credit" && (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                            <p className="text-lg font-medium mb-2">PayPal Credit</p>
                            <p className="text-gray-600 mb-4">
                                Buy now and pay later using PayPal Credit.
                            </p>
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-md">
                                Apply & Continue
                            </button>
                        </div>
                    )}
                    {/* BUTTONS */}
                    <div className="flex justify-between mt-8">
                        <button className="px-6 py-2 border rounded-md" onClick={onBack}>
                            Back
                        </button>
                        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
                        <button type="button" className="px-6 py-2 bg-black text-white rounded-md" onClick={handlePayments} >
                            Pay Now
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}