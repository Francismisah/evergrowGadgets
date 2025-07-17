
import React from "react"; 

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm h-80 flex flex-col">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="flex-1 w-full h-full">
        {" "}
        {/* Flex-1 makes it take available space */}
        {children}
      </div>
    </div>
  );
};
