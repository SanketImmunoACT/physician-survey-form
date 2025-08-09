import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../lib/schema"; // Adjusted path

import { toast } from "react-hot-toast";
import api from '../api/axios';

const getInitialFormData = () => ({
  physicianName: "",
  speciality: "",
  selectedHospitalCodes: [],
  hospitalData: {},
  sourceFunds: {},
  patientDistributionMatrix: {},
  additionalInsights: "",
});

export const useFormLogic = () => {
  const [customHospitals, setCustomHospitals] = useState([]);
  const [showAddHospitalInput, setShowAddHospitalInput] = useState(false);
  const [newHospitalName, setNewHospitalName] = useState("");
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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: getInitialFormData(),
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("surveyFormData");
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          reset(parsedData);
        } catch (error) {
          console.error(
            "Failed to parse survey form data from localStorage",
            error
          );
        }
      }
    }
  }, [reset]);

  const watchedData = watch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("surveyFormData", JSON.stringify(watchedData));
    }
  }, [watchedData]);

  const selectedHospitalCodes = watch("selectedHospitalCodes");

  const hospitalCodeOptions = useMemo(() => {
    return [
      ...hospitalCodes.map((hospital) => ({
        value: hospital.id,
        label: hospital.name,
      })),
      ...customHospitals.map((h) => ({ value: h.id, label: h.name })),
      { value: "new_hospital", label: "Add New Hospital" },
    ];
  }, [hospitalCodes, customHospitals]);

  const getHospitalName = (hospitalId) => {
    const hospital = hospitalCodes.find((h) => h.id === hospitalId);
    if (hospital) return hospital.name;
    const custom = customHospitals.find((h) => h.id === hospitalId);
    if (custom) return custom.name;
    return hospitalId;
  };

  const getHospitalCode = (hospitalId) => {
    const hospital = hospitalCodes.find((h) => h.id === hospitalId);
    if (hospital) return hospital.code;
    const custom = customHospitals.find((h) => h.id === hospitalId);
    if (custom) return custom.name;
    return hospitalId;
  };

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
    try {
      // This API endpoint will need to be implemented in your backend
      const response = await api.post("/submit-survey", data); // Use api.post, Axios sends JSON by default

      toast.success("Survey submitted successfully!");
      if (typeof window !== "undefined") {
        localStorage.removeItem("surveyFormData");
      }
      reset({
        physicianName: "",
        speciality: "",
        selectedHospitalCodes: [],
        hospitalData: {},
        sourceFunds: {}, 
        patientDistributionMatrix: {},
        additionalInsights: "",
      });
    } catch (error) {
      console.error("Survey submission error:", error);
      toast.error(error.response?.data?.message || error.message || "Error submitting survey."); // Axios error handling
    }
  };

  const handleAddCustomHospital = () => {
    if (newHospitalName.trim() !== "") {
      const newId = `custom-${Date.now()}`;
      setCustomHospitals((prev) => [
        ...prev,
        { id: newId, name: newHospitalName.trim(), code: newHospitalName.trim() },
      ]);
      setValue("selectedHospitalCodes", [
        ...watch("selectedHospitalCodes"),
        newId,
      ]);
      setNewHospitalName("");
      setShowAddHospitalInput(false);
    }
  };

  const handleDeleteCustomHospital = (hospitalId) => {
    setCustomHospitals((prev) =>
      prev.filter((h) => h.id !== hospitalId)
    );
    setValue(
      "selectedHospitalCodes",
      watch("selectedHospitalCodes").filter((id) => id !== hospitalId)
    );
  };

  // Add this function to handle input changes for the textarea
  const handleInputChange = (field, value) => {
    setValue(field, value);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    control,
    errors,
    watch,
    setValue,
    selectedHospitalCodes,
    customHospitals,
    showAddHospitalInput,
    newHospitalName,
    hospitalCodeOptions,
    getHospitalName,
    getHospitalCode,
    handleAddCustomHospital,
    handleDeleteCustomHospital,
    setNewHospitalName,
    setShowAddHospitalInput,
    handleInputChange, // Now this function is defined
  };
};
