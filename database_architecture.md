# Database Architecture for Physician Survey Form

## Overview
This document outlines the database architecture for the Physician Survey Form application, which is designed to collect and manage healthcare survey data from physicians across multiple hospitals and facilities.

## Database Schema

### 1. Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'salesperson', 'physician') DEFAULT 'salesperson',
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP
);
```

### 2. Physicians Table
```sql
CREATE TABLE physicians (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    unique_id VARCHAR(100) UNIQUE NOT NULL,
    speciality VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);
```

### 3. Hospitals Table
```sql
CREATE TABLE hospitals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    city VARCHAR(100),
    city_code VARCHAR(10),
    state VARCHAR(100),
    country VARCHAR(100) DEFAULT 'India',
    type ENUM('Government Hospital', 'Private Hospital', 'Charitable Trust Hospital'),
    status ENUM('Approved', 'Pending', 'Rejected') DEFAULT 'Approved',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);
```

### 4. Survey Submissions Table
```sql
CREATE TABLE survey_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    physician_id UUID REFERENCES physicians(id),
    submitted_by UUID REFERENCES users(id),
    submission_date DATE NOT NULL,
    submission_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('draft', 'submitted', 'approved', 'rejected') DEFAULT 'draft',
    total_hospitals INTEGER DEFAULT 0,
    total_monthly_patients INTEGER DEFAULT 0,
    total_bmt_patients INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Hospital Survey Data Table
```sql
CREATE TABLE hospital_survey_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    survey_submission_id UUID REFERENCES survey_submissions(id) ON DELETE CASCADE,
    hospital_id UUID REFERENCES hospitals(id),
    bmt_patients INTEGER DEFAULT 0,
    monthly_patients INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(survey_submission_id, hospital_id)
);
```

### 6. Patient Distribution Table
```sql
CREATE TABLE patient_distribution (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_survey_data_id UUID REFERENCES hospital_survey_data(id) ON DELETE CASCADE,
    patient_type ENUM(
        'all_patients',
        'nhl_patients', 
        'mm_patients',
        'other_hemat_malignancies',
        'glioblastomas',
        'other_solid_tumours'
    ) NOT NULL,
    count INTEGER DEFAULT 0,
    percentage DECIMAL(5,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(hospital_survey_data_id, patient_type)
);
```

### 7. Source of Funds Table
```sql
CREATE TABLE source_of_funds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_survey_data_id UUID REFERENCES hospital_survey_data(id) ON DELETE CASCADE,
    source_type ENUM(
        'oop_without_insurance',
        'oop_with_insurance',
        'cghs',
        'esi',
        'railways',
        'echs',
        'psus',
        'state_govt',
        'defence'
    ) NOT NULL,
    amount DECIMAL(12,2) DEFAULT 0.00,
    percentage DECIMAL(5,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(hospital_survey_data_id, source_type)
);
```

### 8. Hospital Code Breakdown Table
```sql
CREATE TABLE hospital_code_breakdown (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_survey_data_id UUID REFERENCES hospital_survey_data(id) ON DELETE CASCADE,
    breakdown_type ENUM(
        'newly_diagnosed',
        'relapsed_refractory',
        'second_opinion'
    ) NOT NULL,
    count INTEGER DEFAULT 0,
    percentage DECIMAL(5,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(hospital_survey_data_id, breakdown_type)
);
```

### 9. Case Distribution Matrix Table
```sql
CREATE TABLE case_distribution_matrix (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_survey_data_id UUID REFERENCES hospital_survey_data(id) ON DELETE CASCADE,
    patient_type ENUM(
        'all_patients',
        'nhl_patients',
        'mm_patients',
        'other_hemat_malignancies',
        'glioblastomas',
        'other_solid_tumours'
    ) NOT NULL,
    case_type ENUM(
        'newly_diagnosed',
        'relapsed_refractory',
        'second_opinion'
    ) NOT NULL,
    count INTEGER DEFAULT 0,
    percentage DECIMAL(5,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(hospital_survey_data_id, patient_type, case_type)
);
```

