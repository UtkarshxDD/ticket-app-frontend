import React, { useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Link } from "react-router-dom";
import {
  Clock,
  CheckCircle,
  Activity,
  OctagonX,
  Check,
  AlertCircle,
  Send,
  ArrowLeft,
  Calendar,
  Tag,
  Flag,
  User,
  MessageSquare,
  Timer,
} from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL; 
const AllTickets = () => {
  const [tickets, setTickets] = React.useState([]);

  useEffect(() => {
    try {
      async function fetchTickets() {
        const res = await axios.get(
          `${API_URL}/api/v1/admin/dashboard/all-tickets`
        );
        setTickets(res.data.tickets);
      }
      fetchTickets();
    } catch (error) {
      console.error("Error fetching tickets:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch tickets"
      );
    }
  }, [setTickets]);
  // Status badge component
  const StatusBadge = ({ status }) => {
    let badgeClass = "";
    let icon = null;

    switch (status) {
      case "new":
        badgeClass = "bg-blue-100 text-blue-800";
        icon = <Clock className="w-3 h-3 mr-1" />;
        break;
      case "assigned":
        badgeClass = "bg-purple-100 text-purple-800";
        icon = <Clock className="w-3 h-3 mr-1" />;
        break;
      case "in_progress":
        badgeClass = "bg-yellow-100 text-yellow-800";
        icon = <Activity className="w-3 h-3 mr-1" />;
        break;
      case "resolved":
        badgeClass = "bg-green-100 text-green-800";
        icon = <CheckCircle className="w-3 h-3 mr-1" />;
        break;
      case "not_resolved":
        badgeClass = "bg-amber-100 text-amber-800";
        icon = <OctagonX className="w-3 h-3 mr-1" />;
        break;
      default:
        badgeClass = "bg-gray-100 text-gray-800";
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${badgeClass}`}
      >
        {icon}
        {status.replace("_", " ").charAt(0).toUpperCase() +
          status.replace("_", " ").slice(1)}
      </span>
    );
  };
  // Priority badge component
  const PriorityBadge = ({ priority }) => {
    let badgeClass = "";

    switch (priority) {
      case "low":
        badgeClass = "bg-pink-500/80 text-white";
        break;
      case "medium":
        badgeClass = "bg-yellow-500/80 text-white";
        break;
      case "high":
        badgeClass = "bg-orange-500/80 text-white";
        break;
      case "critical":
        badgeClass =
          "bg-red-500/80 text-white animate-pulse";
        break;
      default:
        badgeClass = "bg-green-500/80 text-white";
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${badgeClass}`}
      >
        <Flag className="w-4 h-4 mr-1" />
        {priority?.charAt(0).toUpperCase() +
          priority?.slice(1)}
      </span>
    );
  };
  return (
    <DashboardLayout pageTitle={"All Tickets"}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Tickets</h2>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-4 text-xs tracking-wider uppercase font-sans ">
                Ticket Title
              </th>
              <th className="px-4 py-4 text-xs font-sans uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-4 text-xs uppercase tracking-wider font-sans">
                Category
              </th>
              <th className="px-4 py-4 text-xs uppercase tracking-wider font-sans">
                Priority
              </th>
              <th className="px-4 py-4 text-xs uppercase tracking-wider font-sans">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center font-semibold text-gray-500 py-4"
                >
                  No tickets found.
                </td>
              </tr>
            )}
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="border-t border-gray-300 hover:bg-gray-50"
              >
                <td className="px-4 py-5">
                  <Link
                    to={`/tickets/${ticket._id}`}
                    className=" text-[#0F52BA]/70 hover:text-[#0F52BA]/90  text-md"
                  >
                    {ticket?.title}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={ticket?.status} />
                </td>
                <td className="px-4 py-3 text-gray-500 font-semibold">
                  {ticket.category}
                </td>
                {ticket?.status === "resolved" ? (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <PriorityBadge priority={"Neutral"} />
                  </td>
                ) : (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <PriorityBadge
                      priority={ticket?.priority.toLowerCase()}
                    />
                  </td>
                )}
                <td className="px-4 py-3 text-gray-500 font-semibold">
                  {new Date(
                    ticket.createdAt
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </DashboardLayout>
  );
};

export default AllTickets;
