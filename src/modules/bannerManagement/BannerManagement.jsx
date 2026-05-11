import { useState, useEffect } from "react";
import {
  Eye, Edit, Trash2, Plus, Search,
  ChevronLeft, ChevronRight, Calendar, AlertTriangle, X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllBanners,
  deleteBanner,
} from "../../redux/slices/banner/bannerSlice";
import Loader from "../../components/common/Loader";

const BASE_URL = "https://foodwebbe.onrender.com";

// ─── Delete Confirmation Modal ────────────────────────────────────────────────
const DeleteModal = ({ banner, onConfirm, onCancel, loading }) => {
  if (!banner) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
            <AlertTriangle size={32} className="text-red-500" />
          </div>
        </div>

        {/* Text */}
        <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
          Delete Banner?
        </h2>
        <p className="text-gray-500 text-center text-sm mb-1">
          Kya aap sure hain? Yeh action undo nahi hoga.
        </p>
        <p className="text-center font-semibold text-gray-700 text-sm mb-6 bg-gray-50 rounded-xl py-2 px-4 border border-gray-100">
          "{banner.bannerTitle}"
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={16} /> Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const BannerManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { banners, loading, actionLoading, pagination } = useSelector(
    (state) => state.banner
  );

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null); // banner object to delete

  useEffect(() => {
    dispatch(fetchAllBanners({ page: currentPage, search }));
  }, [dispatch, currentPage, search]);

  const handleDeleteClick = (banner) => {
    setDeleteTarget(banner);
  };

  const handleDeleteConfirm = async () => {
    await dispatch(deleteBanner(deleteTarget._id));
    setDeleteTarget(null);
    dispatch(fetchAllBanners({ page: currentPage, search }));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const imageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN");

  const totalPages = pagination?.totalPages || 1;
  const totalBanners = pagination?.totalBanners || banners.length;

  return (
    <>
      {/* Delete Modal */}
      <DeleteModal
        banner={deleteTarget}
        loading={actionLoading}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      <div className="bg-white p-6 rounded-2xl shadow-sm min-h-screen border border-gray-100 flex flex-col font-sans">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
            Banner Management
          </h1>
          <p className="text-[15px] text-gray-500 mt-1 font-medium">
            Upload and manage promotional banners for your app
          </p>
        </div>

        <hr className="border-gray-100 mb-6" />

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <div className="flex items-center border border-gray-200 rounded-xl px-4 bg-[#F7F8F9] w-full max-w-sm h-12 focus-within:border-[#E23E08] transition-all">
            <Search size={18} className="text-[#E23E08] mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={handleSearch}
              className="bg-transparent outline-none text-sm w-full font-medium text-gray-700 placeholder:text-gray-400"
            />
          </div>
          <button
            onClick={() => navigate("/banner/add")}
            className="inline-flex cursor-pointer items-center gap-2 px-6 py-3 bg-[#E23E08] text-white text-sm font-semibold rounded-xl hover:bg-[#c73507] transition-all active:scale-95 shadow-sm"
          >
            <Plus size={18} /> Add New Banner
          </button>
        </div>

        {/* Table */}
        <div className="w-full border border-gray-100 rounded-2xl overflow-hidden bg-white flex-1">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-[#E8D5C4]/40">
                <tr>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-gray-600 w-[80px]">
                    Sr.No.
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-gray-600">
                    Banner Image
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-gray-600">
                    Title
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-gray-600">
                    Created Date
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-gray-600 w-[180px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="py-20">
                      <div className="flex items-center justify-center">
                        <Loader />
                      </div>
                    </td>
                  </tr>
                ) : banners.length > 0 ? (
                  banners.map((banner, index) => (
                    <tr
                      key={banner._id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-4 py-5 text-center text-sm font-medium text-gray-400">
                        {(currentPage - 1) * (pagination?.bannersPerPage || 10) + index + 1}
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex justify-center">
                          <div className="w-36 h-20 rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
                            <img
                              src={imageUrl(banner.image)}
                              alt={banner.bannerTitle}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.style.display = "none";
                                e.target.parentNode.innerHTML = `
                                  <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f9fafb;color:#9ca3af;font-size:11px;font-weight:500;">
                                    No Image
                                  </div>`;
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-5 text-center">
                        <span className="text-[15px] font-medium text-gray-800 tracking-tight">
                          {banner.bannerTitle}
                        </span>
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex items-center justify-center gap-2 text-gray-600">
                          <Calendar size={14} className="text-gray-400" />
                          <span className="text-sm font-medium">
                            {formatDate(banner.createdAt)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex justify-center gap-1">
                          <button
                            onClick={() => navigate(`/banner/view/${banner._id}`)}
                            className="p-1.5 cursor-pointer rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            <Eye size={20} />
                          </button>
                          <button
                            onClick={() => navigate(`/banner/update/${banner._id}`)}
                            className="p-1.5 cursor-pointer rounded-lg text-amber-600 hover:bg-amber-50 transition-colors"
                          >
                            <Edit size={20} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(banner)}
                            className="p-1.5 cursor-pointer rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-20 text-center text-gray-400 font-medium italic"
                    >
                      No banners found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 0 && (
          <div className="flex items-center justify-between mt-8 px-2">
            <p className="text-sm font-medium text-gray-500">
              Showing{" "}
              <span className="text-gray-900 font-semibold">
                {banners.length}
              </span>{" "}
              of{" "}
              <span className="text-gray-900 font-semibold">
                {totalBanners}
              </span>{" "}
              entries
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={!pagination?.hasPrevPage}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:text-[#E23E08] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                      currentPage === i + 1
                        ? "bg-[#E23E08] text-white shadow-md shadow-orange-100"
                        : "bg-white border border-gray-200 text-gray-600 hover:border-[#E23E08]"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                disabled={!pagination?.hasNextPage}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:text-[#E23E08] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BannerManagement;