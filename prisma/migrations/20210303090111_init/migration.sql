/*
  Warnings:

  - Added the required column `body` to the `Lambda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lambda" ADD COLUMN     "body" TEXT NOT NULL;
