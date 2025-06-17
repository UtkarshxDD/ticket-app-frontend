import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useTicketStore = create((set) => ({
  tickets: [],
  assignedTickets: [],
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  isFetching: false,
  addComment: async (ticketId, commentData) => {
    set({ isLoading: true });
    try {
      const res = await axios.post(
        `/api/v1/dashboard/tickets/${ticketId}/comments`,
        commentData
      );

      set((state) => ({
        tickets: state.tickets.map((ticket) =>
          ticket._id === ticketId
            ? {
                ...ticket,
                comments: [
                  ...(ticket.comments || []),
                  res.data.comment,
                ],
              }
            : ticket
        ),
        assignedTickets: state.assignedTickets.map(
          (ticket) =>
            ticket._id === ticketId
              ? {
                  ...ticket,
                  comments: [
                    ...(ticket.comments || []),
                    res.data.comment,
                  ],
                }
              : ticket
        ),
        isLoading: false,
      }));
      toast.success("Comment added successfully");
    } catch (error) {
      console.error("Failed to add comment:", error);
      set({ isLoading: false });
    }
  },

  createTicket: async (ticketData) => {
    set({ isCreating: true });
    try {
      const res = await axios.post(
        "/api/v1/dashboard/create",
        ticketData
      );
      set((state) => ({
        tickets: [...state.tickets, res.data.ticket],
        isCreating: false,
      }));
      toast.success("Ticket created successfully");
      return res.data.ticket;
    } catch (error) {
      console.error("Create Ticket Error:", error);
      toast.error(
        error.response?.data?.message ||
          "Ticket creation failed"
      );
      set({ isCreating: false });
    }
  },
  fetchUserTickets: async () => {
    set({ isFetching: true });
    try {
      const res = await axios.get("/api/v1/dashboard/user");
      set({ tickets: res.data.tickets, isFetching: false });
    } catch (error) {
      console.error("Fetch Tickets Error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch tickets"
      );
      set({ isFetching: false });
    }
  },
  fetchAssignedTickets: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get(
        "/api/v1/dashboard/assigned-tickets"
      );
      set({
        assignedTickets: res.data.tickets,
        isLoading: false,
      });
    } catch (error) {
      console.error("Fetch Tickets Error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch tickets"
      );
      set({ isLoading: false });
    }
  },
  updateTicket: async (id, updates) => {
    set({ isUpdating: true });
    try {
      const res = await axios.patch(
        `/api/v1/dashboard/${id}/status`,
        updates
      );
      const updated = res.data;

      set((state) => ({
        assignedTickets: state.assignedTickets.map(
          (ticket) =>
            ticket._id === id
              ? { ...ticket, ...updated }
              : ticket
        ),
        isUpdating: false,
      }));
    } catch (err) {
      toast.error("Failed to update ticket:", err);
    }
  },
  updateTicketPriority: async (id, updates) => {
    set({ isUpdating: true });
    try {
      const res = await axios.patch(
        `/api/v1/admin/dashboard/${id}/priority`,
        updates
      );
      const updated = res.data.ticket;

      set((state) => ({
        tickets: state.tickets.map(
          (ticket) =>
            ticket._id === id
              ? { ...ticket, ...updated }
              : ticket
        ),
        isUpdating: false,
      }));
      toast.success("Priority Updated successfully")
      return res;
    } catch (err) {
      toast.error("Failed to update ticket priority",err);
      set({ isUpdating: false });
    }
  },
  assignedTicket: async ({ id, engineerId }) => {
    set({ isLoading: true });
    try {
      const res = await axios.patch(
        `/api/v1/admin/dashboard/assigned-ticket`,
        { id, engineerId }
      );
      set((state) => ({
        assignedTickets: state.assignedTickets.map(
          (ticket) =>
            ticket._id === id
              ? {
                  ...ticket,
                  assignedTo: res.data.assignedTo,
                }
              : ticket
        ),
        tickets: state.tickets.map((ticket) =>
          ticket._id === id
            ? { ...ticket, assignedTo: res.data.assignedTo }
            : ticket
        ),
        isLoading: false,
      }));
      toast.success("Ticket assigned successfully");
    } catch (error) {
      console.error("Assign Ticket Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Ticket assignment failed"
      );
      set({ isLoading: false });
    }
  },
  deleteTicket: async (ticketId) => {
    set({ isLoading: true });
    try {
      await axios.delete(
        `/api/v1/admin/dashboard/delete/${ticketId}`
      );
      set((state) => ({
        tickets: state.tickets.filter(
          (ticket) => ticket._id !== ticketId
        ),
        isLoading: false,
      }));
      toast.success("Ticket deleted successfully");
    } catch (error) {
      console.error("Delete Ticket Error:", error);
      toast.error(
        error.response?.data?.message ||
          "Ticket deletion failed"
      );
      set({ isLoading: false });
    }
  },
  clearTickets: () => {
    set({ tickets: [] });
  },

  removeTicket: async (id) => {
    set({ isLoading: true });
    try {
      await axios.delete(
        `/api/v1/dashboard/remove-ticket/${id}`
      );
      set((state) => ({
        tickets: state.tickets.filter(
          (ticket) => ticket._id !== id
        ),
        assignedTickets: state.assignedTickets.filter(
          (ticket) => ticket._id !== id
        ),
        isLoading: false,
      }));
      toast.success("Ticket removed successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Ticket removal failed"
      );
      set({ isLoading: false });
    }
  },
}));
