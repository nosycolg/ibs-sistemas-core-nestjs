/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `People` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `gender` VARCHAR(100) NOT NULL,
    `dateOfBirth` VARCHAR(100) NOT NULL,
    `maritalStatus` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
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

-- CreateIndex
CREATE UNIQUE INDEX `Users_username_key` ON `Users`(`username`);

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_peopleId_fkey` FOREIGN KEY (`peopleId`) REFERENCES `People`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
