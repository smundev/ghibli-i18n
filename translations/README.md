# Translations (source assets)

> **PLACEHOLDER — source material only.** These Markdown files ship with the
> repository as translation source assets. They are **not** imported or read by
> any application code. English is the only language the app currently serves.

These documents are raw source material for translating the application. **No
application code imports or reads them** — the app serves English only.

## Structure

- `site/<lang>.md` — general, static site copy. Provided for **all 20 languages**.
- `films/<film-slug>/<lang>.md` — per-film copy, present only for the languages
  that film supports.

## Supported languages (20)

`en` English · `es` Spanish · `fr` French · `de` German · `it` Italian · `pt` Portuguese · `ja` Japanese · `zh` Chinese · `ko` Korean · `ru` Russian · `ar` Arabic · `hi` Hindi · `nl` Dutch · `pl` Polish · `sv` Swedish · `tr` Turkish · `vi` Vietnamese · `th` Thai · `id` Indonesian · `uk` Ukrainian

## Per-film coverage

Coverage is intentionally uneven and matches each film's `languages` field in the
backend seed (`packages/backend/src/schemaModules/film/films.data.ts`).

| Film | Slug | # Languages | Languages |
| ---- | ---- | ----------- | --------- |
| Porco Rosso | `porco-rosso` | 1 | en |
| Kiki's Delivery Service | `kikis-delivery-service` | 8 | en, es, fr, de, it, pt, ja, nl |
| Howl's Moving Castle | `howls-moving-castle` | 12 | en, fr, de, ja, zh, ko, ru, es, it, pt, pl, sv |
| My Neighbor Totoro | `my-neighbor-totoro` | 8 | en, ja, fr, de, es, ko, zh, it |
| Spirited Away | `spirited-away` | 20 | en, es, fr, de, it, pt, ja, zh, ko, ru, ar, hi, nl, pl, sv, tr, vi, th, id, uk |
| Princess Mononoke | `princess-mononoke` | 10 | en, ja, fr, de, es, it, zh, ko, ru, pt |
| Castle in the Sky | `castle-in-the-sky` | 5 | en, ja, fr, de, es |
| Ponyo | `ponyo` | 7 | en, ja, fr, es, de, it, nl |
| The Wind Rises | `the-wind-rises` | 4 | en, ja, fr, de |
| Grave of the Fireflies | `grave-of-the-fireflies` | 7 | en, ja, fr, de, es, it, ru |
