import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";
import api from '../api/axios';

export default function ZonalManager2Dashboard() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchPendingSubmissions();
  }, []);

  const fetchPendingSubmissions = async () => {
    try {
      const response = await api.get("/zm2/submissions"); // Use api.get
      setSubmissions(response.data); // Axios puts data in .data
    } catch (error) {
      console.error("Failed to fetch pending submissions", error);
      toast.error(error.response?.data?.message || "An error occurred while fetching submissions"); // Axios error handling
    }
  };

  const handleApprove = async (submissionId) => {
    try {
      const response = await api.put(`/zm2/submissions/${submissionId}/approve`); // Use api.put
      toast.success("Submission approved successfully");
      fetchPendingSubmissions();
    } catch (error) {
      console.error("Failed to approve submission", error);
      toast.error(error.response?.data?.message || "An error occurred while approving the submission"); // Axios error handling
    }
  };

  const handleReject = async (submissionId) => {
    try {
      const response = await api.put(`/zm2/submissions/${submissionId}/reject`); // Use api.put
      toast.success("Submission rejected successfully");
      fetchPendingSubmissions();
    } catch (error) {
      console.error("Failed to reject submission", error);
      toast.error(error.response?.data?.message || "An error occurred while rejecting the submission"); // Axios error handling
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
            Zonal Manager 2 Dashboard
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
        <Card>
          <CardHeader>
            <CardTitle>Pending Survey Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            {submissions.length > 0 ? (
              <ul className="space-y-4">
                {submissions.map((submission) => (
                  <li
                    key={submission.id}
                    className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
                  >
                    <div>
                      <p className="font-semibold">{submission.physicianName}</p>
                      <p className="text-sm text-gray-500">
                        Submitted by: {submission.user.name} ({submission.user.email})
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button
                        onClick={() => handleApprove(submission.id)}
                        variant="outline"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(submission.id)}
                        variant="destructive"
                      >
                        Reject
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No pending submissions.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
