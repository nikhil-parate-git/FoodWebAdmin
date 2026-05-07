import React from "react";
import {
  Users,
  ShoppingBag,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Utensils,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";

// Sales Data for Area Chart
const salesData = [
  { name: "Mon", sales: 4000, orders: 240 },
  { name: "Tue", sales: 3000, orders: 198 },
  { name: "Wed", sales: 5000, orders: 305 },
  { name: "Thu", sales: 2780, orders: 210 },
  { name: "Fri", sales: 1890, orders: 150 },
  { name: "Sat", sales: 6390, orders: 450 },
  { name: "Sun", sales: 7490, orders: 520 },
];

// Popular Dishes Data
const dishData = [
  { name: "Paneer Tikka", value: 45, color: "#E23E08" },
  { name: "Veg Burger", value: 25, color: "#f59e0b" },
  { name: "Margherita Pizza", value: 20, color: "#10b981" },
  { name: "Cold Coffee", value: 10, color: "#3b82f6" },
];

const Dashboard = () => {
  return (
    <div className="p-6 bg-white rounded-lg  min-h-screen font-sans">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Dashboard Overview
          </h1>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value="₹1,28,430"
          icon={<DollarSign size={22} />}
          trend="+12.5%"
          isUp={true}
          bg="bg-orange-50"
          color="text-[#E23E08]"
        />
        <StatCard
          title="Total Orders"
          value="1,420"
          icon={<ShoppingBag size={22} />}
          trend="+8.2%"
          isUp={true}
          bg="bg-blue-50"
          color="text-blue-600"
        />
        <StatCard
          title="Active Customers"
          value="3,124"
          icon={<Users size={22} />}
          trend="-2.4%"
          isUp={false}
          bg="bg-green-50"
          color="text-green-600"
        />
        <StatCard
          title="Total Dishes"
          value="84"
          icon={<Utensils size={22} />}
          trend="Live"
          isUp={true}
          bg="bg-purple-50"
          color="text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Sales Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Revenue Analysis
              </h2>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                Weekly Performance
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs font-bold rounded-lg bg-gray-100 text-gray-600 hover:bg-[#E23E08] hover:text-white transition-all">
                Income
              </button>
              <button className="px-3 py-1 text-xs font-bold rounded-lg bg-gray-100 text-gray-600 hover:bg-[#E23E08] hover:text-white transition-all">
                Orders
              </button>
            </div>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E23E08" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#E23E08" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 600 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#E23E08"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                  dot={{
                    r: 4,
                    fill: "#E23E08",
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart - Popularity */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-2">
            Order Distribution
          </h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-6">
            Top Categories
          </p>

          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dishData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {dishData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-gray-800">85%</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase">
                Success Rate
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {dishData.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-bold text-gray-700">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm font-black text-gray-800">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card
const StatCard = ({ title, value, icon, trend, isUp, bg, color }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
    <div className="flex items-center justify-between mb-4">
      <div
        className={`p-2.5 rounded-xl ${bg} ${color} group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      <div
        className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg ${isUp ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}
      >
        {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {trend}
      </div>
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-600 ">{title}</p>
      <h3 className="text-2xl font-black text-gray-800 mt-1">{value}</h3>
    </div>
  </div>
);

export default Dashboard;
