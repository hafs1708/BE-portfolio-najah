-- CreateTable
CREATE TABLE `profile` (
    `email` VARCHAR(100) NOT NULL,
    `firstname` VARCHAR(100) NOT NULL,
    `lastname` VARCHAR(100) NOT NULL,
    `dob` DATE NOT NULL,
    `address` TEXT NOT NULL,
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
