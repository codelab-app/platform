/*
  Warnings:

  - Added the required column `source` to the `Edge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target` to the `Edge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Edge" ADD COLUMN     "source" TEXT NOT NULL,
ADD COLUMN     "target" TEXT NOT NULL;
