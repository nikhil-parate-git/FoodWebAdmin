import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  ChevronDown,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* --- Helper: Status Colors --- */
const STATUS_COLORS = {
  placed: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  preparing: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  delivered: "bg-green-50 text-green-700 ring-1 ring-green-200",
  cancelled: "bg-red-50 text-red-700 ring-1 ring-red-200",
};

const INITIAL_DATA = [
  {
    id: "order_SmLHoyU7GipXAI",
    customer: "Nikhil Parate",
    city: "Nagpur",
    state: "Maharashtra",
    status: "placed",
  },
  {
    id: "order_Ax9KmBzPqLjRT3N",
    customer: "Priya Sharma",
    city: "Pune",
    state: "Maharashtra",
    status: "delivered",
  },
  {
    id: "order_Yt2WrCvNxHqDE8F",
    customer: "Arjun Mehta",
    city: "Bengaluru",
    state: "Karnataka",
    status: "preparing",
  },
  {
    id: "order_Lp5VnDkMwFoGT1C",
    customer: "Sneha Kulkarni",
    city: "Panaji",
    state: "Goa",
    status: "cancelled",
  },
  // ... more data can be added
];

const STATUS_OPTIONS = ["placed", "preparing", "delivered", "cancelled"];

/* --- Component: Inline Status Dropdown (Table Row Ke Liye) --- */
const RowStatusDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const colorClass = STATUS_COLORS[value] || "bg-gray-100 text-gray-600";

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold transition-all hover:opacity-80 ${colorClass}`}
      >
        {value.charAt(0).toUpperCase() + value.slice(1)}
        <ChevronDown
          size={12}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 mt-2 z-20 bg-white border border-gray-100 rounded-xl shadow-xl min-w-[130px] overflow-hidden">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-xs font-medium hover:bg-gray-50 transition-colors text-gray-700 border-b border-gray-50 last:border-0"
              >
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
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
  const [data, setData] = useState(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);

  /* --- Pagination State --- */
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  /* --- Logic: Filtering --- */
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.customer.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter ? item.status === statusFilter : true;
      return matchesSearch && matchesStatus;
    });
  }, [data, search, statusFilter]);

  /* --- Logic: Pagination --- */
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentRows = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const handleStatusChange = (id, newStatus) => {
    setData((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)),
    );
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm min-h-screen border border-gray-100 flex flex-col font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
          Order Management
        </h1>
        <p className="text-[15px] text-gray-500 mt-1 font-medium">
          Track and manage your customer orders
        </p>
      </div>

      <hr className="border-gray-100 mb-6" />

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-8 gap-4">
        {/* Search Input */}
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

        {/* Status Filter Dropdown */}
        <div className="relative">
          <select
            className="h-12 px-4 rounded-xl border border-gray-200 bg-[#F7F8F9] text-sm font-medium text-gray-700 outline-none focus:border-[#E23E08] cursor-pointer appearance-none min-w-[160px]"
            value={statusFilter || ""}
            onChange={(e) => {
              setStatusFilter(e.target.value || null);
              setCurrentPage(1);
            }}
          >
            <option value="">All Status</option>
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>

      {/* Custom Table */}
      <div className="w-full border border-gray-100 rounded-2xl overflow-hidden bg-white flex-1">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full border-collapse">
            <thead className="bg-[#E8D5C4]/40 text-left">
              <tr>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600  w-[80px]">
                  Sr.No.
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 ">
                  Order ID
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 ">
                  Customer Name
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 ">
                  Location
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600  w-[160px]">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600  w-[100px]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {currentRows.length > 0 ? (
                currentRows.map((order, index) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-5 text-center text-sm font-medium text-gray-400">
                      {(currentPage - 1) * rowsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs font-sm font-medium text-gray-600">
                        #{order.id.split("_")[1]}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-medium text-gray-600 ">
                        {order.customer}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-600">
                          {order.city}
                        </span>
                        <span className="text-[12px] text-gray-400 font-medium">
                          {order.state}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <RowStatusDropdown
                        value={order.status}
                        onChange={(newStatus) =>
                          handleStatusChange(order.id, newStatus)
                        }
                      />
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        <button
                          onClick={() =>
                            navigate(`/orders/${order.id}`, {
                              state: { order },
                            })
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
                  <td
                    colSpan="6"
                    className="px-6 py-20 text-center text-gray-400 font-medium italic"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex items-center justify-between mt-8 px-2">
          <p className="text-sm font-medium text-gray-500">
            Showing{" "}
            <span className="text-gray-900 font-semibold">
              {currentRows.length}
            </span>{" "}
            of{" "}
            <span className="text-gray-900 font-semibold">
              {filteredData.length}
            </span>{" "}
            entries
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
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
              disabled={currentPage === totalPages}
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
