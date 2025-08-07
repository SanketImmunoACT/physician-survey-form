
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hospital } from "lucide-react";
import Image from "next/image";
import { useFormLogic } from "@/hooks/useFormLogic";
import { PhysicianInfo } from "@/components/form/PhysicianInfo";
import { HospitalData } from "@/components/form/HospitalData";
import doctors from "@/data/doctors.json";

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

export default function HealthcareSurveyForm() {
  const {
    register,
    handleSubmit,
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
  } = useFormLogic();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
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
          <PhysicianInfo
            control={control}
            errors={errors}
            doctors={doctors}
            hospitalCodeOptions={hospitalCodeOptions}
            showAddHospitalInput={showAddHospitalInput}
            setShowAddHospitalInput={setShowAddHospitalInput}
            newHospitalName={newHospitalName}
            setNewHospitalName={setNewHospitalName}
            handleAddCustomHospital={handleAddCustomHospital}
            setValue={setValue}
          />

          {selectedHospitalCodes && selectedHospitalCodes.length > 0 && (
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Hospital className="w-5 h-5" />
                  Hospital Data - {selectedHospitalCodes.length} Selected
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-8">
                  <HospitalData
                    control={control}
                    register={register}
                    watch={watch}
                    selectedHospitalCodes={selectedHospitalCodes}
                    handleDeleteCustomHospital={handleDeleteCustomHospital}
                    getHospitalName={getHospitalName}
                    getHospitalCode={getHospitalCode}
                    customHospitals={customHospitals}
                    patientTypes={patientTypes}
                    caseTypes={caseTypes}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          <div className="text-center">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              Submit Survey
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
