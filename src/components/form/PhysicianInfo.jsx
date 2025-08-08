"use client";
import { Stethoscope, User, ShieldCheck, PlusCircle, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SingleSelect } from "@/components/ui/SingleSelect";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { MultiSelect } from "@/components/ui/multi-select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";

export const PhysicianInfo = ({
  control,
  errors,
  doctors,
  hospitalCodeOptions,
  showAddHospitalInput,
  setShowAddHospitalInput,
  newHospitalName,
  setNewHospitalName,
  handleAddCustomHospital,
  setValue,
}) => {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <CardTitle className="flex items-center gap-2">
          <Stethoscope className="w-5 h-5" />
          Physician Information
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller
            name="physicianName"
            control={control}
            render={({ field }) => (
              <SingleSelect
                options={doctors}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select or search Clinician name"
                error={errors.physicianName}
              />
            )}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium block">
              Speciality *
              <p className="text-xs text-gray-500">
                Select the most appropriate specialization
              </p>
            </label>
            <Controller
              name="speciality"
              control={control}
              render={({ field }) => (
                <RadioGroup.Root
                  className="flex flex-col gap-3"
                  value={field.value}
                  onValueChange={field.onChange}
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
              )}
            />

            {errors.speciality && (
              <p className="text-red-500 text-sm">
                {errors.speciality.message}
              </p>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center gap-1">
              <Label className="text-sm font-medium">Select Hospitals *</Label>
              <div className="relative group inline-block">
                <Info className="w-3 h-3 cursor-pointer" />
                <div className="absolute z-10 hidden group-hover:block bg-black text-white text-xs rounded-md py-1 px-2 -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap mt-1 w-auto">
                  Ask the doctor how many hospitals they regularly consult at.
                </div>
              </div>
            </div>

            <Controller
              name="selectedHospitalCodes"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  options={hospitalCodeOptions}
                  value={field.value}
                  onChange={(selectedCodes) => {
                    if (selectedCodes.includes("new_hospital")) {
                      setShowAddHospitalInput(true);
                      selectedCodes = selectedCodes.filter(
                        (c) => c !== "new_hospital"
                      );
                    } else {
                      setShowAddHospitalInput(false);
                    }
                    field.onChange(selectedCodes);
                  }}
                  placeholder="Select hospitals to survey..."
                  className="w-full"
                />
              )}
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
              Select the hospitals you want to collect data for. Only selected
              hospitals will appear in the form below.
            </p>
            {errors.selectedHospitalCodes && (
              <p className="text-red-500 text-sm">
                {errors.selectedHospitalCodes.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
