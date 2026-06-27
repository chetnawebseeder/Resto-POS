import React, { useState, useEffect } from 'react';

const AddStaffForm = ({ onSave, initialData, onClose }) => {
  const [formData, setFormData] = useState(
    initialData || { name: '', email: '', role: 'Waiter', status: 'Active' }
  );

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-4">
      <h2 className="text-xl font-bold">{initialData ? 'Edit Staff' : 'Add New Staff'}</h2>
      
      <input 
        value={formData.name} 
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        className="border-slate-200 border rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none w-full" placeholder="Name" required
      />
      
      <input 
        value={formData.email} 
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        className="border-slate-200 border rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none w-full" placeholder="Email" required
      />

      <select 
        value={formData.role} 
        onChange={(e) => setFormData({...formData, role: e.target.value})}
        className="border-slate-200 border rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none w-full"
      >
        <option>Receptionist</option>
        <option>Waiter</option>
        <option>KDS</option>
      </select>
      <select 
        value={formData.status} 
        onChange={(e) => setFormData({...formData, status: e.target.value})}
        className="border-slate-200 border rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none w-full"
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <div className="flex gap-2 pt-2">
        <button type="submit" className="flex-1 bg-orange-600 text-white px-4 py-2 rounded hover:bg-slate-800 transition-colors">
          {initialData ? 'Update Staff' : 'Add Staff'}
        </button>
        <button type="button" onClick={onClose} className="flex-1 border px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddStaffForm;