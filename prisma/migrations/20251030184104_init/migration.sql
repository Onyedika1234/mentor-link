/*
  Warnings:

  - Added the required column `time` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `session` ADD COLUMN `time` VARCHAR(191) NOT NULL,
    MODIFY `date` VARCHAR(191) NOT NULL;
