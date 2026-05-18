import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addressDetails , shipDetails} from "../util/type";

interface CheckoutStore {
    selectedAddressId: number | null;

    addressDetails: addressDetails;
    allAddresses: addressDetails[];

    shipDetails: shipDetails;

    shippingMethod: string | null;
    paymentMethod: string;

    setSelectedAddressId: (id: number) => void;

    setAddressDetails: (details: addressDetails) => void;
    clearSelectedAddressId: () => void;

    setAllAddresses: (addresses: addressDetails[]) => void;

    setShipDetails: (details: shipDetails) => void;
    clearShippingMethod: () => void;

    setShippingMethod: (method: string) => void;

    setPaymentMethod: (method: string) => void;

    removeAddress: (id: number) => void;
}

export const useCheckoutStore = create<CheckoutStore>()(
    persist(
        (set) => ({
            selectedAddressId: null,
            addressDetails: {},
            allAddresses: [],
            shipDetails: {},
            shippingMethod: null,
            paymentMethod: "Credit Card",

            setSelectedAddressId: (id) => set({ selectedAddressId: id }),

            setAddressDetails: (details) => set({ addressDetails: details }),
            clearSelectedAddressId: () => set({ selectedAddressId: null }),

            setAllAddresses: (addresses) => set({ allAddresses: addresses }),

            setShipDetails: (details) => set({ shipDetails: details }),
            clearShippingMethod: () => set({ shippingMethod: null }),

            setShippingMethod: (method) => set({ shippingMethod: method }),

            setPaymentMethod: (method) => set({ paymentMethod: method }),

            removeAddress: (id) =>
                set((state) => ({
                    allAddresses: state.allAddresses.filter(
                        (address) => address.id !== Number(id)
                    ),
                })),
        }),
        {
            name: "checkout-storage", // localStorage key
            partialize: (state) => ({
                selectedAddressId: state.selectedAddressId,
                addressDetails: state.addressDetails,
                allAddresses: state.allAddresses,
                shipDetails: state.shipDetails,
                shippingMethod: state.shippingMethod,
                paymentMethod: state.paymentMethod,
            }),
        }
    )
);