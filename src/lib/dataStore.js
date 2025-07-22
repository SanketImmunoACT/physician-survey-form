// class DataStore {
//     constructor() {
//         this.submissions = [];
//         this.loadFromStorage();
//     }

//     // Load data from localStorage
//     loadFromStorage() {
//         if (typeof window !== 'undefined') {
//             const stored = localStorage.getItem('surveySubmissions');
//             if (stored) {
//                 this.submissions = JSON.parse(stored);
//             }
//         }
//     }

//     // Save data to localStorage
//     saveToStorage() {
//         if (typeof window !== 'undefined') {
//             localStorage.setItem('surveySubmissions', JSON.stringify(this.submissions));
//         }
//     }

//     // Add new submission
//     addSubmission(formData) {
//         const submission = {
//             id: Date.now().toString(),
//             date: new Date().toLocaleDateString('en-GB'),
//             timestamp: new Date().toISOString(),
//             physicianName: formData.physicianName,
//             uniqueId: formData.uniqueId,
//             speciality: formData.speciality,
//             visitingHospitals: formData.visitingHospitals,
//             selectedHospitalCodes: formData.selectedHospitalCodes,
//             hospitalData: formData.hospitalData,
//             sourceFunds: formData.sourceFunds,
//             hospitalCodeBreakdown: formData.hospitalCodeBreakdown,
//             patientDistribution: formData.patientDistribution
//         };

//         this.submissions.push(submission);
//         this.saveToStorage();
//         return submission;
//     }

//     // Get all submissions
//     getAllSubmissions() {
//         return this.submissions;
//     }

//     // Get submissions by physician
//     getSubmissionsByPhysician(physicianName) {
//         return this.submissions.filter(sub =>
//             sub.physicianName.toLowerCase().includes(physicianName.toLowerCase())
//         );
//     }

//     // Calculate dashboard statistics
//     getDashboardStats() {
//         const totalSurveys = this.submissions.length;

//         let totalMonthlyBMTPatients = 0;
//         let uniqueFacilities = new Set();
//         let totalFacilities = 0;

//         this.submissions.forEach(submission => {
//             submission.selectedHospitalCodes.forEach(hospitalCode => {
//                 const monthlyPatients = parseInt(submission.hospitalData[hospitalCode]?.monthlyPatients) || 0;
//                 totalMonthlyBMTPatients += monthlyPatients;

//                 if (monthlyPatients > 0) {
//                     uniqueFacilities.add(hospitalCode);
//                     totalFacilities++;
//                 }
//             });
//         });

//         const avgPatientsPerFacility = totalFacilities > 0 ? Math.round(totalMonthlyBMTPatients / totalFacilities) : 0;

//         return {
//             totalSurveys,
//             monthlyBMTPatients: totalMonthlyBMTPatients,
//             uniqueFacilities: uniqueFacilities.size,
//             avgPatientsPerFacility
//         };
//     }

//     // Get recent submissions for dashboard table
//     getRecentSubmissions() {
//         const recentSubmissions = [];

//         this.submissions.forEach(submission => {
//             submission.selectedHospitalCodes.forEach(hospitalCode => {
//                 const hospitalData = submission.hospitalData[hospitalCode];
//                 if (hospitalData && (hospitalData.monthlyPatients || hospitalData.bmtPatients)) {
//                     recentSubmissions.push({
//                         id: `${submission.id}-${hospitalCode}`,
//                         date: submission.date,
//                         salesperson: `${submission.physicianName} (${submission.uniqueId})`,
//                         physician: `${submission.physicianName} ${submission.speciality}`,
//                         facility: `${hospitalCode} Hospital`,
//                         location: 'Mumbai, Maharashtra', // Default location - can be made dynamic
//                         monthlyPatients: parseInt(hospitalData.monthlyPatients) || 0,
//                         annualPatients: (parseInt(hospitalData.monthlyPatients) || 0) * 12,
//                         hospitalCode: hospitalCode
//                     });
//                 }
//             });
//         });

//         // Sort by date (most recent first)
//         return recentSubmissions.sort((a, b) => new Date(b.date) - new Date(a.date));
//     }

