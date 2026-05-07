import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, UploadCloud, ArrowLeft, Save } from "lucide-react";

const UpdateBanner = () => {
  const navigate = useNavigate();
  // Demo data: Real app mein ye data props ya API se aayega
  const [formData, setFormData] = useState({
    tag: "Fast Delivery",
    title: "Weekend Special Offer",
    description: "Enjoy your favorite meals with lightning fast delivery and 20% off on all weekend orders.",
  });
  const [imagePreview, setImagePreview] = useState("https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm min-h-screen border border-gray-100 font-sans">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
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
            <h1 className="text-2xl font-bold text-gray-600 tracking-tight">Update Banner</h1>
            <p className="text-[15px] text-gray-500 mt-1 font-medium">Modify the details of your promotional banner</p>
          </div>
        </div>
        
      </div>

      <hr className="border-gray-100 mb-10" />

      <form className="w-full mx-auto space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Inputs */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[15px] font-bold text-gray-700 ml-1">Banner Tag</label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData({...formData, tag: e.target.value})}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#F7F8F9] focus:border-[#E23E08] focus:ring-1 focus:ring-[#E23E08] outline-none transition-all font-medium text-gray-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[15px] font-bold text-gray-700 ml-1">Banner Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#F7F8F9] focus:border-[#E23E08] focus:ring-1 focus:ring-[#E23E08] outline-none transition-all font-medium text-gray-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[15px] font-bold text-gray-700 ml-1">Description</label>
              <textarea
                rows="4"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full p-4 rounded-xl border border-gray-200 bg-[#F7F8F9] focus:border-[#E23E08] focus:ring-1 focus:ring-[#E23E08] outline-none transition-all font-medium text-gray-700 resize-none"
              ></textarea>
            </div>
          </div>

          {/* Right: Image Update */}
          <div className="space-y-2">
            <label className="text-[15px] font-bold text-gray-700 ml-1">Update Banner Image</label>
            <div className="relative group border-2 border-dashed border-gray-200 rounded-2xl h-[280px] bg-[#F7F8F9] hover:border-[#E23E08] transition-all overflow-hidden">
              <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
              <div className="relative w-full h-full p-2">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center pointer-events-none">
                  <UploadCloud className="text-white mb-2" size={30} />
                  <p className="text-white font-bold text-sm">Click to Replace Image</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex items-center justify-end gap-4 border-t border-gray-100">
          <button type="button" onClick={() => navigate(-1)} className="px-8 py-3 rounded-xl border border-gray-200 text-gray-600 text-[15px] font-bold hover:bg-gray-50 transition-all cursor-pointer">
            Cancel
          </button>
          <button type="submit" className="flex items-center gap-2 px-10 py-3 rounded-xl bg-[#E23E08] text-white text-[15px] font-bold hover:bg-[#c73507] transition-all shadow-md cursor-pointer">
            <Save size={18} /> Update Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBanner;