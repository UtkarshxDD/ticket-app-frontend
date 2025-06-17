import DashboardLayout from "../../components/DashboardLayout";
import TicketDashboard from "../../components/TicketDashboard";

const AdminDashboard = () => {
  return (
    <DashboardLayout pageTitle={"Admin Dashboard"}>
      <TicketDashboard />
    </DashboardLayout>
  );
};

export default AdminDashboard;
