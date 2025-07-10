import { useState, useEffect } from "react";
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
  DollarSign,
  ShoppingCart,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Download,
} from "lucide-react";
import axios from "axios";
import { formatCurrency } from "../cart/formatCurrency";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");

// Define a color palette for the pie chart
const COLORS = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // yellow
  "#ef4444", // red
  "#8b5cf6", // purple
  "#6366f1", // indigo
  "#f472b6", // pink
  "#22d3ee", // cyan
  "#f87171", // rose
  "#a3e635", // lime
  "#fbbf24", // amber
  "#eab308", // gold
];

const EcommerceDashboard = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedMetric, setSelectedMetric] = useState("revenue");
  const [kpis, setKpis] = useState<any | null>(null);
  const [kpiLoading, setKpiLoading] = useState(true);
  const [revenueTrend, setRevenueTrend] = useState<any[]>([]);
  const [trendLoading, setTrendLoading] = useState(true);
  const [monthlyComparison, setMonthlyComparison] = useState<any[]>([]);
  const [monthlyLoading, setMonthlyLoading] = useState(true);
  const [categorySales, setCategorySales] = useState<any[]>([]);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [hourlyPerformance, setHourlyPerformance] = useState<any[]>([]);
  const [hourlyLoading, setHourlyLoading] = useState(true);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [topProductsLoading, setTopProductsLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [recentOrdersLoading, setRecentOrdersLoading] = useState(true);
  const [trafficSourceData, setTrafficSourceData] = useState<any[]>([]);
  const [trafficLoading, setTrafficLoading] = useState(true);
  const [conversionFunnelData, setConversionFunnelData] = useState<any[]>([]);
  const [funnelLoading, setFunnelLoading] = useState(true);

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

  useEffect(() => {
    setMonthlyLoading(true);
    axios
      .get(`${API_BASE_URL}/superadmin/dashboard/monthly-revenue-comparison`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setMonthlyComparison(res.data.comparison);
        setMonthlyLoading(false);
      })
      .catch((err) => {
        setMonthlyLoading(false);
        setMonthlyComparison([]);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    setCategoryLoading(true);
    axios
      .get(`${API_BASE_URL}/superadmin/dashboard/sales-by-category`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCategorySales(res.data.categories);
        setCategoryLoading(false);
      })
      .catch((err) => {
        setCategoryLoading(false);
        setCategorySales([]);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    setHourlyLoading(true);
    axios
      .get(`${API_BASE_URL}/superadmin/dashboard/hourly-performance`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setHourlyPerformance(res.data.hourly);
        setHourlyLoading(false);
      })
      .catch((err) => {
        setHourlyLoading(false);
        setHourlyPerformance([]);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    setTopProductsLoading(true);
    axios
      .get(`${API_BASE_URL}/superadmin/dashboard/top-products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setTopProducts(res.data.products);
        setTopProductsLoading(false);
      })
      .catch((err) => {
        setTopProductsLoading(false);
        setTopProducts([]);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    setRecentOrdersLoading(true);
    axios
      .get(`${API_BASE_URL}/superadmin/dashboard/recent-orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setRecentOrders(res.data.orders);
        setRecentOrdersLoading(false);
      })
      .catch((err) => {
        setRecentOrdersLoading(false);
        setRecentOrders([]);
        console.error(err);
      });
  }, []);

  // Fetch traffic sources from API
  useEffect(() => {
    setTrafficLoading(true);
    axios
      .get(`${API_BASE_URL}/admin/traffic-sources-summary`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const total =
          res.data.reduce((sum: number, src: any) => sum + src.count, 0) || 1;
        const colorPalette = COLORS;
        const mapped = res.data.map((src: any, idx: number) => ({
          source: src.utm_source || "Direct/Unknown",
          visitors: src.count,
          percentage: Math.round((src.count / total) * 100),
          color: colorPalette[idx % colorPalette.length],
        }));
        setTrafficSourceData(mapped);
        setTrafficLoading(false);
      })
      .catch((err) => {
        setTrafficLoading(false);
        setTrafficSourceData([]);
        console.error(err);
      });
  }, []);

  // Fetch conversion funnel from API
  useEffect(() => {
    setFunnelLoading(true);
    axios
      .get(`${API_BASE_URL}/admin/funnel-summary`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const funnelStages = [
          { key: "visit", label: "Visitors", color: "#3b82f6" },
          { key: "product_view", label: "Product Views", color: "#10b981" },
          { key: "add_to_cart", label: "Add to Cart", color: "#f59e0b" },
          { key: "checkout", label: "Checkout", color: "#ef4444" },
          { key: "purchase", label: "Purchase", color: "#8b5cf6" },
        ];
        const dataMap = Object.fromEntries(
          res.data.map((d: any) => [d.event, d.count])
        );
        const total = dataMap["visit"] || 1;
        const mapped = funnelStages.map((stage) => ({
          stage: stage.label,
          count: dataMap[stage.key] || 0,
          percentage: Math.round(((dataMap[stage.key] || 0) / total) * 100),
          color: stage.color,
        }));
        setConversionFunnelData(mapped);
        setFunnelLoading(false);
      })
      .catch((err) => {
        setFunnelLoading(false);
        setConversionFunnelData([]);
        console.error(err);
      });
  }, []);

  // Use revenueTrend for salesData
  const salesData = revenueTrend;

  // Use categorySales for categoryData
  const categoryData = categorySales;

  // Use hourlyPerformance for hourlyData
  const hourlyData = hourlyPerformance;

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

  // Use monthlyComparison for monthlyComparisonData
  const monthlyComparisonData = monthlyComparison;

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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-gradient-to-r from-green-500 to-green-600 text-white";
      case "pending":
        return "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white";
      case "cancelled":
        return "bg-gradient-to-r from-red-500 to-red-600 text-white";
      case "processing":
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white";
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
                {selectedMetric === "revenue"
                  ? "Revenue Trend"
                  : "Orders Trend"}
              </h3>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md"
              >
                <option value="revenue">Revenue</option>
                <option value="orders">Orders</option>
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
                    tickFormatter={(value: any) =>
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
                    tickFormatter={(value: any, _index: number) =>
                      selectedMetric === "revenue"
                        ? formatCurrency(value)
                        : String(value)
                    }
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    formatter={(value: any, name: any) =>
                      name === "revenue"
                        ? [formatCurrency(value), "Revenue"]
                        : [String(value), String(name)]
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
            {monthlyLoading ? (
              <div className="h-[300px] flex items-center justify-center">
                Loading monthly revenue...
              </div>
            ) : (
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
                    tickFormatter={(value: any, _index: number) =>
                      formatCurrency(value)
                    }
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    formatter={(value: any, _name: any, _props: any) => [
                      formatCurrency(value),
                      _name === "thisYear" ? "This Year" : "Last Year",
                    ]}
                  />
                  <Bar
                    dataKey="thisYear"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="lastYear"
                    fill="#e2e8f0"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
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
            {categoryLoading ? (
              <div className="h-[250px] flex items-center justify-center">
                Loading category sales...
              </div>
            ) : (
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
                    {categoryData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any, _name: any, _props: any) => [
                      `${value}%`,
                      "Share",
                    ]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
            <div className="mt-4 space-y-2">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {category.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {category.value}% ({formatCurrency(category.revenue)})
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
            {trafficLoading ? (
              <div className="h-[250px] flex items-center justify-center">
                Loading traffic sources...
              </div>
            ) : (
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
            )}
          </div>

          {/* Conversion Funnel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Conversion Funnel
            </h3>
            {funnelLoading ? (
              <div className="h-[250px] flex items-center justify-center">
                Loading conversion funnel...
              </div>
            ) : (
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
                        maxWidth: "100%", // Prevent overflow
                        minWidth: "2.5rem", // Optional: ensures visibility for very small percentages
                        boxSizing: "border-box", // Prevents padding/border from causing overflow
                      }}
                    >
                      {stage.count.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Hourly Performance & Customer Segments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Hourly Performance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Hourly Performance
            </h3>
            {hourlyLoading ? (
              <div className="h-[300px] flex items-center justify-center">
                Loading hourly performance...
              </div>
            ) : (
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
                    formatter={(value: any, name: any) =>
                      name === "revenue"
                        ? [formatCurrency(value), "Revenue"]
                        : [String(value), String(name)]
                    }
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
            )}
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
            {topProductsLoading ? (
              <div className="h-[200px] flex items-center justify-center">
                Loading top products...
              </div>
            ) : (
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {product.sales} sales
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(product.revenue)}
                      </p>
                      {/* Trend icon/color can be added if backend provides it */}
                    </div>
                  </div>
                ))}
              </div>
            )}
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
              {recentOrdersLoading ? (
                <div className="h-[200px] flex items-center justify-center">
                  Loading recent orders...
                </div>
              ) : (
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
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow ${getStatusColor(
                              order.status
                            )}`}
                          >
                            <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-sm text-gray-600">
                          {order.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceDashboard;
