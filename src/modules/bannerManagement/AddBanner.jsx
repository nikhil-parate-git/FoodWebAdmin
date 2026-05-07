import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, UploadCloud, ArrowLeft } from "lucide-react";

const AddBanner = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm min-h-screen border border-gray-100 font-sans">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Back Button added to the left of the title */}
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
            <h1 className="text-2xl font-bold text-gray-600 tracking-tight">
              Add New Banner
            </h1>
            <p className="text-[15px] text-gray-500 mt-1 font-medium">
              Create a new promotional banner for your app
            </p>
          </div>
        </div>
      </div>

      <hr className="border-gray-100 mb-10" />

      <form
        className="w-full mx-auto space-y-8"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side: Fields */}
          <div className="space-y-6">
            {/* Tag Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Banner Tag (e.g. Fast Delivery)
              </label>
              <input
                type="text"
                placeholder="Enter banner tag"
                className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#F7F8F9] focus:border-[#E23E08] focus:ring-1 focus:ring-[#E23E08] outline-none transition-all font-medium text-gray-700"
              />
            </div>

            {/* Title Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Banner Title
              </label>
              <input
                type="text"
                placeholder="Enter banner title"
                className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#F7F8F9] focus:border-[#E23E08] focus:ring-1 focus:ring-[#E23E08] outline-none transition-all font-medium text-gray-700"
              />
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">
                Description
              </label>
              <textarea
                placeholder="Enter banner description"
                rows="4"
                className="w-full p-4 rounded-xl border border-gray-200 bg-[#F7F8F9] focus:border-[#E23E08] focus:ring-1 focus:ring-[#E23E08] outline-none transition-all font-medium text-gray-700 resize-none"
              ></textarea>
            </div>
          </div>

          {/* Right Side: Image Upload */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Banner Image
            </label>
            <div className="relative group border-2 border-dashed border-gray-200 rounded-2xl h-[280px] bg-[#F7F8F9] hover:border-[#E23E08] transition-all overflow-hidden">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />

              {imagePreview ? (
                <div className="relative w-full h-full p-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <p className="text-white font-bold text-sm">Change Image</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full space-y-3">
                  <div className="p-4 bg-white rounded-full shadow-sm text-[#E23E08]">
                    <UploadCloud size={32} />
                  </div>
                  <div className="text-center px-4">
                    <p className="text-sm font-bold text-gray-700">
                      Click or drag to upload
                    </p>
                    <p className="text-xs text-gray-400 mt-1 font-medium">
                      Recommended size: 1200x400 (3:1)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-5 flex items-center justify-center gap-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-8 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50 transition-all active:scale-95 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-10 py-3 rounded-xl bg-[#E23E08] text-white text-sm font-bold hover:bg-[#c73507] transition-all active:scale-95 shadow-md shadow-orange-100 cursor-pointer"
          >
            Save Banner
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBanner;
