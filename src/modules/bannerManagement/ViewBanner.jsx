import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Tag, Type, AlignLeft } from "lucide-react";

const ViewBanner = () => {
  const navigate = useNavigate();
  // Demo data
  const banner = {
    tag: "Fast Delivery",
    title: "Weekend Special Offer",
    description:
      "Enjoy your favorite meals with lightning fast delivery and 20% off on all weekend orders. Valid for all users across the city.",
    date: "2024-03-18",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800",
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
            <h1 className="text-2xl font-bold text-gray-600 tracking-tight">
              Banner Details
            </h1>
            <p className="text-[15px] text-gray-500 mt-1 font-medium">
              Viewing details for "{banner.title}"
            </p>
          </div>
        </div>
      </div>

      <hr className="border-gray-100 mb-10" />

      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left: Banner Preview (Large) */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-lg h-[350px]">
                <img
                  src={banner.image}
                  alt="Banner"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: Information Card */}
          <div className="lg:col-span-2 space-y-8 bg-[#F7F8F9] p-8 rounded-3xl border border-gray-50">
            <div className="space-y-6">
              {/* Tag Detail */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-white rounded-lg shadow-sm text-[#E23E08]">
                  <Tag size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">
                    Tag
                  </p>
                  <p className="text-[16px] font-semibold text-gray-800">
                    {banner.tag}
                  </p>
                </div>
              </div>

              {/* Title Detail */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-white rounded-lg shadow-sm text-[#E23E08]">
                  <Type size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">
                    Banner Title
                  </p>
                  <p className="text-[16px] font-semibold text-gray-800">
                    {banner.title}
                  </p>
                </div>
              </div>

              {/* Date Detail */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-white rounded-lg shadow-sm text-[#E23E08]">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">
                    Created On
                  </p>
                  <p className="text-[16px] font-semibold text-gray-800">
                    {banner.date}
                  </p>
                </div>
              </div>

              {/* Description Detail */}
              <div className="flex items-start gap-4 pt-2">
                <div className="p-2.5 bg-white rounded-lg shadow-sm text-[#E23E08]">
                  <AlignLeft size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">
                    Full Description
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
    </div>
  );
};

export default ViewBanner;
