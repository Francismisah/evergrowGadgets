"use client";
import DashboardPage from "../dashboard/page";
import { MyDetailsForm } from "./account/MyDetailsForm";
import Sidebar from "./account/Sidebar";
import React, { useState } from "react";

export default function AccountsPage() {
  const [activeSidebarItem, setActiveSidebarItem] = useState<
    | "details"
    | "addressBook"
    | "orders"
    | "newsletters"
    | "dashBoard"
    | "settings"
  >("details");

  const handleSidebarItemClick = (
    item:
      | "details"
      | "addressBook"
      | "orders"
      | "newsletters"
      | "dashBoard"
      | "settings"
  ) => {
    setActiveSidebarItem(item); // No more 'as any' needed!
    // In a real app, you'd likely use React Router or similar to change views
    // For now, we'll just show the "My Details" form as it's the only one implemented.
  };

  return (
    <div className="min-h-screen bg-gray-200 p-8 flex flex-col items-center">
      <h1 className="bold-45 lg:bold-62 text-red-400 text-left my-12 ">
        My Account
      </h1>

      <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg overflow-hidden">
        <main className="flex flex-col lg:flex-row md:flex-row">
          <Sidebar
            activeItem={activeSidebarItem}
            onItemClick={handleSidebarItemClick}
          />
          {activeSidebarItem === "details" && <MyDetailsForm />}
          {activeSidebarItem === "dashBoard" && <DashboardPage />}
        </main>
      </div>
    </div>
  );
}