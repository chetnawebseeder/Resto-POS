import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LayoutDashboard, ClipboardList, Package, ShoppingCart, Users, FileText, LogOut, Utensils, X } from "lucide-react";
import { logout } from "../../store/slices/authSlice";

const MENU = [
  { section: "OVERVIEW", items: [{ label: "Dashboard", icon: LayoutDashboard, path: "/branch-admin/dashboard" }] },
  { section: "OPERATIONS", items: [
      { label: "Menu",          icon: Utensils,        path: "/branch-admin/menu" },
      { label: "Tables",        icon: LayoutDashboard, path: "/branch-admin/tables" },
      { label: "Orders",        icon: ClipboardList,   path: "/branch-admin/orders" },
      { label: "Billing & POS", icon: FileText,        path: "/branch-admin/billing" }
  ]},
  { section: "INVENTORY", items: [
      { label: "Inventory", icon: Package,      path: "/branch-admin/inventory" },
      { label: "Purchases", icon: ShoppingCart, path: "/branch-admin/purchases" }
  ]},
  { section: "HR", items: [
      { label: "Staff", icon: Users, path: "/branch-admin/staff" }
  ]},
  { section: "ANALYTICS", items: [ 
      { label: "Reports", icon: FileText, path: "/branch-admin/reports" }
  ]}
];

const Sidebar = ({ isOpen, closeSidebar }) => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { email } = useSelector((s) => s.auth);

  const displayName = email
    ?.split("@")[0]
    ?.replace(/^./, (c) => c.toUpperCase()) || "User";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-56 h-screen bg-[#0f1623] flex flex-col lg:relative lg:translate-x-0 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex-shrink-0 flex items-center justify-between px-4 py-4 border-b border-slate-800">
          <span className="text-white font-bold text-base">RestoPOS</span>
          <button
            onClick={closeSidebar}
            className="lg:hidden text-slate-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="flex-1 min-h-0 overflow-y-auto px-2 py-3 space-y-4">
          {MENU.map((section) => (
            <div key={section.section}>
              <p className="text-[9px] font-semibold tracking-widest text-slate-500 px-3 mb-1.5">
                {section.section}
              </p>
              <ul>
                {section.items.map(({ label, icon: Icon, path }) => (
                  <li key={path}>
                    <NavLink
                      to={path}
                      onClick={closeSidebar} 
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] font-medium transition-colors ${
                          isActive ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                        }`
                      }
                    >
                      <Icon size={15} /> {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="flex-shrink-0 border-t border-slate-700 px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-semibold truncate">{displayName}</p>
              <p className="text-slate-400 text-[11px] truncate">{email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-400 hover:text-white text-[13px] transition-colors w-full"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>

      </aside>
    </>
  );
}
export default Sidebar