/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[QRcode]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[NFC]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `NFC` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `QRcode` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `NFC` VARCHAR(191) NOT NULL,
    ADD COLUMN `QRcode` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `teamId` INTEGER NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Post`;

-- CreateIndex
CREATE UNIQUE INDEX `User_name_key` ON `User`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `User_QRcode_key` ON `User`(`QRcode`);

-- CreateIndex
CREATE UNIQUE INDEX `User_NFC_key` ON `User`(`NFC`);
