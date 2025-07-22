"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Stethoscope, Hospital, CreditCard, Trash2 } from "lucide-react";
import Image from "next/image";

const sourceFundLabels = [
  "OOP Without Insurance",
  "OOP With Insurance",
  "Government Schemes",
  "Private Insurance",
  "Employer Sponsored",
  "CGHS",
  "Others",
];

export default function HealthcareSurveyForm() {
    const MAX_HOSPITALS = 10;
    const [formData, setFormData] = useState({
        physicianName: "",
        uniqueId: "",
        speciality: "",
        visitingHospitals: "",
        hospitalData: [{ bmtPatients: "", monthlyPatients: "" }],
        sourceFunds: {
            oopWithoutInsurance: "",
            oopWithInsurance: "",
            cghs: "",
            esi: "",
            railways: "",
            echs: "",
            psus: "",
            stateGovt: "",
        },
    });

    const [sourceFunds, setSourceFunds] = useState({
        oopWithoutInsurance: "",
        oopWithInsurance: "",
        cghs: "",
        esi: "",
        railways: "",
        echs: "",
        psus: "",
        stateGovt: "",
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: "",
            }));
        }
    };

    // const handleHospitalDataChange = (hospital, field, value) => {
    //   setFormData((prev) => ({
    //     ...prev,
    //     hospitalData: {
    //       ...prev.hospitalData,
    //       [hospital]: {
    //         ...prev.hospitalData[hospital],
    //         [field]: value,
    //       },
    //     },
    //   }));
    // };

    // const handleSourceFundsChange = (source, value) => {
    //   setFormData((prev) => ({
    //     ...prev,
    //     sourceFunds: {
    //       ...prev.sourceFunds,
    //       [source]: value,
    //     },
    //   }));
    // };

    // const calculateTotals = () => {
    //   const { hospitalData } = formData;
    //   const totalBMT = Object.values(hospitalData).reduce(
    //     (sum, hospital) => sum + (parseInt(hospital.bmtPatients) || 0),
    //     0
    //   );
    //   const totalMonthly = Object.values(hospitalData).reduce(
    //     (sum, hospital) => sum + (parseInt(hospital.monthlyPatients) || 0),
    //     0
    //   );
    //   return { totalBMT, totalMonthly };
    // };

    // const calculateSourceTotal = () => {
    //   const { sourceFunds } = formData;
    //   return Object.values(sourceFunds).reduce(
    //     (sum, value) => sum + (parseFloat(value) || 0),
    //     0
    //   );
    // };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.physicianName.trim()) {
            newErrors.physicianName = "Physician name is required";
        }
        if (!formData.uniqueId.trim()) {
            newErrors.uniqueId = "Unique ID is required";
        }
        if (!formData.speciality.trim()) {
            newErrors.speciality = "Speciality is required";
        }
        if (!formData.visitingHospitals.trim()) {
            newErrors.visitingHospitals = "Number of visiting hospitals is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form submitted:", formData);
            alert("Survey submitted successfully!");
        }
    };


    // const sourceTotal = calculateSourceTotal();







    // const [hospitals, setHospitals] = useState([
    //   { bmtPatients: "", monthlyPatients: "" }, // Default Hospital
    // ]);

    const addHospital = () => {
        if (formData.hospitalData.length < MAX_HOSPITALS) {
            setFormData((prev) => ({
                ...prev,
                hospitalData: [...prev.hospitalData, { bmtPatients: "", monthlyPatients: "" }],
            }));
        } else {
            alert("You can add up to 10 hospitals only.");
        }
    };

    const removeHospital = (index) => {
        if (formData.hospitalData.length > 1) {
            const updated = [...formData.hospitalData];
            updated.splice(index, 1);
            setFormData((prev) => ({
                ...prev,
                hospitalData: updated,
            }));
        }
    };

    const updateHospitalData = (index, field, value) => {
        const updated = [...formData.hospitalData];
        updated[index][field] = value;
        setFormData((prev) => ({
            ...prev,
            hospitalData: updated,
        }));
    };

    const totalBMT = formData.hospitalData.reduce(
        (sum, h) => sum + (parseInt(h.bmtPatients) || 0),
        0
    );
    const totalMonthly = formData.hospitalData.reduce(
        (sum, h) => sum + (parseInt(h.monthlyPatients) || 0),
        0
    );


    // Start Code for Source of Funds Section
    // Calculate total of entered values
    const totalRaw = Object.values(sourceFunds).reduce(
        (sum, val) => sum + (parseFloat(val) || 0),
        0
    );

    // Handle input changes
    const handleChange = (key, value) => {
        setSourceFunds((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    // Format key names nicely
    const formatKey = (key) =>
        key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase());
    // End of New Code for Source of Funds Section

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-5 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <div className="flex flex-col sm:flex-row items-center lg:items-end justify-center gap-3 mb-4 text-center">
                        <Image
                            src="/assets/common/ImmunoACT_Logo.png"
                            alt="ImmunoACT Logo"
                            width={140}
                            height={100}
                            className="w-[180px] h-auto md:w-[140px] lg:w-[160px]"
                            unoptimized
                            priority
                        />
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                            Healthcare Survey Form
                        </h1>
                    </div>
                    <p className="text-base md:text-lg text-gray-600">
                        Physician Data Collection for Sales Representatives
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Physician Info */}
                    <Card className="shadow-lg border-0">
                        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                            <CardTitle className="flex items-center gap-2">
                                <Stethoscope className="w-5 h-5" />
                                Physician Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    {
                                        id: "physicianName",
                                        label: "Name of the Physician *",
                                        placeholder: "Enter physician name",
                                    },
                                    // {
                                    //   id: "uniqueId",
                                    //   label: "Unique ID *",
                                    //   placeholder: "Enter unique ID",
                                    // },
                                    {
                                        id: "speciality",
                                        label: "Speciality *",
                                        placeholder: "Enter speciality",
                                    },
                                    // {
                                    //   id: "visitingHospitals",
                                    //   label: "Number of Visiting Hospitals *",
                                    //   placeholder: "Enter number",
                                    //   type: "number",
                                    // },
                                ].map(({ id, label, placeholder, type = "text" }) => (
                                    <div className="space-y-2" key={id}>
                                        <Label htmlFor={id} className="text-sm font-medium">
                                            {label}
                                        </Label>
                                        <Input
                                            id={id}
                                            type={type}
                                            value={formData[id]}
                                            onChange={(e) => handleInputChange(id, e.target.value)}
                                            placeholder={placeholder}
                                            className={`transition-all duration-200 ${errors[id] ? "border-red-500" : "border-gray-300"
                                                }`}
                                        />
                                        {errors[id] && (
                                            <p className="text-red-500 text-sm">{errors[id]}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Hospital Data */}
                    <Card className="shadow-lg border-0">
                        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                            <CardTitle className="flex items-center gap-2">
                                <Hospital className="w-5 h-5" />
                                Hospital Data
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="overflow-x-auto w-full">
                                <table className="w-full border-collapse border border-gray-300 min-w-[600px] md:min-w-full">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="border border-gray-300 p-3 text-left font-medium">
                                                Metric
                                            </th>
                                            {formData.hospitalData.map((_, index) => (
                                                <th
                                                    key={index}
                                                    className="border border-gray-300 p-3 text-center font-medium relative"
                                                >
                                                    <div className="flex items-center justify-center gap-2">
                                                        <span>Hospital {index + 1}</span>
                                                        {index !== 0 && (
                                                            <button
                                                                onClick={() => removeHospital(index)}
                                                                className="text-red-600 hover:text-red-800"
                                                                title="Remove Hospital"
                                                            >
                                                                <Trash2 className="w-4 h-4 cursor-pointer" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </th>
                                            ))}
                                            <th className="border border-gray-300 p-3 text-center font-medium bg-blue-50">
                                                Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {["bmtPatients", "monthlyPatients"].map((field) => (
                                            <tr key={field}>
                                                <td className="border border-gray-300 p-3 font-medium">
                                                    {field === "bmtPatients"
                                                        ? "Number of BMT patients"
                                                        : "Number of patients in a month"}
                                                </td>
                                                {formData.hospitalData.map((hospital, index) => (
                                                    <td key={index} className="border border-gray-300 p-2">
                                                        <Input
                                                            type="number"
                                                            value={hospital[field]}
                                                            onChange={(e) =>
                                                                updateHospitalData(index, field, e.target.value)
                                                            }
                                                            placeholder="0"
                                                            className="text-center"
                                                        />
                                                    </td>
                                                ))}
                                                <td className="border border-gray-300 p-3 text-center font-bold bg-blue-50">
                                                    {field === "bmtPatients" ? totalBMT : totalMonthly}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <Button
                                    onClick={addHospital}
                                    disabled={formData.hospitalData.length >= MAX_HOSPITALS}
                                    className="bg-green-600 text-white hover:bg-green-700 cursor-pointer transition-all duration-200"
                                >
                                    + Add Hospital
                                </Button>
                            </div>
                        </CardContent>
                    </Card>


                    {/* Source of Funds */}
                    <Card className="shadow-lg border-0">
                        <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="w-5 h-5" />
                                Source of Funds
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {Object.keys(sourceFunds).map((key) => {
                                    const rawValue = parseFloat(sourceFunds[key]) || 0;
                                    const percentage =
                                        totalRaw > 0 ? ((rawValue / totalRaw) * 100).toFixed(1) : "0.0";

                                    return (
                                        <div key={key} className="space-y-2">
                                            <Label htmlFor={key} className="text-sm font-medium">
                                                {formatKey(key)}
                                            </Label>
                                            <Input
                                                id={key}
                                                type="number"
                                                step="0.1"
                                                value={sourceFunds[key]}
                                                onChange={(e) => handleChange(key, e.target.value)}
                                                placeholder="Enter amount"
                                            />
                                            <p className="text-sm text-gray-600">
                                                {percentage}% of total
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            <Separator className="my-6" />

                            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                                <span className="text-lg font-medium">Total Source of Funds:</span>
                                <span className="text-2xl font-bold text-blue-600">
                                    {
                                        Object.values(sourceFunds).every((v) => v.trim() !== "")
                                            ? "100%"
                                            : Object.values(sourceFunds).some((v) => v.trim() !== "")
                                                ? `${Math.round(
                                                    (Object.values(sourceFunds).filter((v) => v.trim() !== "").length /
                                                        Object.keys(sourceFunds).length) *
                                                    100
                                                )}%`
                                                : "0%"
                                    }
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit */}
                    <div className="flex justify-center pt-6 px-4">
                        <Button
                            type="submit"
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-lg font-medium rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 cursor-pointer"
                        >
                            Submit Survey
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
