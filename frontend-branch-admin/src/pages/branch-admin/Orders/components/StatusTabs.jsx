import React from 'react'

const StatusTabs = () => {
    const tabs = [ "All", "Pending (1)", "Preparing (2)", "Ready (1)", "Completed (2)"];
  return (
    <div className="flex bg-slate-100 rounded-xl p-1 w-fit mb-6">

      {tabs.map((tab, index) => (

        <button
          key={tab}
          className={`px-5 py-2 rounded-lg font-medium transition
          ${
            index === 0
              ? "bg-white shadow text-slate-900"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          {tab}
        </button>

      ))}

    </div>
  )
}

export default StatusTabs
