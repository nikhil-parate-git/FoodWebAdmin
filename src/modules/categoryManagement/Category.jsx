import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import {
  fetchCategories,
  deleteCategory,
  toggleCategoryStatus,
} from "../../redux/slices/category/getCategorySlice";
import Loader from "../../components/common/Loader";

export default function CategoryList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.getcategory);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleToggle = (id) => dispatch(toggleCategoryStatus(id));

  const openDeleteModal = (cat) => {
    setSelectedCat(cat);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCat) {
      dispatch(deleteCategory(selectedCat._id));
      setIsModalOpen(false);
      setSelectedCat(null);
    }
  };

  const filteredData = useMemo(
    () =>
      categories.filter((cat) =>
        cat.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [categories, search],
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentRows = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage]);

  return (
    <div className="relative bg-white p-6 rounded-2xl shadow-sm min-h-screen border border-gray-100 flex flex-col">
      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="text-red-500" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Delete Category?
              </h3>
              <p className="text-gray-500 mt-2">
                Kya aap waqai{" "}
                <span className="font-semibold text-gray-700">
                  "{selectedCat?.name}"
                </span>{" "}
                ko delete karna chahte hain?
              </p>
            </div>
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all shadow-lg shadow-red-100"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Category Management
        </h1>
        <p className="text-[15px] text-gray-500 mt-1">
          Create, edit and manage food categories
        </p>
      </div>

      <hr className="border-gray-100 mb-6" />

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-8 gap-4">
        <div className="flex items-center border border-gray-200 rounded-xl px-4 bg-[#F7F8F9] w-full max-w-md h-12">
          <Search size={18} className="text-[#E23E08] mr-2" />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-transparent outline-none text-sm w-full font-medium"
          />
        </div>
        <button
          onClick={() => navigate("/category/add")}
          className="inline-flex cursor-pointer items-center gap-2 px-6 py-3 bg-[#E23E08] text-white text-sm font-semibold rounded-xl hover:bg-[#c73507] transition-all active:scale-95 shadow-sm"
        >
          <Plus size={18} /> Add New Category
        </button>
      </div>

      {/* Table */}
      <div className="w-full border border-gray-100 rounded-2xl overflow-hidden bg-white flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead className="bg-[#E8D5C4]/40">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Sr.No.
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Image
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Category Name
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-20">
                    <div className="flex items-center justify-center">
                      <Loader />
                    </div>
                  </td>
                </tr>
              ) : currentRows.length > 0 ? (
                currentRows.map((cat, index) => (
                  <tr
                    key={cat._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {(currentPage - 1) * rowsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <div className="w-12 h-12 rounded-xl bg-orange-50 overflow-hidden border border-orange-100">
                          {cat.image ? (
                            <img
                              src={cat.image}
                              className="w-full h-full object-cover"
                              alt=""
                            />
                          ) : (
                            <span className="text-orange-300">?</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">
                      {cat.name}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleToggle(cat._id)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${cat.isActive ? "bg-green-500" : "bg-gray-300"}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${cat.isActive ? "translate-x-6" : "translate-x-1"}`}
                          />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-1">
                        <button
                          onClick={() => navigate(`/category/view/${cat._id}`)}
                          className="p-1.5 cursor-pointer rounded-lg text-blue-600 hover:bg-blue-50"
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/category/update/${cat._id}`)
                          }
                          className="p-1.5 cursor-pointer rounded-lg text-amber-600 hover:bg-amber-50"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(cat)}
                          className="p-1.5 cursor-pointer rounded-lg text-red-600 hover:bg-red-50"
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
                    className="py-20 text-gray-400 font-medium italic"
                  >
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-8 px-2">
        <p className="text-sm text-gray-500">
          Showing <b>{currentRows.length}</b> of <b>{filteredData.length}</b>
        </p>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="p-2 rounded-xl border disabled:opacity-30"
          >
            <ChevronLeft size={20} />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-xl text-sm font-semibold ${currentPage === i + 1 ? "bg-[#E23E08] text-white" : "bg-white border text-gray-600"}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-2 rounded-xl border disabled:opacity-30"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
