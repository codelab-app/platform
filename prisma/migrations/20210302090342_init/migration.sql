-- CreateTable
CREATE TABLE "Lambda" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "appId" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lambda" ADD FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE SET NULL ON UPDATE CASCADE;
