# Prisma Database Setup

This directory contains the Prisma schema and setup files for the Physician Survey Form application.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install prisma @prisma/client
```

### 2. Environment Variables

Create a `.env` file in your project root with your database URL:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/physician_survey_db"
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Create and apply migrations
npx prisma migrate dev --name init

# Seed the database with initial data
npx prisma db seed
```

### 4. Database Seeding

The seed script will:
- Import hospitals from `src/data/hospitals.json`
- Import physicians from `src/data/doctors.json`
- Create a default admin user

### 5. Development Commands

```bash
# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (WARNING: This will delete all data)
npx prisma migrate reset

# View database schema
npx prisma format

# Generate new migration after schema changes
npx prisma migrate dev
```

## Schema Overview

The database includes the following main entities:

- **Users**: Authentication and user management
- **Physicians**: Doctor information
- **Hospitals**: Hospital data
- **SurveySubmissions**: Main survey records
- **HospitalSurveyData**: Hospital-specific survey data
- **PatientDistribution**: Patient type breakdowns
- **SourceOfFunds**: Funding source information
- **HospitalCodeBreakdown**: Case type distributions
- **CaseDistributionMatrix**: Complex patient-case matrix
- **AuditLog**: Security and compliance tracking

## Usage Examples

### Basic Queries

```javascript
import { prisma } from '@/lib/prisma'

// Get all hospitals
const hospitals = await prisma.hospital.findMany({
  where: { status: 'APPROVED' }
})

// Get physician with their submissions
const physician = await prisma.physician.findUnique({
  where: { uniqueId: 'Sanket Shah' },
  include: {
    surveySubmissions: {
      include: {
        hospitalSurveyData: {
          include: {
            hospital: true,
            patientDistributions: true
          }
        }
      }
    }
  }
})

// Create a new survey submission
const submission = await prisma.surveySubmission.create({
  data: {
    physicianId: 'physician-id',
    submittedById: 'user-id',
    submissionDate: new Date(),
    status: 'DRAFT'
  }
})
```

### Dashboard Statistics

```javascript
// Get dashboard statistics
const stats = await prisma.$queryRaw`
  SELECT 
    COUNT(DISTINCT ss.id) as total_surveys,
    SUM(hsd.monthly_patients) as total_monthly_bmt_patients,
    COUNT(DISTINCT hsd.hospital_id) as unique_facilities,
    ROUND(AVG(hsd.monthly_patients), 0) as avg_patients_per_facility
  FROM survey_submissions ss
  LEFT JOIN hospital_survey_data hsd ON ss.id = hsd.survey_submission_id
  WHERE ss.status = 'SUBMITTED'
`
```

## Migration Strategy

1. **Phase 1**: Core tables (Users, Physicians, Hospitals, SurveySubmissions)
2. **Phase 2**: Detailed data tables (PatientDistribution, SourceOfFunds, etc.)
3. **Phase 3**: Advanced features (AuditLog, Views, Security)

## Notes

- All tables use `cuid()` for primary keys
- Timestamps are automatically managed with `@default(now())` and `@updatedAt`
- Cascade deletes are configured for related data
- Unique constraints prevent duplicate entries
- Enum types ensure data consistency 