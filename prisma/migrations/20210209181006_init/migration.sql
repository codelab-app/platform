-- CreateTable
CREATE TABLE "Style" (
    "id" TEXT NOT NULL,
    "props" JSONB NOT NULL DEFAULT '{}',
    "appId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Style" ADD FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;
