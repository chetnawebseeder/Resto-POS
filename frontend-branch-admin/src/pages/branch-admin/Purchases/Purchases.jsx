import { useState } from 'react';
import NewPurchaseForm from '../Purchases/components/NewPurchaseForm';

const Purchases = () => {
  const [purchases, setPurchases] = useState([
    { invoice: 'INV-2025-061', supplier: 'Agri Fresh Farms', date: 'Jun 18, 2025', items: '8 items', amount: '₹12,400', status: 'Completed' },
  ]);
  const [showForm, setShowForm] = useState(false);

  const addPurchase = (newEntry) => {
    const formattedEntry = {
      ...newEntry,
      items: `${newEntry.items} items`,
      amount: `₹${newEntry.amount}`
    };
    setPurchases([formattedEntry, ...purchases]);
    setShowForm(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Purchase Management</h1>
          <p className="text-slate-500 text-sm">Manage supplier orders and purchase history</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="bg-orange-600 text-white px-5 py-2 rounded-xl font-semibold shadow-md hover:bg-orange-700 transition-all w-full md:w-auto"
        >
          {showForm ? 'Cancel' : '+ New Purchase'}
        </button>
      </div>
      {showForm && (
        <div className="animate-in fade-in duration-300">
          <NewPurchaseForm onAdd={addPurchase} />
        </div>
      )}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mt-6 overflow-x-auto">
        <h2 className="text-lg font-bold mb-4">Recent Purchases</h2>
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100">
              <th className="text-left pb-4 font-medium">Invoice</th>
              <th className="text-left pb-4 font-medium">Supplier</th>
              <th className="text-left pb-4 font-medium">Date</th>
              <th className="text-left pb-4 font-medium">Items</th>
              <th className="text-left pb-4 font-medium">Amount</th>
              <th className="text-left pb-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((p, idx) => (
              <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition">
                <td className="py-4 font-semibold text-slate-700">{p.invoice}</td>
                <td className="py-4 text-slate-600">{p.supplier}</td>
                <td className="py-4 text-slate-500">{p.date}</td>
                <td className="py-4 text-slate-600">{p.items}</td>
                <td className="py-4 font-bold text-slate-800">{p.amount}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                    p.status === 'Completed' ? 'bg-slate-100 text-slate-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Purchases;