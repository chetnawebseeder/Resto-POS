import { useState, useMemo } from "react";
import { Minus, Plus, Printer, Banknote, Smartphone, CreditCard, UtensilsCrossed, ShoppingCart, X } from "lucide-react";

const CATEGORIES = ["All", "Starters", "Main Course", "Biryani & Rice", "Breads", "Desserts", "Beverages", "Soups"];

const MENU_ITEMS = [
  { id: 1, name: "Paneer Tikka", category: "Starters", price: 320 },
  { id: 2, name: "Chicken 65", category: "Starters", price: 380 },
  { id: 3, name: "Dal Makhani", category: "Main Course", price: 280 },
  { id: 4, name: "Butter Chicken", category: "Main Course", price: 420 },
  { id: 5, name: "Veg Biryani", category: "Biryani & Rice", price: 300 },
  { id: 6, name: "Chicken Biryani", category: "Biryani & Rice", price: 380 },
  { id: 7, name: "Butter Naan", category: "Breads", price: 60 },
  { id: 8, name: "Gulab Jamun", category: "Desserts", price: 120 },
  { id: 9, name: "Mutton Rogan Josh", category: "Main Course", price: 520 },
  { id: 10, name: "Tandoori Roti", category: "Breads", price: 40 },
  { id: 11, name: "Masala Chai", category: "Beverages", price: 50 },
  { id: 12, name: "Tomato Soup", category: "Soups", price: 150 },
];

const GST_RATE = 0.05;

