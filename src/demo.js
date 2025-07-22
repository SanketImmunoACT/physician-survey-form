"use client";

import React, { useState } from "react";

const sourceFundLabels = [
  "OOP Without Insurance",
  "OOP With Insurance",
  "Government Schemes",
  "Private Insurance",
  "Employer Sponsored",
  "CGHS",
  "Others",
];

export default function SurveyForm() {
  const [hospitals, setHospitals] = useState([
    { name: "Hospital 1", patientsPerMonth: "", sourceFunds: {} },
  ]);

  const handleAddHospital = () => {
    const newHospital = {
      name: `Hospital ${hospitals.length + 1}`,
      patientsPerMonth: "",
      sourceFunds: {},
    };
    setHospitals((prev) => [...prev, newHospital]);
  };

  const handlePatientsChange = (index, value) => {
    const updated = [...hospitals];
    updated[index].patientsPerMonth = value;
    setHospitals(updated);
  };

  const handleSourceFundChange = (hospitalIndex, fundType, value) => {
    const updated = [...hospitals];
    updated[hospitalIndex].sourceFunds[fundType] = value;
    setHospitals(updated);
  };

  const getTotalFilled = (sourceFunds) => {
    return Object.values(sourceFunds).reduce((sum, val) => {
      const num = parseInt(val, 10);
      return isNaN(num) ? sum : sum + num;
    }, 0);
  };

  const getPercentageFilled = (hospital) => {
    const { patientsPerMonth, sourceFunds } = hospital;
    const total = getTotalFilled(sourceFunds);
    const totalPatients = parseInt(patientsPerMonth, 10);

    if (!totalPatients || totalPatients === 0) return "--%";
    if (Object.keys(sourceFunds).length === 0) return "--%";

    const percentage = Math.round((total / totalPatients) * 100);
    return percentage === 100 ? "100%" : `${percentage}%`;
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-center mb-4">Healthcare Survey Form</h1>

      {hospitals.map((hospital, index) => (
        <div key={index} className="border border-gray-300 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">{hospital.name}</h2>

          {/* Patients per month */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">
              Number of patients in a month:
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={hospital.patientsPerMonth}
              onChange={(e) =>
                handlePatientsChange(index, e.target.value)
              }
            />
          </div>

          {/* Source of Funds */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sourceFundLabels.map((label) => (
              <div key={label}>
                <label className="block text-sm font-medium mb-1">
                  {label}
                </label>
                <input
                  type="number"
                  min={0}
                  className="w-full p-2 border rounded"
                  value={hospital.sourceFunds[label] || ""}
                  onChange={(e) =>
                    handleSourceFundChange(index, label, e.target.value)
                  }
                  disabled={!hospital.patientsPerMonth}
                />
              </div>
            ))}
          </div>

          {/* Total Display */}
          <div className="mt-4 flex justify-between items-center bg-gray-100 px-4 py-2 rounded">
            <span className="font-semibold">Total Source of Funds:</span>
            <span
              className={`text-lg font-bold ${
                getPercentageFilled(hospital) === "100%" ? "text-green-600" : "text-blue-600"
              }`}
            >
              {getPercentageFilled(hospital)}
            </span>
          </div>
        </div>
      ))}

      {/* Add Hospital */}
      <button
        onClick={handleAddHospital}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        + Add Hospital
      </button>
    </div>
  );
}
