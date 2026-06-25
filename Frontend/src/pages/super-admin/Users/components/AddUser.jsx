import React, { useState, useEffect } from "react";

const AddUser = ({ onSave, onCancel, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      email: "",
      role: "Branch Admin",
      branch: "",
      status: "Active",
    }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); 
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        {initialData ? "Edit User" : "Add New User"}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">Full Name *</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="e.g. Rahul Kumar" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-orange-500" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">Email Address *</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="e.g. rahul@restopro.in" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-orange-500" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">Assign Branch</label>
          <input type="text" name="branch" value={formData.branch} onChange={handleInputChange} placeholder="e.g. Koramangala" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-orange-500" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">Role *</label>
          <select name="role" value={formData.role} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-orange-500 bg-white">
            <option value="Branch Admin">Branch Admin</option>
            <option value="Receptionist">Receptionist</option>
            <option value="Waiter">Waiter</option>
            <option value="KDS">KDS</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">Status *</label>
          <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-orange-500 bg-white">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700">
          {initialData ? "Update User" : "Save User"}
        </button>
      </div>
    </form>
  )
}

export default AddUser;