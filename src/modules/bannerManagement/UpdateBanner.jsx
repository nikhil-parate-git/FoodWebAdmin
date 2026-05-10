import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UploadCloud, Save } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBannerById,
  updateBanner,
  clearSelectedBanner,
} from "../../redux/slices/banner/bannerSlice";
import Loader from "../../components/common/Loader";

const BASE_URL = "https://foodwebbe.onrender.com";

const UpdateBanner = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedBanner, loading, actionLoading } = useSelector(
    (state) => state.banner,
  );

  const [formData, setFormData] = useState({
    tag: "",
    title: "",
    description: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    dispatch(fetchBannerById(id));
    return () => dispatch(clearSelectedBanner());
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedBanner) {
      setFormData({
        tag: selectedBanner.bannerTag || "",
        title: selectedBanner.bannerTitle || "",
        description: selectedBanner.description || "",
      });
      setImagePreview(
        selectedBanner.image?.startsWith("http")
          ? selectedBanner.image
          : `${BASE_URL}${selectedBanner.image}`,
      );
    }
  }, [selectedBanner]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("bannerTag", formData.tag);
    data.append("bannerTitle", formData.title);
    data.append("description", formData.description);
    if (imageFile) data.append("image", imageFile);

    const result = await dispatch(updateBanner({ id, formData: data }));
    if (updateBanner.fulfilled.match(result)) {
      navigate(-1);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm min-h-screen border border-gray-100 font-sans flex flex-col">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
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
          <h1 className="text-2xl font-bold text-gray-600 tracking-tight">
            Update Banner
          </h1>
          <p className="text-[15px] text-gray-500 mt-1 font-medium">
            Modify the details of your promotional banner
          </p>
        </div>
      </div>

      <hr className="border-gray-100 mb-10" />

      {loading ? (
        <div className="flex-1 flex items-center justify-center py-20">
          <Loader />
        </div>
      ) : (
        <form className="w-full mx-auto space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Inputs */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[15px] font-bold text-gray-700 ml-1">
                  Banner Tag
                </label>
                <input
                  type="text"
                  value={formData.tag}
                  onChange={(e) =>
                    setFormData({ ...formData, tag: e.target.value })
                  }
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#F7F8F9] focus:border-[#E23E08] focus:ring-1 focus:ring-[#E23E08] outline-none transition-all font-medium text-gray-700"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[15px] font-bold text-gray-700 ml-1">
                  Banner Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#F7F8F9] focus:border-[#E23E08] focus:ring-1 focus:ring-[#E23E08] outline-none transition-all font-medium text-gray-700"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[15px] font-bold text-gray-700 ml-1">
                  Description
                </label>
                <textarea
                  rows="4"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full p-4 rounded-xl border border-gray-200 bg-[#F7F8F9] focus:border-[#E23E08] focus:ring-1 focus:ring-[#E23E08] outline-none transition-all font-medium text-gray-700 resize-none"
                />
              </div>
            </div>

            {/* Right: Image */}
            <div className="space-y-2">
              <label className="text-[15px] font-bold text-gray-700 ml-1">
                Update Banner Image
              </label>
              <div className="relative group border-2 border-dashed border-gray-200 rounded-2xl h-[280px] bg-[#F7F8F9] hover:border-[#E23E08] transition-all overflow-hidden">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                {imagePreview && (
                  <div className="relative w-full h-full p-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center pointer-events-none">
                      <UploadCloud className="text-white mb-2" size={30} />
                      <p className="text-white font-bold text-sm">
                        Click to Replace Image
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-6 flex items-center justify-center gap-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-8 py-3 rounded-xl border border-gray-200 text-gray-600 text-[15px] font-bold hover:bg-gray-50 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={actionLoading}
              className="flex items-center gap-2 px-10 py-3 rounded-xl bg-[#E23E08] text-white text-[15px] font-bold hover:bg-[#c73507] transition-all shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {actionLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />{" "}
                  Updating...
                </>
              ) : (
                <>
                  <Save size={18} /> Update Changes
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateBanner;
