import React from "react";

const DailyOrders = () => {
  const days = [
    { day: "Mon", orders: 142, revenue: "₹89.4K", avg: "₹630" },
    { day: "Tue", orders: 128, revenue: "₹78.2K", avg: "₹611" },
    { day: "Wed", orders: 165, revenue: "₹1.0L", avg: "₹621" },
    { day: "Thu", orders: 158, revenue: "₹98.7K", avg: "₹625" },
    { day: "Fri", orders: 192, revenue: "₹1.2L", avg: "₹650" },
    { day: "Sat", orders: 218, revenue: "₹1.5L", avg: "₹680" },
    { day: "Sun", orders: 201, revenue: "₹1.4L", avg: "₹679" },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">Daily Orders & Revenue</h3>
        <p className="text-xs text-slate-400 mt-0.5">Order volume and daily revenue breakdown</p>
      </div>
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
            <th className="py-3 px-5">Day</th>
            <th className="py-3 px-5">Orders</th>
            <th className="py-3 px-5 text-orange-600">Daily Revenue</th>
            <th className="py-3 px-5">Avg / Order</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
          {days.map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
              <td className="py-3 px-5 text-slate-900 font-semibold">{row.day}</td>
              <td className="py-3 px-5">{row.orders}</td>
              <td className="py-3 px-5 text-orange-600 font-semibold">{row.revenue}</td>
              <td className="py-3 px-5 text-slate-500">{row.avg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DailyOrders;