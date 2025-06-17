import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
// import StatusBadge from "../components/StatusBadge"; // Uncomment if you have it

const Users = () => {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const deleteUser = async (userId) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `/api/v1/admin/dashboard/delete-user/${userId}`
      );
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        if (role === "user") {
          const response = await axios.get(
            `/api/v1/admin/dashboard/all-users`
          );
          setUsers(response.data.users);
        } else if (role === "engineer") {
          const response = await axios.get(
            `/api/v1/admin/dashboard/all-engineers`
          );
          setUsers(response.data.engineers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error(
          error.response?.data?.message ||
            "Failed to fetch users"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (role) fetchUsers();
  }, [role]);

  return (
    <DashboardLayout pageTitle="Users & Engineers">
      <div className="container shadow mx-auto pb-4">
        <h2 className="text-xl font-bold mb-4">
          Manage Users and Engineers
        </h2>
        <select
          className="w-full p-2 border rounded"
          value={role}
          onChange={(e) =>
            setRole(e.target.value.toLowerCase())
          } // Lowercase for consistency
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="user">User</option>
          <option value="engineer">Engineer</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full table-auto text-sm text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-4 text-xs tracking-wider uppercase">
                Name
              </th>
              <th className="px-4 py-4 text-xs tracking-wider uppercase">
                Email
              </th>
              <th className="px-4 py-4 text-xs tracking-wider uppercase">
                Role
              </th>
              <th className="px-4 py-4 text-xs tracking-wider uppercase">
                Specialization
              </th>
              <th className="px-4 py-4 text-xs tracking-wider uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && !isLoading && (
              <tr>
                {role === "engineer" ? (
                  <td
                    colSpan="5"
                    className="text-center text-gray-500 py-4 font-semibold"
                  >
                    No engineers found.
                  </td>
                ) : (
                  <td
                    colSpan="5"
                    className="text-center text-gray-500 py-4 font-semibold"
                  >
                    No users found.
                  </td>
                )}
              </tr>
            )}

            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t border-gray-300 hover:bg-gray-50"
              >
                <td className="px-4 text-blue-600 py-3">
                  {user.name}
                </td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 capitalize">
                  {user.role}
                </td>
                <td className="px-4 py-3">
                  {user.role === "engineer"
                    ? user.specialization
                    : "-"}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => {
                      const confirmDelete = window.confirm(
                        `Are you sure you want to remove the ${user.role}?`
                      );
                      if (confirmDelete) {
                        deleteUser(user._id);
                      }
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}

            {isLoading && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4"
                >
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default Users;
