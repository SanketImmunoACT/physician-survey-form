import { z } from 'zod';

export const formSchema = z.object({
  physicianName: z.string().min(1, 'Physician name is required'),
  speciality: z.string().min(1, 'Speciality is required'),
  selectedHospitalCodes: z.array(z.string()).min(1, 'At least one hospital must be selected'),
  hospitalData: z.record(z.string(), z.object({
    monthlyPatients: z.number().min(0, 'Monthly patients must be a positive number'),
    bmtPatients: z.number().min(0, 'BMT patients must be a positive number'),
    oopAffordability: z.number().min(0, 'OOP affordability must be a positive number').max(100, 'OOP affordability cannot exceed 100'),
    patientDistribution: z.record(z.string(), z.number().min(0, 'Patient distribution must be a positive number')),
  })),
  sourceFunds: z.record(z.string(), z.object({
    oopWithoutInsurance: z.number().min(0, 'OOP without insurance must be a positive number'),
    oopWithInsurance: z.number().min(0, 'OOP with insurance must be a positive number'),
    cghs: z.number().min(0, 'CGHS must be a positive number'),
    esi: z.number().min(0, 'ESI must be a positive number'),
    railways: z.number().min(0, 'Railways must be a positive number'),
    echs: z.number().min(0, 'ECHS must be a positive number'),
    psus: z.number().min(0, 'PSUs must be a positive number'),
    stateGovt: z.number().min(0, 'State government must be a positive number'),
    defence: z.number().min(0, 'Defence must be a positive number'),
  })),
  patientDistributionMatrix: z.record(z.string(), z.record(z.string(), z.record(z.string(), z.number().min(0, 'Patient distribution must be a positive number')))),
});