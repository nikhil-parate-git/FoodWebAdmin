

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../redux/slices/profile/profileSlice';
import { Mail, Phone, Calendar, ArrowLeft } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import Loader from '../common/Loader'; // Aapka custom loader

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminData, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <div className="p-6 bg-white rounded-lg min-h-screen">
      <div className="w-full mx-auto">
        
        {/* Fixed Header Section: Ye loading ke waqt bhi dikhega */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 hover:bg-gray-100 cursor-pointer rounded-full transition-colors border border-gray-200 shadow-sm group"
            title="Go Back"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600 group-hover:text-[#E8431A]" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Admin Profile</h1>
        </div>

        {/* Content Area */}
        {loading ? (
          /* Loader: Card ki jagah center mein dikhega */
          <div className="flex items-center justify-center min-h-[400px] w-full">
            <Loader />
          </div>
        ) : (
          /* Profile Card: Data aane ke baad ye dikhega */
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ">
            {/* Header Card Section */}
            <div className="bg-[#E8431A] p-8 text-white flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold border-4 border-white/30">
                {adminData?.name?.charAt(0).toUpperCase() || 'N'}
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold">{adminData?.name || "Nikhil Parate"}</h2>
                
              </div>
            </div>

            {/* Details Section */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-50 rounded-lg text-[#E8431A]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Email Address</p>
                    <p className="text-gray-800 font-semibold">{adminData?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-50 rounded-lg text-[#E8431A]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Phone Number</p>
                    <p className="text-gray-800 font-semibold">{adminData?.phone || "7083579237"}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-50 rounded-lg text-[#E8431A]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Account Created</p>
                    <p className="text-gray-800 font-semibold">
                      {adminData?.createdAt ? new Date(adminData.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      }) : "8 May 2026"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;