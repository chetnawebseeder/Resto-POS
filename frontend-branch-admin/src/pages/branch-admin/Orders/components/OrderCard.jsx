import { ClipboardList, Eye, Printer } from "lucide-react";

const OrderCard = ({
  orderNo = "ORD-043",
  status = "Preparing",
  statusColor = "blue",
  table = "Table 10",
  customer = "Ravi Pillai",
  time = "7 min ago",
  amount = "1,280",
  items = 3,
  foodItems = [],
}) => {
  const statusStyles = {
    blue: {
      icon: "bg-blue-500",
      badge: "bg-blue-50 text-blue-600 border border-blue-200",
    },
    orange: {
      icon: "bg-orange-500",
      badge: "bg-orange-50 text-orange-600 border border-orange-200",
    },
    green: {
      icon: "bg-emerald-500",
      badge: "bg-emerald-50 text-emerald-600 border border-emerald-200",
    },
    gray: {
      icon: "bg-slate-400",
      badge: "bg-slate-50 text-slate-600 border border-slate-200",
    },
  };

  const currentStyle = statusStyles[statusColor] || statusStyles.blue;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 sm:p-5">
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
        <div className="flex gap-3">

          <div
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white shrink-0 ${currentStyle.icon}`}
          >
            <ClipboardList size={20} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {orderNo}
              </h2>
              <span
                className={`px-2.5 py-1 rounded-md text-xs sm:text-sm font-medium ${currentStyle.badge}`}
              >
                {status}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs sm:text-sm font-medium bg-blue-50 text-blue-600 border border-blue-200">
                dine-in
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              {table} • {customer} • {time}
            </p>
          </div>

        </div>
        <div className="text-left lg:text-right">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            ₹{amount}
          </h2>
          <p className="text-sm text-slate-500">
            {items} items
          </p>

        </div>

      </div>

      <hr className="my-4 border-slate-200" />
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
        <div className="flex flex-wrap gap-2">

          {foodItems.map((item, index) => (
            <span
              key={index}
              className="bg-slate-100 px-3 py-1 rounded-full text-xs sm:text-sm text-slate-700"
            >
              {item}
            </span>
          ))}

        </div>
        <div className="flex gap-2 sm:gap-3">

          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 rounded-lg px-4 py-2 transition">
            <Eye size={16} />
            <span className="text-sm font-medium">Details</span>
          </button>

          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 rounded-lg px-4 py-2 transition">
            <Printer size={16} />
            <span className="text-sm font-medium">KOT</span>
          </button>

        </div>

      </div>

    </div>
  );
}
export default OrderCard