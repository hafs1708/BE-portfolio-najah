/*
  Warnings:

  - You are about to drop the column `endtDate` on the `project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `education` MODIFY `endYear` INTEGER NULL;

-- AlterTable
ALTER TABLE `project` DROP COLUMN `endtDate`,
    ADD COLUMN `endDate` DATE NULL;
