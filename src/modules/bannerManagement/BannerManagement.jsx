import { useState, useMemo } from "react";
import {
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const INITIAL_BANNERS = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=200",
    title: "Summer Sale",
    date: "2024-03-20",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200",
    title: "Weekend Offer",
    date: "2024-03-18",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=200",
    title: "Festival Combo",
    date: "2024-03-15",
  },
];

const BannerManagement = () => {
  const [banners, setBanners] = useState(INITIAL_BANNERS);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  /* --- Pagination Logic --- */
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  /* Delete Function */
  const handleDelete = (id) => {
    if (window.confirm("Kya aap is banner ko delete karna chahte hain?")) {
      setBanners((prev) => prev.filter((b) => b.id !== id));
    }
  };

  /* Filter Logic */
  const filteredData = useMemo(() => {
    return banners.filter((b) =>
      b.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [banners, search]);

  /* Pagination Calculation */
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentRows = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm min-h-screen border border-gray-100 flex flex-col font-sans">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
          Banner Management
        </h1>
        <p className="text-[15px] text-gray-500 mt-1 font-medium">
          Upload and manage promotional banners for your app
        </p>
      </div>

      <hr className="border-gray-100 mb-6" />

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        {/* Search */}
        <div className="flex items-center border border-gray-200 rounded-xl px-4 bg-[#F7F8F9] w-full max-w-sm h-12 focus-within:border-[#E23E08] transition-all">
          <Search size={18} className="text-[#E23E08] mr-2 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-transparent outline-none text-sm w-full font-medium text-gray-700 placeholder:text-gray-400"
          />
        </div>

        {/* Add Button */}
        <button
          onClick={() => navigate("/banner/add")}
          className="inline-flex cursor-pointer items-center gap-2 px-6 py-3 bg-[#E23E08] text-white text-sm font-semibold rounded-xl hover:bg-[#c73507] transition-all active:scale-95 shadow-sm"
        >
          <Plus size={18} />
          Add New Banner
        </button>
      </div>

      {/* Table Section */}
      <div className="w-full border border-gray-100 rounded-2xl overflow-hidden bg-white flex-1">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-[#E8D5C4]/40">
              <tr>
                <th className="px-4 py-4 text-center text-sm font-semibold text-gray-600 w-[80px]">
                  Sr.No.
                </th>
                <th className="px-4 py-4 text-center text-sm font-semibold text-gray-600">
                  Banner Image
                </th>
                <th className="px-4 py-4 text-center text-sm font-semibold text-gray-600">
                  Title
                </th>
                <th className="px-4 py-4 text-center text-sm font-semibold text-gray-600">
                  Created Date
                </th>
                <th className="px-4 py-4 text-center text-sm font-semibold text-gray-600 w-[180px]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {currentRows.length > 0 ? (
                currentRows.map((banner, index) => (
                  <tr
                    key={banner.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    {/* Sr. No Center */}
                    <td className="px-4 py-5 text-center text-sm font-medium text-gray-400">
                      {(currentPage - 1) * rowsPerPage + index + 1}
                    </td>

                    {/* Image Center */}
                    <td className="px-4 py-5">
                      <div className="flex justify-center">
                        <div className="w-32 h-16 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                          <img
                            src={banner.image}
                            alt={banner.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </td>

                    {/* Title Center */}
                    <td className="px-4 py-5 text-center">
                      <span className="text-[15px] font-medium text-gray-800 tracking-tight">
                        {banner.title}
                      </span>
                    </td>

                    {/* Date Center */}
                    <td className="px-4 py-5">
                      <div className="flex items-center justify-center gap-2 text-gray-600">
                        <Calendar size={14} className="text-gray-400" />
                        <span className="text-sm font-medium">
                          {banner.date}
                        </span>
                      </div>
                    </td>

                    {/* Actions Center */}
                    <td className="px-4 py-5">
                      <div className="flex justify-center gap-1">
                        <button
                          onClick={() => navigate(`/banner/view/${banner.id}`)}
                          className="p-1.5 cursor-pointer rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/banner/update/${banner.id}`)
                          }
                          className="p-1.5 cursor-pointer rounded-lg text-amber-600 hover:bg-amber-50 transition-colors "
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(banner.id)}
                          className="p-1.5 cursor-pointer rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-20 text-center text-gray-400 font-medium italic"
                  >
                    No banners found.
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

export default BannerManagement;
