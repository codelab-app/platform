-- AlterTable
ALTER TABLE "Edge" ADD COLUMN     "props" JSONB;

-- AlterTable
ALTER TABLE "Graph" ADD COLUMN     "props" JSONB;

-- AlterTable
ALTER TABLE "Vertex" ADD COLUMN     "props" JSONB;
