/* --- src/layers/KpiCard.tsx --- */
import React from "react"; // Assuming React is imported as needed for components
import { FaArrowUp, FaArrowDown, FaMinus } from "react-icons/fa"; 
interface KpiCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  change,
  trend,
}) => {
  const TrendIcon =
    trend === "up" ? FaArrowUp : trend === "down" ? FaArrowDown : FaMinus;
  const trendColorClass =
    trend === "up"
      ? "text-green-600"
      : trend === "down"
      ? "text-red-600"
      : "text-gray-500";

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col justify-between h-40 md:h-48">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      {change && (
        <div
          className={`flex items-center text-sm font-medium ${trendColorClass}`}
        >
          <TrendIcon className="mr-1" />
          <span>{change}</span>
        </div>
      )}
    </div>
  );
};
