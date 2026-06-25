import React, { useState } from 'react';
import TableCard from './components/TableCards';
import TableForm from './components/TableForm';
import { Plus } from 'lucide-react';

const Table = () => {
  const [activeFloor, setActiveFloor] = useState('Floor 1');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tablesData, setTablesData] = useState({
    'Floor 1': [
      { id: 'T1', seats: 2, status: 'Available' },
      { id: 'T2', seats: 4, status: 'Occupied', orderId: 'ORD-041', customer: 'Deepika' },
    ],
    'Floor 2': [
      { id: 'T5', seats: 2, status: 'Reserved' },
      { id: 'T7', seats: 4, status: 'Cleaning' },
    ]
  });
const handleDeleteTable = (id) => {
    if (window.confirm("Are you sure you want to delete this table?")) {
      setTablesData(prev => ({
        ...prev,
        [activeFloor]: prev[activeFloor].filter(t => t.id !== id)
      }));
    }
  };
  const handleEditTable = (table) => {
    setEditingTable(table); 
    setIsModalOpen(true);
  };
  const handleAddTable = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTable = {
      id: formData.get('tableId').toUpperCase(),
      seats: formData.get('seats'),
      status: 'Available'
    };
    const floor = formData.get('floor');

    setTablesData(prev => ({
      ...prev,
      [floor]: [...prev[floor], newTable]
    }));
    setIsModalOpen(false);
  };

  const currentTables = tablesData[activeFloor];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Table Management</h1>
          <p className="text-gray-500">Floor layout, occupancy and order tracking</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-700 transition-colors"
        >
          <Plus size={20} /> Add Table
        </button>
      </div>
      <div className="flex gap-6 mb-6">
        {['Available', 'Occupied', 'Reserved', 'Cleaning'].map((status, i) => (
          <div key={i} className="flex items-center gap-2 text-sm font-medium">
            <div className={`w-3 h-3 rounded-full ${i===0?'bg-green-500':i===1?'bg-red-500':i===2?'bg-amber-500':'bg-blue-500'}`} />
            {status}
          </div>
        ))}
      </div>
      <div className="flex bg-gray-200 p-1 rounded-lg w-fit mb-8">
        {['Floor 1', 'Floor 2'].map((floor) => (
          <button
            key={floor}
            onClick={() => setActiveFloor(floor)}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              activeFloor === floor ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {floor}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentTables.map(table => <TableCard key={table.id} table={table} onEdit={handleEditTable} onDelete={handleDeleteTable} />)}
      </div>
      <TableForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddTable} 
      />


    </div>
    
  );
};

export default Table;