-- AlterTable
ALTER TABLE `surveysubmission` ADD COLUMN `zm1_approval_status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `zm1_approver_id` INTEGER NULL,
    ADD COLUMN `zm2_approval_status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `zm2_approver_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('SUPERADMIN', 'SALESPERSON', 'ZONAL_MANAGER_1', 'ZONAL_MANAGER_2') NOT NULL DEFAULT 'SALESPERSON';

-- AddForeignKey
ALTER TABLE `SurveySubmission` ADD CONSTRAINT `SurveySubmission_zm1_approver_id_fkey` FOREIGN KEY (`zm1_approver_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SurveySubmission` ADD CONSTRAINT `SurveySubmission_zm2_approver_id_fkey` FOREIGN KEY (`zm2_approver_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
