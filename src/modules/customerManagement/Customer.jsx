import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/slices/customer/customerSlice"; 

// Loader Component (inline or import from your file)
const Loader = () => (
  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-orange-600"></div>
);

const Customer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { users, pagination, loading } = useSelector((state) => state.users);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch users on page change
  useEffect(() => {
    dispatch(getAllUsers(currentPage));
  }, [dispatch, currentPage]);

  // Client-side search filter (on current page data)
  const filteredData = useMemo(() => {
    return users.filter(
      (item) =>
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.email?.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm min-h-screen border overflow-y-auto scrollbar-hide border-gray-100">
      {/* Title Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
          Customer Management
        </h1>
        <p className="text-sm text-gray-500 mt-1 font-medium">
          Manage and view your customer database
        </p>
      </div>

      <hr className="border-gray-100 mb-6" />

      {/* Toolbar — always visible */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center border border-gray-200 rounded-xl px-4 bg-[#F7F8F9] w-80 h-12 focus-within:border-[#E23E08] transition-all">
          <Search size={18} className="text-[#E23E08] mr-2 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search Customer by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="bg-transparent outline-none text-sm w-full font-medium text-gray-700"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="w-full border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-[#FCFDFD]">
        <div
          className="overflow-x-auto scrollbar-hide"
          style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
        >
          <style>{`
            .scrollbar-hide::-webkit-scrollbar { display: none; }
          `}</style>

          <table className="w-full text-center min-w-[900px] border-collapse">
            {/* Header — always fixed/visible */}
            <thead className="bg-[#E8D5C4]/40">
              <tr>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 w-[50px]">
                  Sr.No.
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 w-[50px]">
                  Customer Name
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 w-[50px]">
                  Email Address
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 w-[50px]">
                  Phone Number
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 w-[50px]">
                  Gender
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 w-[50px]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-50">
              {loading ? (
                // Loader centered inside table body
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center">
                    <div className="flex items-center justify-center">
                      <Loader />
                    </div>
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((customer, index) => (
                  <tr
                    key={customer._id || customer.id}
                    className="hover:bg-orange-50/30 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-gray-400">
                      {(currentPage - 1) * 10 + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-600">
                        {customer.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-600">
                        {customer.email}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-sm font-medium text-gray-700">
                        {customer.phone}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-sm font-semibold text-gray-600">
                        {customer.gender}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() =>
                          navigate(`/customer/${customer._id || customer.id}`, {
                            state: customer,
                          })
                        }
                        className="p-1.5 cursor-pointer rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Eye size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-20 text-center text-gray-400 font-medium italic"
                  >
                    No customers found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between mt-8">
        <div className="text-sm font-medium text-gray-500">
          Showing{" "}
          <span className="text-gray-800">{filteredData.length}</span> of{" "}
          <span className="text-gray-800">{pagination.totalUsers}</span> customers
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!pagination.hasPrevPage || loading}
            className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:bg-white hover:text-[#E23E08] hover:border-[#E23E08] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-1">
            {[...Array(pagination.totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                disabled={loading}
                className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all shadow-sm ${
                  currentPage === i + 1
                    ? "bg-[#E23E08] text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-[#E23E08]"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!pagination.hasNextPage || loading}
            className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:bg-white hover:text-[#E23E08] hover:border-[#E23E08] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Customer;