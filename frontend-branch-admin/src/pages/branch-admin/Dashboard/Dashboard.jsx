import { IndianRupee, GitBranch, ShoppingCart, Users } from "lucide-react";
import StatCard from "./StatCard";
import RevenueTable from "./RevenueTable";
import SalesByCategory from "./SalesByCategory";

const STATS = [
  {
    label:    "TOTAL REVENUE",
    value:    "₹28.93L",
    change:   "+12.4% vs last month",
    icon:     IndianRupee,
    iconBg:   "bg-orange-100",
    iconColor:"text-orange-600",
  },
  {
    label:    "ACTIVE BRANCHES",
    value:    "3 / 4",
    change:   "+1 this month · 1 inactive",
    icon:     GitBranch,
    iconBg:   "bg-orange-100",
    iconColor:"text-orange-600",
  },
  {
    label:    "TODAY'S ORDERS",
    value:    "202",
    change:   "+18% across all branches",
    icon:     ShoppingCart,
    iconBg:   "bg-orange-100",
    iconColor:"text-orange-600",
  },
  {
    label:    "TOTAL STAFF",
    value:    "24",
    change:   "8 online now",
    icon:     Users,
    iconBg:   "bg-orange-100",
    iconColor:"text-orange-600",
  },
];


const Dashboard = () => {
  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Branch Admin Overview</h1>
        <p className="text-sm text-slate-500 mt-0.5">Real-time snapshot across all operations</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>


      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        <RevenueTable />
        <SalesByCategory />
      </div>
      
    </div>
  )
}

export default Dashboard
