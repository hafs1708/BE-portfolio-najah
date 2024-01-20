/*
  Warnings:

  - Added the required column `city` to the `profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job` to the `profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `profile` ADD COLUMN `city` VARCHAR(100) NOT NULL,
    ADD COLUMN `country` VARCHAR(100) NOT NULL,
    ADD COLUMN `job` VARCHAR(100) NOT NULL,
    ADD COLUMN `phone` VARCHAR(20) NOT NULL;
