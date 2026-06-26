import { useState, useMemo } from "react";
import {
  Plus,
  AlertTriangle,
  Layers,
  Boxes,
  Truck,
  Download,
  X,
} from "lucide-react";

const CATEGORY_STYLES = {
  Grains: "border-blue-200 bg-blue-50 text-blue-600",
  Meat: "border-rose-200 bg-rose-50 text-rose-600",
  Dairy: "border-amber-200 bg-amber-50 text-amber-600",
  Vegetables: "border-green-200 bg-green-50 text-green-600",
  Oils: "border-purple-200 bg-purple-50 text-purple-600",
};
const DEFAULT_CATEGORY_STYLE = "border-slate-200 bg-slate-50 text-slate-600";

const UNITS = ["kg", "ltr", "pcs", "g", "ml", "box"];

const CATEGORIES = ["Grains", "Meat", "Dairy", "Vegetables", "Oils"];

const INITIAL_PRODUCTS = [
  { id: 1, name: "Basmati Rice", sku: "GRC-001", category: "Grains", unit: "kg", stock: 45, minLevel: 20, buyPrice: 85 },
  { id: 2, name: "Chicken (Dressed)", sku: "MEA-001", category: "Meat", unit: "kg", stock: 8, minLevel: 15, buyPrice: 220 },
  { id: 3, name: "Paneer", sku: "DAI-001", category: "Dairy", unit: "kg", stock: 12, minLevel: 8, buyPrice: 350 },
  { id: 4, name: "Tomatoes", sku: "VEG-001", category: "Vegetables", unit: "kg", stock: 18, minLevel: 10, buyPrice: 45 },
  { id: 5, name: "Onions", sku: "VEG-002", category: "Vegetables", unit: "kg", stock: 30, minLevel: 15, buyPrice: 35 },
  { id: 6, name: "Cooking Oil", sku: "OIL-001", category: "Oils", unit: "ltr", stock: 4, minLevel: 10, buyPrice: 140 },
  { id: 7, name: "Mutton", sku: "MEA-002", category: "Meat", unit: "kg", stock: 5, minLevel: 8, buyPrice: 680 },
  { id: 8, name: "Cream", sku: "DAI-002", category: "Dairy", unit: "ltr", stock: 9, minLevel: 6, buyPrice: 180 },
];

const CATEGORY_PREFIX = {
  Grains: "GRC",
  Meat: "MEA",
  Dairy: "DAI",
  Vegetables: "VEG",
  Oils: "OIL",
};

function generateSku(category, existingProducts) {
  const prefix = CATEGORY_PREFIX[category] || category.slice(0, 3).toUpperCase();
  const countInCategory = existingProducts.filter((p) => p.sku.startsWith(prefix)).length;
  return `${prefix}-${String(countInCategory + 1).padStart(3, "0")}`;
}

function emptyForm() {
  return {
    name: "",
    category: "",
    unit: "kg",
    stock: "",
    minLevel: "",
    buyPrice: "",
  };
}

