import React from 'react'
import { useState } from "react";
import { 
  Plus, Search, Building2, MapPin, 
  Phone, User, Edit, BarChart2, X 
} from "lucide-react";

const INITIAL_BRANCHES = [
  {
    id: 1,
    name: "Koramangala",
    city: "Bangalore",
    status: "Active",
    address: "45 Residency Rd, Koramangala",
    phone: "+91 98765 43210",
    admin: "Arjun Mehta",
    tables: 24,
    orders: 87,
    revenue: "₹48.8K",
  }
];


const Branches = () => {

  const [branches, setBranches] = useState(INITIAL_BRANCHES);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false); 

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    phone: "",
    address: "",
    admin: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    const newBranch = {
      id: branches.length + 1,
      name: formData.name,
      city: formData.city,
      status: "Active",
      address: formData.address || "Address not provided",
      phone: formData.phone || "N/A",
      admin: formData.admin || "Unassigned",
      tables: 0, 
      orders: 0, 
      revenue: "₹0",
    };

    setBranches([...branches, newBranch]);

    setShowAddForm(false);
    setFormData({ name: "", city: "", phone: "", address: "", admin: "" });
  };

  const filteredBranches = branches.filter((branch) =>
    branch.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
   <div className="space-y-6 max-w-7xl mx-auto pb-10">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Branch Management</h1>
          <p className="text-sm text-slate-500 mt-0.5">Create and manage restaurant branches</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center justify-center gap-2 bg-[#ea580c] hover:bg-[#c2410c] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          {showAddForm ? <X size={18} /> : <Plus size={18} />}
          {showAddForm ? "Cancel" : "Add Branch"}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Add New Branch</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Branch Name</label>
              <input 
                type="text" name="name" value={formData.name} onChange={handleInputChange} required
                placeholder="e.g. Koramangala" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-orange-500" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">City</label>
              <input 
                type="text" name="city" value={formData.city} onChange={handleInputChange} required
                placeholder="e.g. Bangalore" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-orange-500" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Phone Number</label>
              <input 
                type="text" name="phone" value={formData.phone} onChange={handleInputChange}
                placeholder="+91" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-orange-500" 
              />
            </div>
            <div className="lg:col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Full Address</label>
              <input 
                type="text" name="address" value={formData.address} onChange={handleInputChange}
                placeholder="Complete street address" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-orange-500" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Assign Admin</label>
              <input 
                type="text" name="admin" value={formData.admin} onChange={handleInputChange}
                placeholder="Admin Name" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-orange-500" 
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
            <button 
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setFormData({ name: "", city: "", phone: "", address: "", admin: "" });
              }}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100"
            >
              Cancel
            </button>

            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700">
              Save Branch
            </button>
          </div>
        </form>
      )}


      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search branches..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-orange-500 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBranches.map((branch) => (
          <div key={branch.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            
            <div className="flex justify-between items-start mb-5">
              <div className="flex gap-3">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg leading-tight">{branch.name}</h3>
                  <p className="text-sm text-slate-500 mt-0.5">{branch.city}</p>
                </div>
              </div>
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${
                branch.status === 'Active' 
                  ? 'bg-green-50 text-green-600 border-green-200' 
                  : 'bg-slate-50 text-slate-500 border-slate-200'
              }`}>
                {branch.status}
              </span>
            </div>

            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2.5 text-sm text-slate-600">
                <MapPin size={15} className="text-slate-400 flex-shrink-0" />
                <span className="truncate">{branch.address}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-600">
                <Phone size={15} className="text-slate-400 flex-shrink-0" />
                <span>{branch.phone}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-600">
                <User size={15} className="text-slate-400 flex-shrink-0" />
                <span>Admin: <span className="font-medium text-slate-700">{branch.admin}</span></span>
              </div>
            </div>

            <div className="grid grid-cols-3 divide-x divide-slate-100 border-y border-slate-100 py-4 mb-4">
              <div className="text-center">
                <p className="text-lg font-bold text-slate-900">{branch.tables}</p>
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Tables</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-slate-900">{branch.orders}</p>
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Today Orders</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-slate-900">{branch.revenue}</p>
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Today Revenue</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <Edit size={14} />
                Manage
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <BarChart2 size={14} />
                Analytics
              </button>
            </div>

          </div>
        ))}
      </div>

    </div> 
  )
}

export default Branches