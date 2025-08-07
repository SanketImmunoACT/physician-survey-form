"use client";

import { useState, useEffect } from "react";
import dataStore from "@/lib/dataStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SearchFilter from "@/components/SearchFilter";
import LoadingSpinner from "@/components/LoadingSpinner";
import Toast from "@/components/Toast";
import {
  FileText,
  Users,
  Building2,
  TrendingUp,
  Download,
  MapPin,
  Calendar,
  Plus,
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const [dashboardStats, setDashboardStats] = useState({
    totalSurveys: 0,
    monthlyBMTPatients: 0,
    uniqueFacilities: 0,
    avgPatientsPerFacility: 0,
  });

  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
  };

  // Function to export data to CSV/Excel
  const handleExportToExcel = () => {
    try {
      // Create CSV content
      const headers = [
        "Date",
        "Salesperson",
        "Physician",
        "Facility",
        "Location",
        "Monthly Patients",
        "Annual Patients",
      ];
      const csvContent = [
        headers.join(","),
        ...recentSubmissions.map((row) =>
          [
            row.date,
            `"${row.salesperson}"`,
            `"${row.physician}"`,
            `"${row.facility}"`,
            `"${row.location}"`,
            row.monthlyPatients,
            row.annualPatients,
          ].join(",")
        ),
      ].join("\n");

      // Create and download file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `survey_dashboard_${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast("Data exported successfully!", "success");

      console.log("Data exported successfully");
    } catch (error) {
      console.error("Error exporting data:", error);
      showToast("Error exporting data. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch dashboard data from dataStore
  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const stats = dataStore.getDashboardStats();
      const submissions = dataStore.getRecentSubmissions();

      setDashboardStats(stats);
      setRecentSubmissions(submissions);
      setFilteredSubmissions(submissions);

      
      console.log("Dashboard data loaded:", {
        stats,
        submissions: submissions.length,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      showToast("Error loading dashboard data", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredSubmissions(recentSubmissions);
      return;
    }

    const filtered = recentSubmissions.filter(
      (submission) =>
        submission.physician.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.uniqueId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.speciality
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        submission.hospitalCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredSubmissions(filtered);
  };

  const handleFilter = ({ type, dateRange }) => {
    let filtered = [...recentSubmissions];

    if (type) {
      filtered = filtered.filter(
        (submission) =>
          submission.speciality.toLowerCase() === type.toLowerCase()
      );
    }

    if (dateRange.from || dateRange.to) {
      filtered = filtered.filter((submission) => {
        const submissionDate = new Date(
          submission.date.split("/").reverse().join("-")
        );
        const fromDate = dateRange.from ? new Date(dateRange.from) : null;
        const toDate = dateRange.to ? new Date(dateRange.to) : null;

        if (fromDate && submissionDate < fromDate) return false;
        if (toDate && submissionDate > toDate) return false;
        return true;
      });
    }

    setFilteredSubmissions(filtered);
  };

  const getUniqueSpecialities = () => {
    const specialities = [
      ...new Set(recentSubmissions.map((s) => s.speciality)),
    ];
    return specialities.map((spec) => ({ value: spec, label: spec }));
  };

  useEffect(() => {
    fetchDashboardData();

    // Listen for storage changes to update dashboard when new data is added
    const handleStorageChange = () => {
      fetchDashboardData();
    };

    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom events from form submission
    window.addEventListener("surveySubmitted", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("surveySubmitted", handleStorageChange);
    };
  }, []);

  if (isLoading && recentSubmissions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="text-blue-600 mb-4" />
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Toast Notifications */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Survey Dashboard
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Overview of Market survey responses
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                <Plus className="w-4 h-4 mr-2" />
                New Survey
              </Button>
            </Link>
            <Button
              onClick={handleExportToExcel}
              className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
            >
              <Download className="w-4 h-4 mr-2" />
              Export to Excel
            </Button>
            
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Surveys
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {dashboardStats.totalSurveys}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Monthly BMT Patients
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {dashboardStats.monthlyBMTPatients}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Unique Facilities
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {dashboardStats.uniqueFacilities}
                  </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <Building2 className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Avg Patients/Facility
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {dashboardStats.avgPatientsPerFacility}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        

        {/* Recent Survey Submissions Table */}
        <Card className="bg-white shadow-sm border-0 overflow-x-auto">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">
              Recent Survey Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    
                    <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm uppercase tracking-wider">
                      Physician Name
                    </th>
                    {/* <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm uppercase tracking-wider">
                      Unique ID
                    </th> */}
                    <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm uppercase tracking-wider">
                      Speciality
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm uppercase tracking-wider">
                      Hospital Code
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600 text-sm uppercase tracking-wider">
                      Visiting Hospitals
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600 text-sm uppercase tracking-wider">
                      Monthly Patients
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600 text-sm uppercase tracking-wider">
                      BMT Patients
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredSubmissions.map((submission) => (
                    <tr
                      key={submission.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center text-sm text-gray-900">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {submission.date}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm font-medium text-gray-900">
                          {submission.physician}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-900">
                          {submission.uniqueId}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-900">
                          {submission.speciality}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm font-medium text-blue-600">
                          {submission.hospitalCode}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="text-sm text-gray-900">
                          {submission.visitingHospitals}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200"
                        >
                          {submission.monthlyPatients}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge
                          variant="outline"
                          className="bg-purple-50 text-purple-700 border-purple-200"
                        >
                          {submission.bmtPatients}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                  {filteredSubmissions.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="py-12 text-center text-gray-500"
                      >
                        <div className="flex flex-col items-center">
                          <FileText className="w-12 h-12 text-gray-300 mb-4" />
                          <p className="text-lg font-medium">
                            {recentSubmissions.length === 0
                              ? "No survey data available"
                              : "No results found"}
                          </p>
                          <p className="text-sm">
                            {recentSubmissions.length === 0
                              ? "Submit a survey form to see data here"
                              : "Try adjusting your search or filter criteria"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
