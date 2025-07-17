/* --- src/layers/SalesOverviewCard.tsx --- */
import React from "react"; // Assuming React is imported as needed for components

interface SalesOverviewCardProps {
  title: string;
  value: string;
  percentage: number;
  color: string;
}

export const SalesOverviewCard: React.FC<SalesOverviewCardProps> = ({
  title,
  value,
  percentage,
  color,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col justify-between h-40 md:h-48">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <div className="flex items-center">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full"
            style={{ width: `${percentage}%`, backgroundColor: color }}
          ></div>
        </div>
        <span className="ml-3 text-sm font-medium" style={{ color: color }}>
          {percentage}%
        </span>
      </div>
    </div>
  );
};
