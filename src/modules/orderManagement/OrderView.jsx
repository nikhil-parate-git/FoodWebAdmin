import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrderById,
  clearSelectedOrder,
} from "../../redux/slices/orders/orderSlice";
import Loader from "../../components/common/Loader";

const STATUS_STYLES = {
  placed: {
    pill: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
    dot: "bg-blue-500",
  },
  preparing: {
    pill: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    dot: "bg-amber-500",
  },
  out_for_delivery: {
    pill: "bg-purple-50 text-purple-700 ring-1 ring-purple-200",
    dot: "bg-purple-500",
  },
  delivered: {
    pill: "bg-green-50 text-green-700 ring-1 ring-green-200",
    dot: "bg-green-500",
  },
  cancelled: {
    pill: "bg-red-50 text-red-700 ring-1 ring-red-200",
    dot: "bg-red-400",
  },
};

const OrderView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedOrder: order, loading } = useSelector(
    (state) => state.orders,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id));
    }
    return () => {
      dispatch(clearSelectedOrder());
    };
  }, [id, dispatch]);

  return (
    <div className="bg-white rounded-lg min-h-full p-6">
      {/* --- Header (Hamesha visible rahega) --- */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 cursor-pointer rounded-xl text-gray-400 hover:bg-gray-100 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Order Details</h1>
         
        </div>
      </div>

      {/* --- Loader ya Content --- */}
      {loading ? (
        <div className="flex h-[60vh] w-full items-center justify-center">
          <Loader />
        </div>
      ) : !order ? (
        <div className="flex flex-col items-center justify-center h-full py-20 text-gray-400">
          <div className="text-5xl mb-4">📦</div>
          <p className="text-base font-medium text-gray-500">Order not found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-5 py-2 text-sm bg-[#E23E08] text-white rounded-xl hover:opacity-90 transition-opacity"
          >
            ← Back to Orders
          </button>
        </div>
      ) : (
        <>
          {/* Customer Info Banner */}
          <div className="bg-white rounded-2xl px-5 py-4 mb-6 flex items-center justify-between shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#E23E08] flex items-center justify-center text-white font-bold text-lg">
                {order.user?.name?.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">
                  {order.user?.name}
                </p>
                <p className="text-xs text-gray-400">
                  {order.user?.email} | {order.user?.phone}
                </p>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  📍 {order.address?.street}, {order.address?.city}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${STATUS_STYLES[order.status]?.pill || "bg-gray-100 text-gray-600"}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${STATUS_STYLES[order.status]?.dot || "bg-gray-400"}`}
                />
                {order.status?.replace(/_/g, " ").toUpperCase()}
              </span>
              <p className="text-[10px] text-gray-400 mt-2 font-medium">
                PLACED ON: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6 shadow-sm">
            <div className="p-5 space-y-4">
              <h2 className="text-sm font-bold text-gray-800 border-b pb-2 border-gray-50">
                Items Ordered
              </h2>
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover bg-gray-50 border border-gray-100"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.quantity} x ₹{item.price}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-gray-800">
                    ₹{item.quantity * item.price}
                  </p>
                </div>
              ))}
            </div>

            {/* Bill Details */}
            <div className="bg-gray-50 px-5 py-4 border-t border-gray-100 space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Delivery Fee</span>
                <span>₹{order.deliveryFee}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Platform Fee & Packing</span>
                <span>₹{order.platformFee + (order.packingCharge || 0)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200 mt-2">
                <span className="text-sm font-bold text-gray-700">
                  Total Amount
                </span>
                <span className="text-lg font-black text-[#E23E08]">
                  ₹{order.totalAmount}
                </span>
              </div>
              <p className="text-[10px] text-green-600 font-bold text-right uppercase tracking-wider">
                Payment {order.paymentStatus} via Razorpay
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderView;
