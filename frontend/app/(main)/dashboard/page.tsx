import React from "react"; // React is needed for JSX and component creation
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { TableComponent } from "./layers/TableComponent";
import { ChartCard } from "./layers/ChartCard";
import { KpiCard } from "./layers/KpiCard";
import { SalesOverviewCard } from "./layers/SalesOverviewCard";

export default function DashboardPage() {
  const salesOverviewData = [
    { title: "Revenue", value: "$123,456", percentage: 84, color: "#4CAF50" },
    { title: "Customers", value: "2,345", percentage: 25, color: "#2196F3" },
    { title: "Orders", value: "987", percentage: 14, color: "#FFC107" },
    { title: "Visits", value: "4,567", percentage: 30, color: "#9C27B0" },
  ];

  // Data for the Inventory Management line chart
  const inventoryChartData = [
    { name: "Jan", laptop: 4000, desktop: 2400, tablet: 2400 },
    { name: "Feb", laptop: 3000, desktop: 1398, tablet: 2210 },
    { name: "Mar", laptop: 2000, desktop: 9800, tablet: 2290 },
    { name: "Apr", laptop: 2780, desktop: 3908, tablet: 2000 },
    { name: "May", laptop: 1890, desktop: 4800, tablet: 2181 },
    { name: "Jun", laptop: 2390, desktop: 3800, tablet: 2500 },
  ];

  // Data for the Customer Activity bar chart
  const customerActivityChartData = [
    { name: "100", value: 200 },
    { name: "150", value: 300 },
    { name: "180", value: 250 },
    { name: "200", value: 400 },
    { name: "240", value: 350 },
    { name: "280", value: 450 },
    { name: "300", value: 280 },
  ];

  // Data for the new Traffic Sources pie chart
  const trafficSourceData = [
    { name: "Organic Search", value: 4000 },
    { name: "Paid Ads", value: 2500 },
    { name: "Direct", value: 1500 },
    { name: "Social Media", value: 1000 },
    { name: "Referral", value: 500 },
  ];
  // Colors for the Pie Chart slices
  const PIE_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8A2BE2"];

  // Data for the new Top Selling Products table
  const topSellingProductsData = [
    { id: "LPT001", name: "ProBook 15X", sales: 15000, units: 10, stock: 25 },
    {
      id: "ACC005",
      name: "Gaming Mouse G9",
      sales: 5000,
      units: 200,
      stock: 500,
    },
    {
      id: "LPT002",
      name: "UltraThin Laptop 13",
      sales: 12000,
      units: 8,
      stock: 15,
    },
    {
      id: "ACC010",
      name: "USB-C Docking Station",
      sales: 3000,
      units: 150,
      stock: 80,
    },
    {
      id: "ACC003",
      name: "Ergonomic Keyboard",
      sales: 2500,
      units: 100,
      stock: 200,
    },
  ];

  // Data for the Abandoned Cart Rate KPI
  const abandonedCartRate = {
    title: "Abandoned Cart Rate",
    value: "65%",
    change: "+3%", // Example trend
    trend: "up", // 'up' indicates a worsening trend for abandoned carts
  };

  return (
    // Main container for the dashboard with responsive padding and centering
    <main className="flex-1 p-6 md:p-8 min-h-screen bg-gray-100 flex flex-col max-w-7xl mx-auto">
      {/* Sales Overview Section */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Sales Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {salesOverviewData.map((data, index) => (
          <SalesOverviewCard
            key={index}
            title={data.title}
            value={data.value}
            percentage={data.percentage}
            color={data.color}
          />
        ))}
      </div>

      {/* Inventory Management Section */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Inventory Management
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Stock Status Chart Card */}
        <ChartCard title="Stock Status Over Time">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={inventoryChartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend /> {/* Added Legend for the line chart */}
              <Line
                type="monotone"
                dataKey="laptop"
                stroke="#8884d8"
                name="Laptop Stock"
              />
              <Line
                type="monotone"
                dataKey="desktop"
                stroke="#82ca9d"
                name="Desktop Stock"
              />
              <Line
                type="monotone"
                dataKey="tablet"
                stroke="#ffc658"
                name="Tablet Stock"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Stock Levels Progress Card - Renamed for clarity */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Current Stock Progress
          </h2>
          <div className="space-y-3 text-gray-700">
            <p className="flex justify-between items-center">
              <span>Product Availability</span>{" "}
              <span className="font-semibold">100%</span>
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full w-[100%]"></div>
            </div>

            <p className="flex justify-between items-center">
              <span>Order Fulfillment Rate</span>{" "}
              <span className="font-semibold">98%</span>
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full w-[98%]"></div>
            </div>

            <p className="flex justify-between items-center">
              <span>Low Stock Alerts</span>{" "}
              <span className="font-semibold">10% of Products</span>
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-red-600 h-2.5 rounded-full w-[10%]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Activity Section */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Customer Activity
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Activity Bar Chart */}
        <ChartCard title="Monthly Activity">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={customerActivityChartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* New KPI Card: Abandoned Cart Rate */}
        <KpiCard
          title={abandonedCartRate.title}
          value={abandonedCartRate.value}
          change={abandonedCartRate.change}
          trend={abandonedCartRate.trend}
        />
      </div>

      {/* Website Performance & Product Insights Section */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Website Performance & Product Insights
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* New Chart Card: Traffic Sources (Pie Chart) */}
        <ChartCard title="Traffic Sources">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={trafficSourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {trafficSourceData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend /> {/* Added Legend for the pie chart */}
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* New Card: Top Selling Products (Table) */}
        <div className="bg-white p-4 rounded-lg shadow-sm overflow-x-auto">
          {" "}
          {/* Added overflow-x-auto for responsiveness */}
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Top Selling Products
          </h2>
          <TableComponent
            columns={[
              { header: "Product ID", accessor: "id" },
              { header: "Product Name", accessor: "name" },
              {
                header: "Sales ($)",
                accessor: "sales",
                render: (row) => `$${row.sales.toLocaleString()}`,
              },
              { header: "Units Sold", accessor: "units" },
              { header: "Current Stock", accessor: "stock" },
            ]}
            data={topSellingProductsData}
          />
        </div>
      </div>

      {/* You can add more sections here, e.g., "Marketing Campaign Performance" */}
    </main>
  );
}
