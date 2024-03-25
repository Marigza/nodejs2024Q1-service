-- CreateTable
CREATE TABLE "Favorites" (
    "id" TEXT NOT NULL,
    "artists" TEXT[],
    "albums" TEXT[],
    "tracks" TEXT[],

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);
