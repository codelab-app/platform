-- CreateTable
CREATE TABLE "_StyleToVertex" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_StyleToVertex_AB_unique" ON "_StyleToVertex"("A", "B");

-- CreateIndex
CREATE INDEX "_StyleToVertex_B_index" ON "_StyleToVertex"("B");

-- AddForeignKey
ALTER TABLE "_StyleToVertex" ADD FOREIGN KEY ("A") REFERENCES "Style"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StyleToVertex" ADD FOREIGN KEY ("B") REFERENCES "Vertex"("id") ON DELETE CASCADE ON UPDATE CASCADE;
