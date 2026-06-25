import React from 'react';
import { Pencil, Trash2 } from 'lucide-react'; 

const TableCard = ({ table, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-50 border-green-200 text-green-700';
      case 'Occupied': return 'bg-red-50 border-red-200 text-red-700';
      case 'Reserved': return 'bg-amber-50 border-amber-200 text-amber-700';
      case 'Cleaning': return 'bg-blue-50 border-blue-200 text-blue-700';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`p-4 rounded-xl border ${getStatusColor(table.status)} relative min-h-[160px]`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-gray-800 uppercase">{table.id}</h3>
        <span className={`w-2 h-2 rounded-full ${table.status === 'Available' ? 'bg-green-500' : table.status === 'Occupied' ? 'bg-red-500' : table.status === 'Reserved' ? 'bg-amber-500' : 'bg-blue-500'}`} />
      </div>
      
      <p className="text-sm text-gray-600 mb-1">{table.seats} seats</p>
      
      <div className="text-xs font-medium uppercase tracking-wide">
        {table.status}
      </div>

      {table.orderId && (
        <p className="text-xs text-gray-500 mt-2">{table.orderId} • {table.customer}</p>
      )}
      <div className="absolute bottom-4 right-4 flex gap-3 text-gray-400">
        <Pencil 
          size={18} 
          className="cursor-pointer hover:text-orange-600 transition-colors" 
          onClick={() => onEdit(table)} 
        />
        <Trash2 
          size={18} 
          className="cursor-pointer hover:text-red-600 transition-colors" 
          onClick={() => onDelete(table.id)} 
        />
      </div>
    </div>
  );
};

export default TableCard;