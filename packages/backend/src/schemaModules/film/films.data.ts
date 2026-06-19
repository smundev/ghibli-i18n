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
  /** Short, one-line tagline. */
  tagline: string;
  title: string;
  /** A few short pieces of trivia about the film. */
  trivia: string[];
}

export const films: Film[] = [
  {
    id: "ebbb6b7c-945c-41ee-a792-de0e43191bd8",
    title: "Porco Rosso",
    description:
      "Porco Rosso, known in Japan as Crimson Pig (Kurenai no Buta) is the sixth animated film by Hayao Miyazaki and released in 1992. You're introduced to an Italian World War I fighter ace, now living as a freelance bounty hunter chasing 'air pirates' in the Adriatic Sea. He has been given a curse that changed his head to that of a pig. Once called Marco Pagot, he is now known to the world as 'Porco Rosso', Italian for 'Red Pig.'",
    tagline: "A bounty-hunting flying ace who happens to be a pig.",
    trivia: [
      "Adapted from Miyazaki's own manga, Hikotei Jidai (The Age of the Flying Boat).",
      "Began life as a short in-flight film for Japan Airlines before growing into a feature.",
      "The title is Italian for “Crimson Pig.”",
    ],
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
    tagline: "A young witch finds her place in the world.",
    trivia: [
      "Adapted from Eiko Kadono's 1985 children's novel.",
      "The seaside town Koriko was inspired by Stockholm and Visby in Sweden.",
      "Kiki's black cat Jiji is one of Ghibli's best-loved sidekicks.",
    ],
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
    tagline: "A cursed girl, a wandering wizard, and a walking castle.",
    trivia: [
      "Adapted from the 1986 novel by British author Diana Wynne Jones.",
      "Christian Bale voices Howl in the English-language dub.",
      "Its anti-war themes were shaped by Miyazaki's opposition to the Iraq War.",
    ],
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
    tagline: "Two sisters meet the magical spirits of the forest.",
    trivia: [
      "Totoro became Studio Ghibli's mascot and appears in its logo.",
      "Released in 1988 as a double feature with Grave of the Fireflies.",
      "The Catbus is among the most iconic creatures in Japanese animation.",
    ],
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
    tagline: "Lost in a world of spirits, a girl must find her way home.",
    trivia: [
      "Won the Academy Award for Best Animated Feature in 2003.",
      "Became the highest-grossing film in Japanese history at the time of release.",
      "Miyazaki conceived it for the ten-year-old daughters of his friends.",
    ],
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
    tagline: "Caught between the gods of the forest and the people of iron.",
    trivia: [
      "Held the record as Japan's highest-grossing film until Titanic surpassed it.",
      "Neil Gaiman wrote the English-language adaptation script.",
      "Took roughly three years and a then-record budget to complete.",
    ],
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
    tagline: "A floating kingdom and the crystal that holds its secret.",
    trivia: [
      "The first feature film officially produced by Studio Ghibli (1986).",
      "The sky island Laputa takes its name from Jonathan Swift's Gulliver's Travels.",
      "Joe Hisaishi's score helped define the studio's musical identity.",
    ],
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
    tagline: "A goldfish princess who longs to become human.",
    trivia: [
      "Loosely inspired by Hans Christian Andersen's The Little Mermaid.",
      "Animated almost entirely by hand, using around 170,000 drawings.",
      "Miyazaki avoided most CGI to keep a hand-drawn, storybook look.",
    ],
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
    tagline: "A dreamer who designs the planes he loves.",
    trivia: [
      "A fictionalized biography of aircraft engineer Jiro Horikoshi.",
      "Announced as Hayao Miyazaki's retirement film, though he later returned.",
      "Nominated for the Academy Award for Best Animated Feature.",
    ],
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
    tagline: "A brother and sister struggle to survive in wartime Japan.",
    trivia: [
      "Directed by Isao Takahata, based on Akiyuki Nosaka's semi-autobiographical novel.",
      "Released as a double feature with My Neighbor Totoro.",
      "Widely regarded as one of the most powerful anti-war films ever made.",
    ],
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
