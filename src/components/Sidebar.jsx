import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import {
  LayoutDashboard,
  TicketCheck,
  Users,
  Ticket,
  LogOut,
  PlusCircle,
  TicketPlus,
  TicketIcon,
  Tickets,
} from "lucide-react";

const Sidebar = ({ isOpen, isMobile, toggleSidebar }) => {
  const { user, userLogout, isLoggingOut } = useAuthStore();
  const currentUser = user;
  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
      isActive
        ? "bg-[#1E5DBE] text-white"
        : "text-gray-200 hover:bg-[#1E5DBE]/50"
    }`;

  return (
    <div
      className={`fixed inset-y-0 left-0 z-20 w-64 text-white transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        ${!isMobile && "md:translate-x-0"}
        bg-[#3E74C7]
      `}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-[#0F52BA]">
          <div className="flex items-center justify-center">
            <TicketCheck className="h-8 w-6 text-white" />
            <span className="ml-2 text-xl font-bold">
              Trackify
            </span>
          </div>
        </div>

        <div className="px-3 py-4 flex-1 overflow-y-auto">
          <nav className="space-y-1">
            {currentUser?.role === "admin" && (
              <>
                <NavLink
                  end
                  to="/admin/dashboard"
                  className={navLinkClass}
                  onClick={() =>
                    isMobile && toggleSidebar()
                  }
                >
                  <LayoutDashboard className="mr-3 h-5 w-5" />
                  Dashboard
                </NavLink>
                <NavLink
                  end
                  to="/admin/users"
                  className={navLinkClass}
                  onClick={() =>
                    isMobile && toggleSidebar()
                  }
                >
                  <Users className="mr-3 h-5 w-5" />
                  Users & Engineers
                </NavLink>
                <NavLink
                  end
                  to="/admin/all-tickets"
                  className={navLinkClass}
                  onClick={() =>
                    isMobile && toggleSidebar()
                  }
                >
                  <Tickets className="mr-3 h-5 w-5" />
                  All Tickets
                </NavLink>
              </>
            )}
            {currentUser?.role === "engineer" && (
              <>
                <NavLink
                  end
                  to="/dashboard"
                  className={navLinkClass}
                  onClick={() =>
                    isMobile && toggleSidebar()
                  }
                >
                  <LayoutDashboard className="mr-3 h-5 w-5" />
                  Dashboard
                </NavLink>
                <NavLink
                  to="/dashboard/assigned-tickets"
                  className={navLinkClass}
                  onClick={() =>
                    isMobile && toggleSidebar()
                  }
                >
                  <TicketIcon className="mr-3 h-5 w-5" />
                  Assigned Tickets
                </NavLink>
              </>
            )}

            {currentUser?.role === "user" && (
              <>
                <NavLink
                  end
                  to="/dashboard"
                  className={navLinkClass}
                  onClick={() =>
                    isMobile && toggleSidebar()
                  }
                >
                  <LayoutDashboard className="mr-3 h-5 w-5" />
                  Dashboard
                </NavLink>
                <NavLink
                  to="/dashboard/tickets/create"
                  end
                  className={navLinkClass}
                  onClick={() =>
                    isMobile && toggleSidebar()
                  }
                >
                  <PlusCircle className="mr-3 h-5 w-5" />
                  Create Ticket
                </NavLink>
                <NavLink
                  to="/dashboard/tickets"
                  end
                  className={navLinkClass}
                  onClick={() =>
                    isMobile && toggleSidebar()
                  }
                >
                  <Ticket className="mr-3 h-5 w-5" />
                  My Tickets
                </NavLink>
              </>
            )}
          </nav>
        </div>

        <div className="p-4 border-t border-[#0F52BA]">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-[#1E5DBE] flex items-center justify-center">
                {currentUser?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">
                {currentUser?.name}
              </p>
              <p className="text-sm font-semibold text-gray-300 capitalize">
                {currentUser?.role}
              </p>
            </div>
          </div>

          <button
            disabled={isLoggingOut}
            onClick={handleLogout}
            className="mt-3 w-full font-semibold flex items-center justify-center px-4 py-2 text-sm text-white bg-[#1E5DBE] rounded-md hover:bg-[#1E5DBE]/90 transition-colors"
          >
            <LogOut className="mr-2 h-4 w-4 " />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