### 10. Audit Log Table
```sql
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100),
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Indexes

### Performance Indexes
```sql
-- Users table indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Physicians table indexes
CREATE INDEX idx_physicians_unique_id ON physicians(unique_id);
CREATE INDEX idx_physicians_name ON physicians(name);
CREATE INDEX idx_physicians_speciality ON physicians(speciality);

-- Hospitals table indexes
CREATE INDEX idx_hospitals_code ON hospitals(hospital_code);
CREATE INDEX idx_hospitals_city ON hospitals(city);
CREATE INDEX idx_hospitals_type ON hospitals(type);
CREATE INDEX idx_hospitals_status ON hospitals(status);

-- Survey submissions indexes
CREATE INDEX idx_survey_submissions_physician ON survey_submissions(physician_id);
CREATE INDEX idx_survey_submissions_date ON survey_submissions(submission_date);
CREATE INDEX idx_survey_submissions_status ON survey_submissions(status);
CREATE INDEX idx_survey_submissions_created_at ON survey_submissions(created_at);

-- Hospital survey data indexes
CREATE INDEX idx_hospital_survey_submission ON hospital_survey_data(survey_submission_id);
CREATE INDEX idx_hospital_survey_hospital ON hospital_survey_data(hospital_id);

-- Patient distribution indexes
CREATE INDEX idx_patient_distribution_hospital ON patient_distribution(hospital_survey_data_id);
CREATE INDEX idx_patient_distribution_type ON patient_distribution(patient_type);

-- Source of funds indexes
CREATE INDEX idx_source_funds_hospital ON source_of_funds(hospital_survey_data_id);
CREATE INDEX idx_source_funds_type ON source_of_funds(source_type);

-- Audit log indexes
CREATE INDEX idx_audit_log_user ON audit_log(user_id);
CREATE INDEX idx_audit_log_action ON audit_log(action);
CREATE INDEX idx_audit_log_created_at ON audit_log(created_at);
```

## Relationships

### Entity Relationship Diagram (ERD)

```
Users (1) ----< Survey Submissions (N)
Physicians (1) ----< Survey Submissions (N)
Survey Submissions (1) ----< Hospital Survey Data (N)
Hospitals (1) ----< Hospital Survey Data (N)
Hospital Survey Data (1) ----< Patient Distribution (N)
Hospital Survey Data (1) ----< Source of Funds (N)
Hospital Survey Data (1) ----< Hospital Code Breakdown (N)
Hospital Survey Data (1) ----< Case Distribution Matrix (N)
Users (1) ----< Audit Log (N)
```

## Data Types and Constraints

### Enums
```sql
-- User roles
CREATE TYPE user_role AS ENUM ('admin', 'salesperson', 'physician');

-- Hospital types
CREATE TYPE hospital_type AS ENUM ('Government Hospital', 'Private Hospital', 'Charitable Trust Hospital');

-- Hospital status
CREATE TYPE hospital_status AS ENUM ('Approved', 'Pending', 'Rejected');

-- Survey submission status
CREATE TYPE submission_status AS ENUM ('draft', 'submitted', 'approved', 'rejected');

-- Patient types
CREATE TYPE patient_type AS ENUM (
    'all_patients',
    'nhl_patients',
    'mm_patients',
    'other_hemat_malignancies',
    'glioblastomas',
    'other_solid_tumours'
);

-- Source of funds types
CREATE TYPE source_type AS ENUM (
    'oop_without_insurance',
    'oop_with_insurance',
    'cghs',
    'esi',
    'railways',
    'echs',
    'psus',
    'state_govt',
    'defence'
);

-- Breakdown types
CREATE TYPE breakdown_type AS ENUM (
    'newly_diagnosed',
    'relapsed_refractory',
    'second_opinion'
);
```

## Triggers

### Automatic Timestamp Updates
```sql
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_physicians_updated_at BEFORE UPDATE ON physicians FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hospitals_updated_at BEFORE UPDATE ON hospitals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_survey_submissions_updated_at BEFORE UPDATE ON survey_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hospital_survey_data_updated_at BEFORE UPDATE ON hospital_survey_data FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_patient_distribution_updated_at BEFORE UPDATE ON patient_distribution FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_source_of_funds_updated_at BEFORE UPDATE ON source_of_funds FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hospital_code_breakdown_updated_at BEFORE UPDATE ON hospital_code_breakdown FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_case_distribution_matrix_updated_at BEFORE UPDATE ON case_distribution_matrix FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Views

