import React from "react";
import { Download } from "lucide-react";

const RevenueTrend = () => {
  const data = [
    { month: "Jan", koramangala: "₹11.0L", indiranagar: "₹8.2L", hsr: "₹6.8L", total: "₹26.0L", prev: "—", trend: null },
    { month: "Feb", koramangala: "₹11.8L", indiranagar: "₹8.5L", hsr: "₹7.2L", total: "₹27.5L", prev: "+5.8%", trend: "up" },
    { month: "Mar", koramangala: "₹12.4L", indiranagar: "₹8.9L", hsr: "₹7.6L", total: "₹28.9L", prev: "+5.1%", trend: "up" },
    { month: "Apr", koramangala: "₹12.0L", indiranagar: "₹8.7L", hsr: "₹7.4L", total: "₹28.1L", prev: "-2.8%", trend: "down" },
    { month: "May", koramangala: "₹13.1L", indiranagar: "₹9.2L", hsr: "₹8.1L", total: "₹30.4L", prev: "+8.2%", trend: "up" },
    { month: "Jun", koramangala: "₹12.4L", indiranagar: "₹8.9L", hsr: "₹7.6L", total: "₹28.9L", prev: "-4.8%", trend: "down" },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden h-full">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Revenue Trend</h3>
          <p className="text-xs text-slate-400 mt-0.5">Monthly revenue across all branches</p>
        </div>
        <button className="flex items-center gap-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors">
          <Download size={12} /> Export
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
              <th className="py-3 px-4">Month</th>
              <th className="py-3 px-4">Koramangala</th>
              <th className="py-3 px-4">Indiranagar</th>
              <th className="py-3 px-4">HSR Layout</th>
              <th className="py-3 px-4 text-orange-600">Total</th>
              <th className="py-3 px-4">Vs Prev</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 px-4 text-slate-900 font-semibold">{row.month}</td>
                <td className="py-3.5 px-4">{row.koramangala}</td>
                <td className="py-3.5 px-4">{row.indiranagar}</td>
                <td className="py-3.5 px-4">{row.hsr}</td>
                <td className="py-3.5 px-4 text-orange-600 font-semibold">{row.total}</td>
                <td className={`py-3.5 px-4 font-semibold ${row.trend === "up" ? "text-emerald-600" : row.trend === "down" ? "text-rose-600" : "text-slate-400"}`}>
                  {row.prev}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueTrend;