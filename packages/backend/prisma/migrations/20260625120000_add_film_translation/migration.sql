-- CreateTable
CREATE TABLE "film_translation" (
    "film_id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "trivia" TEXT[],

    CONSTRAINT "film_translation_pkey" PRIMARY KEY ("film_id","locale")
);

-- AddForeignKey
ALTER TABLE "film_translation" ADD CONSTRAINT "film_translation_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "film"("id") ON DELETE CASCADE ON UPDATE CASCADE;
