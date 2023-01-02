/*
  Warnings:

  - You are about to drop the column `NFC` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `QRcode` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[checkInId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `User_NFC_key` ON `User`;

-- DropIndex
DROP INDEX `User_QRcode_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `NFC`,
    DROP COLUMN `QRcode`,
    ADD COLUMN `checkInId` VARCHAR(191) NOT NULL DEFAULT 'hd';

-- CreateTable
CREATE TABLE `CheckIn` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sessionName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `CheckIn_sessionName_key`(`sessionName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CheckInUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `checkInId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_checkInId_key` ON `User`(`checkInId`);

-- AddForeignKey
ALTER TABLE `CheckInUser` ADD CONSTRAINT `CheckInUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`checkInId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CheckInUser` ADD CONSTRAINT `CheckInUser_checkInId_fkey` FOREIGN KEY (`checkInId`) REFERENCES `CheckIn`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
