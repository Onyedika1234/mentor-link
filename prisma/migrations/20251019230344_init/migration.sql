/*
  Warnings:

  - You are about to drop the column `topic` on the `session` table. All the data in the column will be lost.
  - Added the required column `date` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `session` DROP COLUMN `topic`,
    ADD COLUMN `date` DATETIME(3) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `duration` INTEGER NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
