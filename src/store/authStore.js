import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut:false,
  isCheckingAuth: true,
  userSignup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const res = await axios.post(
        "/api/v1/auth/user/signup",
        credentials,
        { withCredentials: true } // if using cookies for auth
      );
      set({ user: res.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(
        error.response?.data?.message || "Signup failed"
      );
      set({ isSigningUp: false, user: null });
    }
  },
  userLogin: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const res = await axios.post(
        "/api/v1/auth/user/login",
        credentials
      );
      set({ user: res.data.user, isLoggingIn: false });
      toast.success("Logged in successfully");
      // Redirect to the dashboard or home page
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
      set({ isLoggingIn: false, user: null });
      // Handle login error
    }
  },
  userLogout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/user/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
      // Redirect to the login page
    } catch (error) {
      toast.error(
        error.res.data.message || "Logout failed"
      );
      set({ user: null, isLoggingOut: false });
      // Handle logout error
    }
  },
  adminSignup:async (credentials) => {
    set({ isSigningUp: true });
    try {
      const res = await axios.post(
        "/api/v1/auth/admin/signup",
        credentials
      );
      set({ user: res.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(
        error.response?.data?.message || "Signup failed"
      );
      set({ isSigningUp: false, user: null });
    }
  },
  adminLogin:async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const res = await axios.post(
        "/api/v1/auth/admin/login",
        credentials, // if using cookies for auth
      );
      set({ user: res.data.user, isLoggingIn: false });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
      set({ isLoggingIn: false, user: null });
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axios.get(
        "/api/v1/auth/user/authCheck"
      );
      set({ user: res.data.user, isCheckingAuth: false });
    } catch (error) {
      console.log(error)
      set({ user: null, isCheckingAuth: false });
    }
  },
}));




