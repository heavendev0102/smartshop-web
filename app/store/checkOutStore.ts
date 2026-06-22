import { create } from "zustand";
import { persist } from "zustand/middleware";

import { addressDetails, shipDetails } from "../util/type";

interface CheckoutStore {
    // Address
    selectedAddressId: number | null;
    addressDetails: addressDetails;
    allAddresses: addressDetails[];

    // Shipping
    selectedDeliveryOptionId: number | null;
    shipDetails: shipDetails;
    shippingMethod: string | null;
    deliveryDate: string | null;

    // Payment
    paymentMethod: string;

    // Address Actions
    setSelectedAddressId: (id: number) => void;
    clearSelectedAddressId: () => void;

    setAddressDetails: (details: addressDetails) => void;
    setAllAddresses: (addresses: addressDetails[]) => void;

    removeAddress: (id: number) => void;

    // Shipping Actions
    setSelectedDeliveryOptionId: (id: number) => void;
    clearSelectedDeliveryOptionId: () => void;

    setShipDetails: (details: shipDetails) => void;

    setShippingMethod: (method: string) => void;
    clearShippingMethod: () => void;

    setDeliveryDate: (date: string) => void;
    clearDeliveryDate: () => void;

    // Payment Actions
    setPaymentMethod: (method: string) => void;

    // Checkout Reset
    clearCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutStore>()(
    persist(
        (set) => ({
            // Address
            selectedAddressId: null,
            addressDetails: {},
            allAddresses: [],

            // Shipping
            selectedDeliveryOptionId: null,
            shipDetails: {},
            shippingMethod: null,
            deliveryDate: null,

            // Payment
            paymentMethod: "credit_card",

            // Address Actions
            setSelectedAddressId: (id) =>
                set({
                    selectedAddressId: id,
                }),

            clearSelectedAddressId: () =>
                set({
                    selectedAddressId: null,
                }),

            setAddressDetails: (details) =>
                set({
                    addressDetails: details,
                }),

            setAllAddresses: (addresses) =>
                set({
                    allAddresses: addresses,
                }),

            removeAddress: (id) =>
                set((state) => ({
                    allAddresses: state.allAddresses.filter(
                        (address) => address.id !== Number(id)
                    ),
                })),

            // Shipping Actions
            setSelectedDeliveryOptionId: (id) =>
                set({
                    selectedDeliveryOptionId: id,
                }),

            clearSelectedDeliveryOptionId: () =>
                set({
                    selectedDeliveryOptionId: null,
                }),

            setShipDetails: (details) =>
                set({
                    shipDetails: details,
                }),

            setShippingMethod: (method) =>
                set({
                    shippingMethod: method,
                }),

            clearShippingMethod: () =>
                set({
                    shippingMethod: null,
                }),

            setDeliveryDate: (date) =>
                set({
                    deliveryDate: date,
                }),

            clearDeliveryDate: () =>
                set({
                    deliveryDate: null,
                }),

            // Payment
            setPaymentMethod: (method) =>
                set({
                    paymentMethod: method,
                }),

            // Reset Entire Checkout
            clearCheckout: () =>
                set({
                    selectedAddressId: null,
                    addressDetails: {},
                    allAddresses: [],

                    selectedDeliveryOptionId: null,
                    shipDetails: {},
                    shippingMethod: null,
                    deliveryDate: null,

                    paymentMethod: "credit_card",
                }),
        }),
        {
            name: "checkout-storage",

            partialize: (state) => ({
                selectedAddressId: state.selectedAddressId,
                addressDetails: state.addressDetails,
                allAddresses: state.allAddresses,

                selectedDeliveryOptionId:
                    state.selectedDeliveryOptionId,

                shipDetails: state.shipDetails,
                shippingMethod: state.shippingMethod,
                deliveryDate: state.deliveryDate,

                paymentMethod: state.paymentMethod,
            }),
        }
    )
);