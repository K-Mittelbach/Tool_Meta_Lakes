-- CreateTable
CREATE TABLE "Lake" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "maxDepth" TEXT NOT NULL,
    "surfaceArea" TEXT NOT NULL,
    "surfaceLevel" TEXT NOT NULL,
    "catchmentArea" TEXT NOT NULL,
    "countries" TEXT NOT NULL,
    "isReviewed" BOOLEAN NOT NULL,
    "isEdited" BOOLEAN NOT NULL
);
