"use client";

import React, { useState, useEffect } from "react";
import { State, LGA, ShippingAddress } from "../types"; // Import new types

// Mock Data for Nigerian States and LGAs
// In a real application, this would come from an API or a larger data source.
const mockStates: State[] = [
  {
    id: "AN",
    name: "Anambra",
    lgas: [
      { id: "AWKA", name: "Awka South" },
      { id: "NNEWI", name: "Nnewi North" },
      { id: "ONITSHA_NORTH", name: "Onitsha North" },
      { id: "ONITSHA_SOUTH", name: "Onitsha South" },
      // ... more LGAs for Anambra
    ],
  },
  {
    id: "LAG",
    name: "Lagos",
    lgas: [
      { id: "IKJ", name: "Ikeja" },
      { id: "LEKKI", name: "Eti-Osa" },
      { id: "BADAGRY", name: "Badagry" },
      // ... more LGAs for Lagos
    ],
  },
   {
    id: "RIV",
    name: "RIVERS",
    lgas: [
      { id: "OBIO", name: "Obio/Akpor" },
      { id: "PORT", name: "Port Harcourt" },
      { id: "AHOADA_EAST", name: "Ahoada East" },
      { id: "AHOADA_WEST", name: "Ahoada West" },
      // ... more LGAs for Anambra
    ],
  },
  {
    id: "DEL",
    name: "Delta",
    lgas: [
      { id: "ASABA", name: "Oshimili South" },
      { id: "WARRI_S", name: "Warri South" },
      // ... more LGAs for Delta
    ],
  },
  // Add more states and their LGAs as needed
];

interface ShippingOptionsProps {
  // We'll pass the final address up, so remove previous options props
  onAddressSubmit: (address: ShippingAddress) => void;
  initialAddress?: ShippingAddress; // Optional for pre-filling form
}

const ShippingOptions: React.FC<ShippingOptionsProps> = ({
  onAddressSubmit,
  initialAddress,
}) => {
  const [selectedStateId, setSelectedStateId] = useState<string>(
    initialAddress?.state || ""
  );
  const [selectedLgaId, setSelectedLgaId] = useState<string>(
    initialAddress?.lga || ""
  );
  const [homeAddress, setHomeAddress] = useState<string>(
    initialAddress?.homeAddress || ""
  );
  const [phoneNumber, setPhoneNumber] = useState<string>(
    initialAddress?.phoneNumber || ""
  );

  const [availableLgas, setAvailableLgas] = useState<LGA[]>([]);

  // Update available LGAs when selectedStateId changes
  useEffect(() => {
    const state = mockStates.find((s) => s.id === selectedStateId);
    if (state) {
      setAvailableLgas(state.lgas);
      // If the previously selected LGA isn't in the new state's LGAs, clear it
      if (!state.lgas.some((lga) => lga.id === selectedLgaId)) {
        setSelectedLgaId("");
      }
    } else {
      setAvailableLgas([]);
      setSelectedLgaId(""); // Clear LGA if no state is selected
    }
  }, [selectedStateId, selectedLgaId]); // Include selectedLgaId to clear it if state changes

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStateId && selectedLgaId && homeAddress) {
      const selectedStateName =
        mockStates.find((s) => s.id === selectedStateId)?.name || "";
      const selectedLgaName =
        availableLgas.find((l) => l.id === selectedLgaId)?.name || "";

      onAddressSubmit({
        state: selectedStateName, // Pass the name of the state
        lga: selectedLgaName, // Pass the name of the LGA
        homeAddress: homeAddress,
        phoneNumber: phoneNumber,
      });
      alert("Shipping Address Submitted!"); // For demonstration
      console.log("Shipping Address:", {
        state: selectedStateName,
        lga: selectedLgaName,
        homeAddress: homeAddress,
        phoneNumber: phoneNumber,
      });
    } else {
      alert("Please fill in all shipping details.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
      <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* State Dropdown */}
        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            State
          </label>
          <select
            id="state"
            name="state"
            value={selectedStateId}
            onChange={(e) => setSelectedStateId(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
            required
          >
            <option value="">Select a State</option>
            {mockStates.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        {/* LGA Dropdown */}
        <div>
          <label
            htmlFor="lga"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Local Government Area (LGA)
          </label>
          <select
            id="lga"
            name="lga"
            value={selectedLgaId}
            onChange={(e) => setSelectedLgaId(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
            disabled={!selectedStateId} // Disable if no state is selected
            required
          >
            <option value="">Select an LGA</option>
            {availableLgas.map((lga) => (
              <option key={lga.id} value={lga.id}>
                {lga.name}
              </option>
            ))}
          </select>
        </div>

        {/* Home Address Input */}
        <div>
          <label
            htmlFor="homeAddress"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Home Address
          </label>
          <input
            type="text"
            id="homeAddress"
            name="homeAddress"
            value={homeAddress}
            onChange={(e) => setHomeAddress(e.target.value)}
            placeholder="e.g., House No. 123, Street Name, Area"
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phone-number"
            placeholder="e.g., +234 801 234 5678"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div className="mt-6 text-center">
          <button
            type="submit" // Use type="submit" for form submission
            className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Confirm Delivery Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingOptions;
