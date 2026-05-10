import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  ChevronDown,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders, updateOrderStatus } from "../../redux/slices/orders/orderSlice";
import { toast } from "react-toastify";

const Loader = () => (
  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-orange-600"></div>
);

const STATUS_COLORS = {
  placed: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  preparing: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  delivered: "bg-green-50 text-green-700 ring-1 ring-green-200",
  cancelled: "bg-red-50 text-red-700 ring-1 ring-red-200",
  out_for_delivery: "bg-purple-50 text-purple-700 ring-1 ring-purple-200",
};

const STATUS_OPTIONS = [
  "placed",
  "preparing",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

const formatLabel = (str) =>
  (str || "placed")
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const RowStatusDropdown = ({ value, onChange, disabled }) => {
  const [open, setOpen] = useState(false);
  const safeValue = value || "placed";
  const colorClass = STATUS_COLORS[safeValue] || "bg-gray-100 text-gray-600";

  return (
    <div className="relative inline-block">
      <button
        onClick={() => !disabled && setOpen((prev) => !prev)}
        disabled={disabled}
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold transition-all hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60 ${colorClass}`}
      >
        {formatLabel(safeValue)}
        <ChevronDown
          size={12}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 mt-2 z-20 bg-white border border-gray-100 rounded-xl shadow-xl min-w-[150px] overflow-hidden">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-xs font-medium hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 ${
                  opt === safeValue
                    ? "text-orange-600 font-semibold bg-orange-50"
                    : "text-gray-700"
                }`}
              >
                {formatLabel(opt)}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orders, pagination, loading } = useSelector((state) => state.orders);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [updatingId, setUpdatingId] = useState(null);

  // ✅ Server call only for page + search
  useEffect(() => {
    dispatch(fetchAllOrders({ page: currentPage, search }));
  }, [dispatch, currentPage, search]);

  // ✅ Client-side status filter
  const filteredData = statusFilter
    ? orders.filter((order) => order.status === statusFilter)
    : orders;

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    const result = await dispatch(updateOrderStatus({ id, status: newStatus }));
    if (updateOrderStatus.rejected.match(result)) {
      toast.error("Failed to update status");
    }
    setUpdatingId(null);
  };

  const totalPages = pagination?.totalPages || 1;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm min-h-screen border border-gray-100 flex flex-col font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
          Order Management
        </h1>
        <p className="text-[15px] text-gray-500 mt-1 font-medium">
          Track and manage your customer orders
        </p>
      </div>

      <hr className="border-gray-100 mb-6" />

      <div className="flex items-center justify-between mb-8 gap-4">
        <div className="flex items-center border border-gray-200 rounded-xl px-4 bg-[#F7F8F9] w-full max-w-md h-12 focus-within:border-[#E23E08] transition-all">
          <Search size={18} className="text-[#E23E08] mr-2 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by customer or order ID..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-transparent outline-none text-sm w-full font-medium text-gray-700 placeholder:text-gray-400"
          />
        </div>

        {/* ✅ Status Filter — client-side */}
        <div className="relative">
          <select
            className="h-12 px-4 rounded-xl border border-gray-200 bg-[#F7F8F9] text-sm font-medium text-gray-700 outline-none focus:border-[#E23E08] cursor-pointer appearance-none min-w-[160px]"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Status</option>
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {formatLabel(opt)}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>

      <div className="w-full border border-gray-100 rounded-2xl overflow-hidden bg-white flex-1">
        <div className="overflow-x-auto scrollbar-hide">
          <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>

          <table className="w-full border-collapse">
            <thead className="bg-[#E8D5C4]/40 text-left">
              <tr>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 w-[80px]">Sr.No.</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Order ID</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Customer Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Location</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 w-[180px]">Status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 w-[100px]">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center">
                    <div className="flex items-center justify-center">
                      <Loader />
                    </div>
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((order, index) => (
                  <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5 text-center text-sm font-medium text-gray-400">
                      {(currentPage - 1) * 10 + index + 1}
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs font-medium text-gray-600">
                        #{order._id?.slice(-8).toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-medium text-gray-600">
                        {order.user?.name || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-600">
                          {order.address?.city || "—"}
                        </span>
                        <span className="text-[12px] text-gray-400 font-medium">
                          {order.address?.state || ""}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <RowStatusDropdown
                        value={order.status}
                        disabled={updatingId === order._id}
                        onChange={(newStatus) =>
                          handleStatusChange(order._id, newStatus)
                        }
                      />
                      {updatingId === order._id && (
                        <p className="text-[10px] text-orange-500 mt-1 font-medium">
                          Updating...
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        <button
                          onClick={() =>
                            navigate(`/orders/${order._id}`, { state: { order } })
                          }
                          className="p-1.5 cursor-pointer rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <Eye size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center text-gray-400 font-medium italic">
                    No orders found matching the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 0 && (
        <div className="flex items-center justify-between mt-8 px-2">
          <p className="text-sm font-medium text-gray-500">
            Showing{" "}
            <span className="text-gray-900 font-semibold">{filteredData.length}</span>
            {" "}of{" "}
            <span className="text-gray-900 font-semibold">{pagination?.totalOrders || 0}</span>
            {" "}entries
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={!pagination?.hasPrevPage || loading}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:text-[#E23E08] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  disabled={loading}
                  className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                    currentPage === i + 1
                      ? "bg-[#E23E08] text-white shadow-md shadow-orange-100"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-[#E23E08]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              disabled={!pagination?.hasNextPage || loading}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:text-[#E23E08] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;