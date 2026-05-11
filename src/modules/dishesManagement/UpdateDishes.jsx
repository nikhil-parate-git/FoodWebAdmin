import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Upload, X } from "lucide-react";
import {
  fetchDishById,
  updateDish,
  resetUpdateSuccess,
  fetchCategoriesDropdown,
  clearSelectedDish,
} from "../../redux/slices/dishes/dishSlice";
import Loader from "../../components/common/Loader";

const parseArrayField = (val) => {
  if (!val) return "";
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (trimmed.startsWith("[")) {
      try {
        val = JSON.parse(trimmed);
      } catch {
        return trimmed
          .replace(/^\[|\]$/g, "")
          .split(",")
          .map((s) => s.replace(/"/g, "").trim())
          .filter(Boolean)
          .join(", ");
      }
    } else {
      return trimmed;
    }
  }
  if (Array.isArray(val)) {
    return val
      .map((item) => {
        if (typeof item === "string") {
          return item.replace(/^\[?"?|"?\]?$/g, "").replace(/\\"/g, "").trim();
        }
        return String(item).trim();
      })
      .filter(Boolean)
      .join(", ");
  }
  return "";
};

const UpdateDishes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedDish, loading, updateSuccess, categories, categoryLoading } =
    useSelector((state) => state.dishes);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    isAvailable: true,
    ingredients: "",
    allergens: "",
    dietaryTags: "",
    preparationTime: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchDishById(id));
    dispatch(fetchCategoriesDropdown());
    return () => dispatch(clearSelectedDish());
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedDish) {
      const categoryId =
        selectedDish.category?._id ||
        selectedDish.category?.value ||
        selectedDish.category ||
        "";
      setForm({
        name: selectedDish.name || "",
        price: String(selectedDish.price ?? ""),
        description: selectedDish.description || "",
        category: categoryId,
        isAvailable: selectedDish.isAvailable ?? true,
        ingredients: parseArrayField(selectedDish.ingredients),
        allergens: parseArrayField(selectedDish.allergens),
        dietaryTags: parseArrayField(selectedDish.dietaryTags),
        preparationTime: selectedDish.preparationTime || "",
        image: null,
      });
      setPreview(selectedDish.image || null);
    }
  }, [selectedDish, categories]);

  useEffect(() => {
    if (updateSuccess) {
      dispatch(resetUpdateSuccess());
      navigate("/dishes");
    }
  }, [updateSuccess, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setForm((f) => ({ ...f, image: file }));
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Dish name is required";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      errs.price = "Enter a valid price";
    if (!form.category) errs.category = "Please select a category";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const formData = new FormData();
    formData.append("name", form.name.trim());
    formData.append("price", form.price);
    formData.append("description", form.description.trim());
    formData.append("category", form.category);
    formData.append("isAvailable", form.isAvailable);
    formData.append("preparationTime", form.preparationTime.trim());

    if (form.ingredients.trim()) {
      formData.append("ingredients", JSON.stringify(
        form.ingredients.split(",").map((s) => s.trim()).filter(Boolean)
      ));
    }
    if (form.dietaryTags.trim()) {
      formData.append("dietaryTags", JSON.stringify(
        form.dietaryTags.split(",").map((s) => s.trim()).filter(Boolean)
      ));
    }
    if (form.allergens.trim()) {
      formData.append("allergens", JSON.stringify(
        form.allergens.split(",").map((s) => s.trim()).filter(Boolean)
      ));
    }
    if (form.image) formData.append("image", form.image);

    dispatch(updateDish({ dishId: id, formData }));
  };

  return (
    // ✅ FIX: min-h-screen ensures bg covers full page height
    <div className="w-full min-h-screen">
      <div className="bg-white min-h-screen rounded-xl border border-gray-200 p-7 shadow-sm flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 cursor-pointer rounded-xl text-gray-400 hover:bg-gray-100 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Update Dish</h1>
            <p className="text-sm text-gray-500 mt-1">
              Modify details for{" "}
              <span className="text-[#E23E08] font-medium">{form.name}</span>
            </p>
          </div>
        </div>

        {loading && !selectedDish ? (
          <div className="flex-1 flex items-center justify-center py-20">
            <Loader />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Dish Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Dish Name <span className="text-red-500">*</span>
                </label>
                <input type="text" name="name" value={form.name} onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors
                    ${errors.name ? "border-red-400 bg-red-50" : "border-gray-300 bg-[#F7F8F9] focus:border-[#E23E08]"}`}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select name="category" value={form.category} onChange={handleChange}
                  disabled={categoryLoading}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors bg-[#F7F8F9]
                    ${errors.category ? "border-red-400" : "border-gray-300 focus:border-[#E23E08]"}`}
                >
                  <option value="">{categoryLoading ? "Loading categories…" : "Select Category"}</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
                {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
                {!categoryLoading && categories.length === 0 && (
                  <p className="text-xs text-amber-500 mt-1">No categories found.</p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input type="text" inputMode="numeric" pattern="[0-9]*" name="price"
                  value={form.price} onChange={handleChange} placeholder="300"
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors
                    ${errors.price ? "border-red-400 bg-red-50" : "border-gray-300 bg-[#F7F8F9] focus:border-[#E23E08]"}`}
                />
                {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
              </div>

              {/* Prep Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Preparation Time
                </label>
                <input type="text" name="preparationTime" value={form.preparationTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-[#F7F8F9] text-sm outline-none focus:border-[#E23E08]"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea name="description" rows="2" value={form.description} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-[#F7F8F9] text-sm outline-none focus:border-[#E23E08]"
                />
              </div>

              {/* Ingredients */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Ingredients <span className="text-gray-400 text-xs">(comma separated)</span>
                </label>
                <input type="text" name="ingredients" value={form.ingredients} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-[#F7F8F9] text-sm outline-none focus:border-[#E23E08]"
                />
              </div>

              {/* Dietary Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Dietary Tags <span className="text-gray-400 text-xs">(comma separated)</span>
                </label>
                <input type="text" name="dietaryTags" value={form.dietaryTags} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-[#F7F8F9] text-sm outline-none focus:border-[#E23E08]"
                />
              </div>

              {/* Allergens */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Allergens <span className="text-gray-400 text-xs">(comma separated)</span>
                </label>
                <input type="text" name="allergens" value={form.allergens} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-[#F7F8F9] text-sm outline-none focus:border-[#E23E08]"
                />
              </div>

              {/* Image */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Dish Image</label>
                {preview ? (
                  <div className="flex items-center gap-4">
                    <div className="relative w-28 h-28">
                      <img src={preview} alt="Preview"
                        className="w-full h-full object-cover rounded-xl border border-gray-200" />
                      <button type="button"
                        onClick={() => { setPreview(null); setForm((f) => ({ ...f, image: null })); }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <label className="text-sm text-[#E23E08] underline cursor-pointer font-medium">
                      Update Photo
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 bg-[#F7F8F9] rounded-xl cursor-pointer hover:border-[#E23E08] hover:bg-orange-50 transition-colors">
                    <Upload size={24} className="text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload image</p>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                )}
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2 md:col-span-2">
                <input type="checkbox" name="isAvailable" id="isAvailable"
                  checked={form.isAvailable} onChange={handleChange}
                  className="w-4 h-4 accent-[#E23E08] cursor-pointer"
                />
                <label htmlFor="isAvailable" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Still Available in Menu
                </label>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-10 pb-5">
              <button type="submit" disabled={loading}
                className="px-10 py-2.5 bg-[#E23E08] text-white text-sm font-medium rounded-lg hover:bg-[#c73507] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Update Dish"}
              </button>
              <button type="button" onClick={() => navigate(-1)}
                className="px-10 py-2.5 border border-gray-300 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateDishes;