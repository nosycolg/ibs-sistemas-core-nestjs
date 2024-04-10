/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Address` DROP FOREIGN KEY `Address_peopleId_fkey`;

-- DropTable
DROP TABLE `Address`;

-- CreateTable
CREATE TABLE `Addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cep` VARCHAR(100) NOT NULL,
    `street` VARCHAR(100) NOT NULL,
    `streetNumber` VARCHAR(100) NOT NULL,
    `complement` VARCHAR(100) NOT NULL,
    `district` VARCHAR(100) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `state` VARCHAR(100) NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `peopleId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Addresses` ADD CONSTRAINT `Addresses_peopleId_fkey` FOREIGN KEY (`peopleId`) REFERENCES `People`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
