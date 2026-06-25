import React from 'react';
import { Plus } from 'lucide-react';

const CategorySidebar = ({ categories, activeCategory, onSelectCategory, onAddCategory }) => {
  return (
    <div className="w-64 bg-white p-4 rounded-xl shadow-sm border border-gray-100 h-fit">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-500 text-sm tracking-wider">CATEGORIES</h2>
        <button onClick={onAddCategory} className="text-orange-600"><Plus size={20} /></button>
      </div>
      
      <ul className="space-y-1">
        {categories.map((cat) => (
          <li 
            key={cat.name}
            onClick={() => onSelectCategory(cat.name)}
            className={`p-3 rounded-lg cursor-pointer font-medium transition-colors ${
              activeCategory === cat.name 
              ? 'bg-orange-50 text-orange-600' 
              : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            {cat.name} <span className="text-gray-400 font-normal">({cat.count})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;