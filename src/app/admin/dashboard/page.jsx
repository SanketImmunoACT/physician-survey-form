"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
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
      const response = await fetch("/api/admin/users?status=PENDING");
      if (response.ok) {
        const users = await response.json();
        setPendingUsers(users);
      } else {
        toast.error("Failed to fetch pending users");
      }
    } catch (error) {
      console.error("Failed to fetch pending users", error);
      toast.error("An error occurred while fetching pending users");
    }
  };

  const fetchPendingHospitals = async () => {
    try {
      const response = await fetch("/api/hospitals?status=PENDING");
      if (response.ok) {
        const hospitals = await response.json();
        setPendingHospitals(hospitals.filter(h => h.status === 'PENDING'));
      } else {
        toast.error("Failed to fetch pending hospitals");
      }
    } catch (error) {
      console.error("Failed to fetch pending hospitals", error);
      toast.error("An error occurred while fetching pending hospitals");
    }
  };

  const fetchPendingPhysicians = async () => {
    try {
      const response = await fetch("/api/physicians?status=PENDING");
      if (response.ok) {
        const physicians = await response.json();
        setPendingPhysicians(physicians.filter(p => p.status === 'PENDING'));
      } else {
        toast.error("Failed to fetch pending physicians");
      }
    } catch (error) {
      console.error("Failed to fetch pending physicians", error);
      toast.error("An error occurred while fetching pending physicians");
    }
  };

  const handleApproveUser = async (userId) => {
    const newPassword = prompt("Enter a password for this user:");
    if (!newPassword) {
      toast.error("Password is required to approve user.");
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}/approve`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });
      if (response.ok) {
        toast.success("User approved successfully");
        fetchPendingUsers();
      } else {
        toast.error("Failed to approve user");
      }
    } catch (error) {
      console.error("Failed to approve user", error);
      toast.error("An error occurred while approving the user");
    }
  };

  const handleDenyUser = async (userId) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/deny`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("User denied successfully");
        fetchPendingUsers();
      } else {
        toast.error("Failed to deny user");
      }
    } catch (error) {
      console.error("Failed to deny user", error);
      toast.error("An error occurred while denying the user");
    }
  };

  const handleApproveHospital = async (hospitalId) => {
    try {
      const response = await fetch(`/api/admin/hospitals/${hospitalId}/approve`, {
        method: "PUT",
      });
      if (response.ok) {
        toast.success("Hospital approved successfully");
        fetchPendingHospitals();
      } else {
        toast.error("Failed to approve hospital");
      }
    } catch (error) {
      console.error("Failed to approve hospital", error);
      toast.error("An error occurred while approving the hospital");
    }
  };

  const handleApprovePhysician = async (physicianId) => {
    try {
      const response = await fetch(
        `/api/admin/physicians/${physicianId}/approve`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        toast.success("Physician approved successfully");
        fetchPendingPhysicians();
      } else {
        toast.error("Failed to approve physician");
      }
    } catch (error) {
      console.error("Failed to approve physician", error);
      toast.error("An error occurred while approving the physician");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
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