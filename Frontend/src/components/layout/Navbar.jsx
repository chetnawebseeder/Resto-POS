import { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, Search, Shield, Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { ROLES } from "../../utils/constants";

const ROLE_LABELS = {
  [ROLES.SUPER_ADMIN]:  "Super Admin",
  
};

export default function Navbar({ toggleSidebar }) {
  const { role, email } = useSelector((s) => s.auth);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const initial = email ? email[0].toUpperCase() : "A";
  const roleLabel = ROLE_LABELS[role] || "Admin";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center px-3 sm:px-6 gap-2 sm:gap-4 flex-shrink-0">
      <button 
        onClick={toggleSidebar}
        className="p-1.5 -ml-1 text-slate-500 hover:bg-slate-100 rounded-lg lg:hidden transition-colors"
      >
        <Menu size={20} />
      </button>
      <div className="hidden sm:flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2 flex-1 max-w-sm ml-2 sm:ml-0">
        <Search size={14} className="text-slate-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search anything..."
          className="bg-transparent text-sm text-slate-600 placeholder:text-slate-400 outline-none w-full"
        />
      </div>
      <div className="flex sm:hidden flex-1 justify-end mr-1">
        <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Search size={18} />
        </button>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 ml-auto">
        <div className="relative" ref={dropdownRef}>

          <div 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 sm:gap-1.5 border border-slate-200 bg-slate-50 rounded-lg px-2 py-1.5 sm:px-3 text-sm font-medium text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <Shield size={16} className="text-orange-500 flex-shrink-0" />
            <span className="hidden sm:block">{roleLabel}</span> 
            <ChevronDown size={14} className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </div>

          {isOpen && (
            <div className="absolute top-full right-0 mt-2 w-44 sm:w-48 bg-white border border-slate-100 shadow-xl rounded-lg py-2 z-50">
              {Object.entries(ROLE_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => {

                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-slate-50 hover:text-orange-600 ${
                    role === key ? "text-orange-600 bg-orange-50/50" : "text-slate-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>


        <button className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50 flex-shrink-0">
          <Bell size={16} className="text-slate-600" />
          <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

    
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs sm:text-sm font-semibold flex-shrink-0 cursor-pointer">
          {initial}
        </div>
      </div>
    </header>
  );
}