const Billing = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState({}); // { itemId: qty }
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [billOpen, setBillOpen] = useState(false); // mobile bill drawer

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return MENU_ITEMS;
    return MENU_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const addToCart = (itemId) => {
    setCart((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const incrementQty = (itemId) => {
    setCart((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const decrementQty = (itemId) => {
    setCart((prev) => {
      const current = prev[itemId] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return { ...prev, [itemId]: current - 1 };
    });
  };

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .map(([id, qty]) => {
        const item = MENU_ITEMS.find((m) => m.id === Number(id));
        return item ? { ...item, qty } : null;
      })
      .filter(Boolean);
  }, [cart]);

  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.qty, 0), [cartItems]);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cartItems]
  );
  const gst = useMemo(() => Math.round(subtotal * GST_RATE), [subtotal]);
  const total = subtotal + gst;

  const paymentOptions = [
    { id: "Cash", label: "Cash", Icon: Banknote },
    { id: "UPI", label: "UPI", Icon: Smartphone },
    { id: "Card", label: "Card", Icon: CreditCard },
  ];
  const BillPanel = ({ showCloseButton }) => (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Current Bill</h2>
        <div className="flex items-center gap-2">
          <span className="rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
            Table 7
          </span>
          <span className="hidden rounded-md border border-purple-200 bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-600 sm:inline">
            Dine-In
          </span>
          {showCloseButton && (
            <button
              onClick={() => setBillOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100"
              aria-label="Close bill"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto pr-1">
        {cartItems.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center py-10 text-center text-slate-400">
            <UtensilsCrossed className="mb-2 h-8 w-8" strokeWidth={1.5} />
            <p className="text-sm">No items yet</p>
            <p className="text-xs">Tap a menu card to add it here</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">
                    ₹{item.price} × {item.qty}
                  </p>
                </div>
                <div className="flex flex-shrink-0 items-center gap-2">
                  <button
                    onClick={() => decrementQty(item.id)}
                    className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-4 text-center text-sm font-medium">{item.qty}</span>
                  <button
                    onClick={() => incrementQty(item.id)}
                    className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <span className="w-14 flex-shrink-0 text-right text-sm font-semibold text-slate-900 sm:w-16">
                  ₹{item.price * item.qty}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-4 space-y-2 border-t border-slate-200 pt-4">
        <div className="flex justify-between text-sm text-slate-600">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between text-sm text-slate-600">
          <span>GST (5%)</span>
          <span>₹{gst.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-900">
          <span>Total</span>
          <span>₹{total.toLocaleString("en-IN")}</span>
        </div>
      </div>
      <div className="mt-4">
        <p className="mb-2 text-sm text-slate-500">Payment Method</p>
        <div className="grid grid-cols-3 gap-2">
          {paymentOptions.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setPaymentMethod(id)}
              className={`flex flex-col items-center gap-1.5 rounded-lg border py-2.5 text-xs font-medium transition-colors sm:py-3 sm:text-sm ${
                paymentMethod === id
                  ? "border-orange-400 bg-orange-50 text-orange-600"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
          <Printer className="h-4 w-4" />
          KOT
        </button>
        <button
          disabled={cartItems.length === 0}
          className="flex-[2] rounded-lg bg-orange-500 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
        >
          Pay ₹{total.toLocaleString("en-IN")}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen w-full flex-col bg-slate-50 font-sans text-slate-900 lg:flex-row">
      <div className="flex-1 overflow-y-auto p-4 pb-24 sm:p-6 lg:pb-6">
        <div className="mb-4 sm:mb-5">
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Billing &amp; POS</h1>
          <p className="text-xs text-slate-500 sm:text-sm">Create orders and process payments</p>
        </div>
        <div className="mb-4 flex gap-1 overflow-x-auto rounded-xl bg-slate-200/60 p-1.5 sm:mb-5 sm:flex-wrap sm:overflow-visible">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium transition-colors sm:px-4 ${
                activeCategory === cat
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => {
            const qtyInCart = cart[item.id] || 0;
            return (
              <button
                key={item.id}
                onClick={() => addToCart(item.id)}
                className={`group relative overflow-hidden rounded-xl border bg-white text-left shadow-sm transition-all hover:shadow-md ${
                  qtyInCart > 0 ? "border-orange-400 ring-1 ring-orange-300" : "border-slate-200"
                }`}
              >
                <div className="flex h-20 items-center justify-center bg-slate-100 sm:h-28">
                  <UtensilsCrossed className="h-6 w-6 text-slate-300 sm:h-8 sm:w-8" strokeWidth={1.5} />
                </div>
                {qtyInCart > 0 && (
                  <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white shadow">
                    {qtyInCart}
                  </span>
                )}
                <div className="px-2.5 py-2 sm:px-3 sm:py-2.5">
                  <p className="truncate text-sm font-semibold text-slate-900">{item.name}</p>
                  <div className="mt-0.5 flex items-center justify-between gap-1">
                    <span className="truncate text-xs text-slate-500">{item.category}</span>
                    <span className="flex-shrink-0 text-sm font-semibold text-orange-600">₹{item.price}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <div className="hidden w-[380px] flex-shrink-0 flex-col border-l border-slate-200 bg-white p-5 lg:flex">
        <BillPanel showCloseButton={false} />
      </div>
      {!billOpen && (
        <button
          onClick={() => setBillOpen(true)}
          className="fixed inset-x-4 bottom-4 z-30 flex items-center justify-between rounded-xl bg-orange-500 px-5 py-3.5 text-white shadow-lg shadow-orange-500/30 lg:hidden"
        >
          <span className="flex items-center gap-2 text-sm font-semibold">
            <ShoppingCart className="h-4 w-4" />
            {cartCount > 0 ? `${cartCount} item${cartCount > 1 ? "s" : ""}` : "View bill"}
          </span>
          <span className="text-sm font-bold">₹{total.toLocaleString("en-IN")}</span>
        </button>
      )}
      {billOpen && (
        <div className="fixed inset-0 z-40 flex flex-col justify-end lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40"
            onClick={() => setBillOpen(false)}
          />
          <div className="relative flex max-h-[88vh] flex-col rounded-t-2xl bg-white p-5 shadow-2xl">
            <div className="mx-auto mb-3 h-1.5 w-10 flex-shrink-0 rounded-full bg-slate-200" />
            <BillPanel showCloseButton={true} />
          </div>
        </div>
      )}
    </div>
  );
}
export default Billing;