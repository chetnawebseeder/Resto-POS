import StatusTabs from "./components/StatusTabs";
import OrderCard from "./components/OrderCard";

const Orders = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">

      <h1 className="text-4xl font-bold">
        Order Management
      </h1>

      <p className="text-slate-500 mt-2 mb-8">
        Live order tracking and management
      </p>

      <StatusTabs />

      <div className="space-y-5">

        <OrderCard />
        <OrderCard />
        <OrderCard />

      </div>

    </div>
  );
}
export default Orders;