# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Travel Explorer — a single-page travel guide site built with **only HTML, CSS, and JavaScript**. No frameworks, no backend, no build step, no package manager.

## Running

There is nothing to build or install. To view changes, open `index.html` directly in a browser:

```bash
start "" index.html
```

After edits, hard-refresh (`Ctrl+Shift+R`) — there is no cache-busting hook.

There is no test framework, linter, or CI in this repo.

## Architecture

The whole site is three files at the root: `index.html`, `styles.css`, `app.js`. Each section in the HTML is an anchor (`#home`, `#cities`, `#tools`, `#weather`, `#safety`, `#enquiry`), and the nav scrolls between them.

### Data flow

Everything user-visible about destinations is driven by the **`CITIES` array** at the top of `app.js`. It seeds: the featured card, the 12-card grid, the destination dropdowns in the budget calculator and enquiry form, and the modal's full guide content. To add or change a destination, edit only that array — no other files need touching.

On `DOMContentLoaded`, `app.js` runs an init sequence: `renderFeatured`, `renderCityCards`, `populateCitySelects`, then the tool initialisers, then modal + nav + theme. The tools (budget calculator, FX converter, packing checklist, itinerary planner, enquiry form) are all wired by `init*` functions in `app.js`.

### Image loading (failover chain)

Every city in `CITIES` has an `images: [url1, url2, url3]` array, **not** a single URL. The `imgWrap()` helper in `app.js` renders an `<img>` element with `data-sources` (JSON-encoded array) and `data-index="0"`. The global `window.__tryNextImg` handler advances the index on `onerror` and assigns the next URL. If all sources fail, the img is hidden — there is no placeholder. The hero image in `index.html` uses the same pattern with hand-coded `data-sources`.

When swapping images: keep the array shape and the `imgWrap(c.images, ...)` call signature.

### Theming

Light/dark mode is implemented via CSS custom properties scoped under `:root` and `[data-theme="dark"]` in `styles.css`. Every themed surface uses variables (`--bg`, `--ink`, `--card`, `--accent`, etc.) — adding a new surface means adding it to **both** theme blocks.

Theme resolution order on load:
1. An **inline script in `<head>`** of `index.html` sets `data-theme` on `<html>` *before* the stylesheet parses, using `localStorage["travelExplorer.theme"]` or `prefers-color-scheme`. This script prevents flash-of-wrong-theme and must run before `styles.css` is applied — keep it inline and don't move it to `app.js`.
2. `initThemeToggle()` in `app.js` wires the nav button and persists user choice.

### Persistence

All state is in `localStorage` under the `travelExplorer.*` namespace (`enquiries`, `packing`, `itinerary`, `theme`). The packing checklist and itinerary planner both serialize to/from JSON in their `init*` functions. Enquiry submissions are appended (not overwritten) to `travelExplorer.enquiries`.

### Weather widget

`OPENWEATHER_API_KEY` at line ~618 of `app.js` is a placeholder. The `fetchWeather()` function short-circuits with a friendly message when the key is still `"YOUR_API_KEY_HERE"`. Replacing the string is the only step needed to enable live weather — do not move the constant elsewhere.

## Conventions

- All user-supplied or data-driven strings rendered into HTML go through the `esc()` helper.
- Currency formatting goes through `sgd()`.
- Typography uses **Fraunces** (variable serif, `opsz` + `SOFT` axes — used in `font-variation-settings` on display elements) for headings and **Inter** for UI.
- The logo is inline SVG inside `.brand` (nav and footer) — uses `currentColor` so it auto-themes.
