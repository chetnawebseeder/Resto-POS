import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
const MenuCard = ({ item, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${item.type === 'veg' ? 'border-green-500' : 'border-red-500'}`}>
          <div className={`w-2 h-2 rounded-full ${item.type === 'veg' ? 'bg-green-500' : 'bg-red-500'}`} />
        </div>
      </div>
      
      <div className="h-32 bg-gray-100 mb-4 rounded-lg flex items-center justify-center text-gray-300">
        <span className="text-4xl">🍽️</span>
      </div>

      <div className="flex justify-between items-center mb-1">
        <h3 className="font-bold text-gray-800 truncate">{item.name}</h3>
        <span className="font-bold text-orange-600">₹{item.price}</span>
      </div>
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{item.desc}</p>
      
      <div className="flex justify-between items-center mt-auto pt-4 border-t">
        <span className="bg-blue-50 text-blue-700 px-3 py-1 text-xs font-medium rounded-md">
          {item.category}
        </span>
        <div className="flex gap-3 text-gray-400">
          <Pencil 
            size={18} 
            className="cursor-pointer hover:text-blue-600 transition-colors" 
            onClick={() => onEdit(item)} 
          />
          <Trash2 
            size={18} 
            className="cursor-pointer hover:text-red-500 transition-colors" 
            onClick={() => onDelete(item.id)} 
          />
        </div>
      </div>
    </div>
  );
};

export default MenuCard;