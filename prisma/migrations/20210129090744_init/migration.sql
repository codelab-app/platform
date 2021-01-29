/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[target]` on the table `Edge`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Edge.target_unique" ON "Edge"("target");
