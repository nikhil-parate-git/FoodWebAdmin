import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Search, ChevronLeft, ChevronRight } from "lucide-react";

const INITIAL_DATA = [
  {
    id: 1,
    name: "Ronald Richards",
    email: "ronald@example.com",
    phone: "9872356232",
    gender: "Male",
    status: "active",
  },
  {
    id: 2,
    name: "Marvin McKinney",
    email: "marvin@example.com",
    phone: "9876543210",
    gender: "Male",
    status: "active",
  },
  {
    id: 3,
    name: "Ralph Edwards",
    email: "ralph@example.com",
    phone: "9123456780",
    gender: "Male",
    status: "inactive",
  },
  {
    id: 4,
    name: "Jacob Jones",
    email: "jacob@example.com",
    phone: "8800112233",
    gender: "Male",
    status: "active",
  },
  {
    id: 5,
    name: "Jane Cooper",
    email: "jane@example.com",
    phone: "7700998877",
    gender: "Female",
    status: "pending",
  },
  // Testing pagination logic...
  {
    id: 6,
    name: "Arlene McCoy",
    email: "arlene@example.com",
    phone: "8521479630",
    gender: "Female",
    status: "active",
  },
  {
    id: 7,
    name: "Theresa Webb",
    email: "theresa@example.com",
    phone: "7412589630",
    gender: "Female",
    status: "inactive",
  },
];

const Customers = () => {
  const navigate = useNavigate();
  const [data] = useState(INITIAL_DATA);
  const [search, setSearch] = useState("");

  /* Pagination State */
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  /* Filter Logic */
  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  /* Pagination Calculation */
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
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

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center border border-gray-200 rounded-xl px-4 bg-[#F7F8F9] w-80 h-12 focus-within:border-[#E23E08] transition-all">
          <Search size={18} className="text-[#E23E08] mr-2 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search Customer by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-transparent outline-none text-sm w-full font-medium text-gray-700"
          />
        </div>
      </div>

      {/* Table Container with Hidden Scrollbar */}
      <div className="w-full border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-[#FCFDFD]">
        <div
          className="overflow-x-auto scrollbar-hide"
          style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
        >
          <style>{`
            .scrollbar-hide::-webkit-scrollbar { display: none; }
          `}</style>

          <table className="w-full min-w-[900px] border-collapse">
            <thead className="bg-[#E8D5C4]/40">
              <tr>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700  w-[80px]">
                  Sr.No.
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 ">
                  Customer Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 ">
                  Email Address
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 ">
                  Phone Number
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 ">
                  Gender
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700  w-[100px]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-50">
              {currentRows.length > 0 ? (
                currentRows.map((customer, index) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-orange-50/30 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-gray-400">
                      {indexOfFirstRow + index + 1}
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
                      <span className="text-sm font-medium text-gray-700  ">
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
                          navigate(`/customer/${customer.id}`, {
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

      {/* Custom Pagination Footer */}
      <div className="flex items-center justify-between mt-8">
        <div className="text-sm font-medium text-gray-500">
          Showing <span className="text-gray-800">{currentRows.length}</span> of{" "}
          <span className="text-gray-800">{filteredData.length}</span> customers
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:bg-white hover:text-[#E23E08] hover:border-[#E23E08] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-1">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
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
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:bg-white hover:text-[#E23E08] hover:border-[#E23E08] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Customers;
