import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, Tag, Type, AlignLeft, ChevronLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBannerById,
  clearSelectedBanner,
} from "../../redux/slices/banner/bannerSlice";
import Loader from "../../components/common/Loader";

const BASE_URL = "https://foodwebbe.onrender.com";

const ViewBanner = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedBanner: banner, loading } = useSelector(
    (state) => state.banner
  );

  useEffect(() => {
    dispatch(fetchBannerById(id));
    return () => dispatch(clearSelectedBanner());
  }, [dispatch, id]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN");

  const imageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm min-h-screen border border-gray-100 font-sans flex flex-col">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl cursor-pointer text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-600 tracking-tight">
            Banner Details
          </h1>
          <p className="text-[15px] text-gray-500 mt-1 font-medium">
            {banner
              ? `Viewing details for "${banner.bannerTitle}"`
              : "Loading..."}
          </p>
        </div>
      </div>

      <hr className="border-gray-100 mb-10" />

      {loading ? (
        <div className="flex-1 flex items-center justify-center py-20">
          <Loader />
        </div>
      ) : banner ? (
        <div className="w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left: Banner Image — Full Cover */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-lg w-full bg-gray-50">
                <img
                  src={imageUrl(banner.image)}
                  alt={banner.bannerTitle}
                  className="w-full h-auto object-contain max-h-[500px]"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/800x400?text=Image+Not+Found";
                  }}
                />
              </div>
            </div>

            {/* Right: Info */}
            <div className="lg:col-span-2 space-y-8 bg-[#F7F8F9] p-8 rounded-3xl border border-gray-50">
              <div className="space-y-6">
                {/* Tag */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-white rounded-lg shadow-sm text-[#E23E08]">
                    <Tag size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Tag
                    </p>
                    <p className="text-[16px] font-semibold text-gray-800 mt-0.5">
                      {banner.bannerTag}
                    </p>
                  </div>
                </div>

                {/* Title */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-white rounded-lg shadow-sm text-[#E23E08]">
                    <Type size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Banner Title
                    </p>
                    <p className="text-[16px] font-semibold text-gray-800 mt-0.5">
                      {banner.bannerTitle}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-white rounded-lg shadow-sm text-[#E23E08]">
                    <span className="block w-5 h-5 flex items-center justify-center">
                      <span
                        className={`inline-block w-2.5 h-2.5 rounded-full ${
                          banner.isActive ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Status
                    </p>
                    <span
                      className={`inline-flex items-center gap-1.5 mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        banner.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          banner.isActive ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                      {banner.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                {/* Created On */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-white rounded-lg shadow-sm text-[#E23E08]">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Created On
                    </p>
                    <p className="text-[16px] font-semibold text-gray-800 mt-0.5">
                      {formatDate(banner.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="flex items-start gap-4 pt-2">
                  <div className="p-2.5 bg-white rounded-lg shadow-sm text-[#E23E08]">
                    <AlignLeft size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Description
                    </p>
                    <p className="text-[15px] font-medium text-gray-600 leading-relaxed mt-1 italic">
                      "{banner.description}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ViewBanner;