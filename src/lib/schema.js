
import { z } from 'zod';

const hospitalDataSchema = z.object({
  bmtPatients: z.string().optional(),
  monthlyPatients: z.string().optional(),
  oopAffordability: z.string().optional(),
  patientDistribution: z.object({
    allPatients: z.string().optional(),
    nhlPatients: z.string().optional(),
    mmPatients: z.string().optional(),
    otherHematMalignancies: z.string().optional(),
    glioblastomas: z.string().optional(),
    otherSolidTumours: z.string().optional(),
  }).optional(),
});

const sourceFundsSchema = z.object({
  oopWithoutInsurance: z.string().optional(),
  oopWithInsurance: z.string().optional(),
  cghs: z.string().optional(),
  esi: z.string().optional(),
  railways: z.string().optional(),
  echs: z.string().optional(),
  psus: z.string().optional(),
  stateGovt: z.string().optional(),
  defence: z.string().optional(),
});

const patientDistributionMatrixSchema = z.object({
  newlyDiagnosed: z.string().optional(),
  relapsed: z.string().optional(),
  refractory: z.string().optional(),
  secondOpinion: z.string().optional(),
  maintenance: z.string().optional(),
  ageDistribution: z.object({
    below15: z.string().optional(),
    above15: z.string().optional(),
  }).optional(),
});

export const formSchema = z.object({
  physicianName: z.string().min(1, 'Physician name is required'),
  speciality: z.string().min(1, 'Speciality is required'),
  otherSpeciality: z.string().optional(),
  selectedHospitalCodes: z.array(z.string()).min(1, 'At least one hospital must be selected'),
  hospitalData: z.record(hospitalDataSchema),
  sourceFunds: z.record(sourceFundsSchema),
  patientDistributionMatrix: z.record(z.record(patientDistributionMatrixSchema)),
  additionalInsights: z.string().optional(),
});
