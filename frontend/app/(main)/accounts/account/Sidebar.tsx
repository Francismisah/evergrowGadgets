import React from "react";
import { User, MapPin, Package, Newspaper, Settings } from "lucide-react"; // Example icons

interface AccountSidebarProps {
  activeItem:
    | "details"
    | "addressBook"
    | "orders"
    | "newsletters"
    | "dashBoard"
    | "settings";
  onItemClick: (item: string) => void;
}

const Sidebar: React.FC<AccountSidebarProps> = ({
  activeItem,
  onItemClick,
}) => {
  const navItems = [
    { id: "details", icon: User, label: "My details" },
    { id: "addressBook", icon: MapPin, label: "My address book" },
    { id: "orders", icon: Package, label: "My orders" },
    { id: "newsletters", icon: Newspaper, label: "My newsletters" },
    { id: "dashBoard", icon: Settings, label: "Account Dashboard" },
    { id: "settings", icon: Settings, label: "Account settings" },
  ];

  return (
    <div className=" bg-gray-50 p-12 border-r border-gray-200 ">
      <ul className="space-y-2">
        {navItems.map((item) => {
          const isActive = activeItem === item.id;
          const activeClasses = isActive
            ? "bg-red-100 text-blue-700  font-semibold"
            : "text-gray-700  hover:bg-gray-100";
          return (
            <li key={item.id}>
              <button
                onClick={() => onItemClick(item.id)}
                className={`flex items-center w-full px-4 py-2 rounded-lg text-left transition-colors duration-200 ${activeClasses}`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
