import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useAuthStore } from "../store/authStore";

const Profile = () => {
  const { user } = useAuthStore();
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user?.role) {
      setRole(user.role);
    }
  }, [user?.role]);

  const currentUser = user;

  return (
    <DashboardLayout pageTitle="Profile">
      <div className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-[#1E5DBE] flex items-center justify-center text-white text-xl font-bold">
            {currentUser?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{currentUser?.name}</h2>
            <p className="text-gray-600">{currentUser?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-gray-500 text-sm">Role</h4>
            <p className="text-lg">{role}</p>
          </div>
          <div>
            <h4 className="text-gray-500 text-sm">Phone</h4>
            <p className="text-lg">{currentUser?.phone || "Not provided"}</p>
          </div>
          <div>
            <h4 className="text-gray-500 text-sm">Joined On</h4>
            <p className="text-lg">
              {currentUser?.createdAt
                ? new Date(currentUser.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
