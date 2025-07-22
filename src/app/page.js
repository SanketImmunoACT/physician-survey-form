// // "use client";
// // import { useState } from "react";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Separator } from "@/components/ui/separator";
// // import { Stethoscope, Hospital, CreditCard, Trash2, BarChart3, Activity } from "lucide-react";
// // import Image from "next/image";

// // export default function HealthcareSurveyForm() {
// //   const MAX_HOSPITALS = 10;
// //   const [formData, setFormData] = useState({
// //     physicianName: "",
// //     uniqueId: "",
// //     speciality: "",
// //     visitingHospitals: "",
// //     hospitalData: [{ bmtPatients: "", monthlyPatients: "" }],
// //     sourceFunds: {
// //       oopWithoutInsurance: "",
// //       oopWithInsurance: "",
// //       cghs: "",
// //       esi: "",
// //       railways: "",
// //       echs: "",
// //       psus: "",
// //       stateGovt: "",
// //     },
// //     hospitalCodeBreakdown: {
// //       hospital1: {
// //         newlyDiagnosed: '',
// //         relapsedRefractory: '',
// //         secondOpinion: ''
// //       },
// //       hospital2: {
// //         newlyDiagnosed: '',
// //         relapsedRefractory: '',
// //         secondOpinion: ''
// //       },
// //       hospital3: {
// //         newlyDiagnosed: '',
// //         relapsedRefractory: '',
// //         secondOpinion: ''
// //       }
// //     },
// //     patientDistribution: {
// //       allPatients: '',
// //       nhlPatients: '',
// //       mmPatients: '',
// //       otherHematMalignancies: '',
// //       glioblastomas: '',
// //       otherSolidTumours: ''
// //     }
// //   });

// //   const [sourceFunds, setSourceFunds] = useState({
// //     oopWithoutInsurance: "",
// //     oopWithInsurance: "",
// //     cghs: "",
// //     esi: "",
// //     railways: "",
// //     echs: "",
// //     psus: "",
// //     stateGovt: "",
// //   });

// //   const [errors, setErrors] = useState({});

// //   const handleInputChange = (field, value) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       [field]: value,
// //     }));
// //     if (errors[field]) {
// //       setErrors((prev) => ({
// //         ...prev,
// //         [field]: "",
// //       }));
// //     }
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};
// //     if (!formData.physicianName.trim()) {
// //       newErrors.physicianName = "Physician name is required";
// //     }
// //     if (!formData.uniqueId.trim()) {
// //       newErrors.uniqueId = "Unique ID is required";
// //     }
// //     if (!formData.speciality.trim()) {
// //       newErrors.speciality = "Speciality is required";
// //     }
// //     if (!formData.visitingHospitals.trim()) {
// //       newErrors.visitingHospitals = "Number of visiting hospitals is required";
// //     }
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (validateForm()) {
// //       console.log("Form submitted:", formData);
// //       alert("Survey submitted successfully!");
// //     }
// //   };

// //   const addHospital = () => {
// //     if (formData.hospitalData.length < MAX_HOSPITALS) {
// //       setFormData((prev) => ({
// //         ...prev,
// //         hospitalData: [...prev.hospitalData, { bmtPatients: "", monthlyPatients: "" }],
// //       }));
// //     } else {
// //       alert("You can add up to 10 hospitals only.");
// //     }
// //   };

// //   const removeHospital = (index) => {
// //     if (formData.hospitalData.length > 1) {
// //       const updated = [...formData.hospitalData];
// //       updated.splice(index, 1);
// //       setFormData((prev) => ({
// //         ...prev,
// //         hospitalData: updated,
// //       }));
// //     }
// //   };

// //   const updateHospitalData = (index, field, value) => {
// //     const updated = [...formData.hospitalData];
// //     updated[index][field] = value;
// //     setFormData((prev) => ({
// //       ...prev,
// //       hospitalData: updated,
// //     }));
// //   };

// //   const totalBMT = formData.hospitalData.reduce(
// //     (sum, h) => sum + (parseInt(h.bmtPatients) || 0),
// //     0
// //   );
// //   const totalMonthly = formData.hospitalData.reduce(
// //     (sum, h) => sum + (parseInt(h.monthlyPatients) || 0),
// //     0
// //   );

// //   // Start Code for Source of Funds Section
// //   // Calculate total of entered values
// //   const totalRaw = Object.values(sourceFunds).reduce(
// //     (sum, val) => sum + (parseFloat(val) || 0),
// //     0
// //   );

// //   // Handle input changes
// //   const handleChange = (key, value) => {
// //     setSourceFunds((prev) => ({
// //       ...prev,
// //       [key]: value,
// //     }));
// //   };

// //   // Format key names nicely
// //   const formatKey = (key) =>
// //     key
// //       .replace(/([A-Z])/g, " $1")
// //       .replace(/^./, (str) => str.toUpperCase());
// //   // End of New Code for Source of Funds Section

// //   const handleHospitalCodeBreakdownChange = (hospital, field, value) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       hospitalCodeBreakdown: {
// //         ...prev.hospitalCodeBreakdown,
// //         [hospital]: {
// //           ...prev.hospitalCodeBreakdown[hospital],
// //           [field]: value
// //         }
// //       }
// //     }));
// //   };

// //   const handlePatientDistributionChange = (field, value) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       patientDistribution: {
// //         ...prev.patientDistribution,
// //         [field]: value
// //       }
// //     }));
// //   };

// //   const calculatePatientDistributionTotal = () => {
// //     const { patientDistribution } = formData;
// //     return Object.values(patientDistribution).reduce((sum, value) =>
// //       sum + (parseFloat(value) || 0), 0
// //     );
// //   };

// //   const patientDistributionTotal = calculatePatientDistributionTotal();

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-5 px-6">
// //       <div className="max-w-6xl mx-auto">
// //         <div className="text-center mb-8">
// //           <div className="flex flex-col sm:flex-row items-center lg:items-end justify-center gap-3 mb-4 text-center">
// //             <Image
// //               src="/assets/common/ImmunoACT_Logo.png"
// //               alt="ImmunoACT Logo"
// //               width={140}
// //               height={100}
// //               className="w-[180px] h-auto md:w-[140px] lg:w-[160px]"
// //               unoptimized
// //               priority
// //             />
// //             <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
// //               Healthcare Survey Form
// //             </h1>
// //           </div>
// //           <p className="text-base md:text-lg text-gray-600">
// //             Physician Data Collection for Sales Representatives
// //           </p>
// //         </div>

// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           {/* Physician Info */}
// //           <Card className="shadow-lg border-0">
// //             <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
// //               <CardTitle className="flex items-center gap-2">
// //                 <Stethoscope className="w-5 h-5" />
// //                 Physician Information
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent className="p-6">
// //               <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
// //                 {[
// //                   {
// //                     id: "physicianName",
// //                     label: "Name of the Physician *",
// //                     placeholder: "Enter physician name",
// //                   },
// //                   // {
// //                   //   id: "uniqueId",
// //                   //   label: "Unique ID *",
// //                   //   placeholder: "Enter unique ID",
// //                   // },
// //                   {
// //                     id: "speciality",
// //                     label: "Speciality *",
// //                     placeholder: "Enter speciality",
// //                   },
// //                   // {
// //                   //   id: "visitingHospitals",
// //                   //   label: "Number of Visiting Hospitals *",
// //                   //   placeholder: "Enter number",
// //                   //   type: "number",
// //                   // },
// //                 ].map(({ id, label, placeholder, type = "text" }) => (
// //                   <div className="space-y-2" key={id}>
// //                     <Label htmlFor={id} className="text-sm font-medium">
// //                       {label}
// //                     </Label>
// //                     <Input
// //                       id={id}
// //                       type={type}
// //                       value={formData[id]}
// //                       onChange={(e) => handleInputChange(id, e.target.value)}
// //                       placeholder={placeholder}
// //                       className={`transition-all duration-200 ${errors[id] ? "border-red-500" : "border-gray-300"
// //                         }`}
// //                     />
// //                     {errors[id] && (
// //                       <p className="text-red-500 text-sm">{errors[id]}</p>
// //                     )}
// //                   </div>
// //                 ))}
// //               </div>
// //             </CardContent>
// //           </Card>

// //           {/* Hospital Data */}
// //           <Card className="shadow-lg border-0">
// //             <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
// //               <CardTitle className="flex items-center gap-2">
// //                 <Hospital className="w-5 h-5" />
// //                 Hospital Data
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent className="p-6">
// //               <div className="overflow-x-auto w-full">
// //                 <table className="w-full border-collapse border border-gray-300 min-w-[600px] md:min-w-full">
// //                   <thead>
// //                     <tr className="bg-gray-50">
// //                       <th className="border border-gray-300 p-3 text-left font-medium">
// //                         Metric
// //                       </th>
// //                       {formData.hospitalData.map((_, index) => (
// //                         <th
// //                           key={index}
// //                           className="border border-gray-300 p-3 text-center font-medium relative"
// //                         >
// //                           <div className="flex items-center justify-center gap-2">
// //                             <span>Hospital {index + 1}</span>
// //                             {index !== 0 && (
// //                               <button
// //                                 onClick={() => removeHospital(index)}
// //                                 className="text-red-600 hover:text-red-800"
// //                                 title="Remove Hospital"
// //                               >
// //                                 <Trash2 className="w-4 h-4 cursor-pointer" />
// //                               </button>
// //                             )}
// //                           </div>
// //                         </th>
// //                       ))}
// //                       <th className="border border-gray-300 p-3 text-center font-medium bg-blue-50">
// //                         Total
// //                       </th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {["bmtPatients", "monthlyPatients"].map((field) => (
// //                       <tr key={field}>
// //                         <td className="border border-gray-300 p-3 font-medium">
// //                           {field === "bmtPatients"
// //                             ? "Number of BMT patients"
// //                             : "Number of patients in a month"}
// //                         </td>
// //                         {formData.hospitalData.map((hospital, index) => (
// //                           <td key={index} className="border border-gray-300 p-2">
// //                             <Input
// //                               type="number"
// //                               value={hospital[field]}
// //                               onChange={(e) =>
// //                                 updateHospitalData(index, field, e.target.value)
// //                               }
// //                               placeholder="0"
// //                               className="text-center"
// //                             />
// //                           </td>
// //                         ))}
// //                         <td className="border border-gray-300 p-3 text-center font-bold bg-blue-50">
// //                           {field === "bmtPatients" ? totalBMT : totalMonthly}
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>

// //               <div className="mt-6 flex justify-end">
// //                 <Button
// //                   onClick={addHospital}
// //                   disabled={formData.hospitalData.length >= MAX_HOSPITALS}
// //                   className="bg-green-600 text-white hover:bg-green-700 cursor-pointer transition-all duration-200"
// //                 >
// //                   + Add Hospital
// //                 </Button>
// //               </div>
// //             </CardContent>
// //           </Card>


// //           {/* Source of Funds */}
// //           <Card className="shadow-lg border-0">
// //             <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
// //               <CardTitle className="flex items-center gap-2">
// //                 <CreditCard className="w-5 h-5" />
// //                 Source of Funds
// //               </CardTitle>
// //             </CardHeader>

// //             <CardContent className="p-6">
// //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //                 {Object.keys(sourceFunds).map((key) => {
// //                   const rawValue = parseFloat(sourceFunds[key]) || 0;
// //                   const percentage =
// //                     totalRaw > 0 ? ((rawValue / totalRaw) * 100).toFixed(1) : "0.0";

// //                   return (
// //                     <div key={key} className="space-y-2">
// //                       <Label htmlFor={key} className="text-sm font-medium">
// //                         {formatKey(key)}
// //                       </Label>
// //                       <Input
// //                         id={key}
// //                         type="number"
// //                         step="0.1"
// //                         value={sourceFunds[key]}
// //                         onChange={(e) => handleChange(key, e.target.value)}
// //                         placeholder="Enter amount"
// //                       />
// //                       <p className="text-sm text-gray-600">
// //                         {percentage}% of total
// //                       </p>
// //                     </div>
// //                   );
// //                 })}
// //               </div>

// //               <Separator className="my-6" />

// //               <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
// //                 <span className="text-lg font-medium">Total Source of Funds:</span>
// //                 <span className="text-2xl font-bold text-blue-600">
// //                   {
// //                     Object.values(sourceFunds).every((v) => v.trim() !== "")
// //                       ? "100%"
// //                       : Object.values(sourceFunds).some((v) => v.trim() !== "")
// //                         ? `${Math.round(
// //                           (Object.values(sourceFunds).filter((v) => v.trim() !== "").length /
// //                             Object.keys(sourceFunds).length) *
// //                           100
// //                         )}%`
// //                         : "0%"
// //                   }
// //                 </span>
// //               </div>
// //             </CardContent>
// //           </Card>



// //           {/* Hospital Code Breakdown (Table 6) */}
// //           <Card className="shadow-lg border-0">
// //             <CardHeader className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white">
// //               <CardTitle className="flex items-center gap-2">
// //                 <Activity className="w-5 h-5" />
// //                 Hospital Code Breakdown (Table 6)
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent className="p-6">
// //               <div className="overflow-x-auto">
// //                 <table className="w-full border-collapse border border-gray-300">
// //                   <thead>
// //                     <tr className="bg-yellow-50">
// //                       <th className="border border-gray-300 p-3 text-left font-medium">Hospital Code</th>
// //                       <th className="border border-gray-300 p-3 text-center font-medium">Newly Diagnosed %</th>
// //                       <th className="border border-gray-300 p-3 text-center font-medium">Relapsed / Refractory %</th>
// //                       <th className="border border-gray-300 p-3 text-center font-medium">2nd Opinion %</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     <tr>
// //                       <td className="border border-gray-300 p-3 font-medium bg-yellow-50">Hospital Code 1</td>
// //                       <td className="border border-gray-300 p-2">
// //                         <Input
// //                           type="number"
// //                           step="0.1"
// //                           value={formData.hospitalCodeBreakdown.hospital1.newlyDiagnosed}
// //                           onChange={(e) => handleHospitalCodeBreakdownChange('hospital1', 'newlyDiagnosed', e.target.value)}
// //                           placeholder="0"
// //                           className="text-center"
// //                         />
// //                       </td>
// //                       <td className="border border-gray-300 p-2">
// //                         <Input
// //                           type="number"
// //                           step="0.1"
// //                           value={formData.hospitalCodeBreakdown.hospital1.relapsedRefractory}
// //                           onChange={(e) => handleHospitalCodeBreakdownChange('hospital1', 'relapsedRefractory', e.target.value)}
// //                           placeholder="0"
// //                           className="text-center"
// //                         />
// //                       </td>
// //                       <td className="border border-gray-300 p-2">
// //                         <Input
// //                           type="number"
// //                           step="0.1"
// //                           value={formData.hospitalCodeBreakdown.hospital1.secondOpinion}
// //                           onChange={(e) => handleHospitalCodeBreakdownChange('hospital1', 'secondOpinion', e.target.value)}
// //                           placeholder="0"
// //                           className="text-center"
// //                         />
// //                       </td>
// //                     </tr>
// //                     <tr>
// //                       <td className="border border-gray-300 p-3 font-medium bg-yellow-50">Hospital Code 2</td>
// //                       <td className="border border-gray-300 p-2">
// //                         <Input
// //                           type="number"
// //                           step="0.1"
// //                           value={formData.hospitalCodeBreakdown.hospital2.newlyDiagnosed}
// //                           onChange={(e) => handleHospitalCodeBreakdownChange('hospital2', 'newlyDiagnosed', e.target.value)}
// //                           placeholder="0"
// //                           className="text-center"
// //                         />
// //                       </td>
// //                       <td className="border border-gray-300 p-2">
// //                         <Input
// //                           type="number"
// //                           step="0.1"
// //                           value={formData.hospitalCodeBreakdown.hospital2.relapsedRefractory}
// //                           onChange={(e) => handleHospitalCodeBreakdownChange('hospital2', 'relapsedRefractory', e.target.value)}
// //                           placeholder="0"
// //                           className="text-center"
// //                         />
// //                       </td>
// //                       <td className="border border-gray-300 p-2">
// //                         <Input
// //                           type="number"
// //                           step="0.1"
// //                           value={formData.hospitalCodeBreakdown.hospital2.secondOpinion}
// //                           onChange={(e) => handleHospitalCodeBreakdownChange('hospital2', 'secondOpinion', e.target.value)}
// //                           placeholder="0"
// //                           className="text-center"
// //                         />
// //                       </td>
// //                     </tr>
// //                     <tr>
// //                       <td className="border border-gray-300 p-3 font-medium bg-yellow-50">Hospital Code 3</td>
// //                       <td className="border border-gray-300 p-2">
// //                         <Input
// //                           type="number"
// //                           step="0.1"
// //                           value={formData.hospitalCodeBreakdown.hospital3.newlyDiagnosed}
// //                           onChange={(e) => handleHospitalCodeBreakdownChange('hospital3', 'newlyDiagnosed', e.target.value)}
// //                           placeholder="0"
// //                           className="text-center"
// //                         />
// //                       </td>
// //                       <td className="border border-gray-300 p-2">
// //                         <Input
// //                           type="number"
// //                           step="0.1"
// //                           value={formData.hospitalCodeBreakdown.hospital3.relapsedRefractory}
// //                           onChange={(e) => handleHospitalCodeBreakdownChange('hospital3', 'relapsedRefractory', e.target.value)}
// //                           placeholder="0"
// //                           className="text-center"
// //                         />
// //                       </td>
// //                       <td className="border border-gray-300 p-2">
// //                         <Input
// //                           type="number"
// //                           step="0.1"
// //                           value={formData.hospitalCodeBreakdown.hospital3.secondOpinion}
// //                           onChange={(e) => handleHospitalCodeBreakdownChange('hospital3', 'secondOpinion', e.target.value)}
// //                           placeholder="0"
// //                           className="text-center"
// //                         />
// //                       </td>
// //                     </tr>
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </CardContent>
// //           </Card>

// //           {/* Patient Distribution (Table 7) */}
// //           <Card className="shadow-lg border-0">
// //             <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
// //               <CardTitle className="flex items-center gap-2">
// //                 <BarChart3 className="w-5 h-5" />
// //                 Patient Distribution
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent className="p-6">
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 <div className="space-y-4">
// //                   <div className="space-y-2">
// //                     <Label htmlFor="allPatients" className="text-sm font-medium">
// //                       % ALL patients
// //                     </Label>
// //                     <Input
// //                       id="allPatients"
// //                       type="number"
// //                       step="0.1"
// //                       value={formData.patientDistribution.allPatients}
// //                       onChange={(e) => handlePatientDistributionChange('allPatients', e.target.value)}
// //                       placeholder="0"
// //                     />
// //                   </div>

// //                   <div className="space-y-2">
// //                     <Label htmlFor="nhlPatients" className="text-sm font-medium">
// //                       % NHL Patients
// //                     </Label>
// //                     <Input
// //                       id="nhlPatients"
// //                       type="number"
// //                       step="0.1"
// //                       value={formData.patientDistribution.nhlPatients}
// //                       onChange={(e) => handlePatientDistributionChange('nhlPatients', e.target.value)}
// //                       placeholder="0"
// //                     />
// //                   </div>

// //                   <div className="space-y-2">
// //                     <Label htmlFor="mmPatients" className="text-sm font-medium">
// //                       % MM Patients
// //                     </Label>
// //                     <Input
// //                       id="mmPatients"
// //                       type="number"
// //                       step="0.1"
// //                       value={formData.patientDistribution.mmPatients}
// //                       onChange={(e) => handlePatientDistributionChange('mmPatients', e.target.value)}
// //                       placeholder="0"
// //                     />
// //                   </div>
// //                 </div>

// //                 <div className="space-y-4">
// //                   <div className="space-y-2">
// //                     <Label htmlFor="otherHematMalignancies" className="text-sm font-medium">
// //                       % Other Hemat malignancies
// //                     </Label>
// //                     <Input
// //                       id="otherHematMalignancies"
// //                       type="number"
// //                       step="0.1"
// //                       value={formData.patientDistribution.otherHematMalignancies}
// //                       onChange={(e) => handlePatientDistributionChange('otherHematMalignancies', e.target.value)}
// //                       placeholder="0"
// //                     />
// //                   </div>

// //                   <div className="space-y-2">
// //                     <Label htmlFor="glioblastomas" className="text-sm font-medium">
// //                       % Glioblastomas
// //                     </Label>
// //                     <Input
// //                       id="glioblastomas"
// //                       type="number"
// //                       step="0.1"
// //                       value={formData.patientDistribution.glioblastomas}
// //                       onChange={(e) => handlePatientDistributionChange('glioblastomas', e.target.value)}
// //                       placeholder="0"
// //                     />
// //                   </div>

// //                   <div className="space-y-2">
// //                     <Label htmlFor="otherSolidTumours" className="text-sm font-medium">
// //                       % Other solid tumours
// //                     </Label>
// //                     <Input
// //                       id="otherSolidTumours"
// //                       type="number"
// //                       step="0.1"
// //                       value={formData.patientDistribution.otherSolidTumours}
// //                       onChange={(e) => handlePatientDistributionChange('otherSolidTumours', e.target.value)}
// //                       placeholder="0"
// //                     />
// //                   </div>
// //                 </div>
// //               </div>

// //               <Separator className="my-6" />

// //               <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-lg">
// //                 <span className="text-lg font-medium">Total Patient Distribution:</span>
// //                 <span className="text-2xl font-bold text-indigo-600">{patientDistributionTotal.toFixed(0)}%</span>
// //               </div>

// //               <div className="mt-4 p-3 bg-gray-50 rounded-lg">
// //                 <p className="text-sm text-gray-600 italic">* Age distribution if required</p>
// //               </div>
// //             </CardContent>
// //           </Card>


// //           {/* Submit */}
// //           <div className="flex justify-center pt-6 px-4">
// //             <Button
// //               type="submit"
// //               className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-lg font-medium rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 cursor-pointer"
// //             >
// //               Submit Survey
// //             </Button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }





// // // import React from 'react'
// // // import Demo from "@/demo"

// // // const page = () => {
// // //   return (
// // //     <Demo/>
// // //   )
// // // }

// // // export default page







// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Separator } from '@/components/ui/separator';
// import { Stethoscope, Hospital, Users, CreditCard, Activity, BarChart3 } from 'lucide-react';

// export default function HealthcareSurveyForm() {
//   const [formData, setFormData] = useState({
//     physicianName: '',
//     uniqueId: '',
//     speciality: '',
//     visitingHospitals: '',
//     hospitalData: {
//       hospital1: { bmtPatients: '', monthlyPatients: '' },
//       hospital2: { bmtPatients: '', monthlyPatients: '' },
//       hospital3: { bmtPatients: '', monthlyPatients: '' }
//     },
//     sourceFunds: {
//       oopWithoutInsurance: '',
//       oopWithInsurance: '',
//       cghs: '',
//       esi: '',
//       railways: '',
//       echs: '',
//       psus: '',
//       stateGovt: ''
//     },
//     hospitalCodeBreakdown: {
//       hospital1: {
//         newlyDiagnosed: '',
//         relapsedRefractory: '',
//         secondOpinion: ''
//       },
//       hospital2: {
//         newlyDiagnosed: '',
//         relapsedRefractory: '',
//         secondOpinion: ''
//       },
//       hospital3: {
//         newlyDiagnosed: '',
//         relapsedRefractory: '',
//         secondOpinion: ''
//       }
//     },
//     patientDistribution: {
//       allPatients: '',
//       nhlPatients: '',
//       mmPatients: '',
//       otherHematMalignancies: '',
//       glioblastomas: '',
//       otherSolidTumours: ''
//     }
//   });

//   const [errors, setErrors] = useState({});

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));

