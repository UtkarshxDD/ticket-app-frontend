import React, { useEffect, useState, useRef } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  CheckCircle,
  Activity,
  OctagonX,
  AlertCircle,
  Send,
  ArrowLeft,
  Calendar,
  Tag,
  Flag,
  User,
  MessageSquare,
  TicketX,
  Loader,
} from "lucide-react";
import { useTicketStore } from "../store/ticketStore";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";
const TicketDetails = () => {
  const { user } = useAuthStore();
  const {
    addComment,
    deleteTicket,
    assignedTicket,
    updateTicketPriority,
  } = useTicketStore();
  const [commentText, setCommentText] = React.useState("");
  const { id } = useParams(); // 🔑 Get ticket ID from URL
  const [ticket, setTicket] = React.useState(null);
  const [engineer, setEngineer] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const navigate = useNavigate();
  const [engineers, setEngineers] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Scroll to the end when comments change
    if (scrollRef.current) {
      scrollRef.current.scrollTop =
        scrollRef.current.scrollHeight;
    }
  }, [comments]);
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
    const fetchTicket = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/v1/dashboard/tickets/${id}`
        ); // backend endpoint
        setTicket(response.data.ticket);
        setComments(response.data.ticket.comments || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  useEffect(() => {
    const fetchEngineer = async () => {
      try {
        const response = await axios.get(
          `/api/v1/dashboard/user/${ticket?.assignedTo}`
        ); // backend endpoint
        setEngineer(response.data.user.name);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEngineer();
  }, [ticket?.assignedTo]);
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

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };
  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const newComment = {
        text: commentText,
        commentedBy: user?.name,
      };
      await addComment(ticket._id, newComment);

      // Fetch updated ticket with comments
      const updatedTicket = await axios.get(
        `/api/v1/dashboard/tickets/${ticket._id}`
      );
      setComments(updatedTicket.data.ticket.comments || []);
      setCommentText("");
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };
  const handlePriorityChange = async (newPriority) => {
    try {
      const res = await updateTicketPriority(id, {
        priority: newPriority,
      });
      setTicket(res.data.ticket); // Now res is defined properly
      console.log("ticket", ticket);
    } catch (error) {
      toast.error("Failed to update priority", error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-white h-full">
          <Loader className="animate-spin text-[#1E90FF] size-10" />
        </div>
      </div>
    );
  }
  return (
    <DashboardLayout pageTitle={"Ticket Details"}>
      <div className=" bg-gray-50 min-h-screen ">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() =>
              navigate(
                user?.role === "engineer"
                  ? "/dashboard/assigned-tickets"
                  : user?.role === "admin"
                  ? "/admin/dashboard"
                  : "/dashboard/tickets"
              )
            }
            className="inline-flex mb-4 items-center text-lg   text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </button>
          {user?.role === "admin" && (
            <button
              onClick={() => {
                const confirmDelete = window.confirm(
                  "Are you sure you want to delete this ticket? This action cannot be undone."
                );
                if (confirmDelete) {
                  deleteTicket(ticket._id).then(() => {
                    navigate(
                      user?.role === "engineer"
                        ? "/dashboard/assigned-tickets"
                        : user?.role === "admin"
                        ? "/admin/dashboard"
                        : "/dashboard/tickets"
                    );
                  });
                }
              }}
              className="inline-flex mb-4 items-center text-lg   text-red-500 hover:text-red-400 cursor-pointer"
            >
              Delete Ticket
              <TicketX className="size-5 ml-1" />
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Ticket Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className=" md:text-2xl font-semibold text-gray-600 mb-2">
                      {ticket?.title}
                    </h1>
                    <div className="flex flex-wrap gap-2 md:mb-4">
                      <StatusBadge
                        status={ticket?.status}
                      />
                      {ticket?.status === "resolved" ? (
                        <PriorityBadge
                          priority={"Neutral"}
                        />
                      ) : (
                        <PriorityBadge
                          priority={ticket?.priority.toLowerCase()}
                        />
                      )}
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        <Tag className="w-4 h-4 mr-1" />
                        {ticket?.category}
                      </span>
                    </div>
                  </div>

                  {/* {isAssignedEngineer &&
                      ticket.status !== "resolved" && (
                        <button
                          onClick={() =>
                            handleStatusUpdate("resolved")
                          }
                          className="btn btn-success"
                        >
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Mark as Resolved
                        </button>
                      )}

                    {isAssignedEngineer &&
                      ticket.status === "assigned" && (
                        <button
                          onClick={() =>
                            handleStatusUpdate("in_progress")
                          }
                          className="btn btn-primary"
                        >
                          <Activity className="w-5 h-5 mr-2" />
                          Start Working
                        </button>
                      )} */}
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-line">
                      {ticket?.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <User className="w-4 h-4 mr-1" />
                    <span>
                      Created by:{" "}
                      <span className="font-semibold">
                        {ticket?.createdBy?.name ||
                          "Unknown"}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>
                      Created:{" "}
                      <span className="font-semibold text-gray-500">
                        {formatDate(ticket?.createdAt)}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Comments Section */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-lg font-semibold mb-4">
                Comments & Updates
              </h3>
              <div
                className="space-y-4 mb-4 max-h-60 overflow-y-auto pr-2"
                ref={scrollRef}
              >
                {comments.length === 0 && (
                  <div className="text-gray-500 text-sm">
                    No comments yet. Be the first to
                    comment!
                  </div>
                )}
                {comments.map((comment, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-gray-100 rounded-xl shadow-sm"
                  >
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-semibold">
                        {comment.commentedBy
                          ?.charAt(0)
                          .toUpperCase() || "U"}
                      </div>
                    </div>

                    {/* Comment Content */}
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-800">
                          {comment.commentedBy}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(
                            comment?.commentedAt ||
                              new Date()
                          )}
                        </span>
                      </div>
                      <p className="text-sm mt-1 text-gray-700 whitespace-pre-wrap">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-2">
                <textarea
                  className="flex-grow border rounded-lg p-2 text-sm"
                  placeholder="Add a comment or update..."
                  value={commentText}
                  onChange={(e) =>
                    setCommentText(e.target.value)
                  }
                ></textarea>

                <button
                  disabled={loading} // Button will be disabled when loading is true
                  onClick={handleComment}
                  className={`bg-[#5585CE] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#5585CE]/90 ${
                    loading ? " opacity-50" : ""
                  }`}
                >
                  {loading ? "Commenting" : "Add Comment"}
                </button>
              </div>
            </div>
          </div>

          {/* Ticket Info Sidebar */}
          <div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg  font-semibold text-gray-600">
                  Ticket Information
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="w-1/3 text-sm font-medium text-gray-500">
                      ID:
                    </span>
                    <span className="w-2/3 text-sm font-semibold text-gray-600">
                      {ticket?._id?.substring(0, 8)}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1/3 text-sm font-medium text-gray-500">
                      Status:
                    </span>
                    <span className="w-2/3">
                      <StatusBadge
                        status={ticket?.status}
                      />
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1/3 text-sm font-medium text-gray-500">
                      Priority:
                    </span>
                    <span className="w-2/3">
                      {ticket?.status === "resolved" ? (
                        <PriorityBadge priority="Neutral" />
                      ) : user?.role === "admin" ? (
                        <select
                          value={ticket?.priority}
                          onChange={(e) => {
                            const confirmDelete =
                              window.confirm(
                                "Are you sure you want to change the Priority?"
                              );
                            if (confirmDelete) {
                              handlePriorityChange(
                                e.target.value
                              );
                            }
                          }}
                          className="block border-gray-300 shadow-sm  rounded-lg p-1 text-sm w-2/3 focus:outline-none focus:shadow-md text-gray-600"
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">
                            Medium
                          </option>
                          <option value="High">High</option>
                          <option value="Critical">
                            Critical
                          </option>
                        </select>
                      ) : (
                        <PriorityBadge
                          priority={ticket?.priority.toLowerCase()}
                        />
                      )}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1/3 text-sm font-medium text-gray-500">
                      Category:
                    </span>
                    <span className="w-2/3 text-sm font-semibold text-gray-600">
                      {ticket?.category}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1/3 text-sm font-medium text-gray-500">
                      Created:
                    </span>
                    <span className="w-2/3 text-sm font-semibold text-gray-600">
                      {formatDate(ticket?.createdAt)}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1/3 text-sm font-medium text-gray-500">
                      Updated:
                    </span>
                    <span className="w-2/3 text-sm font-semibold text-gray-600">
                      {formatDate(ticket?.updatedAt)}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  People
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="w-1/3 text-sm font-medium text-gray-500">
                      Submitted by:
                    </span>
                    <span className="w-2/3 text-sm font-semibold text-gray-600">
                      {ticket?.createdBy?.name}
                    </span>
                  </li>
                  <li className="flex items-start">
                    {user?.role === "admin" &&
                      engineers.length > 0 && (
                        <>
                          <span className="w-1/3 pt-2 text-sm font-medium text-gray-500">
                            Assigned to:
                          </span>
                          <select
                            id="assignEngineer"
                            value={ticket?.assignedTo || ""}
                            onChange={async (e) => {
                              const confirmDelete =
                                window.confirm(
                                  "Are you sure you want to assign the ticket?"
                                );
                              if (confirmDelete) {
                                const engineerId =
                                  e.target.value;

                                if (!id) {
                                  console.error(
                                    "Ticket ID not available"
                                  );
                                  return;
                                }

                                try {
                                  await assignedTicket({
                                    id,
                                    engineerId,
                                  });
                                  const updated =
                                    await axios.get(
                                      `/api/v1/dashboard/tickets/${id}`
                                    );
                                  setTicket(
                                    updated.data.ticket
                                  );
                                } catch (err) {
                                  console.error(
                                    "Assign Ticket Error:",
                                    err
                                  );
                                }
                              }
                            }}
                            className="block border-gray-300 shadow-sm  rounded-lg p-2 text-sm w-2/3 focus:outline-none focus:shadow-md text-gray-600"
                          >
                            <option value="" disabled>
                              Select Engineer
                            </option>
                            {engineers.map((eng) => (
                              <option
                                key={eng._id}
                                value={eng._id}
                              >
                                {eng.name}
                              </option>
                            ))}
                          </select>
                        </>
                      )}
                    {user?.role === "engineer" ||
                      (user?.role === "user" && (
                        <>
                          <span className="w-1/3 text-sm font-medium text-gray-500">
                            Assigned to:
                          </span>
                          <span className="w-2/3 text-sm font-semibold text-gray-600">
                            {engineer || "Unassigned"}
                          </span>
                        </>
                      ))}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TicketDetails;
