/*
  Warnings:

  - You are about to drop the column `craetedAt` on the `blog` table. All the data in the column will be lost.
  - You are about to drop the column `craetedAt` on the `education` table. All the data in the column will be lost.
  - You are about to drop the column `craetedAt` on the `experience` table. All the data in the column will be lost.
  - You are about to drop the column `craetedAt` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `craetedAt` on the `skill` table. All the data in the column will be lost.
  - You are about to drop the column `craetedAt` on the `skill_category` table. All the data in the column will be lost.
  - You are about to drop the column `craetedAt` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `blog` DROP COLUMN `craetedAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `education` DROP COLUMN `craetedAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `experience` DROP COLUMN `craetedAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `project` DROP COLUMN `craetedAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `skill` DROP COLUMN `craetedAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `skill_category` DROP COLUMN `craetedAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `user` DROP COLUMN `craetedAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `photo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(255) NOT NULL,
    `blogId` INTEGER NULL,
    `projectId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `photo` ADD CONSTRAINT `photo_blogId_fkey` FOREIGN KEY (`blogId`) REFERENCES `blog`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `photo` ADD CONSTRAINT `photo_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
