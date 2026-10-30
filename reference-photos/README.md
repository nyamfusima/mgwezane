# Client reference photographs

The four photographs in this folder were supplied by Mgwezane Shuttle Services. They are kept
here as a record of the destinations the business wants to promote (the Mpumalanga escarpment,
the Blyde River Canyon area, and escarpment waterfalls and rock pools).

They are **not** published on the website — this folder sits outside `public/`, so nothing in it
is included in the production build. The website uses higher-resolution licensed photography
instead (see `public/assets/photo-credits.json`).

To publish one of these later, move it into `public/assets/destinations/` and add an entry to
`src/data/destinations.ts`.

## Brand source files

- `mgwezane-business-poster.jpg` — the client's printed poster. The website does not
  display it; its colours set the palette and the vehicle photograph in the About
  section is cropped from it.
- `mgwezane-logo-mark.png` — the crescent-and-otter mark on its own, cut out of the
  logo. `public/favicon.ico`, `public/icon-192.png` and `public/icon-512.png` were
  generated from this file.
