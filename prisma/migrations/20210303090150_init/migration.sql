/*
  Warnings:

  - Made the column `appId` on table `Lambda` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Lambda" ALTER COLUMN "appId" SET NOT NULL;
