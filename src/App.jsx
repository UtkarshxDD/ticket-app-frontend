import { Route, Routes } from "react-router";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore.js";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserDashboard from "./pages/User/UserDashboard.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import CreateTicket from "./pages/User/CreateTicket.jsx";
import MyTickets from "./pages/User/MyTickets.jsx";
import TicketDetails from "./pages/TicketDetails.jsx";
import AssignedTickets from "./pages/Engineer/AssignedTickets.jsx";
import Profile from "./pages/Profile.jsx";
import "./App.css";
import Users from "./pages/Admin/Users.jsx";
import AllTickets from "./pages/Admin/AllTickets.jsx";
import { Loader } from "lucide-react";
function App() {
  const { user, isCheckingAuth, authCheck } =
    useAuthStore();
  const currentUser = user;
  useEffect(() => {
    authCheck();
  }, []);
  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-white h-full">
          <Loader className="animate-spin text-[#1E90FF] size-10" />
        </div>
      </div>
    );
  }
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <HomePage />
            ) : user.role === "user" ||
              user.role === "engineer" ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/admin/dashboard" />
            )
          }
        />
        <Route
          path="/login"
          element={
            !user ? <LoginPage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/signup"
          element={
            !user ? <SignupPage /> : <Navigate to="/" />
          }
        />

        <Route
          path="/dashboard"
          element={
            user?.role === "user" ||
            user?.role === "engineer" ? (
              <UserDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            user?.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/dashboard/tickets/create"
          element={
            user ? <CreateTicket /> : <Navigate to="/" />
          }
        />
        <Route
          path="/dashboard/tickets"
          element={
            user ? <MyTickets /> : <Navigate to="/" />
          }
        />
        <Route
          path="/tickets/:id"
          element={
            user ? <TicketDetails /> : <Navigate to="/" />
          }
        />
        <Route
          path="/dashboard/assigned-tickets"
          element={
            user ? <AssignedTickets /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/users"
          element={user ? <Users /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/all-tickets"
          element={
            user ? <AllTickets /> : <Navigate to="/" />
          }
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