//     // Clear all data (for testing)
//     clearAll() {
//         this.submissions = [];
//         this.saveToStorage();
//     }
// }

// // Create singleton instance
// const dataStore = new DataStore();

// export default dataStore;





// Simple data store for form submissions (replace with actual database/API in production)
class DataStore {
    constructor() {
        this.submissions = [];
        this.loadFromStorage();
    }

    // Load data from localStorage
    loadFromStorage() {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('surveySubmissions');
            if (stored) {
                this.submissions = JSON.parse(stored);
            }
        }
    }

    // Save data to localStorage
    saveToStorage() {
        if (typeof window !== 'undefined') {
            localStorage.setItem('surveySubmissions', JSON.stringify(this.submissions));
        }
    }

    // Add new submission
    addSubmission(formData) {
        const submission = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString('en-GB'),
            timestamp: new Date().toISOString(),
            physicianName: formData.physicianName,
            uniqueId: formData.uniqueId,
            speciality: formData.speciality,
            visitingHospitals: formData.visitingHospitals,
            selectedHospitalCodes: formData.selectedHospitalCodes,
            hospitalData: formData.hospitalData,
            sourceFunds: formData.sourceFunds,
            hospitalCodeBreakdown: formData.hospitalCodeBreakdown,
            patientDistribution: formData.patientDistribution
        };

        this.submissions.push(submission);
        this.saveToStorage();
        return submission;
    }

    // Get all submissions
    getAllSubmissions() {
        return this.submissions;
    }

    // Get submissions by physician
    getSubmissionsByPhysician(physicianName) {
        return this.submissions.filter(sub =>
            sub.physicianName.toLowerCase().includes(physicianName.toLowerCase())
        );
    }

    // Calculate dashboard statistics
    getDashboardStats() {
        const totalSurveys = this.submissions.length;

        let totalMonthlyBMTPatients = 0;
        let uniqueFacilities = new Set();
        let totalFacilities = 0;

        this.submissions.forEach(submission => {
            submission.selectedHospitalCodes.forEach(hospitalCode => {
                const monthlyPatients = parseInt(submission.hospitalData[hospitalCode]?.monthlyPatients) || 0;
                totalMonthlyBMTPatients += monthlyPatients;

                if (monthlyPatients > 0) {
                    uniqueFacilities.add(hospitalCode);
                    totalFacilities++;
                }
            });
        });

        const avgPatientsPerFacility = totalFacilities > 0 ? Math.round(totalMonthlyBMTPatients / totalFacilities) : 0;

        return {
            totalSurveys,
            monthlyBMTPatients: totalMonthlyBMTPatients,
            uniqueFacilities: uniqueFacilities.size,
            avgPatientsPerFacility
        };
    }

    // Get recent submissions for dashboard table
    getRecentSubmissions() {
        const recentSubmissions = [];

        this.submissions.forEach(submission => {
            submission.selectedHospitalCodes.forEach(hospitalCode => {
                const hospitalData = submission.hospitalData[hospitalCode];
                if (hospitalData && (hospitalData.monthlyPatients || hospitalData.bmtPatients)) {
                    recentSubmissions.push({
                        id: `${submission.id}-${hospitalCode}`,
                        date: submission.date,
                        salesperson: `${submission.physicianName} (${submission.uniqueId})`,
                        physician: `${submission.physicianName} ${submission.speciality}`,
                        facility: `${hospitalCode} Hospital`,
                        location: 'Mumbai, Maharashtra', // Default location - can be made dynamic
                        monthlyPatients: parseInt(hospitalData.monthlyPatients) || 0,
                        annualPatients: (parseInt(hospitalData.monthlyPatients) || 0) * 12,
                        hospitalCode: hospitalCode
                    });
                }
            });
        });

        // Sort by date (most recent first)
        return recentSubmissions.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // Clear all data (for testing)
    clearAll() {
        this.submissions = [];
        this.saveToStorage();
    }
}

// Create singleton instance
const dataStore = new DataStore();

export default dataStore;