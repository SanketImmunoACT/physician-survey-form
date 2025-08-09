
"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../components/ui/accordion";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Trash2, Info } from "lucide-react";

const colors = [
  { border: "border-green-200", bg: "bg-green-50", text: "text-green-800", accent: "bg-green-100" },
  { border: "border-blue-200", bg: "bg-blue-50", text: "text-blue-800", accent: "bg-blue-100" },
  { border: "border-purple-200", bg: "bg-purple-50", text: "text-purple-800", accent: "bg-purple-100" },
  { border: "border-orange-200", bg: "bg-orange-50", text: "text-orange-800", accent: "bg-orange-100" },
  { border: "border-pink-200", bg: "bg-pink-50", text: "text-pink-800", accent: "bg-pink-100" },
  { border: "border-indigo-200", bg: "bg-indigo-50", text: "text-indigo-800", accent: "bg-indigo-100" },
  { border: "border-red-200", bg: "bg-red-50", text: "text-red-800", accent: "bg-red-100" },
  { border: "border-yellow-200", bg: "bg-yellow-50", text: "text-yellow-800", accent: "bg-yellow-100" },
  { border: "border-teal-200", bg: "bg-teal-50", text: "text-teal-800", accent: "bg-teal-100" },
  { border: "border-cyan-200", bg: "bg-cyan-50", text: "text-cyan-800", accent: "bg-cyan-100" },
];

export const HospitalData = ({
  register,
  watch,
  selectedHospitalCodes,
  handleDeleteCustomHospital,
  getHospitalName,
  getHospitalCode,
  customHospitals,
  patientTypes,
  caseTypes,
}) => {
  return (
    <Accordion
      type="multiple"
      defaultValue={selectedHospitalCodes.length > 0 ? [selectedHospitalCodes[0]] : []}
      className="w-full space-y-4"
    >
      {selectedHospitalCodes.map((hospitalCode, index) => {
        const hospitalName = getHospitalName(hospitalCode);
        const hospitalCodeDisplay = getHospitalCode(hospitalCode);
        const colorScheme = colors[index % colors.length];

        const monthlyPatients = parseInt(watch(`hospitalData.${hospitalCode}.monthlyPatients`)) || 0;

        const sourceFunds = watch(`sourceFunds.${hospitalCode}`) || {};
        const sourceTotal = Object.values(sourceFunds).reduce(
          (sum, value) => sum + (parseFloat(value) || 0),
          0
        );
        const sourcePercentage =
          monthlyPatients > 0 ? (sourceTotal / monthlyPatients) * 100 : 0;

        const patientDistribution = watch(`hospitalData.${hospitalCode}.patientDistribution`) || {};
        const patientDistTotal = Object.values(patientDistribution).reduce(
          (sum, value) => sum + (parseFloat(value) || 0),
          0
        );

        return (
          <AccordionItem value={hospitalCode} key={hospitalCode}>
            {customHospitals.some((h) => h.id === hospitalCode) && (
              <div className="flex justify-end mb-2">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDeleteCustomHospital(hospitalCode)}
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
                      {...register(`hospitalData.${hospitalCode}.monthlyPatients`)}
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
                      {...register(`hospitalData.${hospitalCode}.bmtPatients`)}
                      placeholder="0"
                      className="bg-white"
                    />
                  </div>
                </div>

                {/* Source of Funds */}
                <div className="mb-6">
                  <h4
                    className={`text-lg font-semibold ${colorScheme.text.replace(
                      "800",
                      "700"
                    )} mb-4`}
                  >
                    Source of Funds: (Out of {monthlyPatients} patients)
                  </h4>
                  {sourceTotal > monthlyPatients && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm font-medium">
                        Total source of funds ({sourceTotal}) cannot exceed monthly patients ({monthlyPatients})
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
                        {...register(
                          `sourceFunds.${hospitalCode}.oopWithoutInsurance`
                        )}
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
                        {...register(
                          `sourceFunds.${hospitalCode}.oopWithInsurance`
                        )}
                        placeholder="0"
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">CGHS</Label>
                      <Input
                        type="number"
                        step="0.1"
                        {...register(`sourceFunds.${hospitalCode}.cghs`)}
                        placeholder="0"
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">ESI</Label>
                      <Input
                        type="number"
                        step="0.1"
                        {...register(`sourceFunds.${hospitalCode}.esi`)}
                        placeholder="0"
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Railways</Label>
                      <Input
                        type="number"
                        step="0.1"
                        {...register(`sourceFunds.${hospitalCode}.railways`)}
                        placeholder="0"
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">ECHS</Label>
                      <Input
                        type="number"
                        step="0.1"
                        {...register(`sourceFunds.${hospitalCode}.echs`)}
                        placeholder="0"
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">PSUs</Label>
                      <Input
                        type="number"
                        step="0.1"
                        {...register(`sourceFunds.${hospitalCode}.psus`)}
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
                        {...register(`sourceFunds.${hospitalCode}.stateGovt`)}
                        placeholder="0"
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Defence</Label>
                      <Input
                        type="number"
                        step="0.1"
                        {...register(`sourceFunds.${hospitalCode}.defence`)}
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
                      Total Source of Funds: {sourceTotal} patients (
                      {sourcePercentage}%)
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
                    % of OOP Patients with affordability of &gt; 25 lakhs
                  </h4>
                  <p className="text-sm text-gray-600 mb-4 italic">
                    Ask doctor to estimate how many OOP patients could afford
                    treatment &gt; ₹25 lakhs of overall patients
                  </p>
                  <div className="max-w-md">
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      placeholder="0"
                      className="w-full bg-white"
                      {...register(
                        `hospitalData.${hospitalCode}.oopAffordability`
                      )}
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
                  Fill percentage of patients per diagnosis category
                </p>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {patientTypes.map(({ label, key }) => (
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
                          {...register(
                            `hospitalData.${hospitalCode}.patientDistribution.${key}`
                          )}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          Total Patient Distribution:
                        </span>
                        <span
                          className={`text-lg font-bold ${
                            patientDistTotal === 100
                              ? "text-green-600"
                              : patientDistTotal > 100
                              ? "text-red-600"
                              : "text-blue-600"
                          }`}
                        >
                          {patientDistTotal}%
                        </span>
                      </div>

                      {patientDistTotal > 100 && (
                        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                          ⚠️ Warning: Total percentage exceeds 100%. Please
                          adjust the values.
                        </div>
                      )}
                      {patientDistTotal === 100 && (
                        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
                          ✅ Perfect! Total percentage equals 100%.
                        </div>
                      )}
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

                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info
                        className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-blue-800 mb-2">
                          Patient Distribution Category Definitions:
                        </h5>
                        <ul className="space-y-2 text-sm text-blue-700">
                          <li className="flex items-start gap-2">
                            <span className="font-medium">•</span>
                            <span>
                              <strong>Newly Diagnosed %:</strong> Patients
                              recently confirmed with the disease for the first
                              time, initiating their first line of treatment.
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-medium">•</span>
                            <span>
                              <strong>Relapsed %:</strong> Patients whose
                              disease has returned after an initial response to
                              treatment.
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-medium">•</span>
                            <span>
                              <strong>Refractory %:</strong> Patients whose
                              disease does not respond to standard treatments or
                              progresses despite therapy.
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-medium">•</span>
                            <span>
                              <strong>2nd Opinion %:</strong> Patients seeking a
                              re-evaluation or confirmation of
                              diagnosis/treatment from another specialist or
                              center.
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-medium">•</span>
                            <span>
                              <strong>Maintenance %:</strong> Patients undergoing
                              ongoing, lower-intensity therapy to maintain
                              remission or prevent relapse or those who had
                              response to therapy.
                            </span>
                          </li>
                        </ul>
                        <div className="mt-3 p-2 bg-blue-100 rounded text-xs text-blue-800">
                          <strong>Note:</strong> Ensure the total percentage for
                          each patient type adds up to 100%. The table below
                          allows you to input these percentages for each
                          category.
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
                            const caseDistribution = watch(`patientDistributionMatrix.${hospitalCode}.${patient.key}`) || {};
                            const totalPercentage = Object.values(caseDistribution).reduce(
                                (sum, value) => sum + (parseFloat(value) || 0),
                                0
                            );
                            const remainingPercentage = 100 - totalPercentage;
                            const statusColor =
                                totalPercentage === 0
                                ? "text-gray-400"
                                : totalPercentage === 100
                                ? "text-green-600"
                                : totalPercentage > 100
                                ? "text-red-600"
                                : "text-orange-500";

                          return (
                          <tr key={patient.key} className="even:bg-gray-50">
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
                                  {...register(
                                    `patientDistributionMatrix.${hospitalCode}.${patient.key}.${caseType.key}`
                                  )}
                                />
                              </td>
                            ))}
                            <td
                              className={`p-2 text-center font-medium ${statusColor}`}
                            >
                              {totalPercentage}%
                            </td>
                            <td className="p-2 text-center">
                              {remainingPercentage}%
                            </td>
                          </tr>
                        )})}
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
                      For both ALL and NHL patients, ask what % of cases are 15
                      years and below vs above 15 years. Ensure the total adds
                      up to 100% for each diagnosis category.
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
                          {["allPatients", "nhlPatients"].map((patientType) => {
                            const ageDistribution = watch(`patientDistributionMatrix.${hospitalCode}.${patientType}.ageDistribution`) || {};
                            const below15 = parseFloat(ageDistribution.below15) || 0;
                            const above15 = parseFloat(ageDistribution.above15) || 0;
                            const total = below15 + above15;
                            const statusColor =
                                total === 0
                                ? "text-gray-400"
                                : total === 100
                                ? "text-green-600"
                                : total > 100
                                ? "text-red-600"
                                : "text-orange-500";

                            return (
                            <tr key={patientType}>
                              <td className="p-2 font-medium text-gray-800">
                                {patientType === "allPatients"
                                  ? "ALL Patients"
                                  : "NHL Patients"}
                              </td>
                              <td className="p-2 text-center">
                                <Input
                                  type="number"
                                  step="0.1"
                                  placeholder="0"
                                  className="w-full text-center"
                                  {...register(
                                    `patientDistributionMatrix.${hospitalCode}.${patientType}.ageDistribution.below15`
                                  )}
                                />
                              </td>
                              <td className="p-2 text-center">
                                <Input
                                  type="number"
                                  step="0.1"
                                  placeholder="0"
                                  className="w-full text-center"
                                  {...register(
                                    `patientDistributionMatrix.${hospitalCode}.${patientType}.ageDistribution.above15`
                                  )}
                                />
                              </td>
                              <td
                                className={`p-2 text-center font-medium ${statusColor}`}
                              >
                                {total}%
                              </td>
                            </tr>
                          )})}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
