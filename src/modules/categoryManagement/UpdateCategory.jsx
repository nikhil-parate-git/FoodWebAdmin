import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Upload, X, Save } from "lucide-react";
import {
  fetchCategoryById,
  updateCategory,
  clearSelectedCategory,
} from "../../redux/slices/category/viewCategorySlice";
import Loader from "../../components/common/Loader";

export default function UpdateCategory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { selectedCategory, detailLoading, detailError, actionLoading } =
    useSelector((state) => state.viewcategory);

  const [form, setForm] = useState({ name: "", isActive: true });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchCategoryById(id));
    return () => dispatch(clearSelectedCategory());
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      setForm({
        name: selectedCategory.name || "",
        isActive: selectedCategory.isActive ?? true,
      });
      setPreview(selectedCategory.image || null);
      setImageFile(null);
    }
  }, [selectedCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
    if (errors.image) setErrors((e) => ({ ...e, image: "" }));
  };

  const removeImage = () => {
    setPreview(null);
    setImageFile(null);
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Category name required hai";
    if (!preview) errs.image = "Image required hai";
    return errs;
  };

  const handleUpdate = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("isActive", form.isActive);
    if (imageFile) formData.append("image", imageFile);
    const result = await dispatch(updateCategory({ id, formData }));
    if (updateCategory.fulfilled.match(result)) navigate(-1);
  };

  // ── Page load hote waqt loader (data fetch) ──
  if (detailLoading) {
    return (
      <div className="w-full h-full">
        <div className="bg-white h-full rounded-xl border border-gray-200 p-7 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-8">
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
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Update Category
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Yahan se category ki details modify karein
              </p>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center py-20">
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  // ── Not found ──
  if (detailError || (!detailLoading && !selectedCategory)) {
    return (
      <div className="w-full h-full">
        <div className="bg-white min-h-[80vh] rounded-xl border border-gray-200 p-7 shadow-sm flex flex-col items-center justify-center">
          <p className="text-gray-600 font-medium">
            Category nahi mili. ID: {id}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-[#E23E08] font-bold hover:underline"
          >
            ← Wapas jao
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <div className="bg-white min-h-[80vh] rounded-xl border border-gray-200 p-7 shadow-sm flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-50">
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
          <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
              Update Category
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Yahan se category ki details modify karein
            </p>
          </div>
        </div>

        {/* Form Body */}
        <div className="flex-1 max-w-3xl">
          <div className="grid grid-cols-1 gap-8">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Italian Cuisine"
                className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all
                  ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 bg-[#F7F8F9] focus:border-[#E23E08]"}`}
              />
              {errors.name && (
                <p className="text-xs text-red-500 font-medium ml-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Image */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">
                Category Image <span className="text-red-500">*</span>
              </label>
              {preview ? (
                <div className="flex items-start gap-6 p-4 border border-gray-100 rounded-2xl bg-gray-50/50">
                  <div className="relative group">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-2xl shadow-md border-2 border-white"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-white text-red-500 shadow-lg rounded-full p-1.5 hover:bg-red-50 transition-colors border border-gray-100"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 justify-center h-32">
                    <p className="text-xs text-gray-500 italic">
                      Image quality achi rakhein (PNG/JPG)
                    </p>
                    <label className="w-fit px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-[#E23E08] font-bold cursor-pointer hover:bg-orange-50 transition-colors shadow-sm">
                      Change image
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <label
                  className={`flex flex-col items-center justify-center w-full h-44 border-2 border-dashed rounded-2xl cursor-pointer transition-all
                  ${errors.image ? "border-red-400 bg-red-50" : "border-gray-200 bg-[#F7F8F9] hover:border-[#E23E08] hover:bg-orange-50/50"}`}
                >
                  <div className="bg-white p-3 rounded-full shadow-sm mb-3 text-gray-400">
                    <Upload size={28} />
                  </div>
                  <p className="text-sm font-semibold text-gray-700">
                    Click karke image upload karo
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Maximum size: 2MB
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
              {errors.image && (
                <p className="text-xs text-red-500 font-medium ml-1">
                  {errors.image}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 pt-10 border-t border-gray-50 mt-10">
          <button
            onClick={handleUpdate}
            disabled={actionLoading}
            className="flex items-center gap-2 px-10 py-3 bg-[#E23E08] text-white text-sm font-bold rounded-xl hover:bg-[#c73507] transition-all active:scale-95 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {actionLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save size={18} /> Update Category
              </>
            )}
          </button>
          <button
            onClick={() => navigate(-1)}
            disabled={actionLoading}
            className="px-10 py-3 border border-gray-200 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-50 transition-all cursor-pointer disabled:opacity-60"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
