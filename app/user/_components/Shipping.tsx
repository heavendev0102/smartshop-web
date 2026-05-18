import { useState } from "react";
import { useCheckoutStore } from "@/app/store/checkOutStore";
type OptionType = "free" | "express" | "schedule";

export default function Shipping({
    onNext,
    onBack,
}: {
    onNext: () => void;
    onBack: () => void;
}) {
    const { setShippingMethod, shippingMethod , setShipDetails} = useCheckoutStore();
    const [selected, setSelected] = useState<OptionType>("free");
    const [freeDate] = useState(getRandomFutureDate(5, 10));
    const [expressDate] = useState(getRandomFutureDate(1, 3));
    const [date, setDate] = useState("");
    function getRandomFutureDate(minDays: number, maxDays: number) {
        const today = new Date();
        const randomDays = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + randomDays);
        return {
            deliveryDate: futureDate.toDateString(),
            totalDays: randomDays,
        };
    }

    const handleMethodChange = (method: OptionType) => {
        setSelected(method);
        setShippingMethod(method);
        setShipDetails({
            method: method,
            charge: method === "free" ? 0 : method === "express" ? 800 : undefined,
            estimatedDays: method === "free" ? freeDate.totalDays.toString() : method === "express" ? expressDate.totalDays.toString() : undefined,
            estimatedDeliveryDate: method === "free" ? freeDate.deliveryDate : method === "express" ? expressDate.deliveryDate : undefined,
        });
    }

    return (
        <div className="w-full max-w-6xl mx-auto p-6 flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-4xl bg-white p-6 md:p-10 rounded-xl shadow">

                <h2 className="text-lg md:text-xl font-semibold mb-6">
                    Shipment Method
                </h2>

                <div className="space-y-4">


                    <label className="flex items-center justify-between border rounded-lg p-4 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <input
                                type="radio"
                                checked={shippingMethod === "free"}
                                onChange={() => handleMethodChange("free")}
                                className="accent-black"


                            />
                            <div>
                                <p className="font-medium">Free</p>
                                <p className="text-sm text-gray-500">Regular shipment</p>
                            </div>
                        </div>
                        <span className="text-sm text-gray-500">{freeDate.deliveryDate}</span>
                    </label>


                    <label className="flex items-center justify-between border rounded-lg p-4 cursor-pointer">
                        <div className="flex items-center gap-3">
                            <input
                                type="radio"
                                checked={shippingMethod === "express"}
                                onChange={() => handleMethodChange("express")}
                                className="accent-black"

                            />
                            <div>
                                <p className="font-medium">Rs. 800 </p>
                                <p className="text-sm text-gray-500">
                                    Get your delivery as soon as possible
                                </p>
                            </div>
                        </div>
                        <span className="text-sm text-gray-500">{expressDate.deliveryDate}</span>
                    </label>


                    <div className="border rounded-lg p-4">
                        <label className="flex items-center justify-between cursor-pointer">
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    checked={shippingMethod === "schedule"}
                                    onChange={() => handleMethodChange("schedule")}
                                    className="accent-black"

                                />
                                <div>
                                    <p className="font-medium">Schedule</p>
                                    <p className="text-sm text-gray-500">
                                        Pick a date when you want delivery
                                    </p>
                                </div>
                            </div>


                            <span className="text-sm text-gray-500">
                                {date ? date : "Select Date"}
                            </span>
                        </label>


                        {selected === "schedule" && (
                            <div className="mt-4">
                                <input
                                    type="date"
                                    className="border rounded-md px-3 py-2 w-full md:w-1/2"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                </div>


                <div className="flex justify-between mt-8">
                    <button className="px-6 py-2 border rounded-md" onClick={onBack}>
                        Back
                    </button>
                    <button className="px-6 py-2 bg-black text-white rounded-md" onClick={onNext}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
