import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, X } from "lucide-react";
import { categoryStore } from "../../modules/categoryManagement/categoryStore";

export default function AddCategory() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    image: "",
    status: "active",
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  /* Handle text fields */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((f) => ({
      ...f,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((e) => ({
        ...e,
        [name]: "",
      }));
    }
  };

  /* Handle image file */
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);

      setForm((f) => ({
        ...f,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);

    if (errors.image) {
      setErrors((e) => ({
        ...e,
        image: "",
      }));
    }
  };

  /* Remove image */
  const removeImage = () => {
    setPreview(null);

    setForm((f) => ({
      ...f,
      image: "",
    }));
  };

  /* Validation */
  const validate = () => {
    const errs = {};

    if (!form.name.trim()) {
      errs.name = "Category name required hai";
    }

    if (!form.image) {
      errs.image = "Image select karo";
    }

    return errs;
  };

  /* Submit */
  const handleAdd = () => {
    const errs = validate();

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    categoryStore.add(form);

    navigate("/categories");
  };

  return (
    <div className="w-full h-full">
      <div className="bg-white min-h-[80vh] rounded-xl border border-gray-200 p-7 shadow-sm flex flex-col">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          
          {/* Back Button */}
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

          {/* Heading */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Add Category
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Create a new category
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          
          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Category Name <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Electronics"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors
                ${
                  errors.name
                    ? "border-red-400 bg-red-50 focus:border-red-500"
                    : "border-gray-300 bg-[#F7F8F9] focus:border-[#E23E08]"
                }`}
            />

            {errors.name && (
              <p className="text-xs text-red-500 mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Image <span className="text-red-500">*</span>
            </label>

            {preview ? (
              <div className="flex items-center gap-4">
                
                {/* Preview */}
                <div className="relative w-28 h-28">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-xl border border-gray-200"
                  />

                  <button
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Change Image */}
                <label className="text-sm text-[#E23E08] underline cursor-pointer hover:text-[#c73507]">
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
                  ${
                    errors.image
                      ? "border-red-400 bg-red-50"
                      : "border-gray-300 bg-[#F7F8F9] hover:border-[#E23E08] hover:bg-orange-50"
                  }`}
              >
                <Upload
                  size={24}
                  className="text-gray-400 mb-2"
                />

                <p className="text-sm text-gray-500">
                  Click karke image upload karo
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG up to 5MB
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
              <p className="text-xs text-red-500 mt-1">
                {errors.image}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Center Buttons */}
        <div className="flex justify-center items-end gap-4 pt-16">
          <button
            onClick={handleAdd}
            className="px-6 py-2.5 cursor-pointer bg-[#E23E08] text-white text-sm font-medium rounded-lg hover:bg-[#c73507] transition-colors"
          >
            Add Category
          </button>

          <button
            onClick={() => navigate("/category")}
            className="px-6 py-2.5 cursor-pointer border border-gray-300 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}