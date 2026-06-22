"use client";

import { useEffect, useState } from "react";
import { Pencil, X, Plus } from "lucide-react";
import { useCheckoutStore } from "@/app/store/checkOutStore";
import { addressDetails } from "@/app/util/type";
import api from "@/app/util/apiClient";
interface AddressResponseProps {
  id: number,
  title: string,
  phone: string,
  address: string,
  status: string,
}
export default function Address({ onNext }: { onNext: () => void }) {
  const {
    selectedAddressId,
    setSelectedAddressId,
    setAddressDetails,
    setAllAddresses,
    allAddresses,
    removeAddress,
  } = useCheckoutStore();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    type: "HOME",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      phone: "",
      type: "HOME",
    });
    setEditingId(null);
  };



  const handleEdit = (addr: addressDetails) => {
    setEditingId(addr.id!);

    setFormData({
      name: addr.name!,
      address: addr.address!,
      phone: addr.phone!,
      type: addr.type!,
    });

    setShowForm(true);
  };

  const fetchAddresses = async () => {
    try {
      const res = await api.get("/api/v1/addresses/");

      const formattedAddresses = res.data.map((item: AddressResponseProps) => ({
        id: item.id,
        name: item.title,
        phone: item.phone,
        address: item.address,
        type: item.status,
      }));

      setAllAddresses(formattedAddresses);

      if (formattedAddresses.length > 0) {
        setSelectedAddressId(formattedAddresses[0].id);
      }
    } catch (error) {
      console.error("Failed to fetch addresses", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/api/v1/addresses/${id}`);

      await fetchAddresses();
    } catch (error) {
      console.error("Delete address failed:", error);
    }
  };

  const selectedAddress = allAddresses.find(
    (addr) => addr.id === selectedAddressId
  );

  const handleSave = async () => {
    if (
      !formData.name.trim() ||
      !formData.address.trim() ||
      !formData.phone.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      // UPDATE ADDRESS
      if (editingId !== null) {
        await api.put(
          `/api/v1/addresses/${editingId}`,
          {
            title: formData.name,
            phone: formData.phone,
            address: formData.address,
            status: formData.type,
          }
        );

        await fetchAddresses();

        setShowForm(false);
        resetForm();

        return;
      }

      // ADD NEW ADDRESS
      await api.post(
        "/api/v1/addresses/",
        {
          title: formData.name,
          phone: formData.phone,
          address: formData.address,
          status: formData.type,
        }
      );

      await fetchAddresses();

      setShowForm(false);
      resetForm();
    } catch (error) {
      console.error("Save address failed:", error);
    }
  };
  useEffect(() => {
    if (selectedAddress) {
      setAddressDetails({
        name: selectedAddress.name,
        address: selectedAddress.address,
        phone: selectedAddress.phone,
        type: selectedAddress.type,
      });
    }
  }, [selectedAddress, selectedAddressId, setAddressDetails]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gray-50">
      <h2 className="text-lg font-semibold mb-4">
        Select Address
      </h2>

      {allAddresses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 mt-6 w-full bg-white max-w-6xl mx-auto border rounded-lg">
          <p className="text-gray-500 mb-4 text-lg">
            No address added yet
          </p>

          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded"
          >
            + Add New Address
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {allAddresses.map((addr) => (
              <div
                key={addr.id}
                onClick={() => setSelectedAddressId(addr.id!)}
                className={`border rounded-lg p-4 flex justify-between cursor-pointer transition ${selectedAddressId === addr.id
                  ? "bg-gray-200"
                  : "bg-white"
                  }`}
              >
                <div className="flex gap-3">
                  <input
                    type="radio"
                    checked={selectedAddressId === addr.id}
                    onChange={() =>
                      setSelectedAddressId(addr.id!)
                    }
                    className="mb-10 mr-5 accent-black"
                  />

                  <div>
                    <div className="flex gap-2 items-center">
                      <p className="font-medium">
                        {addr.name}
                      </p>

                      <span className="text-xs bg-black text-white m-2 p-1 rounded">
                        {addr.type}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600">
                      {addr.address}
                    </p>

                    <p className="text-sm text-gray-600">
                      {addr.phone}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 text-gray-500">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(addr);
                    }}
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(addr.id!);
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="flex items-center gap-2 mx-auto text-sm"
            >
              <Plus size={16} />
              Add New Address
            </button>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              className="px-6 py-2 bg-black text-white rounded"
              onClick={onNext}
            >
              Next
            </button>
          </div>
        </>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold">
              {editingId !== null
                ? "Update Address"
                : "Add Address"}
            </h2>

            <input
              name="name"
              placeholder="Address Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded outline-none"
            />

            <input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded outline-none"
            />

            <input
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border p-2 rounded outline-none"
            />

            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  name="type"
                  value="HOME"
                  checked={formData.type === "HOME"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Home
              </label>

              <label>
                <input
                  type="radio"
                  name="type"
                  value="OFFICE"
                  checked={formData.type === "OFFICE"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Office
              </label>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="bg-black text-white px-4 py-2 rounded"
              >
                {editingId !== null ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}