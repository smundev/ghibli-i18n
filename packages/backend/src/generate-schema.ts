import { writeFileSync } from "node:fs";
import path from "node:path";
import { lexicographicSortSchema, printSchema } from "graphql";

/**
 * Emits the GraphQL SDL to `schema.graphql` at the backend package root so the
 * frontend's codegen can read a static schema without booting the server.
 * Run via `pnpm generate:schema`; the output is committed.
 */
async function generateSchema() {
  await import("~/schemaModules");
  const { builder } = await import("~/schema");

  const sdl = printSchema(lexicographicSortSchema(builder.toSchema()));
  const outputPath = path.resolve(import.meta.dirname, "..", "schema.graphql");

  writeFileSync(outputPath, `${sdl}\n`);

  console.log(`Wrote ${outputPath}`);
}

generateSchema().catch((error) => {
  console.error(error);
  process.exit(1);
});
