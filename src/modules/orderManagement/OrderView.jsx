import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const STATUS_STYLES = {
  placed:    { pill: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",    dot: "bg-blue-500" },
  preparing: { pill: "bg-amber-50 text-amber-700 ring-1 ring-amber-200", dot: "bg-amber-500" },
  delivered: { pill: "bg-green-50 text-green-700 ring-1 ring-green-200", dot: "bg-green-500" },
  cancelled: { pill: "bg-red-50 text-red-700 ring-1 ring-red-200",       dot: "bg-red-400" },
};

// Ek customer ke multiple orders same din — realistic mock
const CUSTOMER_ORDERS = {
  "Nikhil Parate": [
    {
      id: "order_SmLHoyU7GipXAI",
      time: "08:05 AM", date: "07 May 2026",
      status: "delivered",
      items: [
        { emoji: "☕", name: "Masala Chai", qty: 2, price: 30 },
        { emoji: "🥐", name: "Butter Croissant", qty: 1, price: 80 },
      ],
      delivery: 15, platform: 3, packing: 5,
    },
    {
      id: "order_SmLHoyU7GipXB2",
      time: "01:10 PM", date: "07 May 2026",
      status: "delivered",
      items: [
        { emoji: "🍕", name: "Margherita Pizza", qty: 1, price: 299 },
        { emoji: "🥤", name: "Cold Drink", qty: 2, price: 45 },
      ],
      delivery: 30, platform: 5, packing: 10,
    },
    {
      id: "order_SmLHoyU7GipXC3",
      time: "04:30 PM", date: "07 May 2026",
      status: "delivered",
      items: [
        { emoji: "🍟", name: "French Fries", qty: 1, price: 99 },
        { emoji: "🍔", name: "Veg Burger", qty: 1, price: 149 },
      ],
      delivery: 25, platform: 5, packing: 8,
    },
    {
      id: "order_SmLHoyU7GipXD4",
      time: "08:00 PM", date: "07 May 2026",
      status: "placed",
      items: [
        { emoji: "🍛", name: "Dal Makhani", qty: 2, price: 160 },
        { emoji: "🫓", name: "Butter Naan", qty: 4, price: 35 },
        { emoji: "🥗", name: "Raita", qty: 1, price: 50 },
      ],
      delivery: 30, platform: 5, packing: 12,
    },
    {
      id: "order_SmLHoyU7GipXE5",
      time: "10:45 PM", date: "07 May 2026",
      status: "preparing",
      items: [
        { emoji: "🍦", name: "Vanilla Ice Cream", qty: 2, price: 120 },
        { emoji: "🍫", name: "Chocolate Brownie", qty: 1, price: 90 },
      ],
      delivery: 20, platform: 3, packing: 5,
    },
  ],
};

const ORDERS_PER_PAGE = 10;

const OrderView = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;
  const [page, setPage] = useState(1);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20 text-gray-400">
        <div className="text-5xl mb-4">📦</div>
        <p className="text-base font-medium text-gray-500">Order not found</p>
        <button
          onClick={() => navigate("/orders")}
          className="mt-4 px-5 py-2 text-sm bg-[#E23E08] text-white rounded-xl hover:opacity-90 transition-opacity"
        >
          ← Back to Orders
        </button>
      </div>
    );
  }

  // Is customer ke saare orders
  const allOrders = CUSTOMER_ORDERS[order.customer] ?? [
    {
      id: order.id,
      time: order.time || "N/A",
      date: order.date || "Today",
      status: order.status,
      items: order.items,
      delivery: order.delivery,
      platform: order.platform,
      packing: order.packing,
    },
  ];

  const totalPages = Math.ceil(allOrders.length / ORDERS_PER_PAGE);
  const paginated = allOrders.slice((page - 1) * ORDERS_PER_PAGE, page * ORDERS_PER_PAGE);

  return (
    <div className="bg-white rounded-lg min-h-full p-6">

      {/* ── Page Header ── */}
      <div className="flex items-center gap-3 mb-1">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl cursor-pointer text-gray-400 hover:bg-white hover:text-gray-700 hover:shadow-sm transition-all"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Order History</h1>
          <p className="text-xs text-gray-400 mt-0.5">All orders placed by this customer</p>
        </div>
      </div>

      {/* ── Customer Info Banner ── */}
      <div className="bg-white rounded-2xl px-5 py-4 mb-5 mt-4 flex items-center justify-between shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-[#E23E08] flex items-center justify-center text-white font-bold text-base flex-shrink-0">
            {order.customer.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{order.customer}</p>
            <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {order.city}, {order.state}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Total Orders</p>
          <p className="text-xl font-bold text-[#E23E08]">{allOrders.length}</p>
        </div>
      </div>

      {/* ── Order Cards ── */}
      <div className="space-y-4 mb-5">
        {paginated.map((o, idx) => {
          const subtotal = o.items.reduce((s, it) => s + it.qty * it.price, 0);
          const total = subtotal + o.delivery + o.platform + o.packing;
          const style = STATUS_STYLES[o.status] ?? STATUS_STYLES.placed;
          const globalIdx = (page - 1) * ORDERS_PER_PAGE + idx + 1;

          return (
            <div
              key={o.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-semibold text-gray-400">#{globalIdx}</span>
                  <span className="font-mono text-xs text-gray-400 truncate max-w-[140px]">{o.id}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{o.time} · {o.date}</span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${style.pill}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                    {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="px-5 py-3 space-y-2.5">
                {o.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-lg flex-shrink-0">
                      {item.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.qty} × ₹{item.price}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">₹{item.qty * item.price}</p>
                  </div>
                ))}
              </div>

              {/* Card Footer — Bill */}
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>Subtotal ₹{subtotal} + Delivery ₹{o.delivery} + Platform ₹{o.platform} + Packing ₹{o.packing}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">Total paid</span>
                  <span className="text-sm font-bold text-[#E23E08]">₹{total}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            ← Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
            <button
              key={pg}
              onClick={() => setPage(pg)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                pg === page
                  ? "bg-[#E23E08] text-white shadow-sm"
                  : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {pg}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-500 bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Next →
          </button>
        </div>
      )}

    </div>
  );
};

export default OrderView;