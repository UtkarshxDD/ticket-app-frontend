import { useMemo } from "react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

import {
  CheckCircle,
  Clock,
  Activity,
  ArrowRight,
  AlertCircle,
  Send,
  ArrowLeft,
  Calendar,
  Tag,
  Flag,
  OctagonX,
  User,
  MessageSquare,
} from "lucide-react";
import { useTicketStore } from "../../store/ticketStore";

const AssignedTickets = () => {
  const [updating, setUpdating] = useState({
    id: null,
    action: null,
  });

  const {
    fetchAssignedTickets,
    assignedTickets,
    updateTicket,
    removeTicket,
  } = useTicketStore();
  const [updatingTicketId, setUpdatingTicketId] =
    useState(null);
  useEffect(() => {
    fetchAssignedTickets();
  }, [fetchAssignedTickets]);

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Update ticket status handler
  const handleUpdateStatus = async (id, status) => {
    setUpdatingTicketId(id);
    if (status === "not_resolved") {
      removeTicket(id);
    }
    setUpdating({ id, action: status });
    await updateTicket(id, { status });
    await fetchAssignedTickets();
    setUpdating({ id: null, action: null });
    setUpdatingTicketId(null);
  };

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
  // Group tickets by status

  const newAssignedTickets = useMemo(
    () =>
      assignedTickets.filter(
        (t) => t.status === "assigned"
      ),
    [assignedTickets]
  );
  const inProgressTickets = useMemo(
    () =>
      assignedTickets.filter(
        (t) => t.status === "in_progress"
      ),
    [assignedTickets]
  );
  const resolvedTickets = useMemo(
    () =>
      assignedTickets.filter(
        (t) => t.status === "resolved"
      ),
    [assignedTickets]
  );

  return (
    <DashboardLayout pageTitle="Engineer Dashboard">
      <div className="animate-fade-in">
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Your Assigned Tickets
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-4">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
                <h3 className="font-medium text-2xl text-gray-700">
                  New Assignments
                </h3>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                  {newAssignedTickets.length}
                </span>
              </div>

              {newAssignedTickets.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  No new assignments
                </p>
              ) : (
                <ul className="space-y-2">
                  {newAssignedTickets.map((ticket) => (
                    <li
                      key={`new-${ticket._id}`}
                      className="p-3 bg-gray-50 rounded-md"
                    >
                      <div className="text-sm font-medium mb-1">
                        <Link
                          to={`/tickets/${ticket._id}`}
                          className="text-[#5585CE] hover:text-[#5585CE]/90"
                        >
                          {ticket?.title}
                        </Link>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <span>
                          From: {ticket?.createdBy?.name}
                        </span>
                        <span>
                          <PriorityBadge
                            priority={ticket?.priority.toLowerCase()}
                          />
                        </span>
                      </div>
                      <button
                        disabled={
                          updatingTicketId === ticket._id
                        }
                        key={ticket._id}
                        onClick={() =>
                          handleUpdateStatus(
                            ticket._id,
                            "in_progress"
                          )
                        }
                        className="w-full text-sm text-white bg-[#5585CE] hover:bg-[#5585CE]/90 py-2 px-3 rounded-md inline-flex items-center justify-center"
                      >
                        {updatingTicketId === ticket._id
                          ? "Starting"
                          : "Start Working"}{" "}
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="card p-4">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
                <h3 className="font-medium text-2xl text-gray-700">
                  In Progress
                </h3>
                <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                  {inProgressTickets.length}
                </span>
              </div>

              {inProgressTickets.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  No tickets in progress
                </p>
              ) : (
                <ul className="space-y-2">
                  {inProgressTickets.map((ticket) => (
                    <li
                      key={`in_progress-${ticket._id}`}
                      className="p-3 bg-gray-50 rounded-md"
                    >
                      <div className="text-sm font-medium mb-1">
                        <Link
                          to={`/tickets/${ticket._id}`}
                          className="text-[#5585CE] hover:text-[#5585CE]/90"
                        >
                          {ticket?.title}
                        </Link>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <span>
                          From: {ticket?.createdBy?.name}
                        </span>
                        <span>
                          <PriorityBadge
                            priority={ticket?.priority.toLowerCase()}
                          />
                        </span>
                      </div>
                      <div className="flex items-center gap-2 justify-between text-sm text-gray-500 mb-3">
                        <button
                          disabled={
                            updatingTicketId === ticket._id
                          }
                          key={`resolved-${ticket._id}`}
                          onClick={() =>
                            handleUpdateStatus(
                              ticket._id,
                              "resolved"
                            )
                          }
                          className="w-full text-sm text-white bg-[#62D58D] hover:bg-[#62D58D]/90 py-2 px-3 rounded-md inline-flex items-center justify-center"
                        >
                          {updating.id === ticket._id &&
                          updating.action === "resolved"
                            ? "Resolving"
                            : "Mark as Resolved"}{" "}
                          <CheckCircle className="ml-1 h-3 w-3" />
                        </button>
                        <button
                          disabled={
                            updatingTicketId === ticket._id
                          }
                          key={`not_resolved-${ticket._id}`}
                          onClick={() =>
                            handleUpdateStatus(
                              ticket._id,
                              "not_resolved"
                            )
                          }
                          className="w-full text-sm text-white bg-red-500/80 hover:bg-red-500/90 py-2 px-3 rounded-md inline-flex items-center justify-center"
                        >
                          {updating.id === ticket._id &&
                          updating.action === "not_resolved"
                            ? "Updating"
                            : "Can't Resolved"}{" "}
                          <OctagonX className="ml-1 h-3 w-3" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="card p-4">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
                <h3 className="font-medium text-2xl text-gray-700">
                  Recently Resolved
                </h3>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                  {resolvedTickets.length}
                </span>
              </div>

              {resolvedTickets.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  No resolved tickets
                </p>
              ) : (
                <ul className="space-y-2">
                  {resolvedTickets
                    .slice(0, 5)
                    .map((ticket) => (
                      <li
                        key={`resolved-${ticket._id}`}
                        className="p-3 bg-gray-50 rounded-md"
                      >
                        <div className="text-sm font-medium mb-1">
                          <Link
                            to={`/tickets/${ticket._id}`}
                            className="text-[#5585CE] hover:text-[#5585CE]/90"
                          >
                            {ticket?.title}
                          </Link>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>
                            From: {ticket?.createdBy?.name}
                          </span>
                          <span>
                            {formatDate(ticket?.updatedAt)}
                          </span>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              All Assigned Tickets
            </h2>
          </div>

          {assignedTickets.length === 0 ? (
            <div className="p-8 text-center">
              <Clock className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No tickets assigned yet
              </h3>
              <p className="mt-2 text-gray-500">
                You don't have any tickets assigned to you
                at the moment.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Ticket Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Client
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Priority
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assignedTickets.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center text-gray-500 py-8"
                      >
                        No tickets assigned.
                      </td>
                    </tr>
                  ) : (
                    assignedTickets.map((ticket) => (
                      <tr
                        key={`all-${ticket._id}`}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link
                            to={`/tickets/${ticket._id}`}
                            className="text-[#5585CE] hover:text-[#5585CE]/90 "
                          >
                            {ticket?.title}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <StatusBadge
                            status={ticket?.status}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {ticket?.createdBy?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {ticket?.category}
                        </td>
                        {ticket?.status === "resolved" ? (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <PriorityBadge
                              priority={"Neutral"}
                            />
                          </td>
                        ) : (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <PriorityBadge
                              priority={ticket?.priority.toLowerCase()}
                            />
                          </td>
                        )}

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(ticket?.createdAt)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AssignedTickets;
