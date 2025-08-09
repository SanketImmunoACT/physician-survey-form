-- CreateTable
CREATE TABLE `SurveySubmission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `physicianName` VARCHAR(191) NOT NULL,
    `speciality` VARCHAR(191) NOT NULL,
    `selectedHospitalCodes` JSON NOT NULL,
    `hospitalData` JSON NOT NULL,
    `sourceFunds` JSON NOT NULL,
    `patientDistributionMatrix` JSON NOT NULL,
    `additionalInsights` TEXT NULL,
    `submittedBy` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SurveySubmission` ADD CONSTRAINT `SurveySubmission_submittedBy_fkey` FOREIGN KEY (`submittedBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
