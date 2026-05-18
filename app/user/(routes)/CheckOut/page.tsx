"use client";

import { useState } from "react";
import Address from "../../_components/Address";
import Shipping from "../../_components/Shipping";
import Payment from "../../_components/Payment";
import StepBar from "../../_components/StepBar";
import { useCheckoutStore } from "@/app/store/checkOutStore";

export default function Page() {
  const [step, setStep] = useState(1);

  const {
    selectedAddressId,
    shippingMethod,
  } = useCheckoutStore();

  const handleStepChange = (next: number) => {
    if (next === 2 && !selectedAddressId) return;
    if (next === 3 && !shippingMethod) return;
    setStep(next);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6">

    
      <StepBar step={step} onStepChange={handleStepChange} />

      {step === 1 && (
        <Address onNext={() => handleStepChange(2)} />
      )}

      {step === 2 && (
        <Shipping
          onNext={() => handleStepChange(3)}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <Payment onBack={() => setStep(2)} />
      )}
    </div>
  );
}