import React from 'react'
import { TrendingUp } from "lucide-react";
const StatCard = ({ label, value, change, icon: Icon, iconBg, iconColor }) => {
  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200">
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center flex-shrink-0`}>
          <Icon size={18} className={iconColor} />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
            {label}
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-1 leading-tight">
            {value}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp size={11} className="text-green-500 flex-shrink-0" />
            <p className="text-[11px] text-slate-500">{change}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatCard
