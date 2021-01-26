/*
  Warnings:

  - Made the column `type` on table `Vertex` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Vertex" ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "type" SET DEFAULT E'React_Grid';
