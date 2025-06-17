import { useAuthStore } from "../../store/authStore";
import DashboardLayout from "../../components/DashboardLayout";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import {
  Card,
  CardContent,
} from "../../components/ui/Card";

const UserDashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleCreateTicket = () => {
    navigate("/dashboard/tickets/create");
  };

  const handleMyTickets = () => {
    navigate("/dashboard/tickets");
  };

  const handleAssignedTickets = () => {
    navigate("/dashboard/assigned-tickets");
  };
  return (
    <DashboardLayout
      pageTitle={`${
        user?.role?.charAt(0).toUpperCase() +
        user?.role?.slice(1)
      } Dashboard`}
    >
      <div className="md:flex items-center justify-center pt-30">
        <Card className=" md:w-1/2 text-center shadow-xl">
          <CardContent className="p-8">
            <h1 className="text-2xl font-bold mb-4">
              Welcome to Your Dashboard
            </h1>
            {user?.role == "engineer" ? (
              <p className="text-gray-600 mb-6">
                Review your assigned tickets and take action.
              </p>
            ) : (
              <p className="text-gray-600 mb-6">
                Need help or have an issue? Easily create a
                support ticket.
              </p>
            )}

            <div className="flex gap-10">
              {user?.role == "user" ? (
                <>
                  <Button
                    onClick={handleCreateTicket}
                    className="w-full"
                  >
                    Create Ticket
                  </Button>
                  <Button
                    onClick={handleMyTickets}
                    className="w-full"
                  >
                    My Tickets
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleAssignedTickets}
                  className="w-full"
                >
                  Assigned Tickets
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
