import React, { useState } from 'react';
import CategorySidebar from './components/CategorySidebar';
import MenuCard from './components/MenuCard';
import AddItem from './components/AddItem';
import { Plus } from 'lucide-react';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([
    { name: 'Starters', count: 2 },
    { name: 'Main Course', count: 2 }
  ]);
  const [items, setItems] = useState([
    { id: 1, name: 'Paneer Tikka', category: 'Starters', price: 320, type: 'veg', desc: 'Delicious grilled paneer' },
    { id: 2, name: 'Butter Chicken', category: 'Main Course', price: 420, type: 'non-veg', desc: 'Rich tomato gravy' },
  ]);

  const addCategory = () => {
    const name = prompt("Enter new category name:");
    if (name) setCategories([...categories, { name, count: 0 }]);
  };

  const handleSaveItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newItem = {
      id: Date.now(),
      name: formData.get('name'),
      price: formData.get('price'),
      category: formData.get('category'),
      type: formData.get('type'),
      desc: formData.get('desc')
    };
    setItems([...items, newItem]);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this item?")) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleEdit = (item) => {
    alert("Edit functionality for: " + item.name);

  };

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(i => i.category === activeCategory);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Menu Management</h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">Manage categories, items, pricing and availability</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="w-full sm:w-auto bg-orange-600 text-white px-6 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-700 transition-all"
        >
          <Plus size={20} /> 
          <span className="whitespace-nowrap">Add Item</span>
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <CategorySidebar 
          categories={[{name: 'All', count: items.length}, ...categories]} 
          activeCategory={activeCategory} 
          onSelectCategory={setActiveCategory}
          onAddCategory={addCategory}
        />

        <div className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredItems.map(item => (
              <MenuCard 
                key={item.id} 
                item={item} 
                onDelete={handleDelete}  
                onEdit={handleEdit}    
              />
            ))}
          </div>
        </div>
      </div>

      <AddItem 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveItem}
        categories={categories}
      />
    </div>
  );
};

export default Menu;