# Studio Ghibli — Internationalization Take-Home

## The setup

We have a small Studio Ghibli web app. Right now it's English only: a welcome page, and a movies screen that fetches film details from a GraphQL backend.

We're adding internationalization. The site itself should support **20 languages**. Each **movie** supports only a **subset** of those 20 — the languages we actually have translations for. Coverage is uneven: some films have many languages, some have few, one is English only.

## The ask

Make the app i18n-ready as a **full-stack** exercise — backend through frontend.

Translations are provided as Markdown under `/translations`: a general set for the site UI in all 20 languages, and a per-film set covering each film in the languages it supports.

A few things to keep in mind:

- Only render the translations you've been given. Don't set up every movie with all 20 languages — render what each film actually has.
- How you get the translations into the backend, structure them, and handle a film that lacks a requested language is up to you.

This is intentionally open-ended. There's no single right answer — we're interested in the judgment calls you make.

## What to hand back

Fork this repository, do your work in the fork, and share it with us. Your fork should include:

- The working i18n version of the app.
- A brief explanation of the decisions you made and why.
- **Setup and run instructions in the README** — everything needed to run the full i18n version of the app from a clean checkout.
