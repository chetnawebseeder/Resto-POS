
import { Bell, Menu, Shield } from "lucide-react";

export default function Navbar({ toggleSidebar }) {
  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center px-4 justify-between">
      <button onClick={toggleSidebar} className="lg:hidden text-slate-500"><Menu size={20} /></button>
      
      <div className="flex items-center gap-3 ml-auto">
        <div className="flex items-center gap-1.5 border border-slate-200 bg-slate-50 rounded-lg px-3 py-1.5 text-sm text-slate-700">
          <Shield size={14} /> <span>Branch Admin</span>
        </div>
        <button className="relative p-2 rounded-full border border-slate-200"><Bell size={16} /></button>
      </div>
    </header>
  );
}