const InventoryManagement = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [purchasesThisMonth, setPurchasesThisMonth] = useState(84200);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [errors, setErrors] = useState({});

  const lowStockItems = useMemo(
    () => products.filter((p) => p.stock < p.minLevel),
    [products]
  );
  const totalProducts = products.length;
  const categories = useMemo(
    () => new Set(products.map((p) => p.category)).size,
    [products]
  );

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Product name is required";
    if (!form.category.trim()) next.category = "Category is required";
    if (!form.unit.trim()) next.unit = "Unit is required";
    if (form.stock === "" || Number(form.stock) < 0) next.stock = "Enter a valid stock quantity";
    if (form.minLevel === "" || Number(form.minLevel) < 0) next.minLevel = "Enter a valid minimum level";
    if (form.buyPrice === "" || Number(form.buyPrice) < 0) next.buyPrice = "Enter a valid buy price";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const category = form.category.trim();
    const newProduct = {
      id: Date.now(),
      name: form.name.trim(),
      sku: generateSku(category, products),
      category,
      unit: form.unit,
      stock: Number(form.stock),
      minLevel: Number(form.minLevel),
      buyPrice: Number(form.buyPrice),
    };

    setProducts((prev) => [...prev, newProduct]);
    setPurchasesThisMonth((prev) => prev + newProduct.stock * newProduct.buyPrice);
    setForm(emptyForm());
    setFormOpen(false);
  };

  const closeForm = () => {
    setFormOpen(false);
    setForm(emptyForm());
    setErrors({});
  };

  const handleExport = () => {
    const header = ["Product", "SKU", "Category", "Unit", "Current Stock", "Min Level", "Buy Price", "Status"];
    const rows = products.map((p) => [
      p.name,
      p.sku,
      p.category,
      p.unit,
      p.stock,
      p.minLevel,
      p.buyPrice,
      p.stock < p.minLevel ? "Low stock" : "Ok",
    ]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "product-stock.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 p-4 font-sans text-slate-900 sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inventory Management</h1>
          <p className="text-sm text-slate-500">Track stock levels, purchases and alerts</p>
        </div>
        <button
          onClick={() => setFormOpen(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-600 sm:self-start"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>
      {lowStockItems.length > 0 && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-5 py-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-500" />
          <div>
            <p className="text-sm font-semibold text-rose-700">
              {lowStockItems.length} item{lowStockItems.length > 1 ? "s are" : " is"} running low on stock
            </p>
            <p className="text-sm text-rose-500">{lowStockItems.map((p) => p.name).join(", ")}</p>
          </div>
        </div>
      )}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Boxes} label="Total Products" value={totalProducts} />
        <StatCard icon={AlertTriangle} label="Low Stock Items" value={lowStockItems.length} alert={lowStockItems.length > 0} />
        <StatCard icon={Layers} label="Categories" value={categories} />
        <StatCard icon={Truck} label="This Month Purchases" value={`₹${purchasesThisMonth.toLocaleString("en-IN")}`} />
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-base font-bold text-slate-900">Product Stock</h2>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-lg bg-slate-100 px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3 font-medium">Product</th>
                <th className="px-3 py-3 font-medium">SKU</th>
                <th className="px-3 py-3 font-medium">Category</th>
                <th className="px-3 py-3 font-medium">Unit</th>
                <th className="px-3 py-3 font-medium">Current Stock</th>
                <th className="px-3 py-3 font-medium">Min Level</th>
                <th className="px-3 py-3 font-medium">Buy Price</th>
                <th className="px-3 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const isLow = p.stock < p.minLevel;
                const pct = Math.min(100, Math.round((p.stock / Math.max(p.minLevel * 2, 1)) * 100));
                const catStyle = CATEGORY_STYLES[p.category] || DEFAULT_CATEGORY_STYLE;
                return (
                  <tr key={p.id} className="border-t border-slate-100">
                    <td className="px-5 py-3 font-semibold text-slate-900">{p.name}</td>
                    <td className="px-3 py-3 font-mono text-xs text-slate-400">{p.sku}</td>
                    <td className="px-3 py-3">
                      <span className={`rounded-md border px-2 py-0.5 text-xs font-medium ${catStyle}`}>
                        {p.category}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-slate-500">{p.unit}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${isLow ? "text-rose-600" : "text-slate-900"}`}>
                          {p.stock} {p.unit}
                        </span>
                        <span className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                          <span
                            className={`block h-full rounded-full ${isLow ? "bg-rose-400" : "bg-green-400"}`}
                            style={{ width: `${pct}%` }}
                          />
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-slate-500">
                      {p.minLevel} {p.unit}
                    </td>
                    <td className="px-3 py-3 text-slate-700">₹{p.buyPrice}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded-md border px-2 py-0.5 text-xs font-medium ${
                          isLow
                            ? "border-rose-200 bg-rose-50 text-rose-600"
                            : "border-green-200 bg-green-50 text-green-600"
                        }`}
                      >
                        {isLow ? "Low stock" : "Ok"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Add Product</h3>
              <button
                onClick={closeForm}
                className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="Product Name" error={errors.name}>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="e.g. Basmati Rice"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                />
              </Field>
              <Field label="Category" error={errors.category}>
                <select
                  value={form.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Unit" error={errors.unit}>
                <select
                  value={form.unit}
                  onChange={(e) => updateField("unit", e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                >
                  {UNITS.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Current Stock" error={errors.stock}>
                  <input
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={(e) => updateField("stock", e.target.value)}
                    placeholder="0"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  />
                </Field>
                <Field label="Min Level" error={errors.minLevel}>
                  <input
                    type="number"
                    min="0"
                    value={form.minLevel}
                    onChange={(e) => updateField("minLevel", e.target.value)}
                    placeholder="0"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                  />
                </Field>
              </div>
              <Field label="Buy Price (₹)" error={errors.buyPrice}>
                <input
                  type="number"
                  min="0"
                  value={form.buyPrice}
                  onChange={(e) => updateField("buyPrice", e.target.value)}
                  placeholder="0"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-300"
                />
              </Field>

              <p className="text-xs text-slate-400">SKU will be generated automatically based on category.</p>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-orange-500 py-2.5 text-sm font-bold text-white hover:bg-orange-600"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, alert }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${
            alert ? "bg-rose-50 text-rose-500" : "bg-orange-50 text-orange-500"
          }`}
        >
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
          <p className="text-xl font-bold text-slate-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}

export default InventoryManagement