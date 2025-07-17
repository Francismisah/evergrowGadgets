import React from "react";
import { Calendar } from "lucide-react"; // Calendar icon

export const MyDetailsForm: React.FC = () => {
  return (
    <div className="flex-1 p-8">
      <div className="mb-6">
        <span className="text-sm text-gray-500">Homepage / My Account</span>
        <h1 className="text-2xl font-bold text-gray-800 mt-2">My details</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Personal Information
        </h2>
        <p className="text-sm text-gray-600 mb-6 max-w-md">
          Assertively utilize adaptive customer service for future-proof
          platforms. Completely drive optimal markets.
        </p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-xs font-medium text-gray-500 mb-1"
            >
              FIRST NAME
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="Mateusz" // Example pre-filled data
            />
          </div>
          {/* Second Name */}
          <div>
            <label
              htmlFor="secondName"
              className="block text-xs font-medium text-gray-500 mb-1"
            >
              SECOND NAME
            </label>
            <input
              type="text"
              id="secondName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="Wierzbicki" // Example pre-filled data
            />
          </div>
          {/* Birth Date */}
          <div className="relative">
            <label
              htmlFor="birthDate"
              className="block text-xs font-medium text-gray-500 mb-1"
            >
              BIRHT DATE
            </label>
            <input
              type="text"
              id="birthDate"
              placeholder="dd/mm/yy"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <Calendar className="absolute right-3 top-1/2 mt-2 text-gray-400 w-5 h-5" />
          </div>
          {/* Phone Number */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-xs font-medium text-gray-500 mb-1"
            >
              PHONE NUMBER
            </label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="123456789"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Keep 9-digit format with no spaces and dashes.
            </p>
          </div>

          {/* Save Button */}
          <div className="col-span-1 md:col-span-2 mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-semibold"
            >
              SAVE
            </button>
          </div>
        </form>

        {/* E-mail address section */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            E-mail address
          </h2>
          <p className="text-sm text-gray-600 mb-6 max-w-md">
            Assertively utilize adaptive customer service for future-proof
            platforms. Completely drive optimal markets.
          </p>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Email Address */}
            <div>
              <label
                htmlFor="emailAddress"
                className="block text-xs font-medium text-gray-500 mb-1"
              >
                E-MAIL ADDRESS
              </label>
              <input
                type="email"
                id="emailAddress"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="email@example.pl" // Example pre-filled data
              />
            </div>
            {/* Save Button for email */}
            <div className="col-span-1 md:col-span-2 mt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-semibold"
              >
                SAVE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
