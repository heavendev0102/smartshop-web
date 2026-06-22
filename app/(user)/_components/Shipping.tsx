import { useEffect, useState } from "react";
import { useCheckoutStore } from "@/app/store/checkOutStore";
import api from "@/app/util/apiClient";
type OptionType = "free" | "express" | "schedule";

interface DeliveryOption {
    id: number;
    name: string;
    description: string;
    charge: number;
    delivery_days: number | null;
    estimated_delivery_date: string | null;
}

export default function Shipping({
    onNext,
    onBack,
}: {
    onNext: () => void;
    onBack: () => void;
}) {
    const {
        setShippingMethod,
        shippingMethod,
        setShipDetails, setSelectedDeliveryOptionId , setDeliveryDate
    } = useCheckoutStore();

    const [selected, setSelected] = useState<OptionType>("free");
    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(true);
    const [deliveryOptions, setDeliveryOptions] = useState<
        DeliveryOption[]
    >([]);

    useEffect(() => {
        const fetchDeliveryOptions = async () => {
            try {
                const response = await api.get( "/api/v1/delivery-options/delivery-options");
                const data = response.data;
                setDeliveryOptions(data);
                const freeOption = data.find( (item: DeliveryOption) =>item.name.toLowerCase() === "free");

                if (freeOption) {
                    setShippingMethod("free");
                    setSelectedDeliveryOptionId(freeOption.id);
                    setDeliveryDate(freeOption.estimated_delivery_date ?? "");
                    setShipDetails({
                        method: "free",
                        charge: freeOption.charge,
                        estimatedDays:
                            freeOption.delivery_days?.toString(),
                        estimatedDeliveryDate:
                            freeOption.estimated_delivery_date ?? undefined,
                    });
                }
            } catch (error) {
                console.error(
                    "Failed to fetch delivery options",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDeliveryOptions();
    }, []);

    const handleMethodChange = (
        method: OptionType,
        option: DeliveryOption
    ) => {
        setSelected(method);
        setShippingMethod(method);

        setShipDetails({
            method,
            charge: option.charge,
            estimatedDays:
                option.delivery_days?.toString(),
            estimatedDeliveryDate:
                option.estimated_delivery_date ?? undefined,
        });
        setSelectedDeliveryOptionId(option.id);
        setDeliveryDate(option.estimated_delivery_date ?? "");
    };

    if (loading) {
        return (
            <div className="w-full max-w-6xl mx-auto p-6">
                Loading shipping options...
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto p-6 flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-4xl bg-white p-6 md:p-10 rounded-xl shadow">
                <h2 className="text-lg md:text-xl font-semibold mb-6">
                    Shipment Method
                </h2>

                <div className="space-y-4">
                    {deliveryOptions.map((option) => {
                        const optionValue =
                            option.name.toLowerCase() as OptionType;

                        const isSchedule =
                            optionValue === "schedule";

                        return (
                            <div
                                key={option.id}
                                className="border rounded-lg p-4"
                            >
                                <label className="flex items-center justify-between cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            checked={
                                                shippingMethod ===
                                                optionValue
                                            }
                                            onChange={() =>
                                                handleMethodChange(
                                                    optionValue,
                                                    option
                                                )
                                            }
                                            className="accent-black"
                                        />

                                        <div>
                                            <p className="font-medium">
                                                {option.charge > 0
                                                    ? `${option.name} (Rs. ${option.charge})`
                                                    : option.name}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                {option.description}
                                            </p>
                                        </div>
                                    </div>

                                    <span className="text-sm text-gray-500">
                                        {isSchedule
                                            ? date || "Select Date"
                                            : option.estimated_delivery_date}
                                    </span>
                                </label>

                                {isSchedule &&
                                    selected === "schedule" && (
                                        <div className="mt-4">
                                            <input
                                                type="date"
                                                className="border rounded-md px-3 py-2 w-full md:w-1/2"
                                                value={date}
                                                onChange={(e) =>
                                                    setDate(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    )}
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-between mt-8">
                    <button
                        className="px-6 py-2 border rounded-md"
                        onClick={onBack}
                    >
                        Back
                    </button>

                    <button
                        className="px-6 py-2 bg-black text-white rounded-md"
                        onClick={onNext}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}