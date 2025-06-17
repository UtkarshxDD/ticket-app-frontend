import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useTicketStore } from "../../store/ticketStore";
import { useNavigate } from "react-router-dom"; // ✅ Add this at the top

const CreateTicket = () => {
  const { createTicket } = useTicketStore();
  const navigate = useNavigate(); // ✅ Initialize navigate
  const CATEGORIES = [
    "Hardware Issue",
    "Software Issue",
    "Network Problem",
    "Account Access",
    "Data Recovery",
    "Security Concern",
    "Performance Issue",
    "Feature Request",
    "Other",
  ];
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "Low",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTicket = await createTicket(formData); // ✅ Wait for response
      navigate(`/tickets/${newTicket._id}`); // ✅ Redirect to ticket details
    } catch (err) {
      console.error("Ticket creation failed", err);
    }
    setFormData({
      title: "",
      category: "",
      priority: "",
      description: "",
    });
  };
  return (
    <DashboardLayout pageTitle={"Create Ticket"}>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
        <h2 className="text-xl font-semibold text-gray-600 mb-1">
          Submit a New Support Ticket
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Please provide detailed information about your
          issue so we can assist you better.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Ticket Title */}
          <div>
            <label className="block text-sm text-gray-600 font-medium mb-1">
              Ticket Title{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Brief summary of your issue"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category & Priority */}
          <div className="flex gap-4">
            <div className="w-full">
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Category{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border font-semibold text-gray-600 border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* <div className="w-1/2">
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Priority{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
                className="w-full text-gray-600 font-semibold border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div> */}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Description{" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Please provide a detailed description of your issue..."
              rows="5"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-4 font-semibold py-2 text-sm border rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white bg-[#5585CE] rounded-md hover:bg-[#5585CE]/90"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateTicket;
