/*
  Warnings:

  - Added the required column `type` to the `Vertex` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vertex" ADD COLUMN     "type" TEXT NOT NULL;
