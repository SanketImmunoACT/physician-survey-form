// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import dataStore from "@/lib/dataStore";
// import {
//   Plus,
//   Building2,
//   UserPlus,
//   FileText,
//   Users,
//   Hospital,
//   Calendar,
//   Mail,
//   CheckCircle,
//   Clock,
// } from "lucide-react";
// import Link from "next/link";

// export default function SalespersonDashboard() {
//   const [dashboardData, setDashboardData] = useState({
//     submittedSurveys: [],
//     totalPhysicians: 0,
//     totalHospitals: 0,
//     totalSurveys: 0,
//   });

//   const [requests, setRequests] = useState({
//     hospitalRequests: [],
//     physicianRequests: [],
//   });

//   const [showNotification, setShowNotification] = useState(false);
//   const [notificationMessage, setNotificationMessage] = useState("");

//   // Mock current user - in real app, this would come from auth context
//   const currentUser = {
//     id: "salesperson_001",
//     name: "ImmunoACT User",
//     email: "user@immunoact.com",
//   };

//   useEffect(() => {
//     loadDashboardData();
//     loadRequests();
//   }, []);

//   const loadDashboardData = () => {
//     const submissions = dataStore.getAllSubmissions();

//     // Filter submissions by current user (in real app)
//     const userSubmissions = submissions; // For demo, showing all

//     const uniquePhysicians = new Set();
//     const uniqueHospitals = new Set();

//     userSubmissions.forEach((submission) => {
//       uniquePhysicians.add(submission.physicianName);
//       submission.selectedHospitalCodes?.forEach((code) => {
//         uniqueHospitals.add(code);
//       });
//     });

//     setDashboardData({
//       submittedSurveys: userSubmissions.slice(0, 10), // Show latest 10
//       totalPhysicians: uniquePhysicians.size,
//       totalHospitals: uniqueHospitals.size,
//       totalSurveys: userSubmissions.length,
//     });
//   };

//   const loadRequests = () => {
//     // Load from localStorage or API
//     const hospitalReqs = JSON.parse(
//       localStorage.getItem("hospitalRequests") || "[]"
//     );
//     const physicianReqs = JSON.parse(
//       localStorage.getItem("physicianRequests") || "[]"
//     );

//     setRequests({
//       hospitalRequests: hospitalReqs,
//       physicianRequests: physicianReqs,
//     });
//   };

//   const handleHospitalRequest = () => {
//     const hospitalName = prompt(
//       "Enter the name of the hospital you want to add:"
//     );
//     if (hospitalName && hospitalName.trim()) {
//       const newRequest = {
//         id: Date.now().toString(),
//         type: "hospital",
//         name: hospitalName.trim(),
//         requestedBy: currentUser.name,
//         requestedAt: new Date().toISOString(),
//         status: "pending",
//       };

//       const updatedRequests = [...requests.hospitalRequests, newRequest];
//       setRequests((prev) => ({
//         ...prev,
//         hospitalRequests: updatedRequests,
//       }));

//       localStorage.setItem("hospitalRequests", JSON.stringify(updatedRequests));

//       showNotificationMessage(
//         `Hospital addition request for "${hospitalName}" has been sent to admin.`
//       );
//     }
//   };

//   const handlePhysicianRequest = () => {
//     const physicianName = prompt(
//       "Enter the name of the physician you want to add:"
//     );
//     if (physicianName && physicianName.trim()) {
//       const newRequest = {
//         id: Date.now().toString(),
//         type: "physician",
//         name: physicianName.trim(),
//         requestedBy: currentUser.name,
//         requestedAt: new Date().toISOString(),
//         status: "pending",
//       };

//       const updatedRequests = [...requests.physicianRequests, newRequest];
//       setRequests((prev) => ({
//         ...prev,
//         physicianRequests: updatedRequests,
//       }));

//       localStorage.setItem(
//         "physicianRequests",
//         JSON.stringify(updatedRequests)
//       );

//       showNotificationMessage(
//         `Physician addition request for "${physicianName}" has been sent to admin.`
//       );
//     }
//   };

//   const showNotificationMessage = (message) => {
//     setNotificationMessage(message);
//     setShowNotification(true);
//     setTimeout(() => {
//       setShowNotification(false);
//     }, 4000);
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-GB");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Notification */}
//         {showNotification && (
//           <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
//             <div className="flex items-center gap-2">
//               <CheckCircle className="w-5 h-5" />
//               {notificationMessage}
//             </div>
//           </div>
//         )}

//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//               Salesperson Dashboard
//             </h1>
//             <p className="text-gray-600 mt-1 text-sm sm:text-base">
//               Welcome back, {currentUser.name}
//             </p>
//           </div>
//           <div className="flex items-center gap-2">
//             <Users className="w-8 h-8 text-blue-600" />
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//           <Link href="/form">
//             <Card className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-r from-blue-500 to-blue-600 text-white">
//               <CardContent className="p-6">
//                 <div className="flex items-center gap-3">
//                   <Plus className="w-8 h-8" />
//                   <div>
//                     <h3 className="font-semibold text-lg">Add New Survey</h3>
//                     <p className="text-blue-100 text-sm">
//                       Create a new physician survey
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </Link>

//           <Card
//             className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-r from-green-500 to-green-600 text-white"
//             onClick={handleHospitalRequest}
//           >
//             <CardContent className="p-6">
//               <div className="flex items-center gap-3">
//                 <Building2 className="w-8 h-8" />
//                 <div>
//                   <h3 className="font-semibold text-lg">
//                     Request New Hospital
//                   </h3>
//                   <p className="text-green-100 text-sm">
//                     Add hospital to database
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card
//             className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-r from-purple-500 to-purple-600 text-white"
//             onClick={handlePhysicianRequest}
//           >
//             <CardContent className="p-6">
//               <div className="flex items-center gap-3">
//                 <UserPlus className="w-8 h-8" />
//                 <div>
//                   <h3 className="font-semibold text-lg">
//                     Request New Physician
//                   </h3>
//                   <p className="text-purple-100 text-sm">
//                     Add physician to database
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           <Card className="bg-white shadow-sm border-0">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">
//                     Total Surveys
//                   </p>
//                   <p className="text-3xl font-bold text-gray-900">
//                     {dashboardData.totalSurveys}
//                   </p>
//                 </div>
//                 <div className="bg-blue-100 p-3 rounded-full">
//                   <FileText className="w-6 h-6 text-blue-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-white shadow-sm border-0">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">
//                     Physicians Surveyed
//                   </p>
//                   <p className="text-3xl font-bold text-gray-900">
//                     {dashboardData.totalPhysicians}
//                   </p>
//                 </div>
//                 <div className="bg-green-100 p-3 rounded-full">
//                   <Users className="w-6 h-6 text-green-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-white shadow-sm border-0">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">
//                     Hospitals Surveyed
//                   </p>
//                   <p className="text-3xl font-bold text-gray-900">
//                     {dashboardData.totalHospitals}
//                   </p>
//                 </div>
//                 <div className="bg-orange-100 p-3 rounded-full">
//                   <Hospital className="w-6 h-6 text-orange-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Submitted Surveys Table */}
//         <Card className="bg-white shadow-sm border-0 mb-8">
//           <CardHeader>
//             <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">
//               Submitted Surveys
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <table className="min-w-full text-sm">
//                 <thead>
//                   <tr className="border-b border-gray-200">
//                     <th className="text-center py-3 px-4 font-medium text-gray-600 text-sm uppercase tracking-wider">
//                       Physician
//                     </th>
//                     <th className="text-center py-3 px-4 font-medium text-gray-600 text-sm uppercase tracking-wider">
//                       Hospital(s)
//                     </th>
//                     <th className="text-center py-3 px-4 font-medium text-gray-600 text-sm uppercase tracking-wider">
//                       Date
//                     </th>
//                     <th className="text-center py-3 px-4 font-medium text-gray-600 text-sm uppercase tracking-wider">
//                       Created At
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {dashboardData.submittedSurveys.length > 0 ? (
//                     dashboardData.submittedSurveys.map((survey) => (
//                       <tr
//                         key={survey.id}
//                         className="hover:bg-gray-50 transition-colors"
//                       >
//                         <td className="py-4 px-4">
//                           <div className="flex flex-col">
//                             <span className="font-medium text-gray-900">
//                               {survey.physicianName}
//                             </span>
//                             <span className="text-sm text-gray-500">
//                               {survey.speciality}
//                             </span>
//                           </div>
//                         </td>
//                         <td className="py-4 px-4">
//                           <div className="flex flex-wrap gap-1">
//                             {survey.selectedHospitalCodes
//                               ?.slice(0, 2)
//                               .map((code, index) => (
//                                 <Badge
//                                   key={index}
//                                   variant="outline"
//                                   className="text-xs"
//                                 >
//                                   {code}
//                                 </Badge>
//                               ))}
//                             {survey.selectedHospitalCodes?.length > 2 && (
//                               <Badge variant="outline" className="text-xs">
//                                 +{survey.selectedHospitalCodes.length - 2} more
//                               </Badge>
//                             )}
//                           </div>
//                         </td>
//                         <td className="py-4 px-4">
//                           <div className="flex items-center text-sm text-gray-900">
//                             <Calendar className="w-4 h-4 mr-2 text-gray-400" />
//                             {survey.date}
//                           </div>
//                         </td>
//                         <td className="py-4 px-4">
//                           <div className="flex items-center text-sm text-gray-900">
//                             <Calendar className="w-4 h-4 mr-2 text-gray-400" />
//                             {new Date(survey.timestamp).toLocaleString(
//                               "en-GB",
//                               {
//                                 day: "2-digit",
//                                 month: "2-digit",
//                                 year: "numeric",
//                                 hour: "2-digit",
//                                 minute: "2-digit",
//                               }
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan={4}
//                         className="py-12 text-center text-gray-500"
//                       >
//                         <div className="flex flex-col items-center">
//                           <FileText className="w-12 h-12 text-gray-300 mb-4" />
//                           <p className="text-lg font-medium">
//                             No surveys submitted yet
//                           </p>
//                           <p className="text-sm">
//                             Click "Add New Survey" to get started
//                           </p>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Pending Requests */}
//         {(requests.hospitalRequests.length > 0 ||
//           requests.physicianRequests.length > 0) && (
//           <Card className="bg-white shadow-sm border-0">
//             <CardHeader>
//               <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">
//                 Pending Requests
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {requests.hospitalRequests.map((request) => (
//                   <div
//                     key={request.id}
//                     className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg"
//                   >
//                     <div className="flex items-center gap-3">
//                       <Building2 className="w-5 h-5 text-yellow-600" />
//                       <div>
//                         <p className="font-medium text-gray-900">
//                           Hospital: {request.name}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           Requested on {formatDate(request.requestedAt)}
//                         </p>
//                       </div>
//                     </div>
//                     <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
//                       <Clock className="w-3 h-3 mr-1" />
//                       Pending
//                     </Badge>
//                   </div>
//                 ))}

//                 {requests.physicianRequests.map((request) => (
//                   <div
//                     key={request.id}
//                     className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
//                   >
//                     <div className="flex items-center gap-3">
//                       <UserPlus className="w-5 h-5 text-blue-600" />
//                       <div>
//                         <p className="font-medium text-gray-900">
//                           Physician: {request.name}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           Requested on {formatDate(request.requestedAt)}
//                         </p>
//                       </div>
//                     </div>
//                     <Badge className="bg-blue-100 text-blue-800 border-blue-200">
//                       <Clock className="w-3 h-3 mr-1" />
//                       Pending
//                     </Badge>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// }







'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import toast from 'react-hot-toast';
import {
  Plus,
  Building2,
  UserPlus,
  FileText,
  Users,
  Hospital,
  Calendar,
  Mail,
  CheckCircle,
  Clock,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';

export default function SalespersonDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    submittedSurveys: [],
    totalPhysicians: 0,
    totalHospitals: 0,
    totalSurveys: 0,
  });

  const [requests, setRequests] = useState({
    hospitalRequests: [],
    physicianRequests: [],
  });

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          router.push('/auth');
        }
      } catch (error) {
        console.error('Failed to fetch user', error);
        router.push('/auth');
      }
    };

    fetchUser();
    loadRequests();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/auth');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const loadRequests = async () => {
    try {
      const [hospitalRes, physicianRes] = await Promise.all([
        fetch("/api/hospitals"),
        fetch("/api/physicians"),
      ]);

      if (hospitalRes.ok && physicianRes.ok) {
        const hospitalReqs = await hospitalRes.json();
        const physicianReqs = await physicianRes.json();
        setRequests({
          hospitalRequests: hospitalReqs,
          physicianRequests: physicianReqs,
        });
      } else {
        toast.error("Failed to load requests");
      }
    } catch (error) {
      console.error("Failed to load requests", error);
      toast.error("An error occurred while loading requests");
    }
  };

  const handleHospitalRequest = async () => {
    const hospitalName = prompt(
      'Enter the name of the hospital you want to add:'
    );
    if (hospitalName && hospitalName.trim()) {
      try {
        const response = await fetch("/api/hospitals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: hospitalName.trim() }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success(data.message);
          loadRequests();
        } else {
          toast.error(data.error || "Failed to submit hospital request");
        }
      } catch (error) {
        console.error("Failed to submit hospital request", error);
        toast.error("An error occurred while submitting the hospital request");
      }
    }
  };

  const handlePhysicianRequest = async () => {
    const physicianName = prompt(
      'Enter the name of the physician you want to add:'
    );
    if (physicianName && physicianName.trim()) {
      try {
        const response = await fetch("/api/physicians", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: physicianName.trim() }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success(data.message);
          loadRequests();
        } else {
          toast.error(data.error || "Failed to submit physician request");
        }
      } catch (error) {
        console.error("Failed to submit physician request", error);
        toast.error("An error occurred while submitting the physician request");
      }
    }
  };

  const showNotificationMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Notification */}
        {showNotification && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              {notificationMessage}
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Salesperson Dashboard
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Welcome back, {user.name}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
            {/* <Users className="w-8 h-8 text-blue-600" /> */}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Link href="/form">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Plus className="w-8 h-8" />
                  <div>
                    <h3 className="font-semibold text-lg">Add New Survey</h3>
                    <p className="text-blue-100 text-sm">
                      Create a new physician survey
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-r from-green-500 to-green-600 text-white"
            onClick={handleHospitalRequest}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Building2 className="w-8 h-8" />
                <div>
                  <h3 className="font-semibold text-lg">
                    Request New Hospital
                  </h3>
                  <p className="text-green-100 text-sm">
                    Add hospital to database
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-r from-purple-500 to-purple-600 text-white"
            onClick={handlePhysicianRequest}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <UserPlus className="w-8 h-8" />
                <div>
                  <h3 className="font-semibold text-lg">
                    Request New Physician
                  </h3>
                  <p className="text-purple-100 text-sm">
                    Add physician to database
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submitted Surveys Table */}
        <Card className="bg-white shadow-sm border-0 mb-8">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">
              Submitted Surveys
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-center py-3 px-4 font-medium text-gray-600 text-sm uppercase tracking-wider">
                      Physician
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600 text-sm uppercase tracking-wider">
                      Hospital(s)
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600 text-sm uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600 text-sm uppercase tracking-wider">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dashboardData.submittedSurveys.length > 0 ? (
                    dashboardData.submittedSurveys.map((survey) => (
                      <tr
                        key={survey.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900">
                              {survey.physicianName}
                            </span>
                            <span className="text-sm text-gray-500">
                              {survey.speciality}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {survey.selectedHospitalCodes
                              ?.slice(0, 2)
                              .map((code, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {code}
                                </Badge>
                              ))}
                            {survey.selectedHospitalCodes?.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{survey.selectedHospitalCodes.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center text-sm text-gray-900">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {survey.date}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center text-sm text-gray-900">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {new Date(survey.timestamp).toLocaleString(
                              'en-GB',
                              {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              }
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-12 text-center text-gray-500"
                      >
                        <div className="flex flex-col items-center">
                          <FileText className="w-12 h-12 text-gray-300 mb-4" />
                          <p className="text-lg font-medium">
                            No surveys submitted yet
                          </p>
                          <p className="text-sm">
                            Click "Add New Survey" to get started
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

        {/* Pending Requests */}
        {(requests.hospitalRequests.length > 0 ||
          requests.physicianRequests.length > 0) && (
          <Card className="bg-white shadow-sm border-0">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">
                My Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requests.hospitalRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">
                          Hospital: {request.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Requested on {formatDate(request.createdAt)}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={request.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                    >
                      {request.status === 'ACTIVE' ? 'Approved' : 'Pending'}
                    </Badge>
                  </div>
                ))}

                {requests.physicianRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <UserPlus className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">
                          Physician: {request.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Requested on {formatDate(request.createdAt)}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={request.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                    >
                      {request.status === 'ACTIVE' ? 'Approved' : 'Pending'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
