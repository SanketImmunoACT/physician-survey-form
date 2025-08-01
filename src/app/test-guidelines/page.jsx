"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, RefreshCw, BookOpen, Info } from "lucide-react";

export default function TestGuidelinesPage() {
  const [testFormId, setTestFormId] = useState("");

  const testScenarios = [
    {
      title: "New Form (with formId)",
      description: "Simulates opening a new form with a specific form ID",
      url: "/form?formId=FORM_123&new=true",
      color: "bg-blue-50 border-blue-200 text-blue-800"
    },
    {
      title: "New Form (explicit new flag)",
      description: "Simulates opening a new form with explicit new=true flag",
      url: "/form?new=true",
      color: "bg-green-50 border-green-200 text-green-800"
    },
    {
      title: "Existing Form (no guidelines)",
      description: "Simulates opening an existing form - guidelines won't show",
      url: "/form",
      color: "bg-gray-50 border-gray-200 text-gray-800"
    },
    {
      title: "Form with Custom ID",
      description: "Test with a custom form ID",
      url: `/form?formId=${testFormId || "CUSTOM_001"}`,
      color: "bg-purple-50 border-purple-200 text-purple-800"
    }
  ];

  const handleResetGuidelines = () => {
    localStorage.removeItem("guidelinesSeen");
    alert("Guidelines reset! Now try opening a new form.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">
              Guidelines Popup Test Page
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Test different scenarios for the guidelines popup functionality
          </p>
        </div>

        {/* Instructions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5" />
              How to Test
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <strong>1.</strong> The guidelines popup will show when:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>User hasn't seen guidelines before (localStorage check)</li>
                <li>URL contains <code>formId</code> parameter (new form)</li>
                <li>URL contains <code>new=true</code> parameter</li>
              </ul>
              <p>
                <strong>2.</strong> Once guidelines are seen, they won't show again unless reset
              </p>
              <p>
                <strong>3.</strong> Use the "Reset Guidelines" button to clear the localStorage and test again
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Test Scenarios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {testScenarios.map((scenario, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className={`text-lg ${scenario.color.split(' ')[2]}`}>
                  {scenario.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  {scenario.description}
                </p>
                <div className="space-y-3">
                  <div className="text-xs bg-gray-100 p-2 rounded font-mono break-all">
                    {scenario.url}
                  </div>
                  <Link href={scenario.url}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Test This Scenario
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Custom Form ID Test */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Custom Form ID Test</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter custom form ID (e.g., FORM_ABC123)"
                value={testFormId}
                onChange={(e) => setTestFormId(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Link href={`/form?formId=${testFormId || "CUSTOM_001"}`}>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Test Custom ID
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Control Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Control Panel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-yellow-800">Reset Guidelines State</h4>
                  <p className="text-sm text-yellow-700">
                    Clear localStorage to test guidelines popup again
                  </p>
                </div>
                <Button
                  onClick={handleResetGuidelines}
                  variant="outline"
                  className="border-yellow-300 text-yellow-700 hover:bg-yellow-100"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset Guidelines
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-blue-800">Current Guidelines State</h4>
                  <p className="text-sm text-blue-700">
                    Check if guidelines have been seen before
                  </p>
                </div>
                <div className="text-sm">
                  <span className={`px-2 py-1 rounded-full ${
                    typeof window !== 'undefined' && localStorage.getItem("guidelinesSeen")
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {typeof window !== 'undefined' && localStorage.getItem("guidelinesSeen")
                      ? "Guidelines Seen"
                      : "Guidelines Not Seen"
                    }
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 