import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  TicketCheck,
  Clock,
  AlertTriangle,
  CheckCircle,
  OctagonX,
  Activity,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const TicketDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [engineers, setEngineers] = useState([]);

  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        const res = await axios.get(
          "/api/v1/admin/dashboard/all-engineers"
        );
        setEngineers(res.data.engineers);
      } catch (error) {
        console.error("Error fetching engineers:", error);
        toast.error(
          error.response?.data?.message ||
            "Failed to fetch engineers"
        );
      }
    };
    fetchEngineers();
  }, []);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const res = await axios.get(
          "/api/v1/admin/dashboard/all-tickets"
        );
        setTickets(res.data.tickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        toast.error(
          error.response?.data?.message ||
            "Failed to fetch tickets"
        );
      }
    }
    fetchTickets();
  }, []);

  // Recent tickets to display on dashboard
  const recentTickets = [...tickets]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  // Status badge component
  const StatusBadge = ({ status }) => {
    if (!status) return null; // or a default UI
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
        {status?.replace("_", " ").charAt(0).toUpperCase() +
          status?.replace("_", " ").slice(1)}
      </span>
    );
  };
  console.log("Tickets:", engineers);
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {/* Total Tickets Card */}
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-800">
              <TicketCheck className="h-6 w-6  p-" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">
                Total Tickets
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {tickets?.length}
              </p>
            </div>
          </div>
        </div>

        {/* New Tickets Card */}
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-800">
              <Clock className="h-6 w-6" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">
                New Tickets
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {
                  tickets?.filter(
                    (ticket) => ticket.status === "new"
                  ).length
                }
              </p>
            </div>
          </div>
        </div>

        {/* In Progress Card */}
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-800">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">
                In Progress
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {
                  tickets?.filter(
                    (ticket) =>
                      ticket.status === "in_progress"
                  ).length
                }
              </p>
            </div>
          </div>
        </div>

        {/* Resolved Card */}
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-800">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">
                Resolved
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {
                  tickets?.filter(
                    (ticket) => ticket.status === "resolved"
                  ).length
                }
              </p>
            </div>
          </div>
        </div>
        {/* Not Resolved Card */}
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-200 text-amber-900">
              <OctagonX className="h-6 w-6" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">
                Not Resolved
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {
                  tickets?.filter(
                    (ticket) =>
                      ticket.status === "not_resolved"
                  ).length
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tickets */}
        <div className="card lg:col-span-2">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Recent Tickets
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Client
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Assigned To
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTickets?.length > 0 ? (
                  recentTickets?.map((ticket) => (
                    <tr
                      key={ticket._id}
                      className="border-t border-gray-300 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          to={`/tickets/${ticket._id}`}
                          className="text-[#0F52BA]/70 hover:text-[#0F52BA]/90"
                        >
                          {ticket?.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <StatusBadge
                          status={ticket.status}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ticket?.createdBy?.name ||
                          "Unknown Client"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ticket?.assignedTo?.name ||
                          "Unassigned"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(
                          ticket.createdAt
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-t border-gray-300 hover:bg-gray-50">
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No tickets found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <Link
              to="/admin/all-tickets"
              className="text-sm font-semibold text-[#0F52BA]/70 hover:text-[#0F52BA]/90"
            >
              View all tickets
            </Link>
          </div>
        </div>

        {/* Engineers Overview */}
        <div className="card pb-5 sm:pb-0">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Engineers Overview
            </h2>
          </div>
          <div className="p-6">
            <ul className="divide-y divide-gray-200">
              {engineers.length > 0 ? (
                engineers.map((engineer) => {
                  const assignedTickets = tickets.filter(
                    (ticket) =>
                      ticket.assignedTo?._id ===
                      engineer._id
                  );

                  return (
                    <li
                      key={engineer._id}
                      className="py-4 first:pt-0 last:pb-0"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {engineer.name}
                          </p>
                          <p className="text-xs font-medium text-gray-500">
                            {engineer.specialization ||
                              "General Support"}
                          </p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {assignedTickets.length} tickets
                        </div>
                      </div>
                    </li>
                  );
                })
              ) : (
                <li className="py-4 text-center text-sm text-gray-500">
                  No engineers available
                </li>
              )}
            </ul>
          </div>

          <Link
            to="/admin/users"
            className="text-sm  font-semibold text-[#0F52BA]/70 hover:text-[#0F52BA]/90"
          >
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
              Manage engineers
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketDashboard;