### Dashboard Statistics View
```sql
CREATE VIEW dashboard_stats AS
SELECT 
    COUNT(DISTINCT ss.id) as total_surveys,
    SUM(hsd.monthly_patients) as total_monthly_bmt_patients,
    COUNT(DISTINCT hsd.hospital_id) as unique_facilities,
    ROUND(AVG(hsd.monthly_patients), 0) as avg_patients_per_facility
FROM survey_submissions ss
LEFT JOIN hospital_survey_data hsd ON ss.id = hsd.survey_submission_id
WHERE ss.status = 'submitted';
```

### Recent Submissions View
```sql
CREATE VIEW recent_submissions AS
SELECT 
    ss.id,
    ss.submission_date,
    CONCAT(p.name, ' (', p.unique_id, ')') as salesperson,
    CONCAT(p.name, ' ', p.speciality) as physician,
    CONCAT(h.hospital_code, ' - ', h.name) as facility,
    CONCAT(h.city, ', ', h.state) as location,
    hsd.monthly_patients,
    (hsd.monthly_patients * 12) as annual_patients,
    h.hospital_code
FROM survey_submissions ss
JOIN physicians p ON ss.physician_id = p.id
JOIN hospital_survey_data hsd ON ss.id = hsd.survey_submission_id
JOIN hospitals h ON hsd.hospital_id = h.id
WHERE ss.status = 'submitted'
ORDER BY ss.submission_date DESC;
```

## Security Considerations

### Row Level Security (RLS)
```sql
-- Enable RLS on sensitive tables
ALTER TABLE survey_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospital_survey_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Policies for survey submissions
CREATE POLICY "Users can view their own submissions" ON survey_submissions
    FOR SELECT USING (submitted_by = current_user_id());

CREATE POLICY "Users can create submissions" ON survey_submissions
    FOR INSERT WITH CHECK (submitted_by = current_user_id());

-- Policies for hospital survey data
CREATE POLICY "Users can view data for their submissions" ON hospital_survey_data
    FOR SELECT USING (
        survey_submission_id IN (
            SELECT id FROM survey_submissions WHERE submitted_by = current_user_id()
        )
    );
```

## Backup and Recovery

### Backup Strategy
- **Full Backup**: Daily at 2:00 AM
- **Incremental Backup**: Every 4 hours
- **Transaction Log Backup**: Every 15 minutes
- **Retention**: 30 days for full backups, 7 days for incremental

### Recovery Procedures
- **Point-in-time recovery**: Up to 24 hours
- **Disaster recovery**: RTO < 4 hours, RPO < 15 minutes

## Performance Optimization

### Query Optimization
- Use prepared statements for frequently executed queries
- Implement connection pooling
- Regular VACUUM and ANALYZE operations
- Monitor slow query logs

### Caching Strategy
- Redis for session management
- Application-level caching for hospital and physician data
- CDN for static assets

## Migration Strategy

### Phase 1: Core Tables
1. Users, Physicians, Hospitals
2. Survey Submissions, Hospital Survey Data
3. Basic indexes and constraints

### Phase 2: Detailed Data Tables
1. Patient Distribution, Source of Funds
2. Hospital Code Breakdown, Case Distribution Matrix
3. Advanced indexes and performance optimization

### Phase 3: Advanced Features
1. Audit Log, Views
2. Row Level Security
3. Backup and monitoring setup

## Monitoring and Maintenance

### Key Metrics to Monitor
- Database size and growth rate
- Query performance and response times
- Connection pool utilization
- Backup success rates
- Index usage statistics

### Maintenance Tasks
- Weekly: Update table statistics
- Monthly: Review and optimize slow queries
- Quarterly: Review and update indexes
- Annually: Capacity planning and performance review 