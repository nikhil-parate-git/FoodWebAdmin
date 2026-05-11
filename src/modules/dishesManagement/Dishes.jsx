import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Eye,
  Edit,
  Trash2,
  Plus,
  ChevronDown,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  fetchDishes,
  deleteDish,
  updateDish,
} from "../../redux/slices/dishes/dishSlice";
import Loader from "../../components/common/Loader";

// Helper: parse malformed stringified arrays from API
const parseArrayField = (arr) => {
  if (!arr || !Array.isArray(arr)) return [];
  try {
    const joined = arr.join(",").replace(/^\[|\]$/g, "");
    return joined
      .split(",")
      .map((s) => s.replace(/\"/g, "").trim())
      .filter(Boolean);
  } catch {
    return arr;
  }
};

const Dishes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dishes, loading } = useSelector((state) => state.dishes);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openCategory, setOpenCategory] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  // Build category options dynamically from fetched dishes
  const categoryOptions = useMemo(() => {
    const cats = ["All"];
    dishes.forEach((d) => {
      const cat = d.category?.name || d.category;
      if (cat && !cats.includes(cat)) cats.push(cat);
    });
    return cats;
  }, [dishes]);

  // Toggle availability via update API
  const handleToggle = (dish) => {
    const fd = new FormData();
    fd.append("isAvailable", !dish.isAvailable);
    dispatch(updateDish({ dishId: dish._id, formData: fd }));
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete "${name}"?`)) {
      dispatch(deleteDish(id));
    }
  };

  // Filter Logic
  const filteredData = useMemo(() => {
    return dishes.filter((dish) => {
      const matchesSearch = dish.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const catName = dish.category?.name || dish.category || "";
      const matchesCategory =
        selectedCategory === "All" || catName === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [dishes, search, selectedCategory]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentRows = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm min-h-screen border border-gray-100 flex flex-col font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
          Dishes Management
        </h1>
        <p className="text-[15px] text-gray-500 mt-1 font-medium">
          Manage your menu items and their availability
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
            placeholder="Search dishes..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-transparent outline-none text-sm w-full font-medium text-gray-700 placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Category Filter */}
          <div className="relative">
            <button
              onClick={() => setOpenCategory(!openCategory)}
              className="inline-flex items-center gap-2 px-4 h-12 rounded-xl border border-gray-200 bg-[#F7F8F9] text-sm font-medium text-gray-700 hover:border-[#E23E08] transition-all min-w-[140px] justify-between"
            >
              {selectedCategory}
              <ChevronDown
                size={16}
                className={`transition-transform ${openCategory ? "rotate-180" : ""}`}
              />
            </button>
            {openCategory && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setOpenCategory(false)}
                />
                <div className="absolute right-0 top-full mt-2 z-20 bg-white border border-gray-100 rounded-xl shadow-xl min-w-[180px] overflow-hidden">
                  {categoryOptions.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setOpenCategory(false);
                        setCurrentPage(1);
                      }}
                      className={`w-full flex items-center px-4 py-3 text-sm transition-colors ${
                        selectedCategory === cat
                          ? "bg-orange-50 text-[#E23E08] font-semibold"
                          : "text-gray-600 hover:bg-gray-50 font-medium"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Add Button */}
          <button
            onClick={() => navigate("/dishes/add")}
            className="inline-flex cursor-pointer items-center gap-2 px-6 py-3 bg-[#E23E08] text-white text-sm font-semibold rounded-xl hover:bg-[#c73507] transition-all active:scale-95 shadow-sm whitespace-nowrap"
          >
            <Plus size={18} />
            Add Dish
          </button>
        </div>
      </div>

      {/* Table */}
      {/* Table */}
      <div className="w-full border border-gray-100 rounded-2xl overflow-hidden bg-white flex-1">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-center border-collapse">
            <thead className="bg-[#E8D5C4]/40">
              <tr>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Sr.No.
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Image
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Dish Name
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Category
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Price
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Available
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-20">
                    <div className="flex items-center justify-center">
                      <Loader />
                    </div>
                  </td>
                </tr>
              ) : currentRows.length > 0 ? (
                currentRows.map((dish, index) => (
                  <tr
                    key={dish._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-center text-sm font-medium text-gray-600">
                      {(currentPage - 1) * rowsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-12 h-12 object-cover rounded-lg border border-gray-100"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[15px] font-medium text-gray-700">
                        {dish.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-600">
                        {dish.category?.name || dish.category || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-[#E23E08]">
                        ₹{dish.price}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleToggle(dish)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                            dish.isAvailable ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                              dish.isAvailable
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
                          onClick={() => navigate(`/dishes/view/${dish._id}`)}
                          className="p-1.5 cursor-pointer rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          onClick={() => navigate(`/dishes/update/${dish._id}`)}
                          className="p-1.5 cursor-pointer rounded-lg text-amber-600 hover:bg-amber-50 transition-colors"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(dish._id, dish.name)}
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
                    colSpan="7"
                    className="px-6 py-20 text-center text-gray-400 font-medium italic"
                  >
                    No dishes found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
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
              onClick={() => setCurrentPage((p) => p - 1)}
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
              onClick={() => setCurrentPage((p) => p + 1)}
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

export default Dishes;
