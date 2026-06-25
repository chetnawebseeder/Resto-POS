import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  LayoutDashboard, GitBranch, Users, BarChart3,
  Settings, LogOut, Utensils, ClipboardList,
  UtensilsCrossed, Table2, ShoppingBag, ChefHat, X
} from "lucide-react";
import { logout } from "../../store/slices/authSlice";
import { ROLES } from "../../utils/constants";

const MENU_CONFIG = {
  [ROLES.SUPER_ADMIN]: [
    { section: "OVERVIEW", items: [{ label: "Dashboard", icon: LayoutDashboard, path: "/super-admin/dashboard" }] },
    { section: "MANAGEMENT", items: [{ label: "Branches", icon: GitBranch, path: "/super-admin/branches" }, { label: "Users", icon: Users, path: "/super-admin/users" }] },
    { section: "ANALYTICS", items: [{ label: "Reports", icon: BarChart3, path: "/super-admin/reports" }] },
    { section: "SYSTEM", items: [{ label: "Settings", icon: Settings, path: "/super-admin/settings" }] },
  ],
  [ROLES.BRANCH_ADMIN]: [
    { section: "OVERVIEW", items: [{ label: "Dashboard", icon: LayoutDashboard, path: "/branch/dashboard" }] },
    { section: "MANAGEMENT", items: [{ label: "Menu", icon: UtensilsCrossed, path: "/branch/menu" }, { label: "Orders", icon: ClipboardList, path: "/branch/orders" }, { label: "Tables", icon: Table2, path: "/branch/tables" }, { label: "Staff", icon: Users, path: "/branch/staff" }] },
    { section: "ANALYTICS", items: [{ label: "Reports", icon: BarChart3, path: "/branch/reports" }] },
    { section: "SYSTEM", items: [{ label: "Settings", icon: Settings, path: "/branch/settings" }] },
  ],
  [ROLES.RECEPTIONIST]: [
    { section: "OVERVIEW", items: [{ label: "POS / Billing", icon: ShoppingBag, path: "/pos" }, { label: "Orders", icon: ClipboardList, path: "/receptionist/orders" }, { label: "Tables", icon: Table2, path: "/receptionist/tables" }] },
  ],
  [ROLES.WAITER]: [
    { section: "MY STATION", items: [{ label: "Tables", icon: Table2, path: "/waiter/tables" }, { label: "Take Order", icon: ClipboardList, path: "/waiter/take-order" }, { label: "Order Status", icon: BarChart3, path: "/waiter/order-status" }] },
  ],
  [ROLES.KDS]: [
    { section: "KITCHEN", items: [{ label: "Live Display", icon: ChefHat, path: "/kds" }] },
  ],
};

export default function Sidebar({ isOpen, closeSidebar }) {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { role, email } = useSelector((s) => s.auth);

  const menuSections = MENU_CONFIG[role] || [];

  const displayName = email
    ? email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "User";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
     
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity"
          onClick={closeSidebar}
        />
      )}

      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-56 h-screen bg-[#0f1623] flex flex-col flex-shrink-0 
          transform transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none
          lg:relative lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
   
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center flex-shrink-0">
              <Utensils size={16} className="text-white" />
            </div>
            <span className="text-white font-bold text-base tracking-tight">RestoPOS</span>
          </div>
          
          <button 
            onClick={closeSidebar}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {menuSections.map((section) => (
            <div key={section.section}>
              <p className="text-[9px] font-semibold tracking-widest text-slate-500 px-3 mb-1.5">
                {section.section}
              </p>
              <ul className="space-y-0.5">
                {section.items.map(({ label, icon: Icon, path }) => (
                  <li key={path}>
                    <NavLink
                      to={path}
                      onClick={() => {
                        if (window.innerWidth < 1024 && closeSidebar) {
                          closeSidebar();
                        }
                      }}
                      className={({ isActive }) =>
                        [
                          "flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] font-medium transition-colors duration-150 border-l-[3px]",
                          isActive
                            ? "bg-slate-800 text-white border-orange-500"
                            : "text-slate-400 hover:text-white hover:bg-slate-800/50 border-transparent",
                        ].join(" ")
                      }
                    >
                      <Icon size={15} />
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-slate-800 px-4 py-4 bg-[#0f1623]">
          <p className="text-sm font-semibold text-white leading-tight">{displayName}</p>
          <p className="text-[11px] text-slate-500 mt-0.5 truncate mb-3">{email}</p>
          <button
            onClick={handleLogout}
            className="flex items-center w-full gap-2 text-[13px] text-slate-400 hover:text-white hover:bg-slate-800/50 px-2 py-2 -ml-2 rounded-md transition-colors"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}