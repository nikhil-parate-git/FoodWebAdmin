import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { categoryStore } from "../../modules/categoryManagement/categoryStore";

export default function CategoryList() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(() => categoryStore.getAll());
  const [search, setSearch] = useState("");

  /* --- Pagination Logic --- */
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const handleToggle = (id) => {
    categoryStore.toggleStatus(id);
    setCategories(categoryStore.getAll());
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`"${name}" category ko delete karna chahte ho?`)) {
      categoryStore.delete(id);
      setCategories(categoryStore.getAll());
    }
  };

  /* --- Filter & Pagination Calculations --- */
  const filteredData = useMemo(() => {
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [categories, search]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentRows = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm min-h-screen border border-gray-100 flex flex-col">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
          Category Management
        </h1>
        <p className="text-[15px] text-gray-500 mt-1 font-medium">
          Create, edit and manage food categories
        </p>
      </div>

      <hr className="border-gray-100 mb-6" />

      {/* Toolbar: Search (Left) & Add Button (Right) */}
      <div className="flex items-center justify-between mb-8 gap-4">
        <div className="flex items-center border border-gray-200 rounded-xl px-4 bg-[#F7F8F9] w-full max-w-md h-12 focus-within:border-[#E23E08] transition-all">
          <Search size={18} className="text-[#E23E08] mr-2 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-transparent outline-none text-sm w-full font-medium text-gray-700 placeholder:text-gray-400"
          />
        </div>

        <button
          onClick={() => navigate("/categories/add")}
          className="inline-flex cursor-pointer items-center gap-2 px-6 py-3 bg-[#E23E08] text-white text-sm font-semibold rounded-xl hover:bg-[#c73507] transition-all active:scale-95 shadow-sm whitespace-nowrap"
        >
          <Plus size={18} />
          Add New Category
        </button>
      </div>

      {/* Table Section */}
      <div className="w-full border border-gray-100 rounded-2xl overflow-hidden bg-white flex-1">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-center border-collapse">
            <thead className="bg-[#E8D5C4]/40">
              <tr>
                <th className="px-6 py-4 text-center text-sm font-semiboldbold text-gray-600  w-[50px]">
                  Sr.No.
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600  w-[50px]">
                  Image
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600  w-[50px]">
                  Category Name
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600  w-[50px]">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600  w-[50px]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {currentRows.length > 0 ? (
                currentRows.map((cat, index) => (
                  <tr
                    key={cat.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                      {(currentPage - 1) * rowsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center overflow-hidden">
                          {cat.image ? (
                            <img
                              src={cat.image}
                              alt={cat.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-orange-300 font-semibold text-lg italic">
                              ?
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[15px] font-medium text-gray-700 tracking-tight">
                        {cat.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleToggle(cat.id)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                            cat.status === "active"
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                              cat.status === "active"
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-1">
                        <button
                          onClick={() => navigate(`/categories/view/${cat.id}`)}
                          className="p-1.5 cursor-pointer rounded-lg text-blue-600 hover:bg-blue-50 transition-colors "
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/categories/update/${cat.id}`)
                          }
                          className="p-1.5 cursor-pointer rounded-lg text-amber-600 hover:bg-amber-50 transition-colors "
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id, cat.name)}
                          className="p-1.5 cursor-pointer rounded-lg text-red-600 hover:bg-red-50 transition-colors "
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
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
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
    </div>
  );
}
