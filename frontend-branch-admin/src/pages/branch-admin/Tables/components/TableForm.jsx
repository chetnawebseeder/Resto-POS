import React from 'react';
import { X } from 'lucide-react';

const TableForm = ({ isOpen, onClose, onSubmit, editingTable }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40  flex items-center justify-center z-50 p-4">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Add New Table</h2>
          <X className="cursor-pointer text-gray-500 hover:text-orange-600" onClick={onClose} />
        </div>
        
        <input 
          name="tableId" 
          placeholder="Table ID (e.g. T1)" 
          className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all" 
          required 
        />
        <input 
          name="seats" 
          type="number" 
          placeholder="Number of Seats" 
          className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all" 
          required 
        />
        
        <select name="floor" className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white">
          <option value="Floor 1">Floor 1</option>
          <option value="Floor 2">Floor 2</option>
        </select>
        
        <button type="submit" className="w-full bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors shadow-lg  ">
          Save Table
        </button>
      </form>
    </div>
  );
};

export default TableForm;