import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Activity, Tag, Utensils } from "lucide-react";
import {
  fetchCategoryById,
  clearSelectedCategory,
} from "../../redux/slices/category/viewCategorySlice";
import Loader from "../../components/common/Loader";

export default function ViewCategory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    selectedCategory: category,
    detailLoading,
    detailError,
  } = useSelector((state) => state.viewcategory);

  useEffect(() => {
    dispatch(fetchCategoryById(id));
    return () => dispatch(clearSelectedCategory());
  }, [id, dispatch]);

  // ── Loading state ──
  if (detailLoading) {
    return (
      <div className=" h-full">
        <div className="bg-white rounded-3xl h-full border border-gray-100 p-8 shadow-sm w-full mx-auto flex flex-col">
          {/* Header always visible */}
          <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-50">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl cursor-pointer text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all"
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
            <h1 className="text-2xl font-bold text-gray-800">
              Category Details
            </h1>
          </div>
          <div className="flex-1 flex items-center justify-center py-20">
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  // ── Error / Not found state ──
  if (detailError || !category) {
    return (
      <div className="p-4 h-full">
        <div className="bg-white rounded-3xl h-full border border-gray-100 p-8 shadow-sm w-full mx-auto flex flex-col items-center justify-center">
          <Utensils size={48} className="text-orange-200 mx-auto mb-4" />
          <p className="text-gray-600 font-semibold text-lg">
            Oops! Category nahi mili.
          </p>
          <button
            onClick={() => navigate("/category")}
            className="mt-4 px-6 py-2 bg-[#E23E08] text-white rounded-xl flex items-center gap-2 mx-auto shadow-md"
          >
            ← Wapas Jao
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 h-full">
      <div className="bg-white rounded-3xl h-full border border-gray-100 p-8 shadow-sm w-full mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-50">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl cursor-pointer text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all"
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
          <h1 className="text-2xl font-bold text-gray-800">Category Details</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Image */}
          <div className="w-full md:w-72 shrink-0">
            <div className="aspect-square rounded-3xl bg-[#F7F8F9] border-4 border-white shadow-xl overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-6">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <label className="text-[10px] uppercase tracking-widest font-black text-gray-400 block mb-1">
                Category Name
              </label>
              <h2 className="text-3xl font-bold text-gray-800">
                {category.name}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-white border border-gray-100 rounded-2xl">
                <div className="flex items-center gap-3 text-orange-500 mb-2">
                  <Activity size={18} />
                  <span className="text-xs font-bold uppercase">Status</span>
                </div>
                <span
                  className={`px-4 py-1 rounded-full text-xs font-bold ${category.isActive ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}
                >
                  {category.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="p-5 bg-white border border-gray-100 rounded-2xl">
                <div className="flex items-center gap-3 text-blue-500 mb-2">
                  <Tag size={18} />
                  <span className="text-xs font-bold uppercase">Type</span>
                </div>
                <span className="text-gray-700 font-bold">Food Item</span>
              </div>
            </div>

            {category.dishes?.length > 0 && (
              <div className="p-5 bg-white border border-gray-100 rounded-2xl">
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
                  Dishes ({category.dishCount})
                </p>
                <div className="space-y-2">
                  {category.dishes.map((dish) => (
                    <div
                      key={dish.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-700 font-medium">
                        {dish.name}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500">₹{dish.price}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${dish.isAvailable ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}
                        >
                          {dish.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
