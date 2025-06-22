import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isCheckingAuth: true,

  userSignup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const res = await axios.post(
        `${API_URL}/api/v1/auth/user/signup`,
        credentials,
        { withCredentials: true }
      );
      set({ user: res.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(error.response?.data?.message || "Signup failed");
      set({ isSigningUp: false, user: null });
    }
  },

  userLogin: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const res = await axios.post(
        `${API_URL}/api/v1/auth/user/login`,
        credentials,
        { withCredentials: true }
      );
      set({ user: res.data.user, isLoggingIn: false });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      set({ isLoggingIn: false, user: null });
    }
  },

  userLogout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post(`${API_URL}/api/v1/auth/user/logout`, null, {
        withCredentials: true,
      });
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      set({ user: null, isLoggingOut: false });
    }
  },

  adminSignup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const res = await axios.post(
        `${API_URL}/api/v1/auth/admin/signup`,
        credentials,
        { withCredentials: true }
      );
      set({ user: res.data.user, isSigningUp: false });
      toast.success("Admin account created successfully");
    } catch (error) {
      console.error("Admin Signup Error:", error);
      toast.error(error.response?.data?.message || "Signup failed");
      set({ isSigningUp: false, user: null });
    }
  },

  adminLogin: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const res = await axios.post(
        `${API_URL}/api/v1/auth/admin/login`,
        credentials,
        { withCredentials: true }
      );
      set({ user: res.data.user, isLoggingIn: false });
      toast.success("Admin logged in successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      set({ isLoggingIn: false, user: null });
    }
  },

  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axios.get(`${API_URL}/api/v1/auth/user/authCheck`, {
        withCredentials: true,
      });
      set({ user: res.data.user, isCheckingAuth: false });
    } catch (error) {
      console.error("Auth Check Error:", error);
      set({ user: null, isCheckingAuth: false });
    }
  },
}));
