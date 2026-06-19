-- CreateTable
CREATE TABLE "film" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "director" TEXT NOT NULL,
    "release_date" TEXT NOT NULL,
    "runtime" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "score" TEXT NOT NULL,
    "trivia" TEXT[],
    "languages" TEXT[],

    CONSTRAINT "film_pkey" PRIMARY KEY ("id")
);
