/*
  Warnings:

  - Added the required column `svg` to the `skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `skill` ADD COLUMN `svg` TEXT NOT NULL;
