"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import doctors from "@/data/doctors.json";
import hospitals from "@/data/hospitals.json";
import { SingleSelect } from "@/components/ui/SingleSelect";
import * as RadioGroup from "@radix-ui/react-radio-group";

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
      hospital1: { bmtPatients: "", monthlyPatients: "" },
      hospital2: { bmtPatients: "", monthlyPatients: "" },
      hospital3: { bmtPatients: "", monthlyPatients: "" },
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

  const handlePatientDistributionChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      patientDistribution: {
        ...prev.patientDistribution,
        [field]: value,
      },
    }));
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

  // const calculateSourceTotal = (hospital) => {
  //   const sourceFunds = formData.sourceFunds[hospital] || {};
  //   return Object.values(sourceFunds).reduce(
  //     (sum, value) => sum + (parseFloat(value) || 0),
  //     0
  //   );
  // };

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

  const calculatePatientDistributionTotal = () => {
    const { patientDistribution } = formData;
    return Object.values(patientDistribution).reduce(
      (sum, value) => sum + (parseFloat(value) || 0),
      0
    );
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
      alert("Survey submitted successfully!");
    }
  };

  const { totalBMT, totalMonthly } = calculateTotals();
  const patientDistributionTotal = calculatePatientDistributionTotal();

  // Patient Case Distribution By Hospital:

  // const patientDistributionMatrix = formData.patientDistributionMatrix || {};
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
      const currentDistribution = prev.patientDistributionMatrix?.[hospitalCode]?.[patientKey] || {};
      
      // Create a copy of the distribution to work with
      const updatedDistribution = { ...currentDistribution };
      
      // Calculate total of filled fields
      let filledTotal = 0;
      let filledCount = 0;
      let emptyFields = [];
      
      // Count filled fields and identify empty ones
      caseTypes.forEach(caseType => {
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
        emptyFields.forEach(emptyKey => {
          updatedDistribution[emptyKey] = parseFloat(valuePerEmptyField.toFixed(1));
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
      const currentDistribution = prev.patientDistributionMatrix?.[hospitalCode]?.[patientKey] || {};
      
      // Create a copy of the distribution to work with
      const updatedDistribution = { ...currentDistribution };
      
      // Calculate total of filled fields and collect filled fields
      let filledTotal = 0;
      const filledFields = [];
      
      // Count filled fields and calculate total
      caseTypes.forEach(caseType => {
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
        filledFields.forEach(fieldKey => {
          const originalValue = parseFloat(updatedDistribution[fieldKey]) || 0;
          // Scale and round to 1 decimal place
          updatedDistribution[fieldKey] = parseFloat((originalValue * scalingFactor).toFixed(1));
        });
        
        // Handle potential rounding errors to ensure exact 100% total
        let newTotal = filledFields.reduce((sum, key) => sum + parseFloat(updatedDistribution[key]), 0);
        
        // If there's still a small difference due to rounding, adjust the largest value
        if (Math.abs(newTotal - 100) > 0.01) {
          // Find the largest value
          let largestKey = filledFields[0];
          filledFields.forEach(key => {
            if (parseFloat(updatedDistribution[key]) > parseFloat(updatedDistribution[largestKey])) {
              largestKey = key;
            }
          });
          
          // Adjust the largest value to make the total exactly 100%
          updatedDistribution[largestKey] = parseFloat(updatedDistribution[largestKey]) + (100 - newTotal);
          // Round to 1 decimal place
          updatedDistribution[largestKey] = parseFloat(updatedDistribution[largestKey].toFixed(1));
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

  const handleCaseDistributionChange = (hospitalCode, patientKey, caseKey, value, isManualEdit = false) => {
    // Convert value to number or empty string
    const numValue = value === "" ? "" : parseFloat(value);
    
    setFormData((prev) => {
      // Get current patient distribution for this hospital and patient type
      const currentDistribution = prev.patientDistributionMatrix?.[hospitalCode]?.[patientKey] || {};
      
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
      caseTypes.forEach(caseType => {
        const fieldValue = caseType.key === caseKey ? 
          numValue : 
          updatedDistribution[caseType.key];
          
        if (fieldValue !== "" && fieldValue !== undefined) {
          filledTotal += parseFloat(fieldValue) || 0;
          filledCount++;
        } else {
          emptyFields.push(caseType.key);
        }
      });
      
      // Auto-balance if there are empty fields and filled fields don't exceed 100%
      // Only auto-balance if this is not a manual edit AND we're not clearing a field
      if (emptyFields.length > 0 && filledTotal < 100 && !isManualEdit && value !== "") {
        const remaining = 100 - filledTotal;
        const valuePerEmptyField = remaining / emptyFields.length;
        
        // Distribute remaining percentage equally among empty fields
        emptyFields.forEach(emptyKey => {
          updatedDistribution[emptyKey] = parseFloat(valuePerEmptyField.toFixed(1));
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
          {/* <div className="flex gap-3">
              <Link href="/">
              </Link>

              <Link href="/analytics">
                <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white cursor-pointer">
                  <Activity className="w-4 h-4" />
                  Analytics
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                  <BarChart3 className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
            </div> */}
          {/* </div> */}
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
                {/* <div className="space-y-2">
                  <Label
                    htmlFor="physicianName"
                    className="text-sm font-medium"
                  >
                    Name of the Physician *
                  </Label>
                  <Input
                    id="physicianName"
                    value={formData.physicianName}
                    onChange={(e) =>
                      handleInputChange("physicianName", e.target.value)
                    }
                    placeholder="Enter physician name"
                    className={`transition-all duration-200 ${
                      errors.physicianName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.physicianName && (
                    <p className="text-red-500 text-sm">
                      {errors.physicianName}
                    </p>
                  )}
                </div> */}

                {/* Selection of Name of the Physician */}
                <SingleSelect
                  options={doctors}
                  value={formData.physicianName}
                  onChange={(val) => handleInputChange("physicianName", val)}
                  placeholder="Select or search Clinician name"
                  error={errors.physicianName}
                />

                {/* <div className="space-y-2">
                  <Label htmlFor="speciality" className="text-sm font-medium">
                    Speciality *
                  </Label>
                  <Input
                    id="speciality"
                    value={formData.speciality}
                    onChange={(e) =>
                      handleInputChange("speciality", e.target.value)
                    }
                    placeholder="Enter speciality"
                    className={`transition-all duration-200 ${
                      errors.speciality ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.speciality && (
                    <p className="text-red-500 text-sm">{errors.speciality}</p>
                  )}
                </div> */}

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

                {/* <div className="space-y-2">
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
                  <p className="text-xs text-gray-500">
                    Ask the doctor how many hospitals they regularly consult at.
                  </p>
                </div> */}

                {/* <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium">
                    Select Hospitals *
                  </Label>
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
                </div> */}

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
                                </div>

                                {/* Source of Funds - Show for every hospital */}
                                <div className="mb-6">
                                  <h4
                                    className={`text-lg font-semibold ${colorScheme.text.replace(
                                      "800",
                                      "700"
                                    )} mb-4`}
                                  >
                                    Source of Funds:
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
                                      <p className="text-xs text-gray-500">
                                        out of {monthlyPatients} patients
                                      </p>
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

                                {/* {formData.selectedHospitalCodes.map((hospitalCode) => {
            const monthlyPatients = parseInt(formData.hospitalData[hospitalCode]?.monthlyPatients) || 0;
            const sourceTotal = calculateSourceTotal(hospitalCode);
            const sourcePercentages = calculateSourcePercentages(hospitalCode);
            const sourcePercentage = monthlyPatients > 0 ? ((sourceTotal / monthlyPatients) * 100).toFixed(1) : "0.0";
            const colorScheme = {
              text: "text-gray-800",
              accent: "bg-purple-50",
            };

            return (
              <Card key={hospitalCode} className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Source of Funds - {getHospitalName(hospitalCode)}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-6">
             
                  {warnings[`${hospitalCode}_sourceFunds`] && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm font-medium">
                        {warnings[`${hospitalCode}_sourceFunds`]}
                      </p>
                    </div>
                  )}

              
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.keys(formData.sourceFunds[hospitalCode] || {}).map((key) => {
                      const value = formData.sourceFunds[hospitalCode]?.[key] || "";
                      const percentage = sourcePercentages[key];

                      return (
                        <div key={key} className="space-y-2">
                          <Label htmlFor={`${hospitalCode}_${key}`} className="text-sm font-medium">
                            {formatKey(key)}
                          </Label>
                          <Input
                            id={`${hospitalCode}_${key}`}
                            type="number"
                            step="0.1"
                            value={value}
                            onChange={(e) =>
                              handleSourceFundsChange(hospitalCode, key, e.target.value)
                            }
                            placeholder="0"
                            className="bg-white"
                          />
                          <p className="text-xs text-gray-500">
                            {percentage}% of total funds
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <Separator className="my-6" />

                 
                  <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                    <span className="text-lg font-medium">
                      Total Source of Funds: {sourceTotal} patients ({sourcePercentage}%)
                    </span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-purple-600">
                        {sourceTotal > 0 ? "100%" : "0%"}
                      </span>
                      {parseFloat(sourcePercentage) > 100 && (
                        <div className="text-red-600 text-sm font-medium mt-1">
                          ⚠ Exceeds monthly patients
                        </div>
                      )}
                    </div>
                  </div>

                  
                  <div className="mt-2 text-sm text-gray-600">
                    Out of {monthlyPatients} monthly patients
                  </div>
                </CardContent>
              </Card>
            );
          })} */}

                                {/* {formData.selectedHospitalCodes.map((hospitalCode) => {
  const sourceFunds = formData.sourceFunds[hospitalCode] || {};
  const monthlyPatients = parseFloat(formData.hospitalData[hospitalCode]?.monthlyPatients) || 0;

  const totalRaw = Object.values(sourceFunds).reduce(
    (sum, val) => sum + (parseFloat(val) || 0),
    0
  );

  const sourcePercentage = monthlyPatients > 0 ? ((totalRaw / monthlyPatients) * 100).toFixed(1) : "0.0";

  const formatKey = (key) =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());

  return (
    <Card key={hospitalCode} className="shadow-lg border-0 mb-8">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <CardTitle className="flex justify-between items-center">
          <span className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            {getHospitalName(hospitalCode)} - Source of Funds
          </span>
          <span className="text-sm font-normal">Monthly Patients: {monthlyPatients}</span>
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
                <Label htmlFor={`${hospitalCode}_${key}`} className="text-sm font-medium">
                  {formatKey(key)}
                </Label>
                <Input
                  id={`${hospitalCode}_${key}`}
                  type="number"
                  step="0.1"
                  value={formData.sourceFunds[hospitalCode]?.[key] || ""}
                  onChange={(e) =>
                    handleSourceFundsChange(hospitalCode, key, e.target.value)
                  }
                  placeholder="Enter amount"
                  className="bg-white"
                />
                <p className="text-sm text-gray-600">{percentage}% of total</p>
              </div>
            );
          })}
        </div>

        <Separator className="my-6" />

        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
          <span className="text-lg font-medium">Total Source of Funds:</span>
          <span
            className={`text-2xl font-bold ${
              sourcePercentage > 100 ? "text-red-600" : "text-blue-600"
            }`}
          >
            {sourcePercentage}%
          </span>
        </div>
        {sourcePercentage > 100 && (
          <p className="text-red-600 mt-2 text-sm">
            ⚠ Total exceeds 100% of monthly patients!
          </p>
        )}
      </CardContent>
    </Card>
  );
})} */}

                                {/* Patient Case Distribution */}
                                {/* <div>
                                  <h4
                                    className={`text-lg font-semibold ${colorScheme.text.replace(
                                      "800",
                                      "700"
                                    )} mb-4`}
                                  >
                                    Patient Case Distribution By Hospital:
                                  </h4>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                      <Label className="text-sm font-medium">
                                        Newly Diagnosed %
                                      </Label>
                                      <Input
                                        type="number"
                                        step="0.1"
                                        value={
                                          formData.hospitalCodeBreakdown[
                                            hospitalCode
                                          ]?.newlyDiagnosed || ""
                                        }
                                        onChange={(e) =>
                                          handleHospitalCodeBreakdownChange(
                                            hospitalCode,
                                            "newlyDiagnosed",
                                            e.target.value
                                          )
                                        }
                                        placeholder="0"
                                        className="bg-white"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label className="text-sm font-medium">
                                        Relapsed/Refractory %
                                      </Label>
                                      <Input
                                        type="number"
                                        step="0.1"
                                        value={
                                          formData.hospitalCodeBreakdown[
                                            hospitalCode
                                          ]?.relapsedRefractory || ""
                                        }
                                        onChange={(e) =>
                                          handleHospitalCodeBreakdownChange(
                                            hospitalCode,
                                            "relapsedRefractory",
                                            e.target.value
                                          )
                                        }
                                        placeholder="0"
                                        className="bg-white"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label className="text-sm font-medium">
                                        2nd Opinion %
                                      </Label>
                                      <Input
                                        type="number"
                                        step="0.1"
                                        value={
                                          formData.hospitalCodeBreakdown[
                                            hospitalCode
                                          ]?.secondOpinion || ""
                                        }
                                        onChange={(e) =>
                                          handleHospitalCodeBreakdownChange(
                                            hospitalCode,
                                            "secondOpinion",
                                            e.target.value
                                          )
                                        }
                                        placeholder="0"
                                        className="bg-white"
                                      />
                                    </div>
                                  </div>
                                  <div
                                    className={`mt-4 p-3 ${colorScheme.accent} rounded-lg`}
                                  >
                                    <span
                                      className={`text-sm font-medium ${colorScheme.text}`}
                                    >
                                      Total Patient Cases:{" "}
                                      {(parseFloat(
                                        formData.hospitalCodeBreakdown[
                                          hospitalCode
                                        ]?.newlyDiagnosed
                                      ) || 0) +
                                        (parseFloat(
                                          formData.hospitalCodeBreakdown[
                                            hospitalCode
                                          ]?.relapsedRefractory
                                        ) || 0) +
                                        (parseFloat(
                                          formData.hospitalCodeBreakdown[
                                            hospitalCode
                                          ]?.secondOpinion
                                        ) || 0)}
                                      %
                                    </span>
                                  </div>
                                </div> */}

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
                                        const totalPercentage = caseTypes.reduce((sum, caseType) => {
                                          const value = parseFloat(
                                            formData.patientDistributionMatrix?.[hospitalCode]?.[patient.key]?.[caseType.key] || 0
                                          );
                                          return sum + (isNaN(value) ? 0 : value);
                                        }, 0);
                                        
                                        // Calculate remaining percentage
                                        const remainingPercentage = 100 - totalPercentage;
                                        
                                        // Determine status color
                                        const statusColor = 
                                          totalPercentage === 0 ? "text-gray-400" :
                                          totalPercentage === 100 ? "text-green-600" :
                                          totalPercentage > 100 ? "text-red-600" :
                                          "text-orange-500";
                                        
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
                                                      .patientDistributionMatrix?.[hospitalCode]?.[patient.key]?.[caseType.key] || ""
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
                                            <td className={`p-2 text-center font-medium ${statusColor}`}>
                                              {totalPercentage.toFixed(1)}%
                                            </td>
                                            <td className="p-2 text-center">
                                              {totalPercentage === 0 ? "-" : 
                                               totalPercentage >= 100 ? "0.0%" :
                                               `${remainingPercentage.toFixed(1)}%`}
                                              {totalPercentage > 0 && totalPercentage < 100 && (
                                                <button 
                                                  type="button"
                                                  className="ml-2 text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded cursor-pointer"
                                                  onClick={() => handleAutoBalance(hospitalCode, patient.key)}
                                                >
                                                  Balance
                                                </button>
                                              )}
                                              {totalPercentage > 100 && (
                                                <button 
                                                  type="button"
                                                  className="ml-2 text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                                                  onClick={() => handleNormalizeToHundred(hospitalCode, patient.key)}
                                                >
                                                  Normalize
                                                </button>
                                              )}
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
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

          {/* Patient Distribution (Table 7) */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-gray-600 to-gray-700 text-white">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Patient Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="allPatients"
                      className="text-sm font-medium"
                    >
                      % ALL patients
                    </Label>
                    <Input
                      id="allPatients"
                      type="number"
                      step="0.1"
                      value={formData.patientDistribution.allPatients}
                      onChange={(e) =>
                        handlePatientDistributionChange(
                          "allPatients",
                          e.target.value
                        )
                      }
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="nhlPatients"
                      className="text-sm font-medium"
                    >
                      % NHL Patients
                    </Label>
                    <Input
                      id="nhlPatients"
                      type="number"
                      step="0.1"
                      value={formData.patientDistribution.nhlPatients}
                      onChange={(e) =>
                        handlePatientDistributionChange(
                          "nhlPatients",
                          e.target.value
                        )
                      }
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
                      onChange={(e) =>
                        handlePatientDistributionChange(
                          "mmPatients",
                          e.target.value
                        )
                      }
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="otherHematMalignancies"
                      className="text-sm font-medium"
                    >
                      % Other Hemat malignancies
                    </Label>
                    <Input
                      id="otherHematMalignancies"
                      type="number"
                      step="0.1"
                      value={
                        formData.patientDistribution.otherHematMalignancies
                      }
                      onChange={(e) =>
                        handlePatientDistributionChange(
                          "otherHematMalignancies",
                          e.target.value
                        )
                      }
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="glioblastomas"
                      className="text-sm font-medium"
                    >
                      % Glioblastomas
                    </Label>
                    <Input
                      id="glioblastomas"
                      type="number"
                      step="0.1"
                      value={formData.patientDistribution.glioblastomas}
                      onChange={(e) =>
                        handlePatientDistributionChange(
                          "glioblastomas",
                          e.target.value
                        )
                      }
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="otherSolidTumours"
                      className="text-sm font-medium"
                    >
                      % Other solid tumours
                    </Label>
                    <Input
                      id="otherSolidTumours"
                      type="number"
                      step="0.1"
                      value={formData.patientDistribution.otherSolidTumours}
                      onChange={(e) =>
                        handlePatientDistributionChange(
                          "otherSolidTumours",
                          e.target.value
                        )
                      }
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="flex justify-between items-center bg-indigo-50 p-4 rounded-lg">
                <span className="text-lg font-medium">
                  Total Patient Distribution:
                </span>
                <span className="text-2xl font-bold text-indigo-600">
                  {patientDistributionTotal}%
                </span>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 italic">
                  * Age distribution if required
                </p>
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
