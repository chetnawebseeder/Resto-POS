import { useState } from 'react';

const NewPurchaseForm = ({ onAdd }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newEntry = Object.fromEntries(formData.entries());
    onAdd(newEntry);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-lg mb-8 w-full max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input 
          name="invoice" 
          placeholder="Invoice (INV-2026-001)" 
          className="border-slate-200 border rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none w-full" 
          required 
        />
        <input 
          name="supplier" 
          placeholder="Supplier Name" 
          className="border-slate-200 border rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none w-full" 
          required 
        />
        <input 
          name="date" 
          type="date" 
          className="border-slate-200 border rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none w-full" 
        />
        <input 
          name="items" 
          placeholder="Items count" 
          className="border-slate-200 border rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none w-full" 
        />
        <input 
          name="amount" 
          placeholder="Amount (₹)" 
          className="border-slate-200 border rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none w-full" 
        />
        <select 
          name="status" 
          className="border-slate-200 border rounded-xl p-3 outline-none w-full bg-white"
        >
          <option>Pending</option>
          <option>Completed</option>
        </select>
      </div>

      <button 
        type="submit" 
        className="mt-6 w-full lg:w-auto bg-orange-600 text-white px-8 py-3 rounded-xl hover:bg-slate-800 transition-colors"
      >
        Add Record
      </button>
    </form>
  );
};

export default NewPurchaseForm;