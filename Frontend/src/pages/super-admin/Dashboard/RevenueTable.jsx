import { Download } from "lucide-react";
const REVENUE_ROWS = [
  { month: "Jan", koramangala: "₹11.0L", indiranagar: "₹8.2L", hsr: "₹6.8L", total: "₹26.0L" },
  { month: "Feb", koramangala: "₹11.8L", indiranagar: "₹8.5L", hsr: "₹7.2L", total: "₹27.5L" },
  { month: "Mar", koramangala: "₹12.4L", indiranagar: "₹8.9L", hsr: "₹7.6L", total: "₹28.9L" },
  { month: "Apr", koramangala: "₹12.0L", indiranagar: "₹8.7L", hsr: "₹7.4L", total: "₹28.1L" },
  { month: "May", koramangala: "₹13.1L", indiranagar: "₹9.2L", hsr: "₹8.1L", total: "₹30.4L" },
  { month: "Jun", koramangala: "₹12.4L", indiranagar: "₹8.9L", hsr: "₹7.6L", total: "₹28.9L" },
];


const RevenueTable = () => {
  return (
    <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div>
          <h2 className="font-semibold text-slate-900">Monthly Revenue by Branch</h2>
          <p className="text-xs text-slate-400 mt-0.5">Jan – Jun 2025</p>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg px-3 py-2 hover:bg-slate-50">
          <Download size={13} />
          Export
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase border-b border-slate-100">
              <th className="text-left px-6 py-3">Month</th>
              <th className="text-left px-4 py-3">Koramangala</th>
              <th className="text-left px-4 py-3">Indiranagar</th>
              <th className="text-left px-4 py-3">HSR Layout</th>
              <th className="text-left px-4 py-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {REVENUE_ROWS.map((row, i) => (
              <tr
                key={row.month}
                className={`border-b border-slate-50 ${i % 2 === 0 ? "" : "bg-slate-50/50"}`}
              >
                <td className="px-6 py-3 font-medium text-slate-800">{row.month}</td>
                <td className="px-4 py-3 text-slate-600">{row.koramangala}</td>
                <td className="px-4 py-3 text-slate-600">{row.indiranagar}</td>
                <td className="px-4 py-3 text-slate-600">{row.hsr}</td>
                <td className="px-4 py-3 font-semibold text-orange-600">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RevenueTable