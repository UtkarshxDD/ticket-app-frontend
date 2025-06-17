import React from "react";
import { Menu, Bell } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar, pageTitle }) => {
  const { user } = useAuthStore();
  const currentUser = user;
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="ml-2 md:ml-0 text-xl font-semibold text-gray-800">
            {pageTitle}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-1 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-error-500 ring-2 ring-white" />
            </button>
          </div>

          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <span className="hidden md:block mr-3 text-sm font-medium text-gray-700">
              {currentUser?.name}
            </span>
            <div className="h-8 w-8 rounded-full bg-[#1E5DBE] flex items-center justify-center text-white">
              {currentUser?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
