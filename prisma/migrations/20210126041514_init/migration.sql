-- CreateEnum
CREATE TYPE "VertexType" AS ENUM ('React_Grid_Layout_Container', 'React_Grid', 'React_ResponsiveGrid');

-- CreateEnum
CREATE TYPE "EdgeType" AS ENUM ('Vertex', 'Graph');

-- CreateEnum
CREATE TYPE "GraphType" AS ENUM ('Layout', 'Component');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "App" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "appId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Graph" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" "GraphType" NOT NULL,
    "appId" TEXT,
    "pageId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vertex" (
    "id" TEXT NOT NULL,
    "type" "VertexType" NOT NULL,
    "graphId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Edge" (
    "id" TEXT NOT NULL,
    "type" "EdgeType" NOT NULL,
    "graphId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "App" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Graph" ADD FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Graph" ADD FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vertex" ADD FOREIGN KEY ("graphId") REFERENCES "Graph"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD FOREIGN KEY ("graphId") REFERENCES "Graph"("id") ON DELETE SET NULL ON UPDATE CASCADE;
