import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, X } from "lucide-react";

const AddDishes = () => {
  const navigate = useNavigate();

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

  /* Handle text fields */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((err) => ({ ...err, [name]: "" }));
    }
  };

  /* Handle image file */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setForm((f) => ({ ...f, image: file }));
    };
    reader.readAsDataURL(file);

    if (errors.image) {
      setErrors((err) => ({ ...err, image: "" }));
    }
  };

  const removeImage = () => {
    setPreview(null);
    setForm((f) => ({ ...f, image: null }));
  };

  /* Validation */
  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Dish name required hai";
    if (!form.price) errs.price = "Price zaroori hai";
    if (!form.category) errs.category = "Category select karein";
    if (!preview) errs.image = "Dish image upload karein";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    console.log("Dish Data submitted:", form);
    // categoryStore.add(form);
    // navigate("/dishes");
  };

  return (
    <div className="w-full h-full">
      <div className="bg-white min-h-[80vh] rounded-xl border border-gray-200 p-7 shadow-sm flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
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
            <h1 className="text-2xl font-bold text-gray-800">Add New Dish</h1>
            <p className="text-sm text-gray-500 mt-1">
              Create a new dish for your menu
            </p>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dish Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Dish Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Fresh Garden Salad"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors
                  ${errors.name ? "border-red-400 bg-red-50 focus:border-red-500" : "border-gray-300 bg-[#F7F8F9] focus:border-[#E23E08]"}`}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors bg-[#F7F8F9]
                  ${errors.category ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-[#E23E08]"}`}
              >
                <option value="">Select Category</option>
                <option value="Salad">Salad</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
              </select>
              {errors.category && (
                <p className="text-xs text-red-500 mt-1">{errors.category}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="300"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors
                  ${errors.price ? "border-red-400 bg-red-50 focus:border-red-500" : "border-gray-300 bg-[#F7F8F9] focus:border-[#E23E08]"}`}
              />
              {errors.price && (
                <p className="text-xs text-red-500 mt-1">{errors.price}</p>
              )}
            </div>

            {/* Prep Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Preparation Time
              </label>
              <input
                type="text"
                name="preparationTime"
                value={form.preparationTime}
                onChange={handleChange}
                placeholder="e.g. 10 mins"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-[#F7F8F9] text-sm outline-none focus:border-[#E23E08]"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Description
              </label>
              <textarea
                name="description"
                rows="2"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the dish..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-[#F7F8F9] text-sm outline-none focus:border-[#E23E08]"
              ></textarea>
            </div>

            {/* Ingredients & Dietary Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Ingredients
              </label>
              <input
                type="text"
                name="ingredients"
                value={form.ingredients}
                onChange={handleChange}
                placeholder="Lettuce, Tomato..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-[#F7F8F9] text-sm outline-none focus:border-[#E23E08]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Dietary Tags
              </label>
              <input
                type="text"
                name="dietaryTags"
                value={form.dietaryTags}
                onChange={handleChange}
                placeholder="Vegan, Gluten-free..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-[#F7F8F9] text-sm outline-none focus:border-[#E23E08]"
              />
            </div>

            {/* Image Upload Area */}
            <div className="md:col-span-2 mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dish Image <span className="text-red-500">*</span>
              </label>
              {preview ? (
                <div className="flex items-center gap-4">
                  <div className="relative w-28 h-28">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-xl border border-gray-200"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <label className="text-sm text-[#E23E08] underline cursor-pointer font-medium">
                    Change Image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              ) : (
                <label
                  className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-xl cursor-pointer transition-colors
                  ${errors.image ? "border-red-400 bg-red-50" : "border-gray-300 bg-[#F7F8F9] hover:border-[#E23E08] hover:bg-orange-50"}`}
                >
                  <Upload size={24} className="text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    Click to upload dish image
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
                <p className="text-xs text-red-500 mt-1">{errors.image}</p>
              )}
            </div>

            {/* Status Toggle */}
            <div className="flex items-center gap-2 md:col-span-2">
              <input
                type="checkbox"
                name="isAvailable"
                id="isAvailable"
                checked={form.isAvailable}
                onChange={handleChange}
                className="w-4 h-4 accent-[#E23E08] cursor-pointer"
              />
              <label
                htmlFor="isAvailable"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Mark as Available
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center items-center gap-4 pt-12 pb-4">
            <button
              type="submit"
              className="px-8 py-2.5 bg-[#E23E08] text-white text-sm font-medium rounded-lg hover:bg-[#c73507] transition-all active:scale-95 shadow-sm"
            >
              Save Dish
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-8 py-2.5 border border-gray-300 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDishes;
