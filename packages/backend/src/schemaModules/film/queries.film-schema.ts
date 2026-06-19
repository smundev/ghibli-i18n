import { getRequestLogger } from "~/loggers";
import { builder } from "~/schema";
import { films } from "~/schemaModules/film/films.data";
import { FilmRef } from "~/schemaModules/film/object-types.film-schema";

builder.queryField("films", (t) =>
  t.field({
    type: [FilmRef],
    nullable: false,
    description: "List all Studio Ghibli films.",
    resolve: () => {
      getRequestLogger().info({ count: films.length }, "Fetching all films");

      return films;
    },
  })
);

builder.queryField("film", (t) =>
  t.field({
    type: FilmRef,
    nullable: true,
    description: "Fetch a single Studio Ghibli film by id.",
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: (_root, { id }) => {
      getRequestLogger().info({ id }, "Fetching film by id");

      return films.find((film) => film.id === id) ?? null;
    },
  })
);