//     if (errors[field]) {
//       setErrors(prev => ({
//         ...prev,
//         [field]: ''
//       }));
//     }
//   };

//   const handleHospitalDataChange = (hospital, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       hospitalData: {
//         ...prev.hospitalData,
//         [hospital]: {
//           ...prev.hospitalData[hospital],
//           [field]: value
//         }
//       }
//     }));
//   };

//   const handleSourceFundsChange = (source, value) => {
//     setFormData(prev => ({
//       ...prev,
//       sourceFunds: {
//         ...prev.sourceFunds,
//         [source]: value
//       }
//     }));
//   };

//   const handleHospitalCodeBreakdownChange = (hospital, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       hospitalCodeBreakdown: {
//         ...prev.hospitalCodeBreakdown,
//         [hospital]: {
//           ...prev.hospitalCodeBreakdown[hospital],
//           [field]: value
//         }
//       }
//     }));
//   };

//   const handlePatientDistributionChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       patientDistribution: {
//         ...prev.patientDistribution,
//         [field]: value
//       }
//     }));
//   };

//   const calculateTotals = () => {
//     const { hospitalData } = formData;
//     const totalBMT = Object.values(hospitalData).reduce((sum, hospital) =>
//       sum + (parseInt(hospital.bmtPatients) || 0), 0
//     );
//     const totalMonthly = Object.values(hospitalData).reduce((sum, hospital) =>
//       sum + (parseInt(hospital.monthlyPatients) || 0), 0
//     );

//     return { totalBMT, totalMonthly };
//   };

//   const calculateSourceTotal = () => {
//     const { sourceFunds } = formData;
//     return Object.values(sourceFunds).reduce((sum, value) =>
//       sum + (parseFloat(value) || 0), 0
//     );
//   };

//   const calculateHospitalCodeTotals = (hospital) => {
//     const data = formData.hospitalCodeBreakdown[hospital];
//     return {
//       newlyDiagnosed: parseFloat(data.newlyDiagnosed) || 0,
//       relapsedRefractory: parseFloat(data.relapsedRefractory) || 0,
//       secondOpinion: parseFloat(data.secondOpinion) || 0
//     };
//   };

//   const calculatePatientDistributionTotal = () => {
//     const { patientDistribution } = formData;
//     return Object.values(patientDistribution).reduce((sum, value) =>
//       sum + (parseFloat(value) || 0), 0
//     );
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.physicianName.trim()) {
//       newErrors.physicianName = 'Physician name is required';
//     }

//     if (!formData.uniqueId.trim()) {
//       newErrors.uniqueId = 'Unique ID is required';
//     }

//     if (!formData.speciality.trim()) {
//       newErrors.speciality = 'Speciality is required';
//     }

//     if (!formData.visitingHospitals.trim()) {
//       newErrors.visitingHospitals = 'Number of visiting hospitals is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       console.log('Form submitted:', formData);
//       alert('Survey submitted successfully!');
//     }
//   };

//   const { totalBMT, totalMonthly } = calculateTotals();
//   const sourceTotal = calculateSourceTotal();
//   const patientDistributionTotal = calculatePatientDistributionTotal();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <Stethoscope className="w-8 h-8 text-blue-600" />
//             <h1 className="text-3xl font-bold text-gray-800">Healthcare Survey Form</h1>
//           </div>
//           <p className="text-gray-600 text-lg">Comprehensive Physician Data Collection for Sales Representatives</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Physician Information */}
//           <Card className="shadow-lg border-0">
//             <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
//               <CardTitle className="flex items-center gap-2">
//                 <Stethoscope className="w-5 h-5" />
//                 Physician Information
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <Label htmlFor="physicianName" className="text-sm font-medium">
//                     Name of the Physician *
//                   </Label>
//                   <Input
//                     id="physicianName"
//                     value={formData.physicianName}
//                     onChange={(e) => handleInputChange('physicianName', e.target.value)}
//                     placeholder="Enter physician name"
//                     className={`transition-all duration-200 ${errors.physicianName ? 'border-red-500' : 'border-gray-300'}`}
//                   />
//                   {errors.physicianName && (
//                     <p className="text-red-500 text-sm">{errors.physicianName}</p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="uniqueId" className="text-sm font-medium">
//                     Unique ID *
//                   </Label>
//                   <Input
//                     id="uniqueId"
//                     value={formData.uniqueId}
//                     onChange={(e) => handleInputChange('uniqueId', e.target.value)}
//                     placeholder="Enter unique ID"
//                     className={`transition-all duration-200 ${errors.uniqueId ? 'border-red-500' : 'border-gray-300'}`}
//                   />
//                   {errors.uniqueId && (
//                     <p className="text-red-500 text-sm">{errors.uniqueId}</p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="speciality" className="text-sm font-medium">
//                     Speciality *
//                   </Label>
//                   <Input
//                     id="speciality"
//                     value={formData.speciality}
//                     onChange={(e) => handleInputChange('speciality', e.target.value)}
//                     placeholder="Enter speciality"
//                     className={`transition-all duration-200 ${errors.speciality ? 'border-red-500' : 'border-gray-300'}`}
//                   />
//                   {errors.speciality && (
//                     <p className="text-red-500 text-sm">{errors.speciality}</p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="visitingHospitals" className="text-sm font-medium">
//                     Number of Visiting Hospitals *
//                   </Label>
//                   <Input
//                     id="visitingHospitals"
//                     type="number"
//                     value={formData.visitingHospitals}
//                     onChange={(e) => handleInputChange('visitingHospitals', e.target.value)}
//                     placeholder="Enter number"
//                     className={`transition-all duration-200 ${errors.visitingHospitals ? 'border-red-500' : 'border-gray-300'}`}
//                   />
//                   {errors.visitingHospitals && (
//                     <p className="text-red-500 text-sm">{errors.visitingHospitals}</p>
//                   )}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Combined Hospital Data (Tables 4, 5, 6) */}
//           <Card className="shadow-lg border-0">
//             <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
//               <CardTitle className="flex items-center gap-2">
//                 <Hospital className="w-5 h-5" />
//                 Hospital Data
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-6">
//               <div className="space-y-8">
//                 {/* Hospital Code 1 */}
//                 <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
//                   <h3 className="text-xl font-bold text-green-800 mb-6 text-center">Hospital Code 1</h3>

//                   {/* Basic Hospital Data */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                     <div className="space-y-2">
//                       <Label className="text-sm font-medium text-green-700">Number of BMT Patients</Label>
//                       <Input
//                         type="number"
//                         value={formData.hospitalData.hospital1.bmtPatients}
//                         onChange={(e) => handleHospitalDataChange('hospital1', 'bmtPatients', e.target.value)}
//                         placeholder="0"
//                         className="bg-white"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label className="text-sm font-medium text-green-700">Number of Patients in a Month</Label>
//                       <Input
//                         type="number"
//                         value={formData.hospitalData.hospital1.monthlyPatients}
//                         onChange={(e) => handleHospitalDataChange('hospital1', 'monthlyPatients', e.target.value)}
//                         placeholder="0"
//                         className="bg-white"
//                       />
//                     </div>
//                   </div>

//                   {/* Source of Funds */}
//                   <div className="mb-6">
//                     <h4 className="text-lg font-semibold text-green-700 mb-4">Source of Funds:</h4>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div className="space-y-2">
//                         <Label className="text-sm font-medium">OOP without Insurance</Label>
//                         <Input
//                           type="number"
//                           step="0.1"
//                           value={formData.sourceFunds.oopWithoutInsurance}
//                           onChange={(e) => handleSourceFundsChange('oopWithoutInsurance', e.target.value)}
//                           placeholder="0"
//                           className="bg-white"
//                         />
//                         <p className="text-xs text-gray-500">out of total</p>
//                       </div>
//                       <div className="space-y-2">
//                         <Label className="text-sm font-medium">OOP with Insurance</Label>
//                         <Input
//                           type="number"
//                           step="0.1"
//                           value={formData.sourceFunds.oopWithInsurance}
//                           onChange={(e) => handleSourceFundsChange('oopWithInsurance', e.target.value)}
//                           placeholder="0"
//                           className="bg-white"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label className="text-sm font-medium">CGHS</Label>
//                         <Input
//                           type="number"
//                           step="0.1"
//                           value={formData.sourceFunds.cghs}
//                           onChange={(e) => handleSourceFundsChange('cghs', e.target.value)}
//                           placeholder="0"
//                           className="bg-white"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label className="text-sm font-medium">ESI</Label>
//                         <Input
//                           type="number"
//                           step="0.1"
//                           value={formData.sourceFunds.esi}
//                           onChange={(e) => handleSourceFundsChange('esi', e.target.value)}
//                           placeholder="0"
//                           className="bg-white"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label className="text-sm font-medium">Railways</Label>
//                         <Input
//                           type="number"
//                           step="0.1"
//                           value={formData.sourceFunds.railways}
//                           onChange={(e) => handleSourceFundsChange('railways', e.target.value)}
//                           placeholder="0"
//                           className="bg-white"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label className="text-sm font-medium">ECHS</Label>
//                         <Input
//                           type="number"
//                           step="0.1"
//                           value={formData.sourceFunds.echs}
//                           onChange={(e) => handleSourceFundsChange('echs', e.target.value)}
//                           placeholder="0"
//                           className="bg-white"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label className="text-sm font-medium">PSUs</Label>
//                         <Input
//                           type="number"
//                           step="0.1"
//                           value={formData.sourceFunds.psus}
//                           onChange={(e) => handleSourceFundsChange('psus', e.target.value)}
//                           placeholder="0"
//                           className="bg-white"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label className="text-sm font-medium">State Government</Label>
//                         <Input
//                           type="number"
//                           step="0.1"
//                           value={formData.sourceFunds.stateGovt}
//                           onChange={(e) => handleSourceFundsChange('stateGovt', e.target.value)}
//                           placeholder="0"
//                           className="bg-white"
//                         />
//                       </div>
//                     </div>
//                     <div className="mt-4 p-3 bg-green-100 rounded-lg">
//                       <span className="text-sm font-medium text-green-800">Total Source of Funds: {sourceTotal.toFixed(1)}%</span>
//                     </div>
//                   </div>

//                   {/* Patient Case Distribution */}
//                   <div>
//                     <h4 className="text-lg font-semibold text-green-700 mb-4">Patient Case Distribution By Hospital:</h4>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div className="space-y-2">
//                         <Label className="text-sm font-medium">Newly Diagnosed %</Label>
//                         <Input
//                           type="number"
//                           step="0.1"
//                           value={formData.hospitalCodeBreakdown.hospital1.newlyDiagnosed}
//                           onChange={(e) => handleHospitalCodeBreakdownChange('hospital1', 'newlyDiagnosed', e.target.value)}
//                           placeholder="0"
//                           className="bg-white"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label className="text-sm font-medium">Relapsed/Refractory %</Label>
//                         <Input
//                           type="number"
//                           step="0.1"
//                           value={formData.hospitalCodeBreakdown.hospital1.relapsedRefractory}
//                           onChange={(e) => handleHospitalCodeBreakdownChange('hospital1', 'relapsedRefractory', e.target.value)}
//                           placeholder="0"
//                           className="bg-white"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label className="text-sm font-medium">2nd Opinion %</Label>
//                         <Input
//                           type="number"
//                           step="0.1"
//                           value={formData.hospitalCodeBreakdown.hospital1.secondOpinion}
//                           onChange={(e) => handleHospitalCodeBreakdownChange('hospital1', 'secondOpinion', e.target.value)}
//                           placeholder="0"
//                           className="bg-white"
//                         />
//                       </div>
//                     </div>
//                     <div className="mt-4 p-3 bg-green-100 rounded-lg">
//                       <span className="text-sm font-medium text-green-800">
//                         Total Patient Cases: {(
//                           (parseFloat(formData.hospitalCodeBreakdown.hospital1.newlyDiagnosed) || 0) +
//                           (parseFloat(formData.hospitalCodeBreakdown.hospital1.relapsedRefractory) || 0) +
//                           (parseFloat(formData.hospitalCodeBreakdown.hospital1.secondOpinion) || 0)
//                         ).toFixed(1)}%
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Hospital Code 2 */}
//                 <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
//                   <h3 className="text-xl font-bold text-blue-800 mb-6 text-center">Hospital Code 2</h3>

//                   {/* Basic Hospital Data */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                     <div className="space-y-2">
//                       <Label className="text-sm font-medium text-blue-700">Number of BMT Patients</Label>
//                       <Input
//                         type="number"
//                         value={formData.hospitalData.hospital2.bmtPatients}
//                         onChange={(e) => handleHospitalDataChange('hospital2', 'bmtPatients', e.target.value)}
//                         placeholder="0"
//                         className="bg-white"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label className="text-sm font-medium text-blue-700">Number of Patients in a Month</Label>
//                       <Input
//                         type="number"
//                         value={formData.hospitalData.hospital2.monthlyPatients}
//                         onChange={(e) => handleHospitalDataChange('hospital2', 'monthlyPatients', e.target.value)}
//                         placeholder="0"
//                         className="bg-white"
//                       />
//                     </div>
//                   </div>

//                   {/* Patient Case Distribution */}
//                   <div>
//                     <h4 className="text-lg font-semibold text-blue-700 mb-4">Patient Case Distribution By Hospital:</h4>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div className="space-y-2">
//                         <Label className="text-sm font-medium">Newly Diagnosed %</Label>
//                         <Input
//                           type="number"
//                           step="0.1"
//                           value={formData.hospitalCodeBreakdown.hospital2.newlyDiagnosed}
//                           onChange={(e) => handleHospitalCodeBreakdownChange('hospital2', 'newlyDiagnosed', e.target.value)}
//                           placeholder="0"
//                           className="bg-white"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label className="text-sm font-medium">Relapsed/Refractory %</Label>
//                         <Input
//                           type="number"
//                           step="0.1"
//                           value={formData.hospitalCodeBreakdown.hospital2.relapsedRefractory}
//                           onChange={(e) => handleHospitalCodeBreakdownChange('hospital2', 'relapsedRefractory', e.target.value)}
//                           placeholder="0"
//                           className="bg-white"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label className="text-sm font-medium">2nd Opinion %</Label>
//                         <Input
//                           type="number"
//                           step="0.1"
//                           value={formData.hospitalCodeBreakdown.hospital2.secondOpinion}
//                           onChange={(e) => handleHospitalCodeBreakdownChange('hospital2', 'secondOpinion', e.target.value)}
//                           placeholder="0"
//                           className="bg-white"
//                         />
//                       </div>
//                     </div>
//                     <div className="mt-4 p-3 bg-blue-100 rounded-lg">
//                       <span className="text-sm font-medium text-blue-800">
//                         Total Patient Cases: {(
//                           (parseFloat(formData.hospitalCodeBreakdown.hospital2.newlyDiagnosed) || 0) +
//                           (parseFloat(formData.hospitalCodeBreakdown.hospital2.relapsedRefractory) || 0) +
//                           (parseFloat(formData.hospitalCodeBreakdown.hospital2.secondOpinion) || 0)
//                         ).toFixed(1)}%
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Hospital Code 3 */}
//                 <div className="border-2 border-purple-200 rounded-lg p-6 bg-purple-50">
//                   <h3 className="text-xl font-bold text-purple-800 mb-6 text-center">Hospital Code 3</h3>

//                   {/* Basic Hospital Data */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                     <div className="space-y-2">
//                       <Label className="text-sm font-medium text-purple-700">Number of BMT Patients</Label>
//                       <Input
//                         type="number"
//                         value={formData.hospitalData.hospital3.bmtPatients}
//                         onChange={(e) => handleHospitalDataChange('hospital3', 'bmtPatients', e.target.value)}
//                         placeholder="0"
//                         className="bg-white"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label className="text-sm font-medium text-purple-700">Number of Patients in a Month</Label>
//                       <Input
//                         type="number"
//                         value={formData.hospitalData.hospital3.monthlyPatients}
//                         onChange={(e) => handleHospitalDataChange('hospital3', 'monthlyPatients', e.target.value)}
//                         placeholder="0"
//                         className="bg-white"
//                       />
//                     </div>
//                   </div>

//                   {/* Patient Case Distribution */}
//                   <div>
//                     <h4 className="text-lg font-semibold text-purple-700 mb-4">Patient Case Distribution By Hospital:</h4>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div className="space-y-2">
//                         <Label className="text-sm font-medium">Newly Diagnosed %</Label>
//                         <Input
//                           type="number"
//                           step="0.1"
//                           value={formData.hospitalCodeBreakdown.hospital3.newlyDiagnosed}
//                           onChange={(e) => handleHospitalCodeBreakdownChange('hospital3', 'newlyDiagnosed', e.target.value)}
//                           placeholder="0"
//                           className="bg-white"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label className="text-sm font-medium">Relapsed/Refractory %</Label>
//                         <Input
//                           type="number"
//                           step="0.1"
//                           value={formData.hospitalCodeBreakdown.hospital3.relapsedRefractory}
//                           onChange={(e) => handleHospitalCodeBreakdownChange('hospital3', 'relapsedRefractory', e.target.value)}
//                           placeholder="0"
//                           className="bg-white"
//                         />
//                       </div>
//                       <div className="space-y-2">
//                         <Label className="text-sm font-medium">2nd Opinion %</Label>
//                         <Input
//                           type="number"
//                           step="0.1"
//                           value={formData.hospitalCodeBreakdown.hospital3.secondOpinion}
//                           onChange={(e) => handleHospitalCodeBreakdownChange('hospital3', 'secondOpinion', e.target.value)}
//                           placeholder="0"
//                           className="bg-white"
//                         />
//                       </div>
//                     </div>
//                     <div className="mt-4 p-3 bg-purple-100 rounded-lg">
//                       <span className="text-sm font-medium text-purple-800">
//                         Total Patient Cases: {(
//                           (parseFloat(formData.hospitalCodeBreakdown.hospital3.newlyDiagnosed) || 0) +
//                           (parseFloat(formData.hospitalCodeBreakdown.hospital3.relapsedRefractory) || 0) +
//                           (parseFloat(formData.hospitalCodeBreakdown.hospital3.secondOpinion) || 0)
//                         ).toFixed(1)}%
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Overall Totals */}
//                 <div className="bg-gray-100 p-6 rounded-lg">
//                   <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Overall Totals</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="bg-white p-4 rounded-lg text-center">
//                       <span className="text-lg font-medium text-gray-700">Total BMT Patients:</span>
//                       <span className="text-2xl font-bold text-blue-600 ml-2">{totalBMT}</span>
//                     </div>
//                     <div className="bg-white p-4 rounded-lg text-center">
//                       <span className="text-lg font-medium text-gray-700">Total Monthly Patients:</span>
//                       <span className="text-2xl font-bold text-green-600 ml-2">{totalMonthly}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Patient Distribution (Table 7) */}
//           <Card className="shadow-lg border-0">
//             <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
//               <CardTitle className="flex items-center gap-2">
//                 <BarChart3 className="w-5 h-5" />
//                 Patient Distribution (Table 7)
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="allPatients" className="text-sm font-medium">
//                       % ALL patients
//                     </Label>
//                     <Input
//                       id="allPatients"
//                       type="number"
//                       step="0.1"
//                       value={formData.patientDistribution.allPatients}
//                       onChange={(e) => handlePatientDistributionChange('allPatients', e.target.value)}
//                       placeholder="0"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="nhlPatients" className="text-sm font-medium">
//                       % NHL Patients
//                     </Label>
//                     <Input
//                       id="nhlPatients"
//                       type="number"
//                       step="0.1"
//                       value={formData.patientDistribution.nhlPatients}
//                       onChange={(e) => handlePatientDistributionChange('nhlPatients', e.target.value)}
//                       placeholder="0"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="mmPatients" className="text-sm font-medium">
//                       % MM Patients
//                     </Label>
//                     <Input
//                       id="mmPatients"
//                       type="number"
//                       step="0.1"
//                       value={formData.patientDistribution.mmPatients}
//                       onChange={(e) => handlePatientDistributionChange('mmPatients', e.target.value)}
//                       placeholder="0"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="otherHematMalignancies" className="text-sm font-medium">
//                       % Other Hemat malignancies
//                     </Label>
//                     <Input
//                       id="otherHematMalignancies"
//                       type="number"
//                       step="0.1"
//                       value={formData.patientDistribution.otherHematMalignancies}
//                       onChange={(e) => handlePatientDistributionChange('otherHematMalignancies', e.target.value)}
//                       placeholder="0"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="glioblastomas" className="text-sm font-medium">
//                       % Glioblastomas
//                     </Label>
//                     <Input
//                       id="glioblastomas"
//                       type="number"
//                       step="0.1"
//                       value={formData.patientDistribution.glioblastomas}
//                       onChange={(e) => handlePatientDistributionChange('glioblastomas', e.target.value)}
//                       placeholder="0"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="otherSolidTumours" className="text-sm font-medium">
//                       % Other solid tumours
//                     </Label>
//                     <Input
//                       id="otherSolidTumours"
//                       type="number"
//                       step="0.1"
//                       value={formData.patientDistribution.otherSolidTumours}
//                       onChange={(e) => handlePatientDistributionChange('otherSolidTumours', e.target.value)}
//                       placeholder="0"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <Separator className="my-6" />

//               <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-lg">
//                 <span className="text-lg font-medium">Total Patient Distribution:</span>
//                 <span className="text-2xl font-bold text-indigo-600">{patientDistributionTotal.toFixed(1)}%</span>
//               </div>

//               <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//                 <p className="text-sm text-gray-600 italic">* Age distribution if required</p>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Submit Button */}
//           <div className="flex justify-center pt-6">
//             <Button
//               type="submit"
//               className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-lg font-medium rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
//             >
//               Submit Complete Survey
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }














// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Separator } from '@/components/ui/separator';
// import { MultiSelect } from '@/components/ui/multi-select';
// import { Stethoscope, Hospital, Users, CreditCard, Activity, BarChart3 } from 'lucide-react';
// import Image from "next/image";

// export default function HealthcareSurveyForm() {
//   const [formData, setFormData] = useState({
//     physicianName: '',
//     uniqueId: '',
//     speciality: '',
//     visitingHospitals: '',
//     selectedHospitalCodes: [],
//     hospitalData: {
//       hospital1: { bmtPatients: '', monthlyPatients: '' },
//       hospital2: { bmtPatients: '', monthlyPatients: '' },
//       hospital3: { bmtPatients: '', monthlyPatients: '' }
//     },
//     sourceFunds: {
//       oopWithoutInsurance: '',
//       oopWithInsurance: '',
//       cghs: '',
//       esi: '',
//       railways: '',
//       echs: '',
//       psus: '',
//       stateGovt: ''
//     },
//     hospitalCodeBreakdown: {
//       hospital1: {
//         newlyDiagnosed: '',
//         relapsedRefractory: '',
//         secondOpinion: ''
//       },
//       hospital2: {
//         newlyDiagnosed: '',
//         relapsedRefractory: '',
//         secondOpinion: ''
//       },
//       hospital3: {
//         newlyDiagnosed: '',
//         relapsedRefractory: '',
//         secondOpinion: ''
//       }
//     },
//     patientDistribution: {
//       allPatients: '',
//       nhlPatients: '',
//       mmPatients: '',
//       otherHematMalignancies: '',
//       glioblastomas: '',
//       otherSolidTumours: ''
//     }
//   });

//   const [errors, setErrors] = useState({});

//   // Hospital code options for multi-select
//   const hospitalCodeOptions = Array.from({ length: 10 }, (_, i) => ({
//     value: `hospital${i + 1}`,
//     label: `Hospital Code ${i + 1}`
//   }));

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));

//     if (errors[field]) {
//       setErrors(prev => ({
//         ...prev,
//         [field]: ''
//       }));
//     }
//   };

//   const handleHospitalCodesChange = (selectedCodes) => {
//     setFormData(prev => ({
//       ...prev,
//       selectedHospitalCodes: selectedCodes
//     }));
//   };

//   const handleHospitalDataChange = (hospital, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       hospitalData: {
//         ...prev.hospitalData,
//         [hospital]: {
//           ...prev.hospitalData[hospital],
//           [field]: value
//         }
//       }
//     }));
//   };

//   // const handleSourceFundsChange = (source, value) => {
//   //   setFormData(prev => ({
//   //     ...prev,
//   //     sourceFunds: {
//   //       ...prev.sourceFunds,
//   //       [source]: value
//   //     }
//   //   }));
//   // };

//   const handleSourceFundsChange = (hospitalCode, field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       sourceFunds: {
//         ...prev.sourceFunds,
//         [hospitalCode]: {
//           ...prev.sourceFunds[hospitalCode],
//           [field]: value
//         }
//       }
//     }));
//   };


//   const handleHospitalCodeBreakdownChange = (hospital, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       hospitalCodeBreakdown: {
//         ...prev.hospitalCodeBreakdown,
//         [hospital]: {
//           ...prev.hospitalCodeBreakdown[hospital],
//           [field]: value
//         }
//       }
//     }));
//   };

//   const handlePatientDistributionChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       patientDistribution: {
//         ...prev.patientDistribution,
//         [field]: value
//       }
//     }));
//   };

//   const calculateTotals = () => {
//     const totalBMT = formData.selectedHospitalCodes.reduce((sum, code) =>
//       sum + (parseInt(formData.hospitalData[code]?.bmtPatients) || 0), 0
//     );
//     const totalMonthly = formData.selectedHospitalCodes.reduce((sum, code) =>
//       sum + (parseInt(formData.hospitalData[code]?.monthlyPatients) || 0), 0
//     );

//     return { totalBMT, totalMonthly };
//   };

//   const calculateSourceTotal = () => {
//     const { sourceFunds } = formData;
//     return Object.values(sourceFunds).reduce((sum, value) =>
//       sum + (parseFloat(value) || 0), 0
//     );
//   };

//   const calculateHospitalCodeTotals = (hospital) => {
//     const data = formData.hospitalCodeBreakdown[hospital] || {};
//     return {
//       newlyDiagnosed: parseFloat(data.newlyDiagnosed) || 0,
//       relapsedRefractory: parseFloat(data.relapsedRefractory) || 0,
//       secondOpinion: parseFloat(data.secondOpinion) || 0
//     };
//   };

//   const calculatePatientDistributionTotal = () => {
//     const { patientDistribution } = formData;
//     return Object.values(patientDistribution).reduce((sum, value) =>
//       sum + (parseFloat(value) || 0), 0
//     );
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.physicianName.trim()) {
//       newErrors.physicianName = 'Physician name is required';
//     }

//     if (!formData.uniqueId.trim()) {
//       newErrors.uniqueId = 'Unique ID is required';
//     }

//     if (!formData.speciality.trim()) {
//       newErrors.speciality = 'Speciality is required';
//     }

//     if (!formData.visitingHospitals.trim()) {
//       newErrors.visitingHospitals = 'Number of visiting hospitals is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       console.log('Form submitted:', formData);
//       alert('Survey submitted successfully!');
//     }
//   };

//   const { totalBMT, totalMonthly } = calculateTotals();
//   const sourceTotal = calculateSourceTotal();
//   const patientDistributionTotal = calculatePatientDistributionTotal();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="flex flex-col sm:flex-row items-center lg:items-end justify-center gap-3 mb-4 text-center">
//             <Image
//               src="/assets/common/ImmunoACT_Logo.png"
//               alt="ImmunoACT Logo"
//               width={140}
//               height={100}
//               className="w-[180px] h-auto md:w-[140px] lg:w-[160px]"
//               unoptimized
//               priority
//             />
//             <h1 className="text-3xl font-bold text-gray-800">Healthcare Survey Form</h1>
//           </div>
//           <p className="text-gray-600 text-lg">Comprehensive Physician Data Collection for Sales Representatives</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Physician Information */}
//           <Card className="shadow-lg border-0">
//             <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
//               <CardTitle className="flex items-center gap-2">
//                 <Stethoscope className="w-5 h-5" />
//                 Physician Information
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <Label htmlFor="physicianName" className="text-sm font-medium">
//                     Name of the Physician *
//                   </Label>
//                   <Input
//                     id="physicianName"
//                     value={formData.physicianName}
//                     onChange={(e) => handleInputChange('physicianName', e.target.value)}
//                     placeholder="Enter physician name"
//                     className={`transition-all duration-200 ${errors.physicianName ? 'border-red-500' : 'border-gray-300'}`}
//                   />
//                   {errors.physicianName && (
//                     <p className="text-red-500 text-sm">{errors.physicianName}</p>
//                   )}
//                 </div>

//                 {/* <div className="space-y-2">
//                   <Label htmlFor="uniqueId" className="text-sm font-medium">
//                     Unique ID *
//                   </Label>
//                   <Input
//                     id="uniqueId"
//                     value={formData.uniqueId}
//                     onChange={(e) => handleInputChange('uniqueId', e.target.value)}
//                     placeholder="Enter unique ID"
//                     className={`transition-all duration-200 ${errors.uniqueId ? 'border-red-500' : 'border-gray-300'}`}
//                   />
//                   {errors.uniqueId && (
//                     <p className="text-red-500 text-sm">{errors.uniqueId}</p>
//                   )}
//                 </div> */}

//                 <div className="space-y-2">
//                   <Label htmlFor="speciality" className="text-sm font-medium">
//                     Speciality *
//                   </Label>
//                   <Input
//                     id="speciality"
//                     value={formData.speciality}
//                     onChange={(e) => handleInputChange('speciality', e.target.value)}
//                     placeholder="Enter speciality"
//                     className={`transition-all duration-200 ${errors.speciality ? 'border-red-500' : 'border-gray-300'}`}
//                   />
//                   {errors.speciality && (
//                     <p className="text-red-500 text-sm">{errors.speciality}</p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="visitingHospitals" className="text-sm font-medium">
//                     Number of Visiting Hospitals *
//                   </Label>
//                   <Input
//                     id="visitingHospitals"
//                     type="number"
//                     value={formData.visitingHospitals}
//                     onChange={(e) => handleInputChange('visitingHospitals', e.target.value)}
//                     placeholder="Enter number"
//                     className={`transition-all duration-200 ${errors.visitingHospitals ? 'border-red-500' : 'border-gray-300'}`}
//                   />
//                   {errors.visitingHospitals && (
//                     <p className="text-red-500 text-sm">{errors.visitingHospitals}</p>
//                   )}
//                 </div>

//                 <div className="space-y-2 md:col-span-2">
//                   <Label className="text-sm font-medium">
//                     Select Hospital Codes *
//                   </Label>
//                   <MultiSelect
//                     options={hospitalCodeOptions}
//                     value={formData.selectedHospitalCodes}
//                     onChange={handleHospitalCodesChange}
//                     placeholder="Select hospital codes to survey..."
//                     className="w-full"
//                   />
//                   <p className="text-xs text-gray-500">
//                     Select the hospital codes you want to collect data for. Only selected hospitals will appear in the form below.
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Show hospital sections only for selected codes */}
//           {formData.selectedHospitalCodes.length > 0 && (

//             <Card className="shadow-lg border-0">
//               <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
//                 <CardTitle className="flex items-center gap-2">
//                   <Hospital className="w-5 h-5" />
//                   Hospital Data - {formData.selectedHospitalCodes.length} Selected
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6">
//                 <div className="space-y-8">
//                   {/* Render only selected hospital codes */}
//                   {formData.selectedHospitalCodes.map((hospitalCode, index) => {
//                     const hospitalNumber = hospitalCode.replace('hospital', '');
//                     const colors = [
//                       { border: 'border-green-200', bg: 'bg-green-50', text: 'text-green-800', accent: 'bg-green-100' },
//                       { border: 'border-blue-200', bg: 'bg-blue-50', text: 'text-blue-800', accent: 'bg-blue-100' },
//                       { border: 'border-purple-200', bg: 'bg-purple-50', text: 'text-purple-800', accent: 'bg-purple-100' },
//                       { border: 'border-orange-200', bg: 'bg-orange-50', text: 'text-orange-800', accent: 'bg-orange-100' },
//                       { border: 'border-pink-200', bg: 'bg-pink-50', text: 'text-pink-800', accent: 'bg-pink-100' },
//                       { border: 'border-indigo-200', bg: 'bg-indigo-50', text: 'text-indigo-800', accent: 'bg-indigo-100' },
//                       { border: 'border-red-200', bg: 'bg-red-50', text: 'text-red-800', accent: 'bg-red-100' },
//                       { border: 'border-yellow-200', bg: 'bg-yellow-50', text: 'text-yellow-800', accent: 'bg-yellow-100' },
//                       { border: 'border-teal-200', bg: 'bg-teal-50', text: 'text-teal-800', accent: 'bg-teal-100' },
//                       { border: 'border-cyan-200', bg: 'bg-cyan-50', text: 'text-cyan-800', accent: 'bg-cyan-100' }
//                     ];
//                     const colorScheme = colors[index % colors.length];

//                     return (
//                       <div key={hospitalCode} className={`border-2 ${colorScheme.border} rounded-lg p-6 ${colorScheme.bg}`}>
//                         <h3 className={`text-xl font-bold ${colorScheme.text} mb-6 text-center`}>Hospital Code {hospitalNumber}</h3>

//                         {/* Basic Hospital Data */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                           <div className="space-y-2">
//                             <Label className={`text-sm font-medium ${colorScheme.text.replace('800', '700')}`}>Number of BMT Patients</Label>
//                             <Input
//                               type="number"
//                               value={formData.hospitalData[hospitalCode]?.bmtPatients || ''}
//                               onChange={(e) => handleHospitalDataChange(hospitalCode, 'bmtPatients', e.target.value)}
//                               placeholder="0"
//                               className="bg-white"
//                             />
//                           </div>
//                           <div className="space-y-2">
//                             <Label className={`text-sm font-medium ${colorScheme.text.replace('800', '700')}`}>Number of Patients in a Month</Label>
//                             <Input
//                               type="number"
//                               value={formData.hospitalData[hospitalCode]?.monthlyPatients || ''}
//                               onChange={(e) => handleHospitalDataChange(hospitalCode, 'monthlyPatients', e.target.value)}
//                               placeholder="0"
//                               className="bg-white"
//                             />
//                           </div>
//                         </div>

//                         {/* Source of Funds - Only show for first selected hospital */}
//                         {/* {index === 0 && ( */}
//                         <div className="mb-6">
//                           <h4 className={`text-lg font-semibold ${colorScheme.text.replace('800', '700')} mb-4`}>Source of Funds:</h4>
//                           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                             <div className="space-y-2">
//                               <Label className="text-sm font-medium">OOP without Insurance</Label>
//                               <Input
//                                 type="number"
//                                 step="0.1"
//                                 value={formData.sourceFunds[hospitalCode]?.oopWithoutInsurance || ''}
//                                 onChange={(e) => handleSourceFundsChange(hospitalCode, 'oopWithoutInsurance', e.target.value)}
//                                 placeholder="0"
//                                 className="bg-white"
//                               />
//                               <p className="text-xs text-gray-500">out of total</p>
//                             </div>
//                             <div className="space-y-2">
//                               <Label className="text-sm font-medium">OOP with Insurance</Label>
//                               <Input
//                                 type="number"
//                                 step="0.1"
//                                 value={formData.sourceFunds[hospitalCode]?.oopWithInsurance || ''}
//                                 onChange={(e) => handleSourceFundsChange(hospitalCode, 'oopWithInsurance', e.target.value)}
//                                 placeholder="0"
//                                 className="bg-white"
//                               />
//                             </div>
//                             <div className="space-y-2">
//                               <Label className="text-sm font-medium">CGHS</Label>
//                               <Input
//                                 type="number"
//                                 step="0.1"
//                                 value={formData.sourceFunds[hospitalCode]?.cghs || ''}
//                                 onChange={(e) => handleSourceFundsChange(hospitalCode, 'cghs', e.target.value)}
//                                 placeholder="0"
//                                 className="bg-white"
//                               />
//                             </div>
//                             <div className="space-y-2">
//                               <Label className="text-sm font-medium">ESI</Label>
//                               <Input
//                                 type="number"
//                                 step="0.1"
//                                 value={formData.sourceFunds[hospitalCode]?.esi || ''}
//                                 onChange={(e) => handleSourceFundsChange(hospitalCode, 'esi', e.target.value)}
//                                 placeholder="0"
//                                 className="bg-white"
//                               />
//                             </div>
//                             <div className="space-y-2">
//                               <Label className="text-sm font-medium">Railways</Label>
//                               <Input
//                                 type="number"
//                                 step="0.1"
//                                 value={formData.sourceFunds[hospitalCode]?.railways || ''}
//                                 onChange={(e) => handleSourceFundsChange(hospitalCode, 'railways', e.target.value)}
//                                 placeholder="0"
//                                 className="bg-white"
//                               />
//                             </div>
//                             <div className="space-y-2">
//                               <Label className="text-sm font-medium">ECHS</Label>
//                               <Input
//                                 type="number"
//                                 step="0.1"
//                                 value={formData.sourceFunds[hospitalCode]?.echs || ''}
//                                 onChange={(e) => handleSourceFundsChange(hospitalCode, 'echs', e.target.value)}
//                                 placeholder="0"
//                                 className="bg-white"
//                               />
//                             </div>
//                             <div className="space-y-2">
//                               <Label className="text-sm font-medium">PSUs</Label>
//                               <Input
//                                 type="number"
//                                 step="0.1"
//                                 value={formData.sourceFunds[hospitalCode]?.psus || ''}
//                                 onChange={(e) => handleSourceFundsChange(hospitalCode, 'psus', e.target.value)}
//                                 placeholder="0"
//                                 className="bg-white"
//                               />
//                             </div>
//                             <div className="space-y-2">
//                               <Label className="text-sm font-medium">State Government</Label>
//                               <Input
//                                 type="number"
//                                 step="0.1"
//                                 value={formData.sourceFunds[hospitalCode]?.stateGovt || ''}
//                                 onChange={(e) => handleSourceFundsChange(hospitalCode, 'stateGovt', e.target.value)}
//                                 placeholder="0"
//                                 className="bg-white"
//                               />
//                             </div>
//                           </div>
//                           <div className={`mt-4 p-3 ${colorScheme.accent} rounded-lg`}>
//                             <span className={`text-sm font-medium ${colorScheme.text}`}>Total Source of Funds: {sourceTotal.toFixed(1)}%</span>
//                           </div>
//                         </div>
//                         {/* )} */}

//                         {/* Patient Case Distribution */}
//                         <div>
//                           <h4 className={`text-lg font-semibold ${colorScheme.text.replace('800', '700')} mb-4`}>Patient Case Distribution By Hospital:</h4>
//                           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                             <div className="space-y-2">
//                               <Label className="text-sm font-medium">Newly Diagnosed %</Label>
//                               <Input
//                                 type="number"
//                                 step="0.1"
//                                 value={formData.hospitalCodeBreakdown[hospitalCode]?.newlyDiagnosed || ''}
//                                 onChange={(e) => handleHospitalCodeBreakdownChange(hospitalCode, 'newlyDiagnosed', e.target.value)}
//                                 placeholder="0"
//                                 className="bg-white"
//                               />
//                             </div>
//                             <div className="space-y-2">
//                               <Label className="text-sm font-medium">Relapsed/Refractory %</Label>
//                               <Input
//                                 type="number"
//                                 step="0.1"
//                                 value={formData.hospitalCodeBreakdown[hospitalCode]?.relapsedRefractory || ''}
//                                 onChange={(e) => handleHospitalCodeBreakdownChange(hospitalCode, 'relapsedRefractory', e.target.value)}
//                                 placeholder="0"
//                                 className="bg-white"
//                               />
//                             </div>
//                             <div className="space-y-2">
//                               <Label className="text-sm font-medium">2nd Opinion %</Label>
//                               <Input
//                                 type="number"
//                                 step="0.1"
//                                 value={formData.hospitalCodeBreakdown[hospitalCode]?.secondOpinion || ''}
//                                 onChange={(e) => handleHospitalCodeBreakdownChange(hospitalCode, 'secondOpinion', e.target.value)}
//                                 placeholder="0"
//                                 className="bg-white"
//                               />
//                             </div>
//                           </div>
//                           <div className={`mt-4 p-3 ${colorScheme.accent} rounded-lg`}>
//                             <span className={`text-sm font-medium ${colorScheme.text}`}>
//                               Total Patient Cases: {(
//                                 (parseFloat(formData.hospitalCodeBreakdown[hospitalCode]?.newlyDiagnosed) || 0) +
//                                 (parseFloat(formData.hospitalCodeBreakdown[hospitalCode]?.relapsedRefractory) || 0) +
//                                 (parseFloat(formData.hospitalCodeBreakdown[hospitalCode]?.secondOpinion) || 0)
//                               ).toFixed(1)}%
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}

//                   {/* Overall Totals - Only show if hospitals are selected */}
//                   <div className="bg-gray-100 p-6 rounded-lg">
//                     <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Overall Totals</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="bg-white p-4 rounded-lg text-center">
//                         <span className="text-lg font-medium text-gray-700">Total BMT Patients:</span>
//                         <span className="text-2xl font-bold text-blue-600 ml-2">{
//                           formData.selectedHospitalCodes.reduce((sum, code) =>
//                             sum + (parseInt(formData.hospitalData[code]?.bmtPatients) || 0), 0
//                           )
//                         }</span>
//                       </div>
//                       <div className="bg-white p-4 rounded-lg text-center">
//                         <span className="text-lg font-medium text-gray-700">Total Monthly Patients:</span>
//                         <span className="text-2xl font-bold text-green-600 ml-2">{
//                           formData.selectedHospitalCodes.reduce((sum, code) =>
//                             sum + (parseInt(formData.hospitalData[code]?.monthlyPatients) || 0), 0
//                           )
//                         }</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           )}


//           {/* Show message if no hospital codes selected */}
//           {formData.selectedHospitalCodes.length === 0 && (
//             <Card className="shadow-lg border-0 border-dashed border-gray-300">
//               <CardContent className="p-12 text-center">
//                 <Hospital className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-xl font-semibold text-gray-600 mb-2">No Hospital Codes Selected</h3>
//                 <p className="text-gray-500">Please select hospital codes from the dropdown above to begin data collection.</p>
//               </CardContent>
//             </Card>
//           )}

//           {/* Patient Distribution (Table 7) */}
//           <Card className="shadow-lg border-0">
//             <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
//               <CardTitle className="flex items-center gap-2">
//                 <BarChart3 className="w-5 h-5" />
//                 Patient Distribution
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="allPatients" className="text-sm font-medium">
//                       % ALL patients
//                     </Label>
//                     <Input
//                       id="allPatients"
//                       type="number"
//                       step="0.1"
//                       value={formData.patientDistribution.allPatients}
//                       onChange={(e) => handlePatientDistributionChange('allPatients', e.target.value)}
//                       placeholder="0"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="nhlPatients" className="text-sm font-medium">
//                       % NHL Patients
//                     </Label>
//                     <Input
//                       id="nhlPatients"
//                       type="number"
//                       step="0.1"
//                       value={formData.patientDistribution.nhlPatients}
//                       onChange={(e) => handlePatientDistributionChange('nhlPatients', e.target.value)}
//                       placeholder="0"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="mmPatients" className="text-sm font-medium">
//                       % MM Patients
//                     </Label>
//                     <Input
//                       id="mmPatients"
//                       type="number"
//                       step="0.1"
//                       value={formData.patientDistribution.mmPatients}
//                       onChange={(e) => handlePatientDistributionChange('mmPatients', e.target.value)}
//                       placeholder="0"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="otherHematMalignancies" className="text-sm font-medium">
//                       % Other Hemat malignancies
//                     </Label>
//                     <Input
//                       id="otherHematMalignancies"
//                       type="number"
//                       step="0.1"
//                       value={formData.patientDistribution.otherHematMalignancies}
//                       onChange={(e) => handlePatientDistributionChange('otherHematMalignancies', e.target.value)}
//                       placeholder="0"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="glioblastomas" className="text-sm font-medium">
//                       % Glioblastomas
//                     </Label>
//                     <Input
//                       id="glioblastomas"
//                       type="number"
//                       step="0.1"
//                       value={formData.patientDistribution.glioblastomas}
//                       onChange={(e) => handlePatientDistributionChange('glioblastomas', e.target.value)}
//                       placeholder="0"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="otherSolidTumours" className="text-sm font-medium">
//                       % Other solid tumours
//                     </Label>
//                     <Input
//                       id="otherSolidTumours"
//                       type="number"
//                       step="0.1"
//                       value={formData.patientDistribution.otherSolidTumours}
//                       onChange={(e) => handlePatientDistributionChange('otherSolidTumours', e.target.value)}
//                       placeholder="0"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <Separator className="my-6" />

//               <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-lg">
//                 <span className="text-lg font-medium">Total Patient Distribution:</span>
//                 <span className="text-2xl font-bold text-indigo-600">{patientDistributionTotal.toFixed(1)}%</span>
//               </div>

//               <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//                 <p className="text-sm text-gray-600 italic">* Age distribution if required</p>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Submit Button */}
//           <div className="flex justify-center pt-6">
//             <Button
//               type="submit"
//               className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-lg font-medium rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
//             >
//               Submit Complete Survey
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }







// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Separator } from '@/components/ui/separator';
// import { MultiSelect } from '@/components/ui/multi-select';
// import { Stethoscope, Hospital, Users, CreditCard, Activity, BarChart3 } from 'lucide-react';
// import Image from "next/image";

// export default function HealthcareSurveyForm() {
//   const [formData, setFormData] = useState({
//     physicianName: '',
//     uniqueId: '',
//     speciality: '',
//     visitingHospitals: '',
//     selectedHospitalCodes: [],
//     hospitalData: {
//       hospital1: { bmtPatients: '', monthlyPatients: '' },
//       hospital2: { bmtPatients: '', monthlyPatients: '' },
//       hospital3: { bmtPatients: '', monthlyPatients: '' }
//     },
//     sourceFunds: {
//       hospital1: { oopWithoutInsurance: '', oopWithInsurance: '', cghs: '', esi: '', railways: '', echs: '', psus: '', stateGovt: '' },
//       hospital2: { oopWithoutInsurance: '', oopWithInsurance: '', cghs: '', esi: '', railways: '', echs: '', psus: '', stateGovt: '' },
//       hospital3: { oopWithoutInsurance: '', oopWithInsurance: '', cghs: '', esi: '', railways: '', echs: '', psus: '', stateGovt: '' },
//       hospital4: { oopWithoutInsurance: '', oopWithInsurance: '', cghs: '', esi: '', railways: '', echs: '', psus: '', stateGovt: '' },
//       hospital5: { oopWithoutInsurance: '', oopWithInsurance: '', cghs: '', esi: '', railways: '', echs: '', psus: '', stateGovt: '' },
//       hospital6: { oopWithoutInsurance: '', oopWithInsurance: '', cghs: '', esi: '', railways: '', echs: '', psus: '', stateGovt: '' },
//       hospital7: { oopWithoutInsurance: '', oopWithInsurance: '', cghs: '', esi: '', railways: '', echs: '', psus: '', stateGovt: '' },
//       hospital8: { oopWithoutInsurance: '', oopWithInsurance: '', cghs: '', esi: '', railways: '', echs: '', psus: '', stateGovt: '' },
//       hospital9: { oopWithoutInsurance: '', oopWithInsurance: '', cghs: '', esi: '', railways: '', echs: '', psus: '', stateGovt: '' },
//       hospital10: { oopWithoutInsurance: '', oopWithInsurance: '', cghs: '', esi: '', railways: '', echs: '', psus: '', stateGovt: '' }
//     },
//     hospitalCodeBreakdown: {
//       hospital1: {
//         newlyDiagnosed: '',
//         relapsedRefractory: '',
//         secondOpinion: ''
//       },
//       hospital2: {
//         newlyDiagnosed: '',
//         relapsedRefractory: '',
//         secondOpinion: ''
//       },
//       hospital3: {
//         newlyDiagnosed: '',
//         relapsedRefractory: '',
//         secondOpinion: ''
//       },
//       hospital4: {
//         newlyDiagnosed: '',
//         relapsedRefractory: '',
//         secondOpinion: ''
//       },
//       hospital5: {
//         newlyDiagnosed: '',
//         relapsedRefractory: '',
//         secondOpinion: ''
//       },
//       hospital6: {
//         newlyDiagnosed: '',
//         relapsedRefractory: '',
//         secondOpinion: ''
//       },
//       hospital7: {
//         newlyDiagnosed: '',
//         relapsedRefractory: '',
//         secondOpinion: ''
//       },
//       hospital8: {
//         newlyDiagnosed: '',
//         relapsedRefractory: '',
//         secondOpinion: ''
//       },
//       hospital9: {
//         newlyDiagnosed: '',
//         relapsedRefractory: '',
//         secondOpinion: ''
//       },
//       hospital10: {
//         newlyDiagnosed: '',
//         relapsedRefractory: '',
//         secondOpinion: ''
//       }
//     },
//     patientDistribution: {
//       allPatients: '',
//       nhlPatients: '',
//       mmPatients: '',
//       otherHematMalignancies: '',
//       glioblastomas: '',
//       otherSolidTumours: ''
//     }
//   });

//   const [errors, setErrors] = useState({});
//   const [warnings, setWarnings] = useState({});

//   // Hospital code options for multi-select
//   const hospitalCodeOptions = Array.from({ length: 10 }, (_, i) => ({
//     value: `hospital${i + 1}`,
//     label: `Hospital Code ${i + 1}`
//   }));

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));

//     if (errors[field]) {
//       setErrors(prev => ({
//         ...prev,
//         [field]: ''
//       }));
//     }
//   };

//   const handleHospitalCodesChange = (selectedCodes) => {
//     setFormData(prev => ({
//       ...prev,
//       selectedHospitalCodes: selectedCodes
//     }));
//   };

//   const handleHospitalDataChange = (hospital, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       hospitalData: {
//         ...prev.hospitalData,
//         [hospital]: {
//           ...prev.hospitalData[hospital],
//           [field]: value
//         }
//       }
//     }));
//   };

//   const handleSourceFundsChange = (hospital, source, value) => {
//     const numValue = parseFloat(value) || 0;
//     const monthlyPatients = parseInt(formData.hospitalData[hospital]?.monthlyPatients) || 0;

//     // Calculate current total excluding the field being changed
//     const currentSourceFunds = formData.sourceFunds[hospital] || {};
//     const currentTotal = Object.entries(currentSourceFunds).reduce((sum, [key, val]) => {
//       if (key === source) return sum; // Exclude the field being changed
//       return sum + (parseFloat(val) || 0);
//     }, 0);

//     const newTotal = currentTotal + numValue;

//     // Check if total exceeds monthly patients
//     if (newTotal > monthlyPatients && monthlyPatients > 0) {
//       setWarnings(prev => ({
//         ...prev,
//         [`${hospital}_sourceFunds`]: `Total source of funds (${newTotal}) cannot exceed monthly patients (${monthlyPatients})`
//       }));
//     } else {
//       setWarnings(prev => {
//         const newWarnings = { ...prev };
//         delete newWarnings[`${hospital}_sourceFunds`];
//         return newWarnings;
//       });
//     }

//     setFormData(prev => ({
//       ...prev,
//       sourceFunds: {
//         ...prev.sourceFunds,
//         [hospital]: {
//           ...prev.sourceFunds[hospital],
//           [source]: value
//         }
//       }
//     }));
//   };

//   const handleHospitalCodeBreakdownChange = (hospital, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       hospitalCodeBreakdown: {
//         ...prev.hospitalCodeBreakdown,
//         [hospital]: {
//           ...prev.hospitalCodeBreakdown[hospital],
//           [field]: value
//         }
//       }
//     }));
//   };

//   const handlePatientDistributionChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       patientDistribution: {
//         ...prev.patientDistribution,
//         [field]: value
//       }
//     }));
//   };

//   const calculateTotals = () => {
//     const totalBMT = formData.selectedHospitalCodes.reduce((sum, code) =>
//       sum + (parseInt(formData.hospitalData[code]?.bmtPatients) || 0), 0
//     );
//     const totalMonthly = formData.selectedHospitalCodes.reduce((sum, code) =>
//       sum + (parseInt(formData.hospitalData[code]?.monthlyPatients) || 0), 0
//     );

//     return { totalBMT, totalMonthly };
//   };

//   const calculateSourceTotal = (hospital) => {
//     const sourceFunds = formData.sourceFunds[hospital] || {};
//     return Object.values(sourceFunds).reduce((sum, value) =>
//       sum + (parseFloat(value) || 0), 0
//     );
//   };

//   const calculateHospitalCodeTotals = (hospital) => {
//     const data = formData.hospitalCodeBreakdown[hospital] || {};
//     return {
//       newlyDiagnosed: parseFloat(data.newlyDiagnosed) || 0,
//       relapsedRefractory: parseFloat(data.relapsedRefractory) || 0,
//       secondOpinion: parseFloat(data.secondOpinion) || 0
//     };
//   };

//   const calculatePatientDistributionTotal = () => {
//     const { patientDistribution } = formData;
//     return Object.values(patientDistribution).reduce((sum, value) =>
//       sum + (parseFloat(value) || 0), 0
//     );
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.physicianName.trim()) {
//       newErrors.physicianName = 'Physician name is required';
//     }

//     if (!formData.uniqueId.trim()) {
//       newErrors.uniqueId = 'Unique ID is required';
//     }

//     if (!formData.speciality.trim()) {
//       newErrors.speciality = 'Speciality is required';
//     }

//     if (!formData.visitingHospitals.trim()) {
//       newErrors.visitingHospitals = 'Number of visiting hospitals is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       console.log('Form submitted:', formData);
//       alert('Survey submitted successfully!');
//     }
//   };

//   const { totalBMT, totalMonthly } = calculateTotals();
//   const patientDistributionTotal = calculatePatientDistributionTotal();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="flex flex-col sm:flex-row items-center lg:items-end justify-center gap-3 mb-4 text-center">
//              <Image
//                src="/assets/common/ImmunoACT_Logo.png"
//                alt="ImmunoACT Logo"
//                width={140}
//                height={100}
//                className="w-[180px] h-auto md:w-[140px] lg:w-[160px]"
//                unoptimized
//                priority
//              />
//             <h1 className="text-3xl font-bold text-gray-800">Healthcare Survey Form</h1>
//           </div>
//           <p className="text-base md:text-lg text-gray-600">Physician Data Collection for Sales Representatives</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Physician Information */}
//           <Card className="shadow-lg border-0">
//             <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
//               <CardTitle className="flex items-center gap-2">
//                 <Stethoscope className="w-5 h-5" />
//                 Physician Information
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <Label htmlFor="physicianName" className="text-sm font-medium">
//                     Name of the Physician *
//                   </Label>
//                   <Input
//                     id="physicianName"
//                     value={formData.physicianName}
//                     onChange={(e) => handleInputChange('physicianName', e.target.value)}
//                     placeholder="Enter physician name"
//                     className={`transition-all duration-200 ${errors.physicianName ? 'border-red-500' : 'border-gray-300'}`}
//                   />
//                   {errors.physicianName && (
//                     <p className="text-red-500 text-sm">{errors.physicianName}</p>
//                   )}
//                 </div>

//                 {/* <div className="space-y-2">
//                   <Label htmlFor="uniqueId" className="text-sm font-medium">
//                     Unique ID *
//                   </Label>
//                   <Input
//                     id="uniqueId"
//                     value={formData.uniqueId}
//                     onChange={(e) => handleInputChange('uniqueId', e.target.value)}
//                     placeholder="Enter unique ID"
//                     className={`transition-all duration-200 ${errors.uniqueId ? 'border-red-500' : 'border-gray-300'}`}
//                   />
//                   {errors.uniqueId && (
//                     <p className="text-red-500 text-sm">{errors.uniqueId}</p>
//                   )}
//                 </div> */}

//                 <div className="space-y-2">
//                   <Label htmlFor="speciality" className="text-sm font-medium">
//                     Speciality *
//                   </Label>
//                   <Input
//                     id="speciality"
//                     value={formData.speciality}
//                     onChange={(e) => handleInputChange('speciality', e.target.value)}
//                     placeholder="Enter speciality"
//                     className={`transition-all duration-200 ${errors.speciality ? 'border-red-500' : 'border-gray-300'}`}
//                   />
//                   {errors.speciality && (
//                     <p className="text-red-500 text-sm">{errors.speciality}</p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="visitingHospitals" className="text-sm font-medium">
//                     Number of Visiting Hospitals *
//                   </Label>
//                   <Input
//                     id="visitingHospitals"
//                     type="number"
//                     value={formData.visitingHospitals}
//                     onChange={(e) => handleInputChange('visitingHospitals', e.target.value)}
//                     placeholder="Enter number"
//                     className={`transition-all duration-200 ${errors.visitingHospitals ? 'border-red-500' : 'border-gray-300'}`}
//                   />
//                   {errors.visitingHospitals && (
//                     <p className="text-red-500 text-sm">{errors.visitingHospitals}</p>
//                   )}
//                 </div>

//                 <div className="space-y-2 md:col-span-2">
//                   <Label className="text-sm font-medium">
//                     Select Hospital Codes *
//                   </Label>
//                   <MultiSelect
//                     options={hospitalCodeOptions}
//                     value={formData.selectedHospitalCodes}
//                     onChange={handleHospitalCodesChange}
//                     placeholder="Select hospital codes to survey..."
//                     className="w-full"
//                   />
//                   <p className="text-xs text-gray-500">
//                     Select the hospital codes you want to collect data for. Only selected hospitals will appear in the form below.
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Show hospital sections only for selected codes */}
//           {formData.selectedHospitalCodes.length > 0 && (

//             <Card className="shadow-lg border-0">
//               <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
//                 <CardTitle className="flex items-center gap-2">
//                   <Hospital className="w-5 h-5" />
//                   Hospital Data - {formData.selectedHospitalCodes.length} Selected
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6">
//                 <div className="space-y-8">
//                   {/* Render only selected hospital codes */}
//                   {formData.selectedHospitalCodes.map((hospitalCode, index) => {
//                     const hospitalNumber = hospitalCode.replace('hospital', '');
//                     const colors = [
//                       { border: 'border-green-200', bg: 'bg-green-50', text: 'text-green-800', accent: 'bg-green-100' },
//                       { border: 'border-blue-200', bg: 'bg-blue-50', text: 'text-blue-800', accent: 'bg-blue-100' },
//                       { border: 'border-purple-200', bg: 'bg-purple-50', text: 'text-purple-800', accent: 'bg-purple-100' },
//                       { border: 'border-orange-200', bg: 'bg-orange-50', text: 'text-orange-800', accent: 'bg-orange-100' },
//                       { border: 'border-pink-200', bg: 'bg-pink-50', text: 'text-pink-800', accent: 'bg-pink-100' },
//                       { border: 'border-indigo-200', bg: 'bg-indigo-50', text: 'text-indigo-800', accent: 'bg-indigo-100' },
//                       { border: 'border-red-200', bg: 'bg-red-50', text: 'text-red-800', accent: 'bg-red-100' },
//                       { border: 'border-yellow-200', bg: 'bg-yellow-50', text: 'text-yellow-800', accent: 'bg-yellow-100' },
//                       { border: 'border-teal-200', bg: 'bg-teal-50', text: 'text-teal-800', accent: 'bg-teal-100' },
//                       { border: 'border-cyan-200', bg: 'bg-cyan-50', text: 'text-cyan-800', accent: 'bg-cyan-100' }
//                     ];
//                     const colorScheme = colors[index % colors.length];
//                     const sourceTotal = calculateSourceTotal(hospitalCode);
//                     const monthlyPatients = parseInt(formData.hospitalData[hospitalCode]?.monthlyPatients) || 0;
//                     const sourcePercentage = monthlyPatients > 0 ? (sourceTotal / monthlyPatients) * 100 : 0;

//                     return (
//                       <div key={hospitalCode} className={`border-2 ${colorScheme.border} rounded-lg p-6 ${colorScheme.bg}`}>
//                         <h3 className={`text-xl font-bold ${colorScheme.text} mb-6 text-center`}>Hospital Code {hospitalNumber}</h3>

//                         {/* Basic Hospital Data */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                           <div className="space-y-2">
//                             <Label className={`text-sm font-medium ${colorScheme.text.replace('800', '700')}`}>Number of BMT Patients</Label>
//                             <Input
//                               type="number"
//                               value={formData.hospitalData[hospitalCode]?.bmtPatients || ''}
//                               onChange={(e) => handleHospitalDataChange(hospitalCode, 'bmtPatients', e.target.value)}
//                               placeholder="0"
//                               className="bg-white"
//                             />
//                           </div>
//                           <div className="space-y-2">
//                             <Label className={`text-sm font-medium ${colorScheme.text.replace('800', '700')}`}>Number of Patients in a Month</Label>
//                             <Input
//                               type="number"
//                               value={formData.hospitalData[hospitalCode]?.monthlyPatients || ''}
//                               onChange={(e) => handleHospitalDataChange(hospitalCode, 'monthlyPatients', e.target.value)}
//                               placeholder="0"
//                               className="bg-white"
//                             />
//                           </div>
//                         </div>

//                         {/* Source of Funds - Show for every hospital */}
//                         <div className="mb-6">
//                           <h4 className={`text-lg font-semibold ${colorScheme.text.replace('800', '700')} mb-4`}>Source of Funds:</h4>
//                           {warnings[`${hospitalCode}_sourceFunds`] && (
//                             <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//                               <p className="text-red-600 text-sm font-medium">{warnings[`${hospitalCode}_sourceFunds`]}</p>
//                             </div>
//                           )}
//                           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                             <div className="space-y-2">
//                               <Label className="text-sm font-medium">OOP without Insurance</Label>
//                               <Input
//                                 type="number"
//                                 step="0.1"
//                                 value={formData.sourceFunds[hospitalCode]?.oopWithoutInsurance || ''}
//                                 onChange={(e) => handleSourceFundsChange(hospitalCode, 'oopWithoutInsurance', e.target.value)}
//                                 placeholder="0"
//                                 className="bg-white"
//                               />
//                               <p className="text-xs text-gray-500">out of {monthlyPatients} patients</p>
//                             </div>
//                             <div className="space-y-2">
//                               <Label className="text-sm font-medium">OOP with Insurance</Label>
//                               <Input
//                                 type="number"
//                                 step="0.1"
//                                 value={formData.sourceFunds[hospitalCode]?.oopWithInsurance || ''}
//                                 onChange={(e) => handleSourceFundsChange(hospitalCode, 'oopWithInsurance', e.target.value)}
//                                 placeholder="0"
//                                 className="bg-white"
//                               />
//                             </div>
//                             <div className="space-y-2">
//                               <Label className="text-sm font-medium">CGHS</Label>
//                               <Input
//                                 type="number"
//                                 step="0.1"
//                                 value={formData.sourceFunds[hospitalCode]?.cghs || ''}
//                                 onChange={(e) => handleSourceFundsChange(hospitalCode, 'cghs', e.target.value)}
//                                 placeholder="0"
//                                 className="bg-white"
//                               />
//                             </div>
//                             <div className="space-y-2">
//                               <Label className="text-sm font-medium">ESI</Label>
//                               <Input
//                                 type="number"
//                                 step="0.1"
//                                 value={formData.sourceFunds[hospitalCode]?.esi || ''}
//                                 onChange={(e) => handleSourceFundsChange(hospitalCode, 'esi', e.target.value)}
//                                 placeholder="0"
//                                 className="bg-white"
//                               />
//                             </div>
//                             <div className="space-y-2">
//                               <Label className="text-sm font-medium">Railways</Label>
//                               <Input
//                                 type="number"
//                                 step="0.1"
//                                 value={formData.sourceFunds[hospitalCode]?.railways || ''}
//                                 onChange={(e) => handleSourceFundsChange(hospitalCode, 'railways', e.target.value)}
//                                 placeholder="0"
//                                 className="bg-white"
//                               />
//                             </div>
//                             <div className="space-y-2">
//                               <Label className="text-sm font-medium">ECHS</Label>
//                               <Input
//                                 type="number"
//                                 step="0.1"
//                                 value={formData.sourceFunds[hospitalCode]?.echs || ''}
//                                 onChange={(e) => handleSourceFundsChange(hospitalCode, 'echs', e.target.value)}
//                                 placeholder="0"
//                                 className="bg-white"
//                               />
//                             </div>
//                             <div className="space-y-2">
//                               <Label className="text-sm font-medium">PSUs</Label>
//                               <Input
//                                 type="number"
//                                 step="0.1"
//                                 value={formData.sourceFunds[hospitalCode]?.psus || ''}
//                                 onChange={(e) => handleSourceFundsChange(hospitalCode, 'psus', e.target.value)}
//                                 placeholder="0"
//                                 className="bg-white"
//                               />
//                             </div>
//                             <div className="space-y-2">
//                               <Label className="text-sm font-medium">State Government</Label>
//                               <Input
//                                 type="number"
//                                 step="0.1"
//                                 value={formData.sourceFunds[hospitalCode]?.stateGovt || ''}
//                                 onChange={(e) => handleSourceFundsChange(hospitalCode, 'stateGovt', e.target.value)}
//                                 placeholder="0"
//                                 className="bg-white"
//                               />
//                             </div>
//                           </div>
//                           <div className={`mt-4 p-3 ${colorScheme.accent} rounded-lg flex justify-between items-center`}>
//                             <span className={`text-sm font-medium ${colorScheme.text}`}>
//                               Total Source of Funds: {sourceTotal} patients ({sourcePercentage}%)
//                             </span>
//                             {sourcePercentage > 100 && (
//                               <span className="text-red-600 text-sm font-medium">⚠ Exceeds 100%</span>
//                             )}
//                           </div>
//                         </div>

//                         {/* Patient Case Distribution */}
//                         <div>
//                           <h4 className={`text-lg font-semibold ${colorScheme.text.replace('800', '700')} mb-4`}>Patient Case Distribution By Hospital:</h4>
//                           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                             <div className="space-y-2">
//                               <Label className="text-sm font-medium">Newly Diagnosed %</Label>
//                               <Input
//                                 type="number"
//                                 step="0.1"
//                                 value={formData.hospitalCodeBreakdown[hospitalCode]?.newlyDiagnosed || ''}
//                                 onChange={(e) => handleHospitalCodeBreakdownChange(hospitalCode, 'newlyDiagnosed', e.target.value)}
//                                 placeholder="0"
//                                 className="bg-white"
//                               />
//                             </div>
//                             <div className="space-y-2">
//                               <Label className="text-sm font-medium">Relapsed/Refractory %</Label>
//                               <Input
//                                 type="number"
//                                 step="0.1"
//                                 value={formData.hospitalCodeBreakdown[hospitalCode]?.relapsedRefractory || ''}
//                                 onChange={(e) => handleHospitalCodeBreakdownChange(hospitalCode, 'relapsedRefractory', e.target.value)}
//                                 placeholder="0"
//                                 className="bg-white"
//                               />
//                             </div>
//                             <div className="space-y-2">
//                               <Label className="text-sm font-medium">2nd Opinion %</Label>
//                               <Input
//                                 type="number"
//                                 step="0.1"
//                                 value={formData.hospitalCodeBreakdown[hospitalCode]?.secondOpinion || ''}
//                                 onChange={(e) => handleHospitalCodeBreakdownChange(hospitalCode, 'secondOpinion', e.target.value)}
//                                 placeholder="0"
//                                 className="bg-white"
//                               />
//                             </div>
//                           </div>
//                           <div className={`mt-4 p-3 ${colorScheme.accent} rounded-lg`}>
//                             <span className={`text-sm font-medium ${colorScheme.text}`}>
//                               Total Patient Cases: {(
//                                 (parseFloat(formData.hospitalCodeBreakdown[hospitalCode]?.newlyDiagnosed) || 0) +
//                                 (parseFloat(formData.hospitalCodeBreakdown[hospitalCode]?.relapsedRefractory) || 0) +
//                                 (parseFloat(formData.hospitalCodeBreakdown[hospitalCode]?.secondOpinion) || 0)
//                               )}%
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}

//                   {/* Overall Totals - Only show if hospitals are selected */}
//                   <div className="bg-gray-100 p-6 rounded-lg">
//                     <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Overall Totals</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="bg-white p-4 rounded-lg text-center">
//                         <span className="text-lg font-medium text-gray-700">Total BMT Patients:</span>
//                         <span className="text-2xl font-bold text-blue-600 ml-2">{
//                           formData.selectedHospitalCodes.reduce((sum, code) =>
//                             sum + (parseInt(formData.hospitalData[code]?.bmtPatients) || 0), 0
//                           )
//                         }</span>
//                       </div>
//                       <div className="bg-white p-4 rounded-lg text-center">
//                         <span className="text-lg font-medium text-gray-700">Total Monthly Patients:</span>
//                         <span className="text-2xl font-bold text-green-600 ml-2">{
//                           formData.selectedHospitalCodes.reduce((sum, code) =>
//                             sum + (parseInt(formData.hospitalData[code]?.monthlyPatients) || 0), 0
//                           )
//                         }</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Show message if no hospital codes selected */}
//           {formData.selectedHospitalCodes.length === 0 && (
//             <Card className="shadow-lg border-0 border-dashed border-gray-300">
//               <CardContent className="p-12 text-center">
//                 <Hospital className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-xl font-semibold text-gray-600 mb-2">No Hospital Codes Selected</h3>
//                 <p className="text-gray-500">Please select hospital codes from the dropdown above to begin data collection.</p>
//               </CardContent>
//             </Card>
//           )}

//           {/* Patient Distribution (Table 7) */}
//           <Card className="shadow-lg border-0">
//             <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
//               <CardTitle className="flex items-center gap-2">
//                 <BarChart3 className="w-5 h-5" />
//                 Patient Distribution (Table 7)
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="allPatients" className="text-sm font-medium">
//                       % ALL patients
//                     </Label>
//                     <Input
//                       id="allPatients"
//                       type="number"
//                       step="0.1"
//                       value={formData.patientDistribution.allPatients}
//                       onChange={(e) => handlePatientDistributionChange('allPatients', e.target.value)}
//                       placeholder="0"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="nhlPatients" className="text-sm font-medium">
//                       % NHL Patients
//                     </Label>
//                     <Input
//                       id="nhlPatients"
//                       type="number"
//                       step="0.1"
//                       value={formData.patientDistribution.nhlPatients}
//                       onChange={(e) => handlePatientDistributionChange('nhlPatients', e.target.value)}
//                       placeholder="0"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="mmPatients" className="text-sm font-medium">
//                       % MM Patients
//                     </Label>
//                     <Input
//                       id="mmPatients"
//                       type="number"
//                       step="0.1"
//                       value={formData.patientDistribution.mmPatients}
//                       onChange={(e) => handlePatientDistributionChange('mmPatients', e.target.value)}
//                       placeholder="0"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="otherHematMalignancies" className="text-sm font-medium">
//                       % Other Hemat malignancies
//                     </Label>
//                     <Input
//                       id="otherHematMalignancies"
//                       type="number"
//                       step="0.1"
//                       value={formData.patientDistribution.otherHematMalignancies}
//                       onChange={(e) => handlePatientDistributionChange('otherHematMalignancies', e.target.value)}
//                       placeholder="0"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="glioblastomas" className="text-sm font-medium">
//                       % Glioblastomas
//                     </Label>
//                     <Input
//                       id="glioblastomas"
//                       type="number"
//                       step="0.1"
//                       value={formData.patientDistribution.glioblastomas}
//                       onChange={(e) => handlePatientDistributionChange('glioblastomas', e.target.value)}
//                       placeholder="0"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="otherSolidTumours" className="text-sm font-medium">
//                       % Other solid tumours
//                     </Label>
//                     <Input
//                       id="otherSolidTumours"
//                       type="number"
//                       step="0.1"
//                       value={formData.patientDistribution.otherSolidTumours}
//                       onChange={(e) => handlePatientDistributionChange('otherSolidTumours', e.target.value)}
//                       placeholder="0"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <Separator className="my-6" />

//               <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-lg">
//                 <span className="text-lg font-medium">Total Patient Distribution:</span>
//                 <span className="text-2xl font-bold text-indigo-600">{patientDistributionTotal}%</span>
//               </div>

//               <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//                 <p className="text-sm text-gray-600 italic">* Age distribution if required</p>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Submit Button */}
//           <div className="flex justify-center pt-6">
//             <Button
//               type="submit"
//               className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-lg font-medium rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
//             >
//               Submit Complete Survey
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }






'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { MultiSelect } from '@/components/ui/multi-select';
import { Stethoscope, Hospital, Users, CreditCard, Activity, BarChart3 } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';

export default function HealthcareSurveyForm() {
  // Dynamic hospital codes - can be fetched from API
  const [hospitalCodes, setHospitalCodes] = useState([
    { id: 'hospital1', code: 'HC001', name: 'Hospital Code 1' },
    { id: 'hospital2', code: 'HC002', name: 'Hospital Code 2' },
    { id: 'hospital3', code: 'HC003', name: 'Hospital Code 3' },
    { id: 'hospital4', code: 'HC004', name: 'Hospital Code 4' },
    { id: 'hospital5', code: 'HC005', name: 'Hospital Code 5' },
    { id: 'hospital6', code: 'HC006', name: 'Hospital Code 6' },
    { id: 'hospital7', code: 'HC007', name: 'Hospital Code 7' },
    { id: 'hospital8', code: 'HC008', name: 'Hospital Code 8' },
    { id: 'hospital9', code: 'HC009', name: 'Hospital Code 9' },
    { id: 'hospital10', code: 'HC010', name: 'Hospital Code 10' }
  ]);

  const [formData, setFormData] = useState({
    physicianName: '',
    uniqueId: '',
    speciality: '',
    visitingHospitals: '',
    selectedHospitalCodes: [],
    hospitalData: {
      hospital1: { bmtPatients: '', monthlyPatients: '' },
      hospital2: { bmtPatients: '', monthlyPatients: '' },
      hospital3: { bmtPatients: '', monthlyPatients: '' }
    },
    sourceFunds: {
      hospital1: { oopWithoutInsurance: '', oopWithInsurance: '', cghs: '', esi: '', railways: '', echs: '', psus: '', stateGovt: '' },
      hospital2: { oopWithoutInsurance: '', oopWithInsurance: '', cghs: '', esi: '', railways: '', echs: '', psus: '', stateGovt: '' },
      hospital3: { oopWithoutInsurance: '', oopWithInsurance: '', cghs: '', esi: '', railways: '', echs: '', psus: '', stateGovt: '' },
      hospital4: { oopWithoutInsurance: '', oopWithInsurance: '', cghs: '', esi: '', railways: '', echs: '', psus: '', stateGovt: '' },
      hospital5: { oopWithoutInsurance: '', oopWithInsurance: '', cghs: '', esi: '', railways: '', echs: '', psus: '', stateGovt: '' },
      hospital6: { oopWithoutInsurance: '', oopWithInsurance: '', cghs: '', esi: '', railways: '', echs: '', psus: '', stateGovt: '' },
      hospital7: { oopWithoutInsurance: '', oopWithInsurance: '', cghs: '', esi: '', railways: '', echs: '', psus: '', stateGovt: '' },
      hospital8: { oopWithoutInsurance: '', oopWithInsurance: '', cghs: '', esi: '', railways: '', echs: '', psus: '', stateGovt: '' },
      hospital9: { oopWithoutInsurance: '', oopWithInsurance: '', cghs: '', esi: '', railways: '', echs: '', psus: '', stateGovt: '' },
      hospital10: { oopWithoutInsurance: '', oopWithInsurance: '', cghs: '', esi: '', railways: '', echs: '', psus: '', stateGovt: '' }
    },
    hospitalCodeBreakdown: {
      hospital1: {
        newlyDiagnosed: '',
        relapsedRefractory: '',
        secondOpinion: ''
      },
      hospital2: {
        newlyDiagnosed: '',
        relapsedRefractory: '',
        secondOpinion: ''
      },
      hospital3: {
        newlyDiagnosed: '',
        relapsedRefractory: '',
        secondOpinion: ''
      },
      hospital4: {
        newlyDiagnosed: '',
        relapsedRefractory: '',
        secondOpinion: ''
      },
      hospital5: {
        newlyDiagnosed: '',
        relapsedRefractory: '',
        secondOpinion: ''
      },
      hospital6: {
        newlyDiagnosed: '',
        relapsedRefractory: '',
        secondOpinion: ''
      },
      hospital7: {
        newlyDiagnosed: '',
        relapsedRefractory: '',
        secondOpinion: ''
      },
      hospital8: {
        newlyDiagnosed: '',
        relapsedRefractory: '',
        secondOpinion: ''
      },
      hospital9: {
        newlyDiagnosed: '',
        relapsedRefractory: '',
        secondOpinion: ''
      },
      hospital10: {
        newlyDiagnosed: '',
        relapsedRefractory: '',
        secondOpinion: ''
      }
    },
    patientDistribution: {
      allPatients: '',
      nhlPatients: '',
      mmPatients: '',
      otherHematMalignancies: '',
      glioblastomas: '',
      otherSolidTumours: ''
    }
  });

  const [errors, setErrors] = useState({});
  const [warnings, setWarnings] = useState({});

  // Convert hospital codes to multi-select options
  const hospitalCodeOptions = hospitalCodes.map(hospital => ({
    value: hospital.id,
    label: hospital.name
  }));

  // Function to fetch hospital codes from API (for future integration)
  const fetchHospitalCodes = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/hospital-codes');
      // const data = await response.json();
      // setHospitalCodes(data);

      // For now, using static data
      console.log('Hospital codes loaded:', hospitalCodes.length);
    } catch (error) {
      console.error('Error fetching hospital codes:', error);
    }
  };

  // Load hospital codes on component mount
  useEffect(() => {
    fetchHospitalCodes();
  }, []);

  // Initialize form data structure based on available hospital codes
  const initializeFormData = () => {
    const hospitalData = {};
    const sourceFunds = {};
    const hospitalCodeBreakdown = {};

    hospitalCodes.forEach(hospital => {
      hospitalData[hospital.id] = { bmtPatients: '', monthlyPatients: '' };
      sourceFunds[hospital.id] = {
        oopWithoutInsurance: '', oopWithInsurance: '', cghs: '', esi: '',
        railways: '', echs: '', psus: '', stateGovt: ''
      };
      hospitalCodeBreakdown[hospital.id] = {
        newlyDiagnosed: '', relapsedRefractory: '', secondOpinion: ''
      };
    });

    return { hospitalData, sourceFunds, hospitalCodeBreakdown };
  };

  // Update form data when hospital codes change
  useEffect(() => {
    const { hospitalData, sourceFunds, hospitalCodeBreakdown } = initializeFormData();
    setFormData(prev => ({
      ...prev,
      hospitalData: { ...prev.hospitalData, ...hospitalData },
      sourceFunds: { ...prev.sourceFunds, ...sourceFunds },
      hospitalCodeBreakdown: { ...prev.hospitalCodeBreakdown, ...hospitalCodeBreakdown }
    }));
  }, [hospitalCodes]);

  // Get hospital name by ID
  const getHospitalName = (hospitalId) => {
    const hospital = hospitalCodes.find(h => h.id === hospitalId);
    return hospital ? hospital.name : hospitalId;
  };

  // Get hospital code by ID
  const getHospitalCode = (hospitalId) => {
    const hospital = hospitalCodes.find(h => h.id === hospitalId);
    return hospital ? hospital.code : hospitalId;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleHospitalCodesChange = (selectedCodes) => {
    setFormData(prev => ({
      ...prev,
      selectedHospitalCodes: selectedCodes
    }));
  };

  const handleHospitalDataChange = (hospital, field, value) => {
    setFormData(prev => ({
      ...prev,
      hospitalData: {
        ...prev.hospitalData,
        [hospital]: {
          ...prev.hospitalData[hospital],
          [field]: value
        }
      }
    }));
  };

  const handleSourceFundsChange = (hospital, source, value) => {
    const numValue = parseFloat(value) || 0;
    const monthlyPatients = parseInt(formData.hospitalData[hospital]?.monthlyPatients) || 0;

    // Calculate current total excluding the field being changed
    const currentSourceFunds = formData.sourceFunds[hospital] || {};
    const currentTotal = Object.entries(currentSourceFunds).reduce((sum, [key, val]) => {
      if (key === source) return sum; // Exclude the field being changed
      return sum + (parseFloat(val) || 0);
    }, 0);

    const newTotal = currentTotal + numValue;

    // Check if total exceeds monthly patients
    if (newTotal > monthlyPatients && monthlyPatients > 0) {
      setWarnings(prev => ({
        ...prev,
        [`${hospital}_sourceFunds`]: `Total source of funds (${newTotal}) cannot exceed monthly patients (${monthlyPatients})`
      }));
    } else {
      setWarnings(prev => {
        const newWarnings = { ...prev };
        delete newWarnings[`${hospital}_sourceFunds`];
        return newWarnings;
      });
    }

    setFormData(prev => ({
      ...prev,
      sourceFunds: {
        ...prev.sourceFunds,
        [hospital]: {
          ...prev.sourceFunds[hospital],
          [source]: value
        }
      }
    }));
  };

  const handleHospitalCodeBreakdownChange = (hospital, field, value) => {
    setFormData(prev => ({
      ...prev,
      hospitalCodeBreakdown: {
        ...prev.hospitalCodeBreakdown,
        [hospital]: {
          ...prev.hospitalCodeBreakdown[hospital],
          [field]: value
        }
      }
    }));
  };

  const handlePatientDistributionChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      patientDistribution: {
        ...prev.patientDistribution,
        [field]: value
      }
    }));
  };

  const calculateTotals = () => {
    const totalBMT = formData.selectedHospitalCodes.reduce((sum, code) =>
      sum + (parseInt(formData.hospitalData[code]?.bmtPatients) || 0), 0
    );
    const totalMonthly = formData.selectedHospitalCodes.reduce((sum, code) =>
      sum + (parseInt(formData.hospitalData[code]?.monthlyPatients) || 0), 0
    );

    return { totalBMT, totalMonthly };
  };

  const calculateSourceTotal = (hospital) => {
    const sourceFunds = formData.sourceFunds[hospital] || {};
    return Object.values(sourceFunds).reduce((sum, value) =>
      sum + (parseFloat(value) || 0), 0
    );
  };

  const calculateHospitalCodeTotals = (hospital) => {
    const data = formData.hospitalCodeBreakdown[hospital] || {};
    return {
      newlyDiagnosed: parseFloat(data.newlyDiagnosed) || 0,
      relapsedRefractory: parseFloat(data.relapsedRefractory) || 0,
      secondOpinion: parseFloat(data.secondOpinion) || 0
    };
  };

  const calculatePatientDistributionTotal = () => {
    const { patientDistribution } = formData;
    return Object.values(patientDistribution).reduce((sum, value) =>
      sum + (parseFloat(value) || 0), 0
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.physicianName.trim()) {
      newErrors.physicianName = 'Physician name is required';
    }

    if (!formData.uniqueId.trim()) {
      newErrors.uniqueId = 'Unique ID is required';
    }

    if (!formData.speciality.trim()) {
      newErrors.speciality = 'Speciality is required';
    }

    if (!formData.visitingHospitals.trim()) {
      newErrors.visitingHospitals = 'Number of visiting hospitals is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Survey submitted successfully!');
    }
  };

  const { totalBMT, totalMonthly } = calculateTotals();
  const patientDistributionTotal = calculatePatientDistributionTotal();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex flex-row items-center justify-between gap-3 mb-4 lg:mb-0 text-center">
            <Image
              src="/assets/common/ImmunoACT_Logo.png"
              alt="ImmunoACT Logo"
              width={140}
              height={100}
              className="w-[180px] h-auto md:w-[140px] lg:w-[160px]"
              unoptimized
              priority
            />
            <div className="flex gap-3">
              <Link href="/">
              </Link>

              {/* <Link href="/analytics">
                <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white cursor-pointer">
                  <Activity className="w-4 h-4" />
                  Analytics
                </Button>
              </Link> */}

              <Link href="/dashboard">
                <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                  <BarChart3 className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="text-3xl font-bold text-gray-800">Healthcare Survey Form</h2>
          </div>
          <p className="text-base md:text-lg text-gray-600">Physician Data Collection for Sales Representatives</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Physician Information */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5" />
                Physician Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="physicianName" className="text-sm font-medium">
                    Name of the Physician *
                  </Label>
                  <Input
                    id="physicianName"
                    value={formData.physicianName}
                    onChange={(e) => handleInputChange('physicianName', e.target.value)}
                    placeholder="Enter physician name"
                    className={`transition-all duration-200 ${errors.physicianName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.physicianName && (
                    <p className="text-red-500 text-sm">{errors.physicianName}</p>
                  )}
                </div>

                {/* <div className="space-y-2">
                  <Label htmlFor="uniqueId" className="text-sm font-medium">
                    Unique ID *
                  </Label>
                  <Input
                    id="uniqueId"
                    value={formData.uniqueId}
                    onChange={(e) => handleInputChange('uniqueId', e.target.value)}
                    placeholder="Enter unique ID"
                    className={`transition-all duration-200 ${errors.uniqueId ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.uniqueId && (
                    <p className="text-red-500 text-sm">{errors.uniqueId}</p>
                  )}
                </div> */}

                <div className="space-y-2">
                  <Label htmlFor="speciality" className="text-sm font-medium">
                    Speciality *
                  </Label>
                  <Input
                    id="speciality"
                    value={formData.speciality}
                    onChange={(e) => handleInputChange('speciality', e.target.value)}
                    placeholder="Enter speciality"
                    className={`transition-all duration-200 ${errors.speciality ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.speciality && (
                    <p className="text-red-500 text-sm">{errors.speciality}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visitingHospitals" className="text-sm font-medium">
                    Number of Visiting Hospitals *
                  </Label>
                  <Input
                    id="visitingHospitals"
                    type="number"
                    value={formData.visitingHospitals}
                    onChange={(e) => handleInputChange('visitingHospitals', e.target.value)}
                    placeholder="Enter number"
                    className={`transition-all duration-200 ${errors.visitingHospitals ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.visitingHospitals && (
                    <p className="text-red-500 text-sm">{errors.visitingHospitals}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium">
                    Select Hospital Codes *
                  </Label>
                  <MultiSelect
                    options={hospitalCodeOptions}
                    value={formData.selectedHospitalCodes}
                    onChange={handleHospitalCodesChange}
                    placeholder="Select hospital codes to survey..."
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500">
                    Select the hospital codes you want to collect data for. Only selected hospitals will appear in the form below.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Show hospital sections only for selected codes */}
          {formData.selectedHospitalCodes.length > 0 && (
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Hospital className="w-5 h-5" />
                  Hospital Data - {formData.selectedHospitalCodes.length} Selected
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-8">
                  {/* Render only selected hospital codes */}
                  {formData.selectedHospitalCodes.map((hospitalCode, index) => {
                    const hospitalName = getHospitalName(hospitalCode);
                    const hospitalCodeDisplay = getHospitalCode(hospitalCode);
                    const colors = [
                      { border: 'border-green-200', bg: 'bg-green-50', text: 'text-green-800', accent: 'bg-green-100' },
                      { border: 'border-blue-200', bg: 'bg-blue-50', text: 'text-blue-800', accent: 'bg-blue-100' },
                      { border: 'border-purple-200', bg: 'bg-purple-50', text: 'text-purple-800', accent: 'bg-purple-100' },
                      { border: 'border-orange-200', bg: 'bg-orange-50', text: 'text-orange-800', accent: 'bg-orange-100' },
                      { border: 'border-pink-200', bg: 'bg-pink-50', text: 'text-pink-800', accent: 'bg-pink-100' },
                      { border: 'border-indigo-200', bg: 'bg-indigo-50', text: 'text-indigo-800', accent: 'bg-indigo-100' },
                      { border: 'border-red-200', bg: 'bg-red-50', text: 'text-red-800', accent: 'bg-red-100' },
                      { border: 'border-yellow-200', bg: 'bg-yellow-50', text: 'text-yellow-800', accent: 'bg-yellow-100' },
                      { border: 'border-teal-200', bg: 'bg-teal-50', text: 'text-teal-800', accent: 'bg-teal-100' },
                      { border: 'border-cyan-200', bg: 'bg-cyan-50', text: 'text-cyan-800', accent: 'bg-cyan-100' }
                    ];
                    const colorScheme = colors[index % colors.length];
                    const sourceTotal = calculateSourceTotal(hospitalCode);
                    const monthlyPatients = parseInt(formData.hospitalData[hospitalCode]?.monthlyPatients) || 0;
                    const sourcePercentage = monthlyPatients > 0 ? (sourceTotal / monthlyPatients) * 100 : 0;

                    return (
                      <div key={hospitalCode} className={`border-2 ${colorScheme.border} rounded-lg p-6 ${colorScheme.bg}`}>
                        <h3 className={`text-xl font-bold ${colorScheme.text} mb-6 text-center`}>
                          {hospitalName} ({hospitalCodeDisplay})
                        </h3>

                        {/* Basic Hospital Data */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="space-y-2">
                            <Label className={`text-sm font-medium ${colorScheme.text.replace('800', '700')}`}>Number of BMT Patients</Label>
                            <Input
                              type="number"
                              value={formData.hospitalData[hospitalCode]?.bmtPatients || ''}
                              onChange={(e) => handleHospitalDataChange(hospitalCode, 'bmtPatients', e.target.value)}
                              placeholder="0"
                              className="bg-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className={`text-sm font-medium ${colorScheme.text.replace('800', '700')}`}>Number of Patients in a Month</Label>
                            <Input
                              type="number"
                              value={formData.hospitalData[hospitalCode]?.monthlyPatients || ''}
                              onChange={(e) => handleHospitalDataChange(hospitalCode, 'monthlyPatients', e.target.value)}
                              placeholder="0"
                              className="bg-white"
                            />
                          </div>
                        </div>

                        {/* Source of Funds - Show for every hospital */}
                        <div className="mb-6">
                          <h4 className={`text-lg font-semibold ${colorScheme.text.replace('800', '700')} mb-4`}>Source of Funds:</h4>
                          {warnings[`${hospitalCode}_sourceFunds`] && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                              <p className="text-red-600 text-sm font-medium">{warnings[`${hospitalCode}_sourceFunds`]}</p>
                            </div>
                          )}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">OOP without Insurance</Label>
                              <Input
                                type="number"
                                step="0.1"
                                value={formData.sourceFunds[hospitalCode]?.oopWithoutInsurance || ''}
                                onChange={(e) => handleSourceFundsChange(hospitalCode, 'oopWithoutInsurance', e.target.value)}
                                placeholder="0"
                                className="bg-white"
                              />
                              <p className="text-xs text-gray-500">out of {monthlyPatients} patients</p>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">OOP with Insurance</Label>
                              <Input
                                type="number"
                                step="0.1"
                                value={formData.sourceFunds[hospitalCode]?.oopWithInsurance || ''}
                                onChange={(e) => handleSourceFundsChange(hospitalCode, 'oopWithInsurance', e.target.value)}
                                placeholder="0"
                                className="bg-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">CGHS</Label>
                              <Input
                                type="number"
                                step="0.1"
                                value={formData.sourceFunds[hospitalCode]?.cghs || ''}
                                onChange={(e) => handleSourceFundsChange(hospitalCode, 'cghs', e.target.value)}
                                placeholder="0"
                                className="bg-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">ESI</Label>
                              <Input
                                type="number"
                                step="0.1"
                                value={formData.sourceFunds[hospitalCode]?.esi || ''}
                                onChange={(e) => handleSourceFundsChange(hospitalCode, 'esi', e.target.value)}
                                placeholder="0"
                                className="bg-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">Railways</Label>
                              <Input
                                type="number"
                                step="0.1"
                                value={formData.sourceFunds[hospitalCode]?.railways || ''}
                                onChange={(e) => handleSourceFundsChange(hospitalCode, 'railways', e.target.value)}
                                placeholder="0"
                                className="bg-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">ECHS</Label>
                              <Input
                                type="number"
                                step="0.1"
                                value={formData.sourceFunds[hospitalCode]?.echs || ''}
                                onChange={(e) => handleSourceFundsChange(hospitalCode, 'echs', e.target.value)}
                                placeholder="0"
                                className="bg-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">PSUs</Label>
                              <Input
                                type="number"
                                step="0.1"
                                value={formData.sourceFunds[hospitalCode]?.psus || ''}
                                onChange={(e) => handleSourceFundsChange(hospitalCode, 'psus', e.target.value)}
                                placeholder="0"
                                className="bg-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">State Government</Label>
                              <Input
                                type="number"
                                step="0.1"
                                value={formData.sourceFunds[hospitalCode]?.stateGovt || ''}
                                onChange={(e) => handleSourceFundsChange(hospitalCode, 'stateGovt', e.target.value)}
                                placeholder="0"
                                className="bg-white"
                              />
                            </div>
                          </div>
                          <div className={`mt-4 p-3 ${colorScheme.accent} rounded-lg flex justify-between items-center`}>
                            <span className={`text-sm font-medium ${colorScheme.text}`}>
                              Total Source of Funds: {sourceTotal} patients ({sourcePercentage}%)
                            </span>
                            {sourcePercentage > 100 && (
                              <span className="text-red-600 text-sm font-medium">⚠ Exceeds 100%</span>
                            )}
                          </div>
                        </div>

                        {/* Patient Case Distribution */}
                        <div>
                          <h4 className={`text-lg font-semibold ${colorScheme.text.replace('800', '700')} mb-4`}>Patient Case Distribution By Hospital:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">Newly Diagnosed %</Label>
                              <Input
                                type="number"
                                step="0.1"
                                value={formData.hospitalCodeBreakdown[hospitalCode]?.newlyDiagnosed || ''}
                                onChange={(e) => handleHospitalCodeBreakdownChange(hospitalCode, 'newlyDiagnosed', e.target.value)}
                                placeholder="0"
                                className="bg-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">Relapsed/Refractory %</Label>
                              <Input
                                type="number"
                                step="0.1"
                                value={formData.hospitalCodeBreakdown[hospitalCode]?.relapsedRefractory || ''}
                                onChange={(e) => handleHospitalCodeBreakdownChange(hospitalCode, 'relapsedRefractory', e.target.value)}
                                placeholder="0"
                                className="bg-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm font-medium">2nd Opinion %</Label>
                              <Input
                                type="number"
                                step="0.1"
                                value={formData.hospitalCodeBreakdown[hospitalCode]?.secondOpinion || ''}
                                onChange={(e) => handleHospitalCodeBreakdownChange(hospitalCode, 'secondOpinion', e.target.value)}
                                placeholder="0"
                                className="bg-white"
                              />
                            </div>
                          </div>
                          <div className={`mt-4 p-3 ${colorScheme.accent} rounded-lg`}>
                            <span className={`text-sm font-medium ${colorScheme.text}`}>
                              Total Patient Cases: {(
                                (parseFloat(formData.hospitalCodeBreakdown[hospitalCode]?.newlyDiagnosed) || 0) +
                                (parseFloat(formData.hospitalCodeBreakdown[hospitalCode]?.relapsedRefractory) || 0) +
                                (parseFloat(formData.hospitalCodeBreakdown[hospitalCode]?.secondOpinion) || 0)
                              )}%
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Overall Totals - Only show if hospitals are selected */}
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                      Overall Totals ({formData.selectedHospitalCodes.length} Hospitals Selected)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg text-center">
                        <span className="text-lg font-medium text-gray-700">Total BMT Patients:</span>
                        <span className="text-2xl font-bold text-blue-600 ml-2">{
                          formData.selectedHospitalCodes.reduce((sum, code) =>
                            sum + (parseInt(formData.hospitalData[code]?.bmtPatients) || 0), 0
                          )
                        }</span>
                      </div>
                      <div className="bg-white p-4 rounded-lg text-center">
                        <span className="text-lg font-medium text-gray-700">Total Monthly Patients:</span>
                        <span className="text-2xl font-bold text-green-600 ml-2">{
                          formData.selectedHospitalCodes.reduce((sum, code) =>
                            sum + (parseInt(formData.hospitalData[code]?.monthlyPatients) || 0), 0
                          )
                        }</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Show message if no hospital codes selected */}
          {formData.selectedHospitalCodes.length === 0 && (
            <Card className="shadow-lg border-0 border-dashed border-gray-300">
              <CardContent className="p-12 text-center">
                <Hospital className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Hospital Codes Selected</h3>
                <p className="text-gray-500">
                  Please select hospital codes from the dropdown above to begin data collection.
                  <br />
                  <span className="text-sm">({hospitalCodes.length} hospital codes available)</span>
                </p>
              </CardContent>
            </Card>
          )}

          {/* Patient Distribution (Table 7) */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Patient Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="allPatients" className="text-sm font-medium">
                      % ALL patients
                    </Label>
                    <Input
                      id="allPatients"
                      type="number"
                      step="0.1"
                      value={formData.patientDistribution.allPatients}
                      onChange={(e) => handlePatientDistributionChange('allPatients', e.target.value)}
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nhlPatients" className="text-sm font-medium">
                      % NHL Patients
                    </Label>
                    <Input
                      id="nhlPatients"
                      type="number"
                      step="0.1"
                      value={formData.patientDistribution.nhlPatients}
                      onChange={(e) => handlePatientDistributionChange('nhlPatients', e.target.value)}
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mmPatients" className="text-sm font-medium">
                      % MM Patients
                    </Label>
                    <Input
                      id="mmPatients"
                      type="number"
                      step="0.1"
                      value={formData.patientDistribution.mmPatients}
                      onChange={(e) => handlePatientDistributionChange('mmPatients', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otherHematMalignancies" className="text-sm font-medium">
                      % Other Hemat malignancies
                    </Label>
                    <Input
                      id="otherHematMalignancies"
                      type="number"
                      step="0.1"
                      value={formData.patientDistribution.otherHematMalignancies}
                      onChange={(e) => handlePatientDistributionChange('otherHematMalignancies', e.target.value)}
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="glioblastomas" className="text-sm font-medium">
                      % Glioblastomas
                    </Label>
                    <Input
                      id="glioblastomas"
                      type="number"
                      step="0.1"
                      value={formData.patientDistribution.glioblastomas}
                      onChange={(e) => handlePatientDistributionChange('glioblastomas', e.target.value)}
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="otherSolidTumours" className="text-sm font-medium">
                      % Other solid tumours
                    </Label>
                    <Input
                      id="otherSolidTumours"
                      type="number"
                      step="0.1"
                      value={formData.patientDistribution.otherSolidTumours}
                      onChange={(e) => handlePatientDistributionChange('otherSolidTumours', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-lg">
                <span className="text-lg font-medium">Total Patient Distribution:</span>
                <span className="text-2xl font-bold text-indigo-600">{patientDistributionTotal}%</span>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 italic">* Age distribution if required</p>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-lg font-medium rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Submit Complete Survey
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}