/*
  Warnings:

  - You are about to drop the column `productId` on the `carts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_productId_fkey";

-- AlterTable
ALTER TABLE "carts" DROP COLUMN "productId";
