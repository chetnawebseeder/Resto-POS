const CATEGORIES = [
  { rank: 1,  name: "Main Course",    pct: "38%", color: "bg-orange-500" },
  { rank: 2,  name: "Biryani & Rice", pct: "22%", color: "bg-slate-700"  },
  { rank: 3,  name: "Starters",       pct: "18%", color: "bg-green-600"  },
  { rank: 4,  name: "Beverages",      pct: "10%", color: "bg-blue-600"   },
  { rank: 5,  name: "Breads",         pct: "7%",  color: "bg-purple-600" },
  { rank: 6,  name: "Desserts",       pct: "5%",  color: "bg-pink-600"   },
];
const SalesByCategory = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h2 className="font-semibold text-slate-900">Sales by Category</h2>
      <p className="text-xs text-slate-400 mt-0.5 mb-5">Revenue share — this month</p>

      <ul className="space-y-4">
        {CATEGORIES.map((cat) => (
          <li key={cat.rank} className="flex items-center gap-3">
            <span className={`w-6 h-6 rounded-md ${cat.color} text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0`}>
              {cat.rank}
            </span>
            <span className="flex-1 text-sm text-slate-700">{cat.name}</span>
            <span className="text-sm font-semibold text-slate-600">{cat.pct}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SalesByCategory