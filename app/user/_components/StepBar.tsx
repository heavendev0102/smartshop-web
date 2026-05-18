"use client";
import { MapPin, Truck, CreditCard } from "lucide-react";

export default function StepBar({
  step,
  onStepChange,
}: {
  step: number;
  onStepChange: (step: number) => void;
}) {
  const steps = [
    { label: "Address", icon: MapPin },
    { label: "Shipping", icon: Truck },
    { label: "Payment", icon: CreditCard },
  ];

  return (
    <div className="grid grid-cols-3 mb-8 text-center w-full relative mt-10">

      {/* Line */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-300"></div>

      {steps.map((item, index) => {
        const Icon = item.icon;
        const stepNumber = index + 1;

        const isActive = step === stepNumber;
        const isCompleted = step > stepNumber;

        return (
          <div
            key={item.label}
            onClick={() => onStepChange(stepNumber)}
            className={`flex flex-col items-center relative z-10 cursor-pointer`}
          >
            {/* Circle */}
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300
              ${
                isActive
                  ? "bg-black text-white border-black"
                  : isCompleted
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-400 border-gray-300"
              }`}
            >
              <Icon size={18} />
            </div>

            {/* Label */}
            <p
              className={`text-xs mt-2 ${
                isActive ? "font-semibold text-black" : "text-gray-400"
              }`}
            >
              Step {stepNumber} {item.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}