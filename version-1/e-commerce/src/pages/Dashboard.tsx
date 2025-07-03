import React, { useState, useEffect } from "react";
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
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Eye,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Calendar,
  Download,
} from "lucide-react";
import axios from "axios";
import { formatCurrency } from "../cart/formatCurrency";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");

const EcommerceDashboard = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedMetric, setSelectedMetric] = useState("revenue");
  const [kpis, setKpis] = useState<any | null>(null);
  const [kpiLoading, setKpiLoading] = useState(true);
  const [revenueTrend, setRevenueTrend] = useState<any[]>([]);
  const [trendLoading, setTrendLoading] = useState(true);

  useEffect(() => {
    setKpiLoading(true);
    axios
      .get(`${API_BASE_URL}/superadmin/dashboard/kpis`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setKpis(res.data);
        setKpiLoading(false);
      })
      .catch((err) => {
        setKpiLoading(false);
        setKpis(null);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    setTrendLoading(true);
    axios
      .get(`${API_BASE_URL}/superadmin/dashboard/revenue-trend?days=7`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setRevenueTrend(res.data.trend);
        setTrendLoading(false);
      })
      .catch((err) => {
        setTrendLoading(false);
        setRevenueTrend([]);
        console.error(err);
      });
  }, []);

  // Use revenueTrend for salesData
  const salesData = revenueTrend;

  const categoryData = [
    { name: "Electronics", value: 35, revenue: 45600, color: "#3b82f6" },
    { name: "Clothing", value: 28, revenue: 32400, color: "#10b981" },
    { name: "Home & Garden", value: 20, revenue: 28900, color: "#f59e0b" },
    { name: "Books", value: 10, revenue: 15200, color: "#ef4444" },
    { name: "Sports", value: 7, revenue: 12800, color: "#8b5cf6" },
  ];

  const topProducts = [
    { name: "iPhone 15 Pro", sales: 234, revenue: 234000, trend: "up" },
    { name: "MacBook Air M3", sales: 156, revenue: 187200, trend: "up" },
    { name: "Nike Air Max", sales: 189, revenue: 23625, trend: "down" },
    { name: "Samsung 4K TV", sales: 98, revenue: 78400, trend: "up" },
    { name: "Gaming Chair", sales: 145, revenue: 43500, trend: "up" },
  ];

  const trafficSourceData = [
    {
      source: "Organic Search",
      visitors: 4580,
      percentage: 42,
      color: "#3b82f6",
    },
    {
      source: "Social Media",
      visitors: 2340,
      percentage: 21,
      color: "#10b981",
    },
    {
      source: "Direct Traffic",
      visitors: 1890,
      percentage: 17,
      color: "#f59e0b",
    },
    {
      source: "Email Campaign",
      visitors: 1200,
      percentage: 11,
      color: "#ef4444",
    },
    { source: "Paid Ads", visitors: 990, percentage: 9, color: "#8b5cf6" },
  ];

  const customerSegmentData = [
    { segment: "New Customers", count: 1240, revenue: 45600, avgOrder: 36.77 },
    {
      segment: "Returning Customers",
      count: 2890,
      revenue: 124800,
      avgOrder: 43.18,
    },
    { segment: "VIP Customers", count: 156, revenue: 89400, avgOrder: 573.08 },
    {
      segment: "Inactive Customers",
      count: 890,
      revenue: 12400,
      avgOrder: 13.93,
    },
  ];

  const hourlyData = [
    { hour: "00:00", orders: 12, revenue: 1240 },
    { hour: "02:00", orders: 8, revenue: 890 },
    { hour: "04:00", orders: 5, revenue: 560 },
    { hour: "06:00", orders: 15, revenue: 1680 },
    { hour: "08:00", orders: 32, revenue: 3420 },
    { hour: "10:00", orders: 45, revenue: 4890 },
    { hour: "12:00", orders: 67, revenue: 7230 },
    { hour: "14:00", orders: 54, revenue: 5890 },
    { hour: "16:00", orders: 48, revenue: 5120 },
    { hour: "18:00", orders: 39, revenue: 4230 },
    { hour: "20:00", orders: 28, revenue: 3140 },
    { hour: "22:00", orders: 18, revenue: 2010 },
  ];

  const conversionFunnelData = [
    { stage: "Visitors", count: 12640, percentage: 100, color: "#3b82f6" },
    { stage: "Product Views", count: 8950, percentage: 70.8, color: "#10b981" },
    { stage: "Add to Cart", count: 3420, percentage: 27.1, color: "#f59e0b" },
    { stage: "Checkout", count: 1890, percentage: 14.9, color: "#ef4444" },
    { stage: "Purchase", count: 1024, percentage: 8.1, color: "#8b5cf6" },
  ];

  const monthlyComparisonData = [
    { month: "Jan", thisYear: 45600, lastYear: 42300 },
    { month: "Feb", thisYear: 52400, lastYear: 48900 },
    { month: "Mar", thisYear: 61200, lastYear: 55600 },
    { month: "Apr", thisYear: 58900, lastYear: 61200 },
    { month: "May", thisYear: 67800, lastYear: 63400 },
    { month: "Jun", thisYear: 74500, lastYear: 69800 },
    { month: "Jul", thisYear: 82300, lastYear: 76100 },
  ];

  const recentOrders = [
    {
      id: "#ORD-2024-001",
      customer: "John Smith",
      amount: 299.99,
      status: "Completed",
      time: "2 mins ago",
    },
    {
      id: "#ORD-2024-002",
      customer: "Sarah Johnson",
      amount: 156.5,
      status: "Processing",
      time: "5 mins ago",
    },
    {
      id: "#ORD-2024-003",
      customer: "Mike Chen",
      amount: 89.99,
      status: "Shipped",
      time: "12 mins ago",
    },
    {
      id: "#ORD-2024-004",
      customer: "Emily Davis",
      amount: 445.0,
      status: "Completed",
      time: "18 mins ago",
    },
    {
      id: "#ORD-2024-005",
      customer: "Alex Wilson",
      amount: 67.25,
      status: "Processing",
      time: "25 mins ago",
    },
  ];

  // Dynamically build KPI cards if kpis loaded
  const kpiCards = kpis
    ? [
        {
          title: "Total Revenue",
          value: formatCurrency(kpis.total_revenue),
          change: "+0%", // Placeholder for now
          trend: "up",
          icon: DollarSign,
          color: "bg-gradient-to-r from-blue-500 to-blue-600",
        },
        {
          title: "Total Orders",
          value: kpis.total_orders.toLocaleString(),
          change: "+0%",
          trend: "up",
          icon: ShoppingCart,
          color: "bg-gradient-to-r from-green-500 to-green-600",
        },
        {
          title: "Active Users",
          value: kpis.active_users.toLocaleString(),
          change: "+0%",
          trend: "up",
          icon: Users,
          color: "bg-gradient-to-r from-purple-500 to-purple-600",
        },
        {
          title: "Conversion Rate",
          value: `${kpis.conversion_rate}%`,
          change: "+0%",
          trend: "up",
          icon: TrendingUp,
          color: "bg-gradient-to-r from-orange-500 to-orange-600",
        },
      ]
    : [];

  if (kpiLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading dashboard KPIs...
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Track your ecommerce performance and insights
              </p>
            </div>
            <div className="flex gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiCards.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className={`${kpi.color} px-6 py-4`}>
                  <div className="flex items-center justify-between">
                    <Icon className="text-white" size={24} />
                    <div
                      className={`flex items-center gap-1 text-white text-sm font-medium`}
                    >
                      {kpi.trend === "up" ? (
                        <ArrowUpRight size={16} />
                      ) : (
                        <ArrowDownRight size={16} />
                      )}
                      {kpi.change}
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <h3 className="text-sm font-medium text-gray-600">
                    {kpi.title}
                  </h3>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {kpi.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Primary Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Revenue Trend
              </h3>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md"
              >
                <option value="revenue">Revenue</option>
                <option value="orders">Orders</option>
                {/* <option value="visitors">Visitors</option> */}
              </select>
            </div>
            {trendLoading ? (
              <div className="h-[300px] flex items-center justify-center">
                Loading revenue trend...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#3b82f6"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    tickFormatter={
                      selectedMetric === "revenue" ? formatCurrency : undefined
                    }
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    formatter={(value, name) =>
                      name === "revenue"
                        ? [formatCurrency(value), "Revenue"]
                        : [value, name.charAt(0).toUpperCase() + name.slice(1)]
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey={selectedMetric}
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Monthly Comparison */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Monthly Revenue Comparison
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar dataKey="thisYear" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="lastYear" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-600">This Year</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <span className="text-sm text-gray-600">Last Year</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Category Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Sales by Category
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => [`${value}%`, "Share"]}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {category.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {category.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Traffic Sources
            </h3>
            <div className="space-y-4">
              {trafficSourceData.map((source, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {source.source}
                    </span>
                    <span className="text-sm text-gray-600">
                      {source.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${source.percentage}%`,
                        backgroundColor: source.color,
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {source.visitors.toLocaleString()} visitors
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Funnel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Conversion Funnel
            </h3>
            <div className="space-y-3">
              {conversionFunnelData.map((stage, index) => (
                <div key={index} className="relative">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {stage.stage}
                    </span>
                    <span className="text-sm text-gray-600">
                      {stage.percentage}%
                    </span>
                  </div>
                  <div
                    className="h-8 rounded-lg flex items-center justify-center text-white text-sm font-medium transition-all duration-300"
                    style={{
                      backgroundColor: stage.color,
                      width: `${stage.percentage}%`,
                    }}
                  >
                    {stage.count.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hourly Performance & Customer Segments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Hourly Performance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Hourly Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="hour"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#3b82f6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Customer Segments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Customer Segments
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={customerSegmentData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <YAxis
                  type="category"
                  dataKey="segment"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  width={120}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar dataKey="count" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Top Products
            </h3>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">
                      {product.sales} sales
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(product.revenue)}
                    </p>
                    <div
                      className={`flex items-center gap-1 text-sm ${
                        product.trend === "up"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {product.trend === "up" ? (
                        <TrendingUp size={14} />
                      ) : (
                        <TrendingDown size={14} />
                      )}
                      {product.trend === "up" ? "+5.2%" : "-2.1%"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Orders
              </h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View all
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">
                      Order ID
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">
                      Customer
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">
                      Amount
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">
                      Status
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-2 text-sm font-medium text-blue-600">
                        {order.id}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-900">
                        {order.customer}
                      </td>
                      <td className="py-3 px-2 text-sm font-semibold text-gray-900">
                        {formatCurrency(order.amount)}
                      </td>
                      <td className="py-3 px-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-600">
                        {order.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceDashboard;
