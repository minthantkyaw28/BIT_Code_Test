-- CreateTable
CREATE TABLE `content_owner` (
    `idx` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `publisher` (
    `idx` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_book` (
    `idx` INTEGER NOT NULL AUTO_INCREMENT,
    `book_uniq_idx` INTEGER NOT NULL,
    `bookname` VARCHAR(191) NOT NULL,
    `content_owner_id` INTEGER NOT NULL,
    `publisher_id` INTEGER NOT NULL,
    `cover_photo` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tbl_book_book_uniq_idx_key`(`book_uniq_idx`),
    PRIMARY KEY (`idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_book` ADD CONSTRAINT `tbl_book_content_owner_id_fkey` FOREIGN KEY (`content_owner_id`) REFERENCES `content_owner`(`idx`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_book` ADD CONSTRAINT `tbl_book_publisher_id_fkey` FOREIGN KEY (`publisher_id`) REFERENCES `publisher`(`idx`) ON DELETE RESTRICT ON UPDATE CASCADE;
