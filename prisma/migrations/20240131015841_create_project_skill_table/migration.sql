-- CreateTable
CREATE TABLE `projectskill` (
    `skillId` INTEGER NOT NULL,
    `projectId` INTEGER NOT NULL,

    PRIMARY KEY (`skillId`, `projectId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `projectskill` ADD CONSTRAINT `projectskill_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectskill` ADD CONSTRAINT `projectskill_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
