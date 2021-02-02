/*
  Warnings:

  - Made the column `props` on table `Edge` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `props` on table `Graph` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `props` on table `Vertex` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Edge" ALTER COLUMN "props" SET NOT NULL,
ALTER COLUMN "props" SET DEFAULT '{}';

-- AlterTable
ALTER TABLE "Graph" ALTER COLUMN "props" SET NOT NULL,
ALTER COLUMN "props" SET DEFAULT '{}';

-- AlterTable
ALTER TABLE "Vertex" ALTER COLUMN "props" SET NOT NULL,
ALTER COLUMN "props" SET DEFAULT '{}';
