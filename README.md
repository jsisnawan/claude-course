# Travel Explorer

> We went, so you know where to go.

A stylish, editorial-magazine-style single-page travel discovery site. 12 curated Asia-Pacific city guides, interactive travel tools, and a polished light/dark experience — built with **only HTML, CSS, and JavaScript**. No frameworks, no build step, no backend.

## Features

- **12 curated city guides** — Seoul, Singapore, Bali, Tokyo, Bangkok, Hong Kong, Kuala Lumpur, Maldives, Phuket & Krabi, Sydney, Taipei, Hanoi. Each guide opens in a modal with a 3-day itinerary, food picks, transport tips, cost breakdown, safety notes, and best photo spots.
- **Trip budget calculator** — pick a destination, adjust travellers / days / daily budget, see live total in SGD.
- **Currency converter** — SGD against 10 currencies with editable static rates.
- **Packing checklist** — five categories of essentials; ticks persist across reloads.
- **Itinerary planner** — add activities by day and time, sorted automatically, removable, persistent.
- **Weather widget** — OpenWeather API stub. Drop in an API key to enable live data.
- **Enquiry form** — full validation, submissions stored in `localStorage`.
- **Light / dark mode** — toggle in the nav. Respects system preference on first visit, then remembers your choice.
- **Modern hero animations** — Ken Burns zoom, word-by-word headline reveal, staggered content fade-in, floating scroll indicator. Honours `prefers-reduced-motion`.
- **Image failover chain** — every destination has multiple Unsplash candidate URLs; broken images automatically cycle to the next.
- **Mobile-friendly** — responsive layout with a hamburger menu under 720px.

## Running

No install, no build. Just open `index.html`:

```bash
# Windows
start "" index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

## Project layout

```
.
├── index.html      Markup for every section + modal
├── styles.css      All styling, both themes, animations
├── app.js          Data + all interactivity
├── CLAUDE.md       Architecture notes for AI assistants
└── README.md
```

That's it. Three files do the whole job.

## Customisation

**Add or edit a destination** — open `app.js` and modify the `CITIES` array. Every entry drives the city card, modal guide, dropdowns, and budget calculator at once.

**Enable live weather** — set `OPENWEATHER_API_KEY` near the top of the weather section in `app.js`. Get a free key at <https://openweathermap.org/api>.

**Tweak the theme** — colour tokens are defined as CSS variables under `:root` and `[data-theme="dark"]` in `styles.css`. Change once, applies everywhere.

**Swap the hero image** — edit the `data-sources` JSON array on the `<img>` inside `.hero-bg` in `index.html`. The first URL that loads wins.

## Tech notes

- Typography: [Fraunces](https://fonts.google.com/specimen/Fraunces) (variable serif, with `opsz` + `SOFT` axes) and [Inter](https://fonts.google.com/specimen/Inter).
- Brand logo: inline SVG compass rose, themed via `currentColor`.
- All persistent state lives under the `travelExplorer.*` namespace in `localStorage` (`enquiries`, `packing`, `itinerary`, `theme`).
- Theme is applied via an inline script in `<head>` *before* the stylesheet parses — no flash of wrong theme on load.

## Credits

Imagery from [Unsplash](https://unsplash.com). Fonts from [Google Fonts](https://fonts.google.com).

## License

Personal / educational project — see this repository's settings for license details.
