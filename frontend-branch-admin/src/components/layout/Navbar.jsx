import { useState, useRef, useEffect } from "react";
import {
  Bell,
  Menu,
  Shield,
  ChevronDown,
} from "lucide-react";

const Navbar = ({ toggleSidebar }) => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("Branch Admin");

  const dropdownRef = useRef(null);

  const roles = [
    "Branch Admin",
    "Receptionist",
    "Waiter",
    "KDS",
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <button
        onClick={toggleSidebar}
        className="lg:hidden text-slate-600"
      >
        <Menu size={22} />
      </button>

      <div className="ml-auto flex items-center gap-4">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition"
          >
            <Shield
              size={16}
              className="text-orange-500"
            />

            <span className="font-medium text-slate-700">
              {role}
            </span>

            <ChevronDown
              size={18}
              className={`transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-56 rounded-lg border border-slate-200 bg-white shadow-lg z-50 overflow-hidden">
              {roles.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setRole(item);
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-slate-700 hover:text-orange-500 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
        <button className="relative w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50">
          <Bell
            size={18}
            className="text-slate-700"
          />

          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
        </button>
        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold">
          B
        </div>
      </div>
    </header>
  );
}
export default Navbar