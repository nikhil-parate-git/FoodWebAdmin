import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Mail,
  Phone,
  User,
  ShoppingBag,
  IndianRupee,
  Calendar,
} from "lucide-react";
import {
  getCustomerDetails,
  clearCustomerDetails,
} from "../../redux/slices/customer/detailsSlice";
import Loader from "../../components/common/Loader";

const CustomerView = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { customer, loading } = useSelector((state) => state.customerDetails);

  useEffect(() => {
    if (id) {
      dispatch(getCustomerDetails(id));
    }
    return () => dispatch(clearCustomerDetails());
  }, [dispatch, id]);

  const data = customer || state || {};

  return (
    <div className="bg-white rounded-lg h-full p-5 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5 shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl cursor-pointer text-gray-400 hover:bg-white hover:text-gray-700 hover:shadow-sm transition-all"
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
          <h1 className="text-2xl font-bold">Customer Details</h1>
          <p className="text-sm text-gray-500 mt-1">
            View customer profile and activity
          </p>
        </div>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex gap-5 items-start flex-wrap animate-in fade-in duration-500">
          <div className="flex-1 flex flex-col gap-4 min-w-[280px]">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-gray-200 p-4 flex justify-between items-center">
                <div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium">
                    Total Orders
                  </p>
                  <p className="text-3xl font-bold mt-1">
                    {data.totalOrders ?? 0}
                  </p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <ShoppingBag size={20} className="text-blue-500" />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-4 flex justify-between items-center">
                <div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium">
                    Total Spent
                  </p>
                  <p className="text-3xl font-bold mt-1 flex items-center gap-0.5">
                    <IndianRupee size={20} strokeWidth={2.5} />
                    {data.totalSpent ?? 0}
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <IndianRupee size={20} className="text-green-600" />
                </div>
              </div>
            </div>

            {/* Personal Info Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-base font-semibold">Personal information</h3>
              <p className="text-xs text-gray-400 mb-5">
                Basic contact details of this customer
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1 text-xs text-gray-500 mb-1.5">
                    <User size={12} /> Full name
                  </label>
                  <div className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 font-medium">
                    {data.name || "—"}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-1 text-xs text-gray-500 mb-1.5">
                    <Mail size={12} /> Email address
                  </label>
                  <div className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50">
                    {data.email || "—"}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-1 text-xs text-gray-500 mb-1.5">
                    <Phone size={12} /> Phone number
                  </label>
                  <div className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50">
                    {data.phone || "—"}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-1 text-xs text-gray-500 mb-1.5">
                    <User size={12} /> Gender
                  </label>
                  <div className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 capitalize">
                    {data.gender || "—"}
                  </div>
                </div>

                <div className="col-span-2 flex justify-between items-center border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50 text-sm">
                  <span className="flex items-center gap-1 text-gray-500">
                    <Calendar size={12} /> Member Since
                  </span>
                  <span className="font-medium text-gray-800">
                    {data.createdAt
                      ? new Date(data.createdAt).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerView;