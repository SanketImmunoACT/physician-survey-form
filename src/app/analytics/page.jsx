"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Building2,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import dataStore from "@/lib/dataStore";

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState({
    totalPhysicians: 0,
    totalHospitals: 0,
    totalPatients: 0,
    avgPatientsPerPhysician: 0,
    specialityBreakdown: {},
    hospitalCodeDistribution: {},
    monthlyTrends: [],
    patientSourceBreakdown: {},
  });

  useEffect(() => {
    const loadAnalytics = () => {
      const submissions = dataStore.getAllSubmissions();

      const totalPhysicians = submissions.length;
      const hospitalCodes = new Set();
      let totalPatients = 0;
      const specialities = {};
      const hospitalDistribution = {};
      const sourceBreakdown = {};

      submissions.forEach((submission) => {
        // Count specialities
        if (submission.speciality) {
          specialities[submission.speciality] =
            (specialities[submission.speciality] || 0) + 1;
        }

        // Process hospital data
        submission.selectedHospitalCodes.forEach((hospitalCode) => {
          hospitalCodes.add(hospitalCode);
          const monthlyPatients =
            parseInt(submission.hospitalData[hospitalCode]?.monthlyPatients) ||
            0;
          totalPatients += monthlyPatients;

          hospitalDistribution[hospitalCode] =
            (hospitalDistribution[hospitalCode] || 0) + monthlyPatients;

          // Process source of funds
          const sourceFunds = submission.sourceFunds[hospitalCode] || {};
          Object.entries(sourceFunds).forEach(([source, count]) => {
            const numCount = parseFloat(count) || 0;
            sourceBreakdown[source] = (sourceBreakdown[source] || 0) + numCount;
          });
        });
      });

      setAnalyticsData({
        totalPhysicians,
        totalHospitals: hospitalCodes.size,
        totalPatients,
        avgPatientsPerPhysician:
          totalPhysicians > 0 ? Math.round(totalPatients / totalPhysicians) : 0,
        specialityBreakdown: specialities,
        hospitalCodeDistribution: hospitalDistribution,
        patientSourceBreakdown: sourceBreakdown,
      });
    };

    loadAnalytics();

    // Listen for data updates
    window.addEventListener("surveySubmitted", loadAnalytics);
    return () => window.removeEventListener("surveySubmitted", loadAnalytics);
  }, []);

  const renderBarChart = (data, title, color = "bg-blue-500") => {
    const maxValue = Math.max(...Object.values(data));

    return (
      <div className="space-y-3">
        <h4 className="font-medium text-gray-700">{title}</h4>
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex items-center gap-3">
            <div className="w-24 text-sm text-gray-600 truncate">{key}</div>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className={`${color} h-2 rounded-full transition-all duration-500`}
                style={{
                  width: `${maxValue > 0 ? (value / maxValue) * 100 : 0}%`,
                }}
              ></div>
            </div>
            <div className="w-12 text-sm font-medium text-gray-700">
              {value}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Detailed insights from survey data
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Physicians
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {analyticsData.totalPhysicians}
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Hospitals
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {analyticsData.totalHospitals}
                  </p>
                </div>
                <Building2 className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Patients
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {analyticsData.totalPatients}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Avg Patients/Physician
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {analyticsData.avgPatientsPerPhysician}
                  </p>
                </div>
                <PieChart className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Speciality Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Physician Specialities
              </CardTitle>
            </CardHeader>
            <CardContent>
              {Object.keys(analyticsData.specialityBreakdown).length > 0 ? (
                renderBarChart(
                  analyticsData.specialityBreakdown,
                  "Distribution by Speciality",
                  "bg-blue-500"
                )
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No data available
                </p>
              )}
            </CardContent>
          </Card>

          {/* Hospital Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Hospital Code Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              {Object.keys(analyticsData.hospitalCodeDistribution).length >
              0 ? (
                renderBarChart(
                  analyticsData.hospitalCodeDistribution,
                  "Patients by Hospital Code",
                  "bg-green-500"
                )
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No data available
                </p>
              )}
            </CardContent>
          </Card>

          {/* Patient Source Breakdown */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Patient Funding Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              {Object.keys(analyticsData.patientSourceBreakdown).length > 0 ? (
                renderBarChart(
                  analyticsData.patientSourceBreakdown,
                  "Distribution by Funding Source",
                  "bg-purple-500"
                )
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No data available
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
