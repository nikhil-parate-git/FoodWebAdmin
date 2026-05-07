import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const INITIAL_DISHES = [
  { id: 1, category: "Pizza", name: "Margherita Pizza", status: "active" },
  { id: 2, category: "Burger", name: "Chicken Burger", status: "inactive" },
  { id: 3, category: "Drinks", name: "Cold Coffee", status: "active" },
  { id: 4, category: "Desserts", name: "Chocolate Cake", status: "active" },
  { id: 5, category: "Indian", name: "Butter Chicken", status: "inactive" },
  { id: 6, category: "Pizza", name: "Farmhouse Pizza", status: "active" },
];

const CATEGORY_OPTIONS = [
  "All",
  "Pizza",
  "Burger",
  "Drinks",
  "Desserts",
  "Indian",
];

const Dishes = () => {
  const navigate = useNavigate();
  const [dishes, setDishes] = useState(INITIAL_DISHES);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openCategory, setOpenCategory] = useState(false);

  /* --- Pagination Logic --- */
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  /* Toggle Status */
  const handleToggle = (id) => {
    setDishes((prev) =>
      prev.map((dish) =>
        dish.id === id
          ? {
              ...dish,
              status: dish.status === "active" ? "inactive" : "active",
            }
          : dish,
      ),
    );
  };

  /* Delete */
  const handleDelete = (id, name) => {
    if (window.confirm(`"${name}" dish ko delete karna chahte ho?`)) {
      setDishes((prev) => prev.filter((dish) => dish.id !== id));
    }
  };

  /* Filter Logic */
  const filteredData = useMemo(() => {
    return dishes.filter((dish) => {
      const matchesSearch = dish.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || dish.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [dishes, search, selectedCategory]);

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
          Dishes Management
        </h1>
        <p className="text-[15px] text-gray-500 mt-1 font-medium">
          Manage your menu items and their availability
        </p>
      </div>

      <hr className="border-gray-100 mb-6" />

      {/* Toolbar Section */}
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
                  {CATEGORY_OPTIONS.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setOpenCategory(false);
                        setCurrentPage(1);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors ${
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#E23E08] text-white text-sm font-semibold rounded-xl hover:bg-[#c73507] transition-all active:scale-95 shadow-sm whitespace-nowrap"
          >
            <Plus size={18} />
            Add Dish
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full border border-gray-100 rounded-2xl overflow-hidden bg-white flex-1">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-center border-collapse">
            <thead className="bg-[#E8D5C4]/40">
              <tr>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600  w-[50px]">
                  Sr.No.
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600  w-[50px]">
                  Dish Name
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600  w-[50px]">
                  Category
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
                currentRows.map((dish, index) => (
                  <tr
                    key={dish.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-5 text-center text-sm font-medium text-gray-600">
                      {(currentPage - 1) * rowsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-[15px] font-medium text-gray-700 tracking-tight ">
                        {dish.name}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-[15px] font-medium text-gray-700 tracking-tight ">
                        {dish.category}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleToggle(dish.id)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                            dish.status === "active"
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                              dish.status === "active"
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-1">
                        <button
                          onClick={() => navigate(`/dishes/view/${dish.id}`)}
                          className="p-1.5 cursor-pointer rounded-lg text-blue-600 hover:bg-blue-50 transition-colors  "
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          onClick={() => navigate(`/dishes/update/${dish.id}`)}
                          className="p-1.5 cursor-pointer rounded-lg text-amber-600 hover:bg-amber-50 transition-colors   "
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(dish.id, dish.name)}
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
                    No dishes found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
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

export default Dishes;
