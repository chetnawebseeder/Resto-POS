import React, { useState } from "react";
import { Download, DollarSign, ShoppingCart, TrendingUp, Calendar } from "lucide-react";
import RevenueTrend from "./components/RevenueTrend";
import CategoryRevenue from "./components/CategoryRevenue";
import DailyOrders from "./components/DailyOrders";
import TopSellingItems from "./components/TopSellingItems";

const Reports = () => {
  const [timeFilter, setTimeFilter] = useState("Year");

  const stats = [
    {
      title: "TOTAL REVENUE",
      value: "₹28.93L",
      change: "+12.4%",
      isPositive: true,
      subText: "vs last month",
      icon: <DollarSign size={20} className="text-orange-600" />,
      bg: "bg-orange-50",
    },
    {
      title: "TODAY'S REVENUE", 
      value: "₹94.2K",
      change: "+4.2%",
      isPositive: true,
      subText: "vs yesterday",
      icon: <Calendar size={20} className="text-orange-600" />,
      bg: "bg-orange-50",
    },
    {
      title: "TOTAL ORDERS",
      value: "4,821",
      change: "+8.2%",
      isPositive: true,
      subText: "vs last month",
      icon: <ShoppingCart size={20} className="text-orange-600" />,
      bg: "bg-orange-50",
    },
    {
      title: "AVG ORDER VALUE",
      value: "₹599",
      change: "+3.8%",
      isPositive: true,
      subText: "vs last month",
      icon: <TrendingUp size={20} className="text-orange-600" />,
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="text-sm text-slate-500 mt-0.5">Sales performance, trends and insights</p>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center">
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            {["Today", "Week", "Month", "Year"].map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  timeFilter === filter
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm transition-colors">
            <Download size={14} />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                {stat.title}
              </span>
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{stat.value}</h3>
              <div className="flex items-center gap-1.5 text-xs">
                <span className={`font-semibold ${stat.isPositive ? "text-emerald-600" : "text-rose-600"}`}>
                  {stat.change}
                </span>
                <span className="text-slate-400">{stat.subText}</span>
              </div>
            </div>
            <div className={`${stat.bg} p-2.5 rounded-lg`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueTrend />
        </div>
        <div className="lg:col-span-1">
          <CategoryRevenue />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DailyOrders />
        <TopSellingItems />
      </div>
    </div>
  );
};

export default Reports;