import { getRequestLogger } from "~/loggers";
import { builder } from "~/schema";

builder.queryField("films", (t) =>
  t.prismaField({
    type: ["Film"],
    nullable: false,
    description: "List all Studio Ghibli films.",
    resolve: (query, _root, _args, { prisma }) => {
      getRequestLogger().info("Fetching all films");

      return prisma.film.findMany({ ...query, orderBy: { title: "asc" } });
    },
  })
);

builder.queryField("film", (t) =>
  t.prismaField({
    type: "Film",
    nullable: true,
    description: "Fetch a single Studio Ghibli film by id.",
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: (query, _root, { id }, { prisma }) => {
      getRequestLogger().info({ id }, "Fetching film by id");

      return prisma.film.findUnique({ ...query, where: { id: String(id) } });
    },
  })
);
