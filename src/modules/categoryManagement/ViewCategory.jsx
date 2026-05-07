import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { categoryStore } from "../../modules/categoryManagement/categoryStore";
import { getStatusColor } from "../../components/ui/DataTable";
import { ArrowLeft, Hash, Tag, Activity } from "lucide-react";

export default function ViewCategory() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [category, setCategory] = useState(null);

  useEffect(() => {
    const cat = categoryStore.getById(id);
    setCategory(cat || null);
  }, [id]);

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6">
        <div className="bg-gray-50 p-8 rounded-2xl">
          <p className="text-gray-500 font-medium">Category nahi mili.</p>
          <button
            onClick={() => navigate("/categories")}
            className="mt-4 flex items-center gap-2 text-[#E23E08] font-bold hover:underline mx-auto"
          >
            <ArrowLeft size={18} /> Wapas jao
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-2">
      <div className="bg-white h-full rounded-xl border border-gray-200 p-6 shadow-sm">
        
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-50">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl cursor-pointer text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all"
            aria-label="Go back"
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

          <div>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">Category Details</h1>
            <p className="text-sm text-gray-500 mt-0.5 font-medium">
              View and verify category information
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-10 max-w-4xl">
          
          {/* Left: Image Card */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-[#F7F8F9] p-4 rounded-2xl border border-gray-100 flex flex-col items-center">
              <img
                src={category.image}
                alt={category.name}
                className="w-48 h-48 rounded-xl object-cover shadow-md border-4 border-white"
              />
              <div className="mt-4 text-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Preview</span>
                <h2 className="text-lg font-bold text-gray-800 mt-1">{category.name}</h2>
              </div>
            </div>
          </div>

          {/* Right: Info List */}
          <div className="flex-1 space-y-5">
            <div className="grid grid-cols-1 gap-4">
              
              {/* ID Item */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg text-gray-400 shadow-sm">
                    <Hash size={18} />
                  </div>
                  <span className="text-sm font-semibold text-gray-500">Category ID</span>
                </div>
                <span className="text-sm font-mono font-bold text-gray-700 bg-white px-3 py-1 rounded-md border border-gray-200">
                  #{category.id}
                </span>
              </div>

              {/* Name Item */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg text-orange-500 shadow-sm">
                    <Tag size={18} />
                  </div>
                  <span className="text-sm font-semibold text-gray-500">Category Name</span>
                </div>
                <span className="text-base font-bold text-gray-800">
                  {category.name}
                </span>
              </div>

              {/* Status Item */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg text-blue-500 shadow-sm">
                    <Activity size={18} />
                  </div>
                  <span className="text-sm font-semibold text-gray-500">Current Status</span>
                </div>
                <span
                  className={`inline-flex items-center px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusColor(
                    category.status
                  )} shadow-sm`}
                >
                  {category.status}
                </span>
              </div>

            </div>

            {/* Bottom Note */}
            <div className="p-4 border-l-4 border-gray-200 bg-gray-50/50 rounded-r-xl">
              <p className="text-[12px] text-gray-500 leading-relaxed italic">
                Note: Yeh category menu aur customer-facing app par tabhi dikhegi jab iska status <b>"Active"</b> hoga.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}