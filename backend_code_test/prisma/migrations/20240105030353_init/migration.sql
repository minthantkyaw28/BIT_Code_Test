/*
  Warnings:

  - Added the required column `updatedAt` to the `content_owner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `publisher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `content_owner` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `publisher` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
