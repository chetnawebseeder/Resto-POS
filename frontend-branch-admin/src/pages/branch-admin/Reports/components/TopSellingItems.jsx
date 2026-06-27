import React from "react";

const TopSellingItems = () => {
  const items = [
    { name: "Chicken Biryani", qty: 482, revenue: "₹1,83,160" },
    { name: "Butter Chicken", qty: 341, revenue: "₹1,43,220" },
    { name: "Paneer Tikka", qty: 298, revenue: "₹95,360" },
    { name: "Dal Makhani", qty: 276, revenue: "₹77,280" },
    { name: "Veg Biryani", qty: 254, revenue: "₹76,200" },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">Top Selling Items</h3>
        <p className="text-xs text-slate-400 mt-0.5">Most popular menu items by revenue</p>
      </div>
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
            <th className="py-3 px-5 w-12">#</th>
            <th className="py-3 px-5">Item</th>
            <th className="py-3 px-5">Qty Sold</th>
            <th className="py-3 px-5 text-orange-600">Revenue</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
          {items.map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
              <td className="py-3.5 px-5 text-slate-400">#{idx + 1}</td>
              <td className="py-3.5 px-5 text-slate-900 font-semibold">{row.name}</td>
              <td className="py-3.5 px-5">{row.qty}</td>
              <td className="py-3.5 px-5 text-orange-600 font-semibold">{row.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopSellingItems;