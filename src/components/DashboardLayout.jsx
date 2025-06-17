import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children, pageTitle }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const overlay = isSidebarOpen ? (
    <div
      className="fixed inset-0 bg-black/40 bg-opacity-50 z-10 md:hidden"
      onClick={toggleSidebar}
    />
  ) : null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar for mobile (only visible on small screens) */}
      <div className="md:hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          isMobile={true}
          toggleSidebar={toggleSidebar}
        />
      </div>

      {/* Sidebar for desktop (always visible on md+ screens) */}
      <div className="hidden md:block">
        <Sidebar
          isOpen={true}
          isMobile={false}
          toggleSidebar={toggleSidebar}
        />
      </div>

      {/* Overlay for mobile */}
      {overlay}

      <div className="flex flex-col flex-1 md:ml-64">
        <Header toggleSidebar={toggleSidebar} pageTitle={pageTitle} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
