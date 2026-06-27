import React from 'react';
const AddItem = ({ isOpen, onClose, onSave, categories }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-6">Add New Menu Item</h2>
        
        <form onSubmit={onSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">Item Name</label>
              <input name="name" className="w-full p-2.5 border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none rounded-lg" placeholder='Paneer Tikka' required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">Price (₹)</label>
              <input name="price" type="number" className="w-full p-2.5 border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none rounded-lg" placeholder='50' required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">Category</label>
              <select name="category" className="w-full p-2.5 border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none rounded-lg">
                {categories.filter(c => c.name !== 'All').map(c => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-6 py-2 border rounded-lg ">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-slate-800 transition-colors">Save Item</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;