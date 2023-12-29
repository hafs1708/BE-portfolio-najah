-- CreateTable
CREATE TABLE `education` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `institutionName` VARCHAR(100) NOT NULL,
    `startYear` INTEGER NOT NULL,
    `endYear` INTEGER NOT NULL,
    `major` VARCHAR(100) NULL,
    `degree` VARCHAR(100) NULL,
    `craetedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
