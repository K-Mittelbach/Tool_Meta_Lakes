-- CreateTable
CREATE TABLE "Lake" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NUll,
    "longitude" REAL ,
    "latitude" REAL ,
    "maxDepth" REAL ,
    "surfaceArea" REAL ,
    "surfaceLevel" REAL ,
    "catchmentArea" REAL ,
    "countries" TEXT NOT ,
    "isReviewed" BOOLEAN NOT NULL,
    "isEdited" BOOLEAN NOT NULL
);
