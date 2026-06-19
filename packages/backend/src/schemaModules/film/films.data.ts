/**
 * Local English-only seed data for the four featured films and six additional
 * Studio Ghibli titles. Sourced from the public Studio Ghibli dataset
 * (ghibliapi.vercel.app) and served directly — the API is not proxied at runtime.
 *
 * `languages` lists the locales each film is translated into. Coverage is
 * intentionally uneven and mirrors the source material under `/translations`;
 * all content served by this app is English (`en`).
 */

export interface Film {
  /** Wide banner image URL. */
  banner: string;
  description: string;
  director: string;
  id: string;
  /** Poster image URL. */
  image: string;
  /** ISO 639-1 locales this film is translated into; always includes "en". */
  languages: string[];
  /** Release year, e.g. "2001". */
  releaseDate: string;
  /** Running time in minutes, e.g. "124". */
  runtime: string;
  /** Rotten Tomatoes score, e.g. "97". */
  score: string;
  title: string;
}

export const films: Film[] = [
  {
    id: "ebbb6b7c-945c-41ee-a792-de0e43191bd8",
    title: "Porco Rosso",
    description:
      "Porco Rosso, known in Japan as Crimson Pig (Kurenai no Buta) is the sixth animated film by Hayao Miyazaki and released in 1992. You're introduced to an Italian World War I fighter ace, now living as a freelance bounty hunter chasing 'air pirates' in the Adriatic Sea. He has been given a curse that changed his head to that of a pig. Once called Marco Pagot, he is now known to the world as 'Porco Rosso', Italian for 'Red Pig.'",
    director: "Hayao Miyazaki",
    releaseDate: "1992",
    runtime: "93",
    image:
      "https://image.tmdb.org/t/p/w600_and_h900_bestv2/byKAndF6KQSDpGxp1mTr23jPbYp.jpg",
    banner:
      "https://image.tmdb.org/t/p/original/nAeCzilMRXvGaxiCpv63ZRVRVgh.jpg",
    score: "94",
    languages: ["en"],
  },
  {
    id: "ea660b10-85c4-4ae3-8a5f-41cea3648e3e",
    title: "Kiki's Delivery Service",
    description:
      "A young witch, on her mandatory year of independent life, finds fitting into a new community difficult while she supports herself by running an air courier service.",
    director: "Hayao Miyazaki",
    releaseDate: "1989",
    runtime: "102",
    image:
      "https://image.tmdb.org/t/p/w600_and_h900_bestv2/7nO5DUMnGUuXrA4r2h6ESOKQRrx.jpg",
    banner:
      "https://image.tmdb.org/t/p/original/h5pAEVma835u8xoE60kmLVopLct.jpg",
    score: "96",
    languages: ["en", "es", "fr", "de", "it", "pt", "ja", "nl"],
  },
  {
    id: "cd3d059c-09f4-4ff3-8d63-bc765a5184fa",
    title: "Howl's Moving Castle",
    description:
      "When Sophie, a shy young woman, is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking home.",
    director: "Hayao Miyazaki",
    releaseDate: "2004",
    runtime: "119",
    image:
      "https://image.tmdb.org/t/p/w600_and_h900_bestv2/TkTPELv4kC3u1lkloush8skOjE.jpg",
    banner:
      "https://image.tmdb.org/t/p/original/hjlvbMKhQm7N8tYynr8yQ8GBmqe.jpg",
    score: "87",
    languages: [
      "en",
      "fr",
      "de",
      "ja",
      "zh",
      "ko",
      "ru",
      "es",
      "it",
      "pt",
      "pl",
      "sv",
    ],
  },
  {
    id: "58611129-2dbc-4a81-a72f-77ddfc1b1b49",
    title: "My Neighbor Totoro",
    description:
      "Two sisters move to the country with their father in order to be closer to their hospitalized mother, and discover the surrounding trees are inhabited by Totoros, magical spirits of the forest. When the youngest runs away from home, the older sister seeks help from the spirits to find her.",
    director: "Hayao Miyazaki",
    releaseDate: "1988",
    runtime: "86",
    image:
      "https://image.tmdb.org/t/p/w600_and_h900_bestv2/rtGDOeG9LzoerkDGZF9dnVeLppL.jpg",
    banner:
      "https://image.tmdb.org/t/p/original/etqr6fOOCXQOgwrQXaKwenTSuzx.jpg",
    score: "93",
    languages: ["en", "ja", "fr", "de", "es", "ko", "zh", "it"],
  },
  {
    id: "dc2e6bd1-8156-4886-adff-b39e6043af0c",
    title: "Spirited Away",
    description:
      "Spirited Away is an Oscar winning Japanese animated film about a ten year old girl who wanders away from her parents along a path that leads to a world ruled by strange and unusual monster-like animals. Her parents have been changed into pigs along with others inside a bathhouse full of these creatures. Will she ever see the world how it once was?",
    director: "Hayao Miyazaki",
    releaseDate: "2001",
    runtime: "124",
    image:
      "https://image.tmdb.org/t/p/w600_and_h900_bestv2/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    banner:
      "https://image.tmdb.org/t/p/original/bSXfU4dwZyBA1vMmXvejdRXBvuF.jpg",
    score: "97",
    languages: [
      "en",
      "es",
      "fr",
      "de",
      "it",
      "pt",
      "ja",
      "zh",
      "ko",
      "ru",
      "ar",
      "hi",
      "nl",
      "pl",
      "sv",
      "tr",
      "vi",
      "th",
      "id",
      "uk",
    ],
  },
  {
    id: "0440483e-ca0e-4120-8c50-4c8cd9b965d6",
    title: "Princess Mononoke",
    description:
      "Ashitaka, a prince of the disappearing Ainu tribe, is cursed by a demonized boar god and must journey to the west to find a cure. Along the way, he encounters San, a young human woman fighting to protect the forest, and Lady Eboshi, who is trying to destroy it. Ashitaka must find a way to bring balance to this conflict.",
    director: "Hayao Miyazaki",
    releaseDate: "1997",
    runtime: "134",
    image:
      "https://image.tmdb.org/t/p/w600_and_h900_bestv2/jHWmNr7m544fJ8eItsfNk8fs2Ed.jpg",
    banner:
      "https://image.tmdb.org/t/p/original/6pTqSq0zYIWCsucJys8q5L92kUY.jpg",
    score: "92",
    languages: ["en", "ja", "fr", "de", "es", "it", "zh", "ko", "ru", "pt"],
  },
  {
    id: "2baf70d1-42bb-4437-b551-e5fed5a87abe",
    title: "Castle in the Sky",
    description:
      "The orphan Sheeta inherited a mysterious crystal that links her to the mythical sky-kingdom of Laputa. With the help of resourceful Pazu and a rollicking band of sky pirates, she makes her way to the ruins of the once-great civilization. Sheeta and Pazu must outwit the evil Muska, who plans to use Laputa's science to make himself ruler of the world.",
    director: "Hayao Miyazaki",
    releaseDate: "1986",
    runtime: "124",
    image:
      "https://image.tmdb.org/t/p/w600_and_h900_bestv2/npOnzAbLh6VOIu3naU5QaEcTepo.jpg",
    banner:
      "https://image.tmdb.org/t/p/w533_and_h300_bestv2/3cyjYtLWCBE1uvWINHFsFnE8LUK.jpg",
    score: "95",
    languages: ["en", "ja", "fr", "de", "es"],
  },
  {
    id: "758bf02e-3122-46e0-884e-67cf83df1786",
    title: "Ponyo",
    description:
      "The son of a sailor, 5-year old Sosuke lives a quiet life on an oceanside cliff with his mother Lisa. One fateful day, he finds a beautiful goldfish trapped in a bottle on the beach and upon rescuing her, names her Ponyo. But she is no ordinary goldfish. The daughter of a masterful wizard and a sea goddess, Ponyo uses her father's magic to transform herself into a young girl and quickly falls in love with Sosuke, but the use of such powerful sorcery causes a dangerous imbalance in the world. As the moon steadily draws nearer to the earth and Ponyo's father sends the ocean's mighty waves to find his daughter, the two children embark on an adventure of a lifetime to save the world and fulfill Ponyo's dreams of becoming human.",
    director: "Hayao Miyazaki",
    releaseDate: "2008",
    runtime: "100",
    image:
      "https://image.tmdb.org/t/p/w600_and_h900_bestv2/mikKSEdk5kLhflWXbp4S5mmHsDo.jpg",
    banner:
      "https://image.tmdb.org/t/p/original/6a1qZ1qat26mAIK3Lq8iYdGpyHm.jpg",
    score: "92",
    languages: ["en", "ja", "fr", "es", "de", "it", "nl"],
  },
  {
    id: "67405111-37a5-438f-81cc-4666af60c800",
    title: "The Wind Rises",
    description:
      "A lifelong love of flight inspires Japanese aviation engineer Jiro Horikoshi, whose storied career includes the creation of the A-6M World War II fighter plane.",
    director: "Hayao Miyazaki",
    releaseDate: "2013",
    runtime: "126",
    image:
      "https://image.tmdb.org/t/p/w600_and_h900_bestv2/jfwSexzlIzaOgxP9A8bTA6t8YYb.jpg",
    banner:
      "https://image.tmdb.org/t/p/original/stM3jlD4nSJhlvR2DE7XnB0eN25.jpg",
    score: "89",
    languages: ["en", "ja", "fr", "de"],
  },
  {
    id: "12cfb892-aac0-4c5b-94af-521852e46d6a",
    title: "Grave of the Fireflies",
    description:
      "In the latter part of World War II, a boy and his sister, orphaned when their mother is killed in the firebombing of Tokyo, are left to survive on their own in what remains of civilian life in Japan. The plot follows this boy and his sister as they do their best to survive in the Japanese countryside, battling hunger, prejudice, and pride in their own quiet, personal battle.",
    director: "Isao Takahata",
    releaseDate: "1988",
    runtime: "89",
    image:
      "https://image.tmdb.org/t/p/w600_and_h900_bestv2/qG3RYlIVpTYclR9TYIsy8p7m7AT.jpg",
    banner:
      "https://image.tmdb.org/t/p/original/vkZSd0Lp8iCVBGpFH9L7LzLusjS.jpg",
    score: "97",
    languages: ["en", "ja", "fr", "de", "es", "it", "ru"],
  },
];
