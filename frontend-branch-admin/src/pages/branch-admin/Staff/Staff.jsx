import React, { useState, useMemo } from 'react';
import { Pencil, Trash2, Users, Activity, User, Monitor } from 'lucide-react'; // Icons import kiye
import AddStaffForm from '../Staff/components/AddStaffForm';

const Staff = () => {
  const [staff, setStaff] = useState([
    { id: 1, name: 'Kiran Nair', email: 'kiran@restopro.in', role: 'Receptionist', status: 'Active', lastLogin: '1 hr ago' },
    { id: 2, name: 'Deepika Rao', email: 'deepika@restopro.in', role: 'Waiter', status: 'Active', lastLogin: '45 min ago' },
  ]);

  const [filter, setFilter] = useState('All Staff');
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  const handleSave = (newStaffData) => {
    if (editingStaff) {
      setStaff(staff.map(s => s.id === editingStaff.id ? { ...newStaffData, id: s.id } : s));
    } else {
      setStaff([...staff, { ...newStaffData, id: Date.now() }]);
    }
    setShowForm(false);
    setEditingStaff(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      setStaff(staff.filter(s => s.id !== id));
    }
  };

  const filteredStaff = useMemo(() => {
    return staff.filter(s => {
      const matchesFilter = filter === 'All Staff' || s.role === filter;
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [staff, filter, searchTerm]);

  const stats = {
    total: staff.length,
    onShift: staff.filter(s => s.status === 'Active').length,
    waiters: staff.filter(s => s.role === 'Waiter').length,
    kds: staff.filter(s => s.role === 'KDS').length
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Staff Management</h1>
          <p className="text-slate-500">Manage receptionist, waiter and KDS accounts</p>
        </div>
        <button onClick={() => { setEditingStaff(null); setShowForm(true); }} className="bg-orange-600 text-white px-5 py-2 rounded-lg font-medium">
          + Add Staff
        </button>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[ 
          { label: 'TOTAL STAFF', val: stats.total, icon: Users, color: 'bg-orange-50 text-orange-600' }, 
          { label: 'ON SHIFT', val: stats.onShift, icon: Activity, color: 'bg-orange-50 text-orange-600' }, 
          { label: 'WAITERS', val: stats.waiters, icon: User, color: 'bg-orange-50 text-orange-600' }, 
          { label: 'KDS DISPLAYS', val: stats.kds, icon: Monitor, color: 'bg-orange-50 text-orange-600' } 
        ].map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 flex items-center gap-4">
            <div className={`p-3 rounded-lg ${card.color}`}>
              <card.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 tracking-wider mb-1">{card.label}</p>
              <h2 className="text-2xl font-bold text-slate-900">{card.val}</h2>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <AddStaffForm onSave={handleSave} initialData={editingStaff} onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 bg-slate-200 p-1 rounded-lg">
          {['All Staff', 'Receptionist', 'Waiter', 'KDS'].map(tab => (
            <button key={tab} onClick={() => setFilter(tab)} className={`px-4 py-2 text-sm font-medium rounded-md ${filter === tab ? 'bg-white shadow-sm' : 'text-slate-600'}`}>
              {tab}
            </button>
          ))}
        </div>
        <input placeholder="Search staff..." className="px-4 py-2 border rounded-lg w-64 bg-white" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className="bg-white rounded-xl border-0 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr className="text-slate-400 text-xs uppercase tracking-wider">
              <th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Role</th><th className="p-4">Last Login</th><th className="p-4">Status</th><th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map(s => (
              <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold">{s.name.split(' ').map(n => n[0]).join('')}</div>
                  {s.name}
                </td>
                <td className="p-4 text-slate-500">{s.email}</td>
                <td className="p-4"><span className="bg-purple-50 text-purple-600 px-2 py-0.5 rounded text-xs">{s.role}</span></td>
                <td className="p-4 text-slate-500 text-sm">{s.lastLogin}</td>
                <td className="p-4"><span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-xs">{s.status}</span></td>
                <td className="p-4 flex gap-3 text-slate-400">
                  <button onClick={() => { setEditingStaff(s); setShowForm(true); }} className="hover:text-slate-600"><Pencil size={18} /></button>
                  <button onClick={() => handleDelete(s.id)} className="hover:text-red-600"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Staff;