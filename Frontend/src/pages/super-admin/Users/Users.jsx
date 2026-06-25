import React, { useState } from "react";
import { Plus, Search, Edit2, Trash2, X } from "lucide-react";
import AddUser from "./components/AddUser";

const INITIAL_USERS = [
  { id: 1, name: "Arjun Mehta", email: "arjun@restopro.in", role: "Branch Admin", branch: "Koramangala", lastLogin: "2 min ago", status: "Active" },
  { id: 2, name: "Priya Sharma", email: "priya@restopro.in", role: "Branch Admin", branch: "Indiranagar", lastLogin: "15 min ago", status: "Active" },
  { id: 3, name: "Kiran Nair", email: "kiran@restopro.in", role: "Receptionist", branch: "Koramangala", lastLogin: "1 hr ago", status: "Active" },
  { id: 4, name: "Deepika Rao", email: "deepika@restopro.in", role: "Waiter", branch: "Koramangala", lastLogin: "45 min ago", status: "Active" },
];

const TABS = ["All Users", "Branch Admin", "Receptionist", "Waiter", "KDS"];

const Users = () => {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All Users");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const handleSaveUser = (formData) => {
    if (editingUser) {
      setUsers(users.map((user) => (user.id === editingUser.id ? { ...user, ...formData } : user)));
      setEditingUser(null);
    } else {
      const newUser = {
        id: users.length + 1,
        ...formData,
        branch: formData.branch || "Unassigned",
        lastLogin: "Just now",
      };
      setUsers([newUser, ...users]);
    }
    setShowAddForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };
  const handleEditClick = (user) => {
    setEditingUser(user);
    setShowAddForm(true);
  };

  const handleCancelClick = () => {
    setShowAddForm(false);
    setEditingUser(null); 
  };

  const getInitials = (name) => {
    return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "All Users" || user.role === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage staff accounts and access</p>
        </div>
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditingUser(null); 
          }}
          className="flex items-center justify-center gap-2 bg-[#ea580c] hover:bg-[#c2410c] text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          {showAddForm ? <X size={18} /> : <Plus size={18} />}
          {showAddForm ? "Cancel" : "Add User"}
        </button>
      </div>
      {showAddForm && (
        <AddUser
          initialData={editingUser}
          onSave={handleSaveUser}
          onCancel={handleCancelClick}
        />
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-wrap bg-slate-100 p-1 rounded-lg">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-orange-500 transition-colors"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6">Branch</th>
                <th className="py-4 px-6">Last Login</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-semibold">
                          {getInitials(user.name)}
                        </div>
                        <span className="font-medium text-slate-900 text-sm">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-sm text-slate-500 whitespace-nowrap">{user.email}</td>
                    <td className="py-3 px-6 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 text-xs font-medium rounded-md ${
                          user.role === "Branch Admin"
                            ? "bg-blue-50 text-blue-600"
                            : user.role === "Receptionist"
                            ? "bg-green-50 text-green-600"
                            : user.role === "Waiter"
                            ? "bg-purple-50 text-purple-600"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-sm text-slate-600 whitespace-nowrap">{user.branch}</td>
                    <td className="py-3 px-6 text-sm text-slate-500 whitespace-nowrap">{user.lastLogin}</td>
                    <td className="py-3 px-6 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 text-xs font-medium rounded-md border ${
                          user.status === "Active"
                            ? "bg-green-50 text-green-600 border-green-200"
                            : "bg-slate-50 text-slate-500 border-slate-200"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="text-slate-400 hover:text-blue-600 transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-500 text-sm">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;