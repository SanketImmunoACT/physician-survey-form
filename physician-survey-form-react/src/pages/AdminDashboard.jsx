import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";
import api from '../api/axios';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [pendingHospitals, setPendingHospitals] = useState([]);
  const [pendingPhysicians, setPendingPhysicians] = useState([]);

  useEffect(() => {
    fetchPendingUsers();
    fetchPendingHospitals();
    fetchPendingPhysicians();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      const response = await api.get("/admin/users?status=PENDING"); // Use api.get
      setPendingUsers(response.data); // Axios puts data in .data
    } catch (error) {
      console.error("Failed to fetch pending users", error);
      toast.error(error.response?.data?.message || "An error occurred while fetching pending users"); // Axios error handling
    }
  };

  const fetchPendingHospitals = async () => {
    try {
      const response = await api.get("/hospitals?status=PENDING"); // Use api.get
      setPendingHospitals(response.data.filter(h => h.status === 'PENDING')); // Axios puts data in .data
    } catch (error) {
      console.error("Failed to fetch pending hospitals", error);
      toast.error(error.response?.data?.message || "An error occurred while fetching pending hospitals"); // Axios error handling
    }
  };

  const fetchPendingPhysicians = async () => {
    try {
      const response = await api.get("/physicians?status=PENDING"); // Use api.get
      setPendingPhysicians(response.data.filter(p => p.status === 'PENDING')); // Axios puts data in .data
    } catch (error) {
      console.error("Failed to fetch pending physicians", error);
      toast.error(error.response?.data?.message || "An error occurred while fetching pending physicians"); // Axios error handling
    }
  };

  const handleApproveUser = async (userId) => {
    const newPassword = prompt("Enter a password for this user:");
    if (!newPassword) {
      toast.error("Password is required to approve user.");
      return;
    }

    try {
      const response = await api.put(`/admin/users/${userId}/approve`, { password: newPassword }); // Use api.put
      toast.success("User approved successfully");
      fetchPendingUsers();
    } catch (error) {
      console.error("Failed to approve user", error);
      toast.error(error.response?.data?.message || "An error occurred while approving the user"); // Axios error handling
    }
  };

  const handleDenyUser = async (userId) => {
    try {
      const response = await api.delete(`/admin/users/${userId}/deny`); // Use api.delete
      toast.success("User denied successfully");
      fetchPendingUsers();
    } catch (error) {
      console.error("Failed to deny user", error);
      toast.error(error.response?.data?.message || "An error occurred while denying the user"); // Axios error handling
    }
  };

  const handleApproveHospital = async (hospitalId) => {
    try {
      const response = await api.put(`/admin/hospitals/${hospitalId}/approve`); // Use api.put
      toast.success("Hospital approved successfully");
      fetchPendingHospitals();
    } catch (error) {
      console.error("Failed to approve hospital", error);
      toast.error(error.response?.data?.message || "An error occurred while approving the hospital"); // Axios error handling
    }
  };

  const handleApprovePhysician = async (physicianId) => {
    try {
      const response = await api.put(`/admin/physicians/${physicianId}/approve`); // Use api.put
      toast.success("Physician approved successfully");
      fetchPendingPhysicians();
    } catch (error) {
      console.error("Failed to approve physician", error);
      toast.error(error.response?.data?.message || "An error occurred while approving the physician"); // Axios error handling
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout"); // Use api.post
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error(error.response?.data?.message || "Logout failed"); // Axios error handling
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Pending Salesperson Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {pendingUsers.length > 0 ? (
                <ul className="space-y-4">
                  {pendingUsers.map((user) => (
                    <li
                      key={user.id}
                      className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
                    >
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Button
                          onClick={() => handleApproveUser(user.id)}
                          variant="outline"
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleDenyUser(user.id)}
                          variant="destructive"
                        >
                          Deny
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No pending salesperson requests.</p>
              )}
            </CardContent>
          </Card>
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Pending Hospital Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {pendingHospitals.length > 0 ? (
                <ul className="space-y-4">
                  {pendingHospitals.map((hospital) => (
                    <li
                      key={hospital.id}
                      className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
                    >
                      <div>
                        <p className="font-semibold">{hospital.name}</p>
                      </div>
                      <Button
                        onClick={() => handleApproveHospital(hospital.id)}
                        variant="outline"
                      >
                        Approve
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No pending hospital requests.</p>
              )}
            </CardContent>
          </Card>
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Pending Physician Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {pendingPhysicians.length > 0 ? (
                <ul className="space-y-4">
                  {pendingPhysicians.map((physician) => (
                    <li
                      key={physician.id}
                      className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
                    >
                      <div>
                        <p className="font-semibold">{physician.name}</p>
                      </div>
                      <Button
                        onClick={() => handleApprovePhysician(physician.id)}
                        variant="outline"
                      >
                        Approve
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No pending physician requests.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
