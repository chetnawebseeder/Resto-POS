import React from "react";

const CategoryRevenue = () => {
  const categories = [
    { name: "Main Course", percentage: "38%", color: "bg-orange-500" },
    { name: "Biryani & Rice", percentage: "22%", color: "bg-slate-800" },
    { name: "Starters", percentage: "18%", color: "bg-emerald-500" },
    { name: "Beverages", percentage: "10%", color: "bg-purple-500" },
    { name: "Breads", percentage: "7%", color: "bg-sky-500" },
    { name: "Desserts", percentage: "5%", color: "bg-pink-500" },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 h-full">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-800">Category Revenue</h3>
        <p className="text-xs text-slate-400 mt-0.5">Share of sales by category</p>
      </div>
      <div className="space-y-3 mt-5">
        {categories.map((cat, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs font-medium text-slate-700">
            <div className="flex items-center gap-3">
              <span className={`w-5 h-5 ${cat.color} text-white text-[10px] rounded flex items-center justify-center font-bold`}>
                {idx + 1}
              </span>
              <span>{cat.name}</span>
            </div>
            <span className="font-semibold text-slate-900">{cat.percentage}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryRevenue;