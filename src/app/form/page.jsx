"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Stethoscope,
  Hospital,
  User,
  BarChart3,
  Trash2,
  ShieldCheck,
  PlusCircle,
  Info,
} from "lucide-react";
import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import doctors from "@/data/doctors.json";
// import hospitals from "@/data/hospitals.json";
import { SingleSelect } from "@/components/ui/SingleSelect";
import * as RadioGroup from "@radix-ui/react-radio-group";
import toast from "react-hot-toast";

const doctorOptions = doctors;

export default function HealthcareSurveyForm() {

  // Dynamic hospital codes - can be fetched from API
  const [hospitalCodes, setHospitalCodes] = useState([
    { id: "hospital1", code: "HC001", name: "Hospital Code 1" },
    { id: "hospital2", code: "HC002", name: "Hospital Code 2" },
    { id: "hospital3", code: "HC003", name: "Hospital Code 3" },
    { id: "hospital4", code: "HC004", name: "Hospital Code 4" },
    { id: "hospital5", code: "HC005", name: "Hospital Code 5" },
    { id: "hospital6", code: "HC006", name: "Hospital Code 6" },
    { id: "hospital7", code: "HC007", name: "Hospital Code 7" },
    { id: "hospital8", code: "HC008", name: "Hospital Code 8" },
    { id: "hospital9", code: "HC009", name: "Hospital Code 9" },
    { id: "hospital10", code: "HC010", name: "Hospital Code 10" },
  ]);

  const [customHospitals, setCustomHospitals] = useState([]); // {id, name}
  const [showAddHospitalInput, setShowAddHospitalInput] = useState(false);
  const [newHospitalName, setNewHospitalName] = useState("");

  const [formData, setFormData] = useState({
    physicianName: "",
    uniqueId: "",
    speciality: "",
    visitingHospitals: "",
    selectedHospitalCodes: [],
    hospitalData: {
      hospital1: {
        bmtPatients: "",
        monthlyPatients: "",
        patientDistribution: {
          allPatients: "",
          nhlPatients: "",
          mmPatients: "",
          otherHematMalignancies: "",
          glioblastomas: "",
          otherSolidTumours: "",
        },
      },
      hospital2: {
        bmtPatients: "",
        monthlyPatients: "",
        patientDistribution: {
          allPatients: "",
          nhlPatients: "",
          mmPatients: "",
          otherHematMalignancies: "",
          glioblastomas: "",
          otherSolidTumours: "",
        },
      },
      hospital3: {
        bmtPatients: "",
        monthlyPatients: "",
        patientDistribution: {
          allPatients: "",
          nhlPatients: "",
          mmPatients: "",
          otherHematMalignancies: "",
          glioblastomas: "",
          otherSolidTumours: "",
        },
      },
      hospital4: {
        bmtPatients: "",
        monthlyPatients: "",
        patientDistribution: {
          allPatients: "",
          nhlPatients: "",
          mmPatients: "",
          otherHematMalignancies: "",
          glioblastomas: "",
          otherSolidTumours: "",
        },
      },
      hospital5: {
        bmtPatients: "",
        monthlyPatients: "",
        patientDistribution: {
          allPatients: "",
          nhlPatients: "",
          mmPatients: "",
          otherHematMalignancies: "",
          glioblastomas: "",
          otherSolidTumours: "",
        },
      },
      hospital6: {
        bmtPatients: "",
        monthlyPatients: "",
        patientDistribution: {
          allPatients: "",
          nhlPatients: "",
          mmPatients: "",
          otherHematMalignancies: "",
          glioblastomas: "",
          otherSolidTumours: "",
        },
      },
      hospital7: {
        bmtPatients: "",
        monthlyPatients: "",
        patientDistribution: {
          allPatients: "",
          nhlPatients: "",
          mmPatients: "",
          otherHematMalignancies: "",
          glioblastomas: "",
          otherSolidTumours: "",
        },
      },
      hospital8: {
        bmtPatients: "",
        monthlyPatients: "",
        patientDistribution: {
          allPatients: "",
          nhlPatients: "",
          mmPatients: "",
          otherHematMalignancies: "",
          glioblastomas: "",
          otherSolidTumours: "",
        },
      },
      hospital9: {
        bmtPatients: "",
        monthlyPatients: "",
        patientDistribution: {
          allPatients: "",
          nhlPatients: "",
          mmPatients: "",
          otherHematMalignancies: "",
          glioblastomas: "",
          otherSolidTumours: "",
        },
      },
      hospital10: {
        bmtPatients: "",
        monthlyPatients: "",
        patientDistribution: {
          allPatients: "",
          nhlPatients: "",
          mmPatients: "",
          otherHematMalignancies: "",
          glioblastomas: "",
          otherSolidTumours: "",
        },
      },
    },
    sourceFunds: {
      hospital1: {
        oopWithoutInsurance: "",
        oopWithInsurance: "",
        cghs: "",
        esi: "",
        railways: "",
        echs: "",
        psus: "",
        stateGovt: "",
        defence: "",
      },
      hospital2: {
        oopWithoutInsurance: "",
        oopWithInsurance: "",
        cghs: "",
        esi: "",
        railways: "",
        echs: "",
        psus: "",
        stateGovt: "",
        defence: "",
      },
      hospital3: {
        oopWithoutInsurance: "",
        oopWithInsurance: "",
        cghs: "",
        esi: "",
        railways: "",
        echs: "",
        psus: "",
        stateGovt: "",
        defence: "",
      },
      hospital4: {
        oopWithoutInsurance: "",
        oopWithInsurance: "",
        cghs: "",
        esi: "",
        railways: "",
        echs: "",
        psus: "",
        stateGovt: "",
        defence: "",
      },
      hospital5: {
        oopWithoutInsurance: "",
        oopWithInsurance: "",
        cghs: "",
        esi: "",
        railways: "",
        echs: "",
        psus: "",
        stateGovt: "",
        defence: "",
      },
      hospital6: {
        oopWithoutInsurance: "",
        oopWithInsurance: "",
        cghs: "",
        esi: "",
        railways: "",
        echs: "",
        psus: "",
        stateGovt: "",
        defence: "",
      },
      hospital7: {
        oopWithoutInsurance: "",
        oopWithInsurance: "",
        cghs: "",
        esi: "",
        railways: "",
        echs: "",
        psus: "",
        stateGovt: "",
        defence: "",
      },
      hospital8: {
        oopWithoutInsurance: "",
        oopWithInsurance: "",
        cghs: "",
        esi: "",
        railways: "",
        echs: "",
        psus: "",
        stateGovt: "",
        defence: "",
      },
      hospital9: {
        oopWithoutInsurance: "",
        oopWithInsurance: "",
        cghs: "",
        esi: "",
        railways: "",
        echs: "",
        psus: "",
        stateGovt: "",
        defence: "",
      },
      hospital10: {
        oopWithoutInsurance: "",
        oopWithInsurance: "",
        cghs: "",
        esi: "",
        railways: "",
        echs: "",
        psus: "",
        stateGovt: "",
        defence: "",
      },
    },
    hospitalCodeBreakdown: {
      hospital1: {
        newlyDiagnosed: "",
        relapsedRefractory: "",
        secondOpinion: "",
      },
      hospital2: {
        newlyDiagnosed: "",
        relapsedRefractory: "",
        secondOpinion: "",
      },
      hospital3: {
        newlyDiagnosed: "",
        relapsedRefractory: "",
        secondOpinion: "",
      },
      hospital4: {
        newlyDiagnosed: "",
        relapsedRefractory: "",
        secondOpinion: "",
      },
      hospital5: {
        newlyDiagnosed: "",
        relapsedRefractory: "",
        secondOpinion: "",
      },
      hospital6: {
        newlyDiagnosed: "",
        relapsedRefractory: "",
        secondOpinion: "",
      },
      hospital7: {
        newlyDiagnosed: "",
        relapsedRefractory: "",
        secondOpinion: "",
      },
      hospital8: {
        newlyDiagnosed: "",
        relapsedRefractory: "",
        secondOpinion: "",
      },
      hospital9: {
        newlyDiagnosed: "",
        relapsedRefractory: "",
        secondOpinion: "",
      },
      hospital10: {
        newlyDiagnosed: "",
        relapsedRefractory: "",
        secondOpinion: "",
      },
    },
    patientDistribution: {
      allPatients: "",
      nhlPatients: "",
      mmPatients: "",
      otherHematMalignancies: "",
      glioblastomas: "",
      otherSolidTumours: "",
    },
    patientDistributionMatrix: {
      hospital1: {
        allPatients: {},
        nhlPatients: {},
        mmPatients: {},
        otherHematMalignancies: {},
        glioblastomas: {},
        otherSolidTumours: {},
      },
      hospital2: {
        allPatients: {},
        nhlPatients: {},
        mmPatients: {},
        otherHematMalignancies: {},
        glioblastomas: {},
        otherSolidTumours: {},
      },
      hospital3: {
        allPatients: {},
        nhlPatients: {},
        mmPatients: {},
        otherHematMalignancies: {},
        glioblastomas: {},
        otherSolidTumours: {},
      },
      hospital4: {
        allPatients: {},
        nhlPatients: {},
        mmPatients: {},
        otherHematMalignancies: {},
        glioblastomas: {},
        otherSolidTumours: {},
      },
      hospital5: {
        allPatients: {},
        nhlPatients: {},
        mmPatients: {},
        otherHematMalignancies: {},
        glioblastomas: {},
        otherSolidTumours: {},
      },
      hospital6: {
        allPatients: {},
        nhlPatients: {},
        mmPatients: {},
        otherHematMalignancies: {},
        glioblastomas: {},
        otherSolidTumours: {},
      },
      hospital7: {
        allPatients: {},
        nhlPatients: {},
        mmPatients: {},
        otherHematMalignancies: {},
        glioblastomas: {},
        otherSolidTumours: {},
      },
      hospital8: {
        allPatients: {},
        nhlPatients: {},
        mmPatients: {},
        otherHematMalignancies: {},
        glioblastomas: {},
        otherSolidTumours: {},
      },
      hospital9: {
        allPatients: {},
        nhlPatients: {},
        mmPatients: {},
        otherHematMalignancies: {},
        glioblastomas: {},
        otherSolidTumours: {},
      },
      hospital10: {
        allPatients: {},
        nhlPatients: {},
        mmPatients: {},
        otherHematMalignancies: {},
        glioblastomas: {},
        otherSolidTumours: {},
      },
    },
    additionalInsights: "",
  });

  const [errors, setErrors] = useState({});
  const [warnings, setWarnings] = useState({});
  const [showHospitalTooltip, setShowHospitalTooltip] = useState(false);

  const handleSelectChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      physicianName: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSpecialityChange = (value) => {
    setFormData((prev) => ({ ...prev, speciality: value }));
  };

  // Convert hospital codes to multi-select options
  const hospitalCodeOptions = [
    ...hospitalCodes.map((hospital) => ({
      value: hospital.id,
      label: hospital.name,
    })),
    ...customHospitals.map((h) => ({ value: h.id, label: h.name })),
    { value: "new_hospital", label: "Add New Hospital" },
  ];

  // Function to fetch hospital codes from API (for future integration)
  const fetchHospitalCodes = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/hospital-codes');
      // const data = await response.json();
      // setHospitalCodes(data);

      // For now, using static data
      console.log("Hospitals loaded:", hospitalCodes.length);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
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
    const patientMatrix = {};

    hospitalCodes.forEach((hospital) => {
      hospitalData[hospital.id] = { bmtPatients: "", monthlyPatients: "" };
      sourceFunds[hospital.id] = {
        oopWithoutInsurance: "",
        oopWithInsurance: "",
        cghs: "",
        esi: "",
        railways: "",
        echs: "",
        psus: "",
        stateGovt: "",
        defence: "",
      };
      hospitalCodeBreakdown[hospital.id] = {
        newlyDiagnosed: "",
        relapsedRefractory: "",
        secondOpinion: "",
      };
      patientMatrix[hospital.id] = {
        allPatients: {},
        nhlPatients: {},
        mmPatients: {},
        otherHematMalignancies: {},
        glioblastomas: {},
        otherSolidTumours: {},
      };
    });

    return { hospitalData, sourceFunds, hospitalCodeBreakdown, patientMatrix };
  };

  // Update form data when hospital codes change
  useEffect(() => {
    const { hospitalData, sourceFunds, hospitalCodeBreakdown, patientMatrix } =
      initializeFormData();
    setFormData((prev) => ({
      ...prev,
      hospitalData: { ...prev.hospitalData, ...hospitalData },
      sourceFunds: { ...prev.sourceFunds, ...sourceFunds },
      hospitalCodeBreakdown: {
        ...prev.hospitalCodeBreakdown,
        ...hospitalCodeBreakdown,
      },
      patientDistributionMatrix: {
        ...prev.patientDistributionMatrix,
        ...patientMatrix,
      },
    }));
  }, [hospitalCodes]);

  // Update form data when custom hospitals change
  useEffect(() => {
    const hospitalData = {};
    const sourceFunds = {};
    const hospitalCodeBreakdown = {};
    const patientMatrix = {};

    customHospitals.forEach((custom) => {
      hospitalData[custom.id] = { bmtPatients: "", monthlyPatients: "" };
      sourceFunds[custom.id] = {
        oopWithoutInsurance: "",
        oopWithInsurance: "",
        cghs: "",
        esi: "",
        railways: "",
        echs: "",
        psus: "",
        stateGovt: "",
        defence: "",
      };
      hospitalCodeBreakdown[custom.id] = {
        newlyDiagnosed: "",
        relapsedRefractory: "",
        secondOpinion: "",
      };
      patientMatrix[custom.id] = {
        allPatients: {},
        nhlPatients: {},
        mmPatients: {},
        otherHematMalignancies: {},
        glioblastomas: {},
        otherSolidTumours: {},
      };
    });

    setFormData((prev) => ({
      ...prev,
      hospitalData: { ...prev.hospitalData, ...hospitalData },
      sourceFunds: { ...prev.sourceFunds, ...sourceFunds },
      hospitalCodeBreakdown: {
        ...prev.hospitalCodeBreakdown,
        ...hospitalCodeBreakdown,
      },
      patientDistributionMatrix: {
        ...prev.patientDistributionMatrix,
        ...patientMatrix,
      },
    }));
  }, [customHospitals]);

  // Get hospital name by ID
  const getHospitalName = (hospitalId) => {
    const hospital = hospitalCodes.find((h) => h.id === hospitalId);
    if (hospital) return hospital.name;
    const custom = customHospitals.find((h) => h.id === hospitalId);
    if (custom) return custom.name;
    return hospitalId;
  };

  // Get hospital code by ID
  const getHospitalCode = (hospitalId) => {
    const hospital = hospitalCodes.find((h) => h.id === hospitalId);
    if (hospital) return hospital.code;
    const custom = customHospitals.find((h) => h.id === hospitalId);
    if (custom) return custom.name;
    return hospitalId;
  };

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

  const handleHospitalCodesChange = (selectedCodes) => {
    // If 'new_hospital' is selected, show input and don't add to selectedHospitalCodes
    if (selectedCodes.includes("new_hospital")) {
      setShowAddHospitalInput(true);
      // Remove 'new_hospital' from selection
      selectedCodes = selectedCodes.filter((c) => c !== "new_hospital");
    } else {
      setShowAddHospitalInput(false);
    }
    setFormData((prev) => {
      let updated = { ...prev };
      // Remove any deleted custom hospitals' data
      const allHospitalIds = [
        ...hospitalCodes.map((h) => h.id),
        ...customHospitals.map((h) => h.id),
      ];
      Object.keys(updated.hospitalData).forEach((id) => {
        if (!allHospitalIds.includes(id)) {
          delete updated.hospitalData[id];
          delete updated.sourceFunds[id];
          delete updated.hospitalCodeBreakdown[id];
        }
      });
      updated.selectedHospitalCodes = selectedCodes;
      return updated;
    });
  };

  // Handler for adding a new custom hospital
  const handleAddCustomHospital = () => {
    if (!newHospitalName.trim()) return;
    // Generate a unique id
    const id = `custom_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    setCustomHospitals((prev) => [
      ...prev,
      { id, name: newHospitalName.trim() },
    ]);
    setFormData((prev) => ({
      ...prev,
      selectedHospitalCodes: [...prev.selectedHospitalCodes, id],
      hospitalData: {
        ...prev.hospitalData,
        [id]: { bmtPatients: "", monthlyPatients: "" },
      },
      sourceFunds: {
        ...prev.sourceFunds,
        [id]: {
          oopWithoutInsurance: "",
          oopWithInsurance: "",
          cghs: "",
          esi: "",
          railways: "",
          echs: "",
          psus: "",
          stateGovt: "",
        },
      },
      hospitalCodeBreakdown: {
        ...prev.hospitalCodeBreakdown,
        [id]: { newlyDiagnosed: "", relapsedRefractory: "", secondOpinion: "" },
      },
    }));
    setNewHospitalName("");
    setShowAddHospitalInput(false);
  };

  const handleDeleteCustomHospital = (id) => {
    setCustomHospitals((prev) => prev.filter((h) => h.id !== id));
    setFormData((prev) => {
      const updated = { ...prev };
      updated.selectedHospitalCodes = updated.selectedHospitalCodes.filter(
        (code) => code !== id
      );
      delete updated.hospitalData[id];
      delete updated.sourceFunds[id];
      delete updated.hospitalCodeBreakdown[id];
      return updated;
    });
  };

  const handleHospitalDataChange = (hospital, field, value) => {
    setFormData((prev) => ({
      ...prev,
      hospitalData: {
        ...prev.hospitalData,
        [hospital]: {
          ...prev.hospitalData[hospital],
          [field]: value,
        },
      },
    }));
  };

  const handleSourceFundsChange = (hospital, source, value) => {
    const numValue = parseFloat(value) || 0;
    const monthlyPatients =
      parseInt(formData.hospitalData[hospital]?.monthlyPatients) || 0;

    // Calculate current total excluding the field being changed
    const currentSourceFunds = formData.sourceFunds[hospital] || {};
    const currentTotal = Object.entries(currentSourceFunds).reduce(
      (sum, [key, val]) => {
        if (key === source) return sum; // Exclude the field being changed
        return sum + (parseFloat(val) || 0);
      },
      0
    );

    const newTotal = currentTotal + numValue;

    // Check if total exceeds monthly patients
    if (newTotal > monthlyPatients && monthlyPatients > 0) {
      setWarnings((prev) => ({
        ...prev,
        [`${hospital}_sourceFunds`]: `Total source of funds (${newTotal}) cannot exceed monthly patients (${monthlyPatients})`,
      }));
    } else {
      setWarnings((prev) => {
        const newWarnings = { ...prev };
        delete newWarnings[`${hospital}_sourceFunds`];
        return newWarnings;
      });
    }

    setFormData((prev) => ({
      ...prev,
      sourceFunds: {
        ...prev.sourceFunds,
        [hospital]: {
          ...prev.sourceFunds[hospital],
          [source]: value,
        },
      },
    }));
  };

  const handleHospitalCodeBreakdownChange = (hospital, field, value) => {
    setFormData((prev) => ({
      ...prev,
      hospitalCodeBreakdown: {
        ...prev.hospitalCodeBreakdown,
        [hospital]: {
          ...prev.hospitalCodeBreakdown[hospital],
          [field]: value,
        },
      },
    }));
  };

  const handlePatientDistributionChange = (hospitalCode, field, value) => {
    // Only allow whole numbers (natural numbers)
    const numericValue = value.replace(/[^0-9]/g, "");

    setFormData((prev) => {
      const updatedPatientDistribution = {
        ...prev.hospitalData[hospitalCode].patientDistribution,
        [field]: numericValue,
      };
      return {
        ...prev,
        hospitalData: {
          ...prev.hospitalData,
          [hospitalCode]: {
            ...prev.hospitalData[hospitalCode],
            patientDistribution: updatedPatientDistribution,
          },
        },
      };
    });
  };

  const calculatePatientDistributionTotal = (hospitalCode) => {
    const pd = formData.hospitalData[hospitalCode]?.patientDistribution || {};
    return Object.values(pd).reduce(
      (sum, val) => sum + (parseFloat(val) || 0),
      0
    );
  };

  const getPatientDistributionWarning = (hospitalCode) => {
    const total = calculatePatientDistributionTotal(hospitalCode);
    if (total > 100) {
      return `Total patient distribution (${total}%) exceeds 100%. Please adjust the values.`;
    }
    return null;
  };

  const calculateTotals = () => {
    const totalBMT = formData.selectedHospitalCodes.reduce(
      (sum, code) =>
        sum + (parseInt(formData.hospitalData[code]?.bmtPatients) || 0),
      0
    );
    const totalMonthly = formData.selectedHospitalCodes.reduce(
      (sum, code) =>
        sum + (parseInt(formData.hospitalData[code]?.monthlyPatients) || 0),
      0
    );

    return { totalBMT, totalMonthly };
  };

  // Improved calculate source total with percentage calculation
  const calculateSourceTotal = (hospital) => {
    const sourceFunds = formData.sourceFunds[hospital] || {};
    const totalRaw = Object.values(sourceFunds).reduce(
      (sum, value) => sum + (parseFloat(value) || 0),
      0
    );
    return totalRaw;
  };

  // Calculate individual source percentages for a hospital
  const calculateSourcePercentages = (hospital) => {
    const sourceFunds = formData.sourceFunds[hospital] || {};
    const totalRaw = calculateSourceTotal(hospital);
    const percentages = {};

    Object.keys(sourceFunds).forEach((key) => {
      const value = parseFloat(sourceFunds[key]) || 0;
      percentages[key] =
        totalRaw > 0 ? ((value / totalRaw) * 100).toFixed(1) : "0.0";
    });

    return percentages;
  };

  // Format key names nicely (from CODE 2)
  const formatKey = (key) =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .replace(/oop/i, "OOP")
      .replace(/cghs/i, "CGHS")
      .replace(/esi/i, "ESI")
      .replace(/echs/i, "ECHS")
      .replace(/psus/i, "PSUs")
      .replace(/govt/i, "Government");

  const calculateHospitalCodeTotals = (hospital) => {
    const data = formData.hospitalCodeBreakdown[hospital] || {};
    return {
      newlyDiagnosed: parseFloat(data.newlyDiagnosed) || 0,
      relapsedRefractory: parseFloat(data.relapsedRefractory) || 0,
      secondOpinion: parseFloat(data.secondOpinion) || 0,
    };
  };

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
      toast.success("Survey submitted successfully!");
    } else {
      toast.error("Please fill the form completely before submitting.");
    }
  };

  const { totalBMT, totalMonthly } = calculateTotals();
  const patientDistributionTotal = calculatePatientDistributionTotal();

  // Patient Case Distribution By Hospital:

  // Mapping row and column labels
  const patientTypes = [
    { key: "allPatients", label: "ALL Patients" },
    { key: "nhlPatients", label: "NHL Patients" },
    { key: "mmPatients", label: "MM Patients" },
    { key: "otherHematMalignancies", label: "Other Hemat Malignancies" },
    { key: "glioblastomas", label: "Glioblastomas" },
    { key: "otherSolidTumours", label: "Other Solid Tumours" },
  ];

  const caseTypes = [
    { key: "newlyDiagnosed", label: "Newly Diagnosed %" },
    { key: "relapsed", label: "Relapsed %" },
    { key: "refractory", label: "Refractory %" },
    { key: "secondOpinion", label: "2nd Opinion %" },
    { key: "maintenance", label: "Maintenance %" },
  ];

  const handleAutoBalance = (hospitalCode, patientKey) => {
    setFormData((prev) => {
      // Get current patient distribution for this hospital and patient type
      const currentDistribution =
        prev.patientDistributionMatrix?.[hospitalCode]?.[patientKey] || {};

      // Create a copy of the distribution to work with
      const updatedDistribution = { ...currentDistribution };

      // Calculate total of filled fields
      let filledTotal = 0;
      let filledCount = 0;
      let emptyFields = [];

      // Count filled fields and identify empty ones
      caseTypes.forEach((caseType) => {
        const fieldValue = updatedDistribution[caseType.key];

        if (fieldValue !== "" && fieldValue !== undefined) {
          filledTotal += parseFloat(fieldValue) || 0;
          filledCount++;
        } else {
          emptyFields.push(caseType.key);
        }
      });

      // Auto-balance if there are empty fields and filled fields don't exceed 100%
      if (emptyFields.length > 0 && filledTotal < 100) {
        const remaining = 100 - filledTotal;
        const valuePerEmptyField = remaining / emptyFields.length;

        // Distribute remaining percentage equally among empty fields
        emptyFields.forEach((emptyKey) => {
          updatedDistribution[emptyKey] = parseFloat(
            valuePerEmptyField.toFixed(1)
          );
        });
      }

      return {
        ...prev,
        patientDistributionMatrix: {
          ...prev.patientDistributionMatrix,
          [hospitalCode]: {
            ...prev.patientDistributionMatrix?.[hospitalCode],
            [patientKey]: updatedDistribution,
          },
        },
      };
    });
  };

  const handleNormalizeToHundred = (hospitalCode, patientKey) => {
    setFormData((prev) => {
      // Get current patient distribution for this hospital and patient type
      const currentDistribution =
        prev.patientDistributionMatrix?.[hospitalCode]?.[patientKey] || {};

      // Create a copy of the distribution to work with
      const updatedDistribution = { ...currentDistribution };

      // Calculate total of filled fields and collect filled fields
      let filledTotal = 0;
      const filledFields = [];

      // Count filled fields and calculate total
      caseTypes.forEach((caseType) => {
        const fieldValue = updatedDistribution[caseType.key];

        if (fieldValue !== "" && fieldValue !== undefined) {
          const numValue = parseFloat(fieldValue) || 0;
          if (numValue > 0) {
            filledTotal += numValue;
            filledFields.push(caseType.key);
          }
        }
      });

      // Normalize values if total exceeds 100%
      if (filledTotal > 100 && filledFields.length > 0) {
        // Calculate scaling factor
        const scalingFactor = 100 / filledTotal;

        // Scale each value proportionally
        filledFields.forEach((fieldKey) => {
          const originalValue = parseFloat(updatedDistribution[fieldKey]) || 0;
          // Scale and round to 1 decimal place
          updatedDistribution[fieldKey] = parseFloat(
            (originalValue * scalingFactor).toFixed(1)
          );
        });

        // Handle potential rounding errors to ensure exact 100% total
        let newTotal = filledFields.reduce(
          (sum, key) => sum + parseFloat(updatedDistribution[key]),
          0
        );

        // If there's still a small difference due to rounding, adjust the largest value
        if (Math.abs(newTotal - 100) > 0.01) {
          // Find the largest value
          let largestKey = filledFields[0];
          filledFields.forEach((key) => {
            if (
              parseFloat(updatedDistribution[key]) >
              parseFloat(updatedDistribution[largestKey])
            ) {
              largestKey = key;
            }
          });

          // Adjust the largest value to make the total exactly 100%
          updatedDistribution[largestKey] =
            parseFloat(updatedDistribution[largestKey]) + (100 - newTotal);
          // Round to 1 decimal place
          updatedDistribution[largestKey] = parseFloat(
            updatedDistribution[largestKey].toFixed(1)
          );
        }
      }

      return {
        ...prev,
        patientDistributionMatrix: {
          ...prev.patientDistributionMatrix,
          [hospitalCode]: {
            ...prev.patientDistributionMatrix?.[hospitalCode],
            [patientKey]: updatedDistribution,
          },
        },
      };
    });
  };

  const handleCaseDistributionChange = (
    hospitalCode,
    patientKey,
    caseKey,
    value,
    isManualEdit = false
  ) => {
    // Convert value to number or empty string
    const numValue = value === "" ? "" : parseFloat(value);

    setFormData((prev) => {
      // Get current patient distribution for this hospital and patient type
      const currentDistribution =
        prev.patientDistributionMatrix?.[hospitalCode]?.[patientKey] || {};

      // Create updated distribution with the new value
      const updatedDistribution = {
        ...currentDistribution,
        [caseKey]: numValue,
      };

      // We no longer clear other fields when a user makes a manual edit
      // This preserves all manually entered values
      // The auto-balancing will still work for empty fields if needed

      // Calculate total of filled fields
      let filledTotal = 0;
      let filledCount = 0;
      let emptyFields = [];

      // Count filled fields and identify empty ones
      caseTypes.forEach((caseType) => {
        const fieldValue =
          caseType.key === caseKey
            ? numValue
            : updatedDistribution[caseType.key];

        if (fieldValue !== "" && fieldValue !== undefined) {
          filledTotal += parseFloat(fieldValue) || 0;
          filledCount++;
        } else {
          emptyFields.push(caseType.key);
        }
      });

      // Auto-balance if there are empty fields and filled fields don't exceed 100%
      // Only auto-balance if this is not a manual edit AND we're not clearing a field
      if (
        emptyFields.length > 0 &&
        filledTotal < 100 &&
        !isManualEdit &&
        value !== ""
      ) {
        const remaining = 100 - filledTotal;
        const valuePerEmptyField = remaining / emptyFields.length;

        // Distribute remaining percentage equally among empty fields
        emptyFields.forEach((emptyKey) => {
          updatedDistribution[emptyKey] = parseFloat(
            valuePerEmptyField.toFixed(1)
          );
        });
      }

      return {
        ...prev,
        patientDistributionMatrix: {
          ...prev.patientDistributionMatrix,
          [hospitalCode]: {
            ...prev.patientDistributionMatrix?.[hospitalCode],
            [patientKey]: updatedDistribution,
          },
        },
      };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          {/* <div className="flex flex-row items-center justify-between gap-3 mb-4 lg:mb-0 text-center"> */}
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/assets/common/ImmunoACT_Logo.png"
              alt="ImmunoACT Logo"
              width={140}
              height={100}
              className="w-[180px] h-auto md:w-[140px] lg:w-[160px]"
              unoptimized
              priority
            />
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="text-3xl font-bold text-gray-800">
              Healthcare Survey Form
            </h2>
          </div>
          <p className="text-base md:text-lg text-gray-600">
            Physician Data Collection for Sales Representatives
          </p>
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
                {/* Selection of Name of the Physician */}
                <SingleSelect
                  options={doctors}
                  value={formData.physicianName}
                  onChange={(val) => handleInputChange("physicianName", val)}
                  placeholder="Select or search Clinician name"
                  error={errors.physicianName}
                />

                <div className="space-y-2">
                  <label className="text-sm font-medium block">
                    Speciality *
                    <p className="text-xs text-gray-500">
                      Select the most appropriate specialization
                    </p>
                  </label>

                  <RadioGroup.Root
                    className="flex flex-col gap-3"
                    value={formData.speciality}
                    onValueChange={handleSpecialityChange}
                  >
                    <RadioGroup.Item
                      value="Hematologist"
                      className="flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition"
                    >
                      <RadioGroup.Indicator className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                        <div className="w-2 h-2 bg-black rounded-full" />
                      </RadioGroup.Indicator>
                      <Stethoscope className="w-5 h-5 text-indigo-600" />
                      <span>Hematologist</span>
                    </RadioGroup.Item>

                    <RadioGroup.Item
                      value="Oncologist"
                      className="flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition"
                    >
                      <RadioGroup.Indicator className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                        <div className="w-2 h-2 bg-black rounded-full" />
                      </RadioGroup.Indicator>
                      <ShieldCheck className="w-5 h-5 text-indigo-600" />
                      <span>Oncologist</span>
                    </RadioGroup.Item>

                    <RadioGroup.Item
                      value="Pediatric Onco"
                      className="flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition"
                    >
                      <RadioGroup.Indicator className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                        <div className="w-2 h-2 bg-black rounded-full" />
                      </RadioGroup.Indicator>
                      <User className="w-5 h-5 text-indigo-600" />
                      <span>Pediatric Onco</span>
                    </RadioGroup.Item>

                    <RadioGroup.Item
                      value="Other"
                      className="flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition"
                    >
                      <RadioGroup.Indicator className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center">
                        <div className="w-2 h-2 bg-black rounded-full" />
                      </RadioGroup.Indicator>
                      <PlusCircle className="w-5 h-5 text-indigo-600" />
                      <span>Other (please specify)</span>
                    </RadioGroup.Item>
                  </RadioGroup.Root>

                  {/* Conditionally show text input if "Other" is selected */}
                  {formData.speciality === "Other" && (
                    <input
                      type="text"
                      placeholder="Enter speciality"
                      className={`mt-2 w-full p-2 border rounded-md placeholder:text-gray-400 placeholder:text-sm ${
                        errors.speciality ? "border-red-500" : "border-gray-300"
                      }`}
                      value={formData.otherSpeciality || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          otherSpeciality: e.target.value,
                        }))
                      }
                    />
                  )}

                  {errors.speciality && (
                    <p className="text-red-500 text-sm">{errors.speciality}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center gap-1">
                    <Label className="text-sm font-medium">
                      Select Hospitals *
                    </Label>

                    {/* Tooltip Trigger Icon */}
                    <div className="relative group inline-block">
                      <Info
                        className="w-3 h-3 cursor-pointer"
                        onClick={() =>
                          setShowHospitalTooltip(!showHospitalTooltip)
                        }
                      />

                      {/* Tooltip Box for Hover (lg screens) */}
                      <div className="absolute z-10 hidden group-hover:block bg-black text-white text-xs rounded-md py-1 px-2 right-0 mt-1 w-64">
                        Ask the doctor how many hospitals they regularly consult
                        at.
                      </div>

                      {/* Tooltip for small/medium screens (click/tap based) */}
                      {showHospitalTooltip && (
                        <div className="absolute z-10 bg-black text-white text-xs rounded py-1 px-2 right-0 mt-1 w-64 md:hidden">
                          Ask the doctor how many hospitals they regularly
                          consult at.
                        </div>
                      )}
                    </div>
                  </div>

                  <MultiSelect
                    options={hospitalCodeOptions}
                    value={formData.selectedHospitalCodes}
                    onChange={handleHospitalCodesChange}
                    placeholder="Select hospitals to survey..."
                    className="w-full"
                  />

                  {showAddHospitalInput && (
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        type="text"
                        value={newHospitalName}
                        onChange={(e) => setNewHospitalName(e.target.value)}
                        placeholder="Enter new hospital name"
                        className="w-1/2"
                        autoFocus
                      />
                      <Button
                        type="button"
                        onClick={handleAddCustomHospital}
                        className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                      >
                        Add
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => {
                          setShowAddHospitalInput(false);
                          setNewHospitalName("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}

                  <p className="text-xs text-gray-500">
                    Select the hospitals you want to collect data for. Only
                    selected hospitals will appear in the form below.
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
                  Hospital Data - {formData.selectedHospitalCodes.length}{" "}
                  Selected
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-8">
                  {/* Render only selected hospital codes */}
                  <Accordion
                    type="multiple"
                    defaultValue={[formData.selectedHospitalCodes[0]]}
                    className="w-full space-y-4"
                  >
                    {formData.selectedHospitalCodes.map(
                      (hospitalCode, index) => {
                        const hospitalName = getHospitalName(hospitalCode);
                        const hospitalCodeDisplay =
                          getHospitalCode(hospitalCode);
                        const colors = [
                          {
                            border: "border-green-200",
                            bg: "bg-green-50",
                            text: "text-green-800",
                            accent: "bg-green-100",
                          },
                          {
                            border: "border-blue-200",
                            bg: "bg-blue-50",
                            text: "text-blue-800",
                            accent: "bg-blue-100",
                          },
                          {
                            border: "border-purple-200",
                            bg: "bg-purple-50",
                            text: "text-purple-800",
                            accent: "bg-purple-100",
                          },
                          {
                            border: "border-orange-200",
                            bg: "bg-orange-50",
                            text: "text-orange-800",
                            accent: "bg-orange-100",
                          },
                          {
                            border: "border-pink-200",
                            bg: "bg-pink-50",
                            text: "text-pink-800",
                            accent: "bg-pink-100",
                          },
                          {
                            border: "border-indigo-200",
                            bg: "bg-indigo-50",
                            text: "text-indigo-800",
                            accent: "bg-indigo-100",
                          },
                          {
                            border: "border-red-200",
                            bg: "bg-red-50",
                            text: "text-red-800",
                            accent: "bg-red-100",
                          },
                          {
                            border: "border-yellow-200",
                            bg: "bg-yellow-50",
                            text: "text-yellow-800",
                            accent: "bg-yellow-100",
                          },
                          {
                            border: "border-teal-200",
                            bg: "bg-teal-50",
                            text: "text-teal-800",
                            accent: "bg-teal-100",
                          },
                          {
                            border: "border-cyan-200",
                            bg: "bg-cyan-50",
                            text: "text-cyan-800",
                            accent: "bg-cyan-100",
                          },
                        ];
                        const colorScheme = colors[index % colors.length];
                        const sourceTotal = calculateSourceTotal(hospitalCode);
                        const monthlyPatients =
                          parseInt(
                            formData.hospitalData[hospitalCode]?.monthlyPatients
                          ) || 0;
                        const sourcePercentage =
                          monthlyPatients > 0
                            ? (sourceTotal / monthlyPatients) * 100
                            : 0;

                        return (
                          <AccordionItem
                            value={hospitalCode}
                            key={hospitalCode}
                          >
                            {customHospitals.some(
                              (h) => h.id === hospitalCode
                            ) && (
                              <div className="flex justify-end mb-2">
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="ghost"
                                  onClick={() =>
                                    handleDeleteCustomHospital(hospitalCode)
                                  }
                                  title="Delete this hospital"
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <Trash2 className="w-5 h-5 cursor-pointer" />
                                </Button>
                              </div>
                            )}
                            <AccordionTrigger
                              className={`px-4 py-3 rounded-md ${colorScheme.accent} ${colorScheme.text}`}
                            >
                              {hospitalName} ({hospitalCodeDisplay})
                            </AccordionTrigger>
                            <AccordionContent>
                              <div
                                key={hospitalCode}
                                className={`border-2 ${colorScheme.border} rounded-lg p-6 ${colorScheme.bg}`}
                              >
                                {/* Basic Hospital Data */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                  <div className="space-y-2">
                                    <Label
                                      className={`text-sm font-medium ${colorScheme.text.replace(
                                        "800",
                                        "700"
                                      )}`}
                                    >
                                      Number of Patients in a Month
                                    </Label>
                                    <Input
                                      type="number"
                                      value={
                                        formData.hospitalData[hospitalCode]
                                          ?.monthlyPatients || ""
                                      }
                                      onChange={(e) =>
                                        handleHospitalDataChange(
                                          hospitalCode,
                                          "monthlyPatients",
                                          e.target.value
                                        )
                                      }
                                      placeholder="0"
                                      className="bg-white"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label
                                      className={`text-sm font-medium ${colorScheme.text.replace(
                                        "800",
                                        "700"
                                      )}`}
                                    >
                                      Number of BMT Patients
                                    </Label>
                                    <Input
                                      type="number"
                                      value={
                                        formData.hospitalData[hospitalCode]
                                          ?.bmtPatients || ""
                                      }
                                      onChange={(e) =>
                                        handleHospitalDataChange(
                                          hospitalCode,
                                          "bmtPatients",
                                          e.target.value
                                        )
                                      }
                                      placeholder="0"
                                      className="bg-white"
                                    />
                                  </div>
                                </div>

                                {/* Source of Funds - Show for every hospital */}
                                <div className="mb-6">
                                  <h4
                                    className={`text-lg font-semibold ${colorScheme.text.replace(
                                      "800",
                                      "700"
                                    )} mb-4`}
                                  >
                                    Source of Funds: (Out of {monthlyPatients}{" "}
                                    patients)
                                  </h4>
                                  {warnings[`${hospitalCode}_sourceFunds`] && (
                                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                      <p className="text-red-600 text-sm font-medium">
                                        {
                                          warnings[
                                            `${hospitalCode}_sourceFunds`
                                          ]
                                        }
                                      </p>
                                    </div>
                                  )}
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                      <Label className="text-sm font-medium">
                                        OOP without Insurance
                                      </Label>
                                      <Input
                                        type="number"
                                        step="0.1"
                                        value={
                                          formData.sourceFunds[hospitalCode]
                                            ?.oopWithoutInsurance || ""
                                        }
                                        onChange={(e) =>
                                          handleSourceFundsChange(
                                            hospitalCode,
                                            "oopWithoutInsurance",
                                            e.target.value
                                          )
                                        }
                                        placeholder="0"
                                        className="bg-white"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label className="text-sm font-medium">
                                        OOP with Insurance
                                      </Label>
                                      <Input
                                        type="number"
                                        step="0.1"
                                        value={
                                          formData.sourceFunds[hospitalCode]
                                            ?.oopWithInsurance || ""
                                        }
                                        onChange={(e) =>
                                          handleSourceFundsChange(
                                            hospitalCode,
                                            "oopWithInsurance",
                                            e.target.value
                                          )
                                        }
                                        placeholder="0"
                                        className="bg-white"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label className="text-sm font-medium">
                                        CGHS
                                      </Label>
                                      <Input
                                        type="number"
                                        step="0.1"
                                        value={
                                          formData.sourceFunds[hospitalCode]
                                            ?.cghs || ""
                                        }
                                        onChange={(e) =>
                                          handleSourceFundsChange(
                                            hospitalCode,
                                            "cghs",
                                            e.target.value
                                          )
                                        }
                                        placeholder="0"
                                        className="bg-white"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label className="text-sm font-medium">
                                        ESI
                                      </Label>
                                      <Input
                                        type="number"
                                        step="0.1"
                                        value={
                                          formData.sourceFunds[hospitalCode]
                                            ?.esi || ""
                                        }
                                        onChange={(e) =>
                                          handleSourceFundsChange(
                                            hospitalCode,
                                            "esi",
                                            e.target.value
                                          )
                                        }
                                        placeholder="0"
                                        className="bg-white"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label className="text-sm font-medium">
                                        Railways
                                      </Label>
                                      <Input
                                        type="number"
                                        step="0.1"
                                        value={
                                          formData.sourceFunds[hospitalCode]
                                            ?.railways || ""
                                        }
                                        onChange={(e) =>
                                          handleSourceFundsChange(
                                            hospitalCode,
                                            "railways",
                                            e.target.value
                                          )
                                        }
                                        placeholder="0"
                                        className="bg-white"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label className="text-sm font-medium">
                                        ECHS
                                      </Label>
                                      <Input
                                        type="number"
                                        step="0.1"
                                        value={
                                          formData.sourceFunds[hospitalCode]
                                            ?.echs || ""
                                        }
                                        onChange={(e) =>
                                          handleSourceFundsChange(
                                            hospitalCode,
                                            "echs",
                                            e.target.value
                                          )
                                        }
                                        placeholder="0"
                                        className="bg-white"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label className="text-sm font-medium">
                                        PSUs
                                      </Label>
                                      <Input
                                        type="number"
                                        step="0.1"
                                        value={
                                          formData.sourceFunds[hospitalCode]
                                            ?.psus || ""
                                        }
                                        onChange={(e) =>
                                          handleSourceFundsChange(
                                            hospitalCode,
                                            "psus",
                                            e.target.value
                                          )
                                        }
                                        placeholder="0"
                                        className="bg-white"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label className="text-sm font-medium">
                                        State Government
                                      </Label>
                                      <Input
                                        type="number"
                                        step="0.1"
                                        value={
                                          formData.sourceFunds[hospitalCode]
                                            ?.stateGovt || ""
                                        }
                                        onChange={(e) =>
                                          handleSourceFundsChange(
                                            hospitalCode,
                                            "stateGovt",
                                            e.target.value
                                          )
                                        }
                                        placeholder="0"
                                        className="bg-white"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label className="text-sm font-medium">
                                        Defence
                                      </Label>
                                      <Input
                                        type="number"
                                        step="0.1"
                                        value={
                                          formData.sourceFunds[hospitalCode]
                                            ?.defence || ""
                                        }
                                        onChange={(e) =>
                                          handleSourceFundsChange(
                                            hospitalCode,
                                            "defence",
                                            e.target.value
                                          )
                                        }
                                        placeholder="0"
                                        className="bg-white"
                                      />
                                    </div>
                                  </div>
                                  <div
                                    className={`mt-4 p-3 ${colorScheme.accent} rounded-lg flex justify-between items-center`}
                                  >
                                    <span
                                      className={`text-sm font-medium ${colorScheme.text}`}
                                    >
                                      Total Source of Funds: {sourceTotal}{" "}
                                      patients ({sourcePercentage}%)
                                    </span>
                                    {sourcePercentage > 100 && (
                                      <span className="text-red-600 text-sm font-medium">
                                        ⚠ Exceeds 100%
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* OOP Affordability Section */}
                                <div className="mb-6">
                                  <h4
                                    className={`text-lg font-semibold ${colorScheme.text.replace(
                                      "800",
                                      "700"
                                    )} mb-4`}
                                  >
                                    % of OOP Patients with affordability of &gt;
                                    25 lakhs
                                  </h4>
                                  <p className="text-sm text-gray-600 mb-4 italic">
                                    Ask doctor to estimate how many OOP patients
                                    could afford treatment &gt; ₹25 lakhs of
                                    overall patients
                                  </p>
                                  <div className="max-w-md">
                                    <Input
                                      type="number"
                                      step="0.1"
                                      min="0"
                                      max="100"
                                      placeholder="0"
                                      className="w-full bg-white"
                                      value={
                                        formData.hospitalData[hospitalCode]
                                          ?.oopAffordability || ""
                                      }
                                      onChange={(e) =>
                                        handleHospitalDataChange(
                                          hospitalCode,
                                          "oopAffordability",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                      Enter percentage (0-100%)
                                    </p>
                                  </div>
                                </div>

                                {/* Patient Distribution Table */}
                                <h4
                                  className={`text-lg font-semibold ${colorScheme.text.replace(
                                    "800",
                                    "700"
                                  )} mb-4`}
                                >
                                  Patient Distribution:
                                </h4>
                                <p className="text-sm text-gray-600 mb-2">
                                  Fill percentage of patients per diagnosis
                                  category
                                </p>

                                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    {[
                                      {
                                        label: "% ALL patients",
                                        key: "allPatients",
                                      },
                                      {
                                        label: "% Other Hemat malignancies",
                                        key: "otherHematMalignancies",
                                      },
                                      {
                                        label: "% NHL Patients",
                                        key: "nhlPatients",
                                      },
                                      {
                                        label: "% Glioblastomas",
                                        key: "glioblastomas",
                                      },
                                      {
                                        label: "% MM Patients",
                                        key: "mmPatients",
                                      },
                                      {
                                        label: "% Other solid tumours",
                                        key: "otherSolidTumours",
                                      },
                                    ].map(({ label, key }) => (
                                      <div key={key}>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                          {label}
                                        </label>
                                        <input
                                          type="number"
                                          inputMode="numeric"
                                          pattern="[0-9]*"
                                          min="0"
                                          max="100"
                                          placeholder="0"
                                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                          value={
                                            formData.hospitalData[hospitalCode]
                                              ?.patientDistribution?.[key] || ""
                                          }
                                          onKeyDown={(e) => {
                                            if (
                                              [
                                                "e",
                                                "E",
                                                "+",
                                                "-",
                                                ".",
                                              ].includes(e.key)
                                            ) {
                                              e.preventDefault(); // Block scientific notation, decimals, negatives
                                            }
                                          }}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d{0,3}$/.test(value)) {
                                              setFormData((prev) => ({
                                                ...prev,
                                                hospitalData: {
                                                  ...prev.hospitalData,
                                                  [hospitalCode]: {
                                                    ...prev.hospitalData[
                                                      hospitalCode
                                                    ],
                                                    patientDistribution: {
                                                      ...prev.hospitalData[
                                                        hospitalCode
                                                      ]?.patientDistribution,
                                                      [key]: value,
                                                    },
                                                  },
                                                },
                                              }));
                                            }
                                          }}
                                        />
                                      </div>
                                    ))}
                                  </div>

                                  {/* Total Patient Distribution Display */}
                                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                    {(() => {
                                      const pd =
                                        formData.hospitalData[hospitalCode]
                                          ?.patientDistribution || {};

                                      const total =
                                        parseFloat(pd.allPatients || 0) +
                                        parseFloat(pd.nhlPatients || 0) +
                                        parseFloat(pd.mmPatients || 0) +
                                        parseFloat(
                                          pd.otherHematMalignancies || 0
                                        ) +
                                        parseFloat(pd.glioblastomas || 0) +
                                        parseFloat(pd.otherSolidTumours || 0);

                                      const hasValues = Object.values(pd).some(
                                        (val) => val && parseFloat(val) > 0
                                      );

                                      return (
                                        <>
                                          <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-700">
                                              Total Patient Distribution:
                                            </span>
                                            <span
                                              className={`text-lg font-bold ${
                                                total === 100
                                                  ? "text-green-600"
                                                  : total > 100
                                                  ? "text-red-600"
                                                  : "text-blue-600"
                                              }`}
                                            >
                                              {Number.isInteger(total)
                                                ? `${total}%`
                                                : `${total.toFixed(1)}%`}
                                            </span>
                                          </div>

                                          {hasValues && total > 100 && (
                                            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                                              ⚠️ Warning: Total percentage
                                              exceeds 100%. Please adjust the
                                              values.
                                            </div>
                                          )}
                                          {hasValues && total === 100 && (
                                            <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
                                              ✅ Perfect! Total percentage
                                              equals 100%.
                                            </div>
                                          )}
                                        </>
                                      );
                                    })()}
                                  </div>
                                </div>

                                {/* Patient Distribution Category Table */}
                                <div className="">
                                  <h4
                                    className={`text-lg font-semibold ${colorScheme.text.replace(
                                      "800",
                                      "700"
                                    )} mb-4`}
                                  >
                                    Patient Distribution Category:
                                  </h4>

                                  {/* Interactive Notes Section */}
                                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <div className="flex items-start gap-3">
                                      <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                      <div className="flex-1">
                                        <h5 className="font-medium text-blue-800 mb-2">
                                          Patient Distribution Category
                                          Definitions:
                                        </h5>
                                        <ul className="space-y-2 text-sm text-blue-700">
                                          <li className="flex items-start gap-2">
                                            <span className="font-medium">
                                              •
                                            </span>
                                            <span>
                                              <strong>
                                                Newly Diagnosed %:
                                              </strong>{" "}
                                              Patients recently confirmed with
                                              the disease for the first time,
                                              initiating their first line of
                                              treatment.
                                            </span>
                                          </li>
                                          <li className="flex items-start gap-2">
                                            <span className="font-medium">
                                              •
                                            </span>
                                            <span>
                                              <strong>Relapsed %:</strong>{" "}
                                              Patients whose disease has
                                              returned after an initial response
                                              to treatment.
                                            </span>
                                          </li>
                                          <li className="flex items-start gap-2">
                                            <span className="font-medium">
                                              •
                                            </span>
                                            <span>
                                              <strong>Refractory %:</strong>{" "}
                                              Patients whose disease does not
                                              respond to standard treatments or
                                              progresses despite therapy.
                                            </span>
                                          </li>
                                          <li className="flex items-start gap-2">
                                            <span className="font-medium">
                                              •
                                            </span>
                                            <span>
                                              <strong>2nd Opinion %:</strong>{" "}
                                              Patients seeking a re-evaluation
                                              or confirmation of
                                              diagnosis/treatment from another
                                              specialist or center.
                                            </span>
                                          </li>
                                          <li className="flex items-start gap-2">
                                            <span className="font-medium">
                                              •
                                            </span>
                                            <span>
                                              <strong>Maintenance %:</strong>{" "}
                                              Patients undergoing ongoing,
                                              lower-intensity therapy to
                                              maintain remission or prevent
                                              relapse or those who had response
                                              to therapy.
                                            </span>
                                          </li>
                                        </ul>
                                        <div className="mt-3 p-2 bg-blue-100 rounded text-xs text-blue-800">
                                          <strong>Note:</strong> Ensure the
                                          total percentage for each patient type
                                          adds up to 100%. The table below
                                          allows you to input these percentages
                                          for each category.
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="overflow-x-auto border rounded-lg">
                                    <table className="w-full table-auto text-sm text-left">
                                      <thead className="bg-gray-100">
                                        <tr>
                                          <th className="p-2 font-medium text-gray-700">
                                            Patient Type
                                          </th>
                                          {caseTypes.map((caseType) => (
                                            <th
                                              key={caseType.key}
                                              className="p-2 font-medium text-gray-700 text-center"
                                            >
                                              {caseType.label}
                                            </th>
                                          ))}
                                          <th className="p-2 font-medium text-gray-700 text-center">
                                            Total %
                                          </th>
                                          <th className="p-2 font-medium text-gray-700 text-center">
                                            Remaining %
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {patientTypes.map((patient) => {
                                          // Calculate total percentage for this patient type
                                          const totalPercentage =
                                            caseTypes.reduce(
                                              (sum, caseType) => {
                                                const value = parseFloat(
                                                  formData
                                                    .patientDistributionMatrix?.[
                                                    hospitalCode
                                                  ]?.[patient.key]?.[
                                                    caseType.key
                                                  ] || 0
                                                );
                                                return (
                                                  sum +
                                                  (isNaN(value) ? 0 : value)
                                                );
                                              },
                                              0
                                            );

                                          // Calculate remaining percentage
                                          const remainingPercentage =
                                            100 - totalPercentage;

                                          // Determine status color
                                          const statusColor =
                                            totalPercentage === 0
                                              ? "text-gray-400"
                                              : totalPercentage === 100
                                              ? "text-green-600"
                                              : totalPercentage > 100
                                              ? "text-red-600"
                                              : "text-orange-500";

                                          return (
                                            <tr
                                              key={patient.key}
                                              className="even:bg-gray-50"
                                            >
                                              <td className="p-2 font-medium text-gray-800">
                                                {patient.label}
                                              </td>
                                              {caseTypes.map((caseType) => (
                                                <td
                                                  key={caseType.key}
                                                  className="p-2 text-center"
                                                >
                                                  <Input
                                                    type="number"
                                                    step="0.1"
                                                    placeholder="0"
                                                    className="w-full text-center"
                                                    value={
                                                      formData
                                                        .patientDistributionMatrix?.[
                                                        hospitalCode
                                                      ]?.[patient.key]?.[
                                                        caseType.key
                                                      ] || ""
                                                    }
                                                    onChange={(e) =>
                                                      handleCaseDistributionChange(
                                                        hospitalCode,
                                                        patient.key,
                                                        caseType.key,
                                                        e.target.value,
                                                        true // This is a manual edit
                                                      )
                                                    }
                                                  />
                                                </td>
                                              ))}
                                              <td
                                                className={`p-2 text-center font-medium ${statusColor}`}
                                              >
                                                {totalPercentage}%
                                              </td>
                                              <td className="p-2 text-center">
                                                {totalPercentage === 0
                                                  ? "-"
                                                  : totalPercentage >= 100
                                                  ? "0%"
                                                  : `${remainingPercentage}%`}
                                              </td>
                                            </tr>
                                          );
                                        })}
                                      </tbody>
                                    </table>
                                  </div>

                                  {/* Age Distribution UI */}
                                  <div className="mt-8">
                                    <h4
                                      className={`text-lg font-semibold ${colorScheme.text.replace(
                                        "800",
                                        "700"
                                      )} `}
                                    >
                                      Age Distribution of Patients
                                    </h4>
                                    <p className="text-sm text-gray-600 mb-2">
                                      For both ALL and NHL patients, ask what %
                                      of cases are 15 years and below vs above
                                      15 years. Ensure the total adds up to 100%
                                      for each diagnosis category.
                                    </p>
                                    <div className="overflow-x-auto border rounded-lg">
                                      <table className="w-full table-auto text-sm text-left">
                                        <thead className="bg-gray-100">
                                          <tr>
                                            <th className="p-2 font-medium text-gray-700"></th>
                                            <th className="p-2 font-medium text-gray-700 text-center">
                                              Below 15 Years
                                            </th>
                                            <th className="p-2 font-medium text-gray-700 text-center">
                                              Above 15 Years
                                            </th>
                                            <th className="p-2 font-medium text-gray-700 text-center">
                                              Total %
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {["allPatients", "nhlPatients"].map(
                                            (patientType) => {
                                              // Initialize age distribution if it doesn't exist
                                              if (
                                                !formData
                                                  .patientDistributionMatrix?.[
                                                  hospitalCode
                                                ]?.[patientType]
                                                  ?.ageDistribution
                                              ) {
                                                // Create age distribution structure if it doesn't exist
                                                if (
                                                  !formData.patientDistributionMatrix
                                                ) {
                                                  setFormData((prev) => ({
                                                    ...prev,
                                                    patientDistributionMatrix:
                                                      {},
                                                  }));
                                                }

                                                if (
                                                  !formData
                                                    .patientDistributionMatrix[
                                                    hospitalCode
                                                  ]
                                                ) {
                                                  setFormData((prev) => ({
                                                    ...prev,
                                                    patientDistributionMatrix: {
                                                      ...prev.patientDistributionMatrix,
                                                      [hospitalCode]: {},
                                                    },
                                                  }));
                                                }

                                                if (
                                                  !formData
                                                    .patientDistributionMatrix[
                                                    hospitalCode
                                                  ][patientType]
                                                ) {
                                                  setFormData((prev) => ({
                                                    ...prev,
                                                    patientDistributionMatrix: {
                                                      ...prev.patientDistributionMatrix,
                                                      [hospitalCode]: {
                                                        ...prev
                                                          .patientDistributionMatrix[
                                                          hospitalCode
                                                        ],
                                                        [patientType]: {},
                                                      },
                                                    },
                                                  }));
                                                }

                                                setFormData((prev) => ({
                                                  ...prev,
                                                  patientDistributionMatrix: {
                                                    ...prev.patientDistributionMatrix,
                                                    [hospitalCode]: {
                                                      ...prev
                                                        .patientDistributionMatrix[
                                                        hospitalCode
                                                      ],
                                                      [patientType]: {
                                                        ...prev
                                                          .patientDistributionMatrix[
                                                          hospitalCode
                                                        ][patientType],
                                                        ageDistribution: {
                                                          below15: "",
                                                          above15: "",
                                                        },
                                                      },
                                                    },
                                                  },
                                                }));
                                              }

                                              // Calculate total percentage
                                              const below15 = parseFloat(
                                                formData
                                                  .patientDistributionMatrix?.[
                                                  hospitalCode
                                                ]?.[patientType]
                                                  ?.ageDistribution?.below15 ||
                                                  0
                                              );
                                              const above15 = parseFloat(
                                                formData
                                                  .patientDistributionMatrix?.[
                                                  hospitalCode
                                                ]?.[patientType]
                                                  ?.ageDistribution?.above15 ||
                                                  0
                                              );
                                              const totalPercentage =
                                                (isNaN(below15) ? 0 : below15) +
                                                (isNaN(above15) ? 0 : above15);

                                              // Determine status color
                                              const statusColor =
                                                totalPercentage === 0
                                                  ? "text-gray-400"
                                                  : totalPercentage === 100
                                                  ? "text-green-600"
                                                  : totalPercentage > 100
                                                  ? "text-red-600"
                                                  : "text-orange-500";

                                              const patientLabel =
                                                patientType === "allPatients"
                                                  ? "ALL Patients"
                                                  : "NHL Patients";

                                              return (
                                                <tr
                                                  key={patientType}
                                                  className="even:bg-gray-50"
                                                >
                                                  <td className="p-2 font-medium text-gray-800">
                                                    {patientLabel}
                                                  </td>
                                                  <td className="p-2 text-center">
                                                    <Input
                                                      type="number"
                                                      step="0.1"
                                                      placeholder="0"
                                                      className="w-full text-center"
                                                      value={
                                                        formData
                                                          .patientDistributionMatrix?.[
                                                          hospitalCode
                                                        ]?.[patientType]
                                                          ?.ageDistribution
                                                          ?.below15 || ""
                                                      }
                                                      onChange={(e) => {
                                                        const value =
                                                          e.target.value;
                                                        setFormData((prev) => {
                                                          // Get current values
                                                          const currentBelow15 =
                                                            value === ""
                                                              ? ""
                                                              : parseFloat(
                                                                  value
                                                                );
                                                          const currentAbove15 =
                                                            prev
                                                              .patientDistributionMatrix?.[
                                                              hospitalCode
                                                            ]?.[patientType]
                                                              ?.ageDistribution
                                                              ?.above15 || "";
                                                          const parsedAbove15 =
                                                            currentAbove15 ===
                                                            ""
                                                              ? ""
                                                              : parseFloat(
                                                                  currentAbove15
                                                                );

                                                          // Auto-calculate above15 if below15 is valid and not being cleared
                                                          let newAbove15 =
                                                            currentAbove15;
                                                          if (
                                                            value !== "" &&
                                                            !isNaN(
                                                              currentBelow15
                                                            )
                                                          ) {
                                                            // Only auto-calculate if above15 is empty AND the below15 value is <= 100
                                                            if (
                                                              currentAbove15 ===
                                                                "" &&
                                                              currentBelow15 <=
                                                                100
                                                            ) {
                                                              newAbove15 =
                                                                Math.max(
                                                                  0,
                                                                  100 -
                                                                    currentBelow15
                                                                );
                                                            }
                                                          }

                                                          return {
                                                            ...prev,
                                                            patientDistributionMatrix:
                                                              {
                                                                ...prev.patientDistributionMatrix,
                                                                [hospitalCode]:
                                                                  {
                                                                    ...prev
                                                                      .patientDistributionMatrix[
                                                                      hospitalCode
                                                                    ],
                                                                    [patientType]:
                                                                      {
                                                                        ...prev
                                                                          .patientDistributionMatrix[
                                                                          hospitalCode
                                                                        ][
                                                                          patientType
                                                                        ],
                                                                        ageDistribution:
                                                                          {
                                                                            ...prev
                                                                              .patientDistributionMatrix[
                                                                              hospitalCode
                                                                            ][
                                                                              patientType
                                                                            ]
                                                                              .ageDistribution,
                                                                            below15:
                                                                              value,
                                                                            above15:
                                                                              newAbove15,
                                                                          },
                                                                      },
                                                                  },
                                                              },
                                                          };
                                                        });
                                                      }}
                                                    />
                                                  </td>
                                                  <td className="p-2 text-center">
                                                    <Input
                                                      type="number"
                                                      step="0.1"
                                                      placeholder="0"
                                                      className="w-full text-center"
                                                      value={
                                                        formData
                                                          .patientDistributionMatrix?.[
                                                          hospitalCode
                                                        ]?.[patientType]
                                                          ?.ageDistribution
                                                          ?.above15 || ""
                                                      }
                                                      onChange={(e) => {
                                                        const value =
                                                          e.target.value;
                                                        setFormData((prev) => {
                                                          // Get current values
                                                          const currentAbove15 =
                                                            value === ""
                                                              ? ""
                                                              : parseFloat(
                                                                  value
                                                                );
                                                          const currentBelow15 =
                                                            prev
                                                              .patientDistributionMatrix?.[
                                                              hospitalCode
                                                            ]?.[patientType]
                                                              ?.ageDistribution
                                                              ?.below15 || "";
                                                          const parsedBelow15 =
                                                            currentBelow15 ===
                                                            ""
                                                              ? ""
                                                              : parseFloat(
                                                                  currentBelow15
                                                                );

                                                          // Auto-calculate below15 if above15 is valid and not being cleared
                                                          let newBelow15 =
                                                            currentBelow15;
                                                          if (
                                                            value !== "" &&
                                                            !isNaN(
                                                              currentAbove15
                                                            )
                                                          ) {
                                                            // Only auto-calculate if below15 is empty AND the above15 value is <= 100
                                                            if (
                                                              currentBelow15 ===
                                                                "" &&
                                                              currentAbove15 <=
                                                                100
                                                            ) {
                                                              newBelow15 =
                                                                Math.max(
                                                                  0,
                                                                  100 -
                                                                    currentAbove15
                                                                );
                                                            }
                                                          }

                                                          return {
                                                            ...prev,
                                                            patientDistributionMatrix:
                                                              {
                                                                ...prev.patientDistributionMatrix,
                                                                [hospitalCode]:
                                                                  {
                                                                    ...prev
                                                                      .patientDistributionMatrix[
                                                                      hospitalCode
                                                                    ],
                                                                    [patientType]:
                                                                      {
                                                                        ...prev
                                                                          .patientDistributionMatrix[
                                                                          hospitalCode
                                                                        ][
                                                                          patientType
                                                                        ],
                                                                        ageDistribution:
                                                                          {
                                                                            ...prev
                                                                              .patientDistributionMatrix[
                                                                              hospitalCode
                                                                            ][
                                                                              patientType
                                                                            ]
                                                                              .ageDistribution,
                                                                            above15:
                                                                              value,
                                                                            below15:
                                                                              newBelow15,
                                                                          },
                                                                      },
                                                                  },
                                                              },
                                                          };
                                                        });
                                                      }}
                                                    />
                                                  </td>
                                                  <td
                                                    className={`p-2 text-center font-medium ${statusColor}`}
                                                  >
                                                    {totalPercentage}%
                                                    {totalPercentage > 100 && (
                                                      <div className="text-xs text-red-600 font-medium mt-1">
                                                        Warning: Total exceeds
                                                        100%
                                                      </div>
                                                    )}
                                                  </td>
                                                </tr>
                                              );
                                            }
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        );
                      }
                    )}
                  </Accordion>

                  {/* Overall Totals - Only show if hospitals are selected */}
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                      Overall Totals ({formData.selectedHospitalCodes.length}{" "}
                      {formData.selectedHospitalCodes.length === 1
                        ? "Hospital"
                        : "Hospitals"}{" "}
                      Selected)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg text-center">
                        <span className="text-lg font-medium text-gray-700">
                          Total BMT Patients:
                        </span>
                        <span className="text-2xl font-bold text-blue-600 ml-2">
                          {formData.selectedHospitalCodes.reduce(
                            (sum, code) =>
                              sum +
                              (parseInt(
                                formData.hospitalData[code]?.bmtPatients
                              ) || 0),
                            0
                          )}
                        </span>
                      </div>
                      <div className="bg-white p-4 rounded-lg text-center">
                        <span className="text-lg font-medium text-gray-700">
                          Total Monthly Patients:
                        </span>
                        <span className="text-2xl font-bold text-green-600 ml-2">
                          {formData.selectedHospitalCodes.reduce(
                            (sum, code) =>
                              sum +
                              (parseInt(
                                formData.hospitalData[code]?.monthlyPatients
                              ) || 0),
                            0
                          )}
                        </span>
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
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No Hospitals Selected
                </h3>
                <p className="text-gray-500">
                  Please select Hospitals from the dropdown above to begin data
                  collection.
                  <br />
                  <span className="text-sm">
                    ({hospitalCodes.length} hospitals are available)
                  </span>
                </p>
              </CardContent>
            </Card>
          )}

          {/* Global Query Box - Additional Insights */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-gray-600 to-gray-700 text-white">
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5" />
                Additional Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-lg font-semibold text-gray-800">
                    Any other insights from discussion
                  </Label>
                  <p className="text-sm text-gray-600 italic">
                    Please share any additional insights, observations, or
                    important information gathered during the discussion that
                    may not have been captured in the previous sections.
                  </p>
                </div>

                <div className="relative">
                  <textarea
                    className="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                    placeholder="Enter any additional insights, observations, or important information from your discussion with the physician..."
                    value={formData.additionalInsights || ""}
                    onChange={(e) =>
                      handleInputChange("additionalInsights", e.target.value)
                    }
                    style={{
                      minHeight: "200px",
                      maxHeight: "400px",
                    }}
                  />

                  {/* Character counter */}
                  <div className="flex justify-end mt-2 text-xs text-gray-500">
                    <span>
                      {formData.additionalInsights?.length || 0} characters
                    </span>
                  </div>

                  {/* Interactive features */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const insights = formData.additionalInsights || "";
                        if (insights.length > 0) {
                          navigator.clipboard.writeText(insights);
                          toast.success(
                            "Additional insights copied to clipboard!"
                          );
                        }
                      }}
                      className="text-xs cursor-pointer"
                    >
                      Copy to Clipboard
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleInputChange("additionalInsights", "")
                      }
                      className="text-xs text-red-600 hover:text-red-700 cursor-pointer"
                    >
                      Clear Text
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-lg font-medium rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 cursor-pointer"
              disabled={!formData.selectedHospitalCodes.length}
            >
              Submit Complete Survey
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
