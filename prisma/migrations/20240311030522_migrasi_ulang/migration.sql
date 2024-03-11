-- CreateTable
CREATE TABLE `user` (
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `token` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profile` (
    `email` VARCHAR(100) NOT NULL,
    `firstname` VARCHAR(100) NOT NULL,
    `lastname` VARCHAR(100) NOT NULL,
    `avatar` VARCHAR(255) NULL,
    `dob` DATE NOT NULL,
    `address` TEXT NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `job` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `bio` TEXT NULL,
    `website` VARCHAR(100) NULL,
    `github` VARCHAR(100) NULL,
    `gitlab` VARCHAR(100) NULL,
    `instagram` VARCHAR(100) NULL,
    `facebook` VARCHAR(100) NULL,
    `twitter` VARCHAR(100) NULL,
    `linkedin` VARCHAR(100) NULL,
    `discord` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `blog_title_idx`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NULL,
    `status` ENUM('ON_PROGRESS', 'MAINTENANCE', 'COMPLETE') NOT NULL DEFAULT 'ON_PROGRESS',
    `url` VARCHAR(100) NULL,
    `github` VARCHAR(100) NULL,
    `gitlab` VARCHAR(100) NULL,
    `company` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `education` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `institutionName` VARCHAR(100) NOT NULL,
    `startYear` INTEGER NOT NULL,
    `endYear` INTEGER NULL,
    `major` VARCHAR(100) NULL,
    `degree` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skill_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skill` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `skillCategoryId` INTEGER NOT NULL,
    `svg` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `experience` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company` VARCHAR(100) NOT NULL,
    `location` VARCHAR(100) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `photo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(255) NOT NULL,
    `blogId` INTEGER NULL,
    `projectId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projectskill` (
    `skillId` INTEGER NOT NULL,
    `projectId` INTEGER NOT NULL,

    PRIMARY KEY (`skillId`, `projectId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `skill` ADD CONSTRAINT `skill_skillCategoryId_fkey` FOREIGN KEY (`skillCategoryId`) REFERENCES `skill_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `photo` ADD CONSTRAINT `photo_blogId_fkey` FOREIGN KEY (`blogId`) REFERENCES `blog`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `photo` ADD CONSTRAINT `photo_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectskill` ADD CONSTRAINT `projectskill_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectskill` ADD CONSTRAINT `projectskill_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
