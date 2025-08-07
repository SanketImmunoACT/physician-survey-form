
import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/lib/schema";
import toast from "react-hot-toast";

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

  const handleAddCustomHospital = () => {
    if (!newHospitalName.trim()) return;
    const id = `custom_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    setCustomHospitals((prev) => [
      ...prev,
      { id, name: newHospitalName.trim() },
    ]);
    setValue("selectedHospitalCodes", [...selectedHospitalCodes, id]);
    setNewHospitalName("");
    setShowAddHospitalInput(false);
  };

  const handleDeleteCustomHospital = (id) => {
    setCustomHospitals((prev) => prev.filter((h) => h.id !== id));
    setValue(
      "selectedHospitalCodes",
      selectedHospitalCodes.filter((code) => code !== id)
    );
  };

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
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
  };
};
