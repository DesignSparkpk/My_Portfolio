# Bella's — Demo Website

Demo website for **Bella's**, a family restaurant in Darvesh, Haripur, made for pitching to the owner.
It's plain HTML, CSS and JavaScript with no build step, so it works on any static host
(GitHub Pages, Netlify, Cloudflare Pages) and opens straight from the folder.

## What's inside

| Feature | Notes |
|---|---|
| Hero with the restaurant's own moon-wall photo | Live "Open now / Closed" badge in Pakistan time (9 AM – 2 AM) |
| Menu with category tabs and search | Search tolerates typos, so "nutela" still finds Nutella. Pizza sizes, Popular/Spicy/Signature tags, sold-out state |
| WhatsApp ordering cart | Customers add items and pick Delivery, Pickup or Dine-in. The order arrives as a ready-made WhatsApp message to 0336 1131166, with no Foodpanda commission |
| Table booking form | Sends name, date, time, guests and occasion to WhatsApp |
| Mobile quick bar | Call, Directions and WhatsApp/Order buttons stay at the bottom of the screen |
| Google rating card | Shows 4.6★ from 1,105 reviews and links to the Google Maps listing |

## Editing the menu, prices and hours

Everything lives in **`js/menu-data.js`**:

- Change a price: edit the number.
- Mark something sold out: `available: false`.
- Add a dish: copy an existing `{ ... }` block and change it.
- Phone, WhatsApp number, hours and rating are under `business`.

Items marked `[MENU CARD]` were read from Bella's printed menu. Items marked `[ESTIMATE]` are placeholders,
so **confirm them with the restaurant** before the site goes live.

## Before going live

1. Replace the `[ESTIMATE]` prices and descriptions with the real menu.
2. Ask the owner for their logo file and a few high-resolution food and interior photos.
3. In `index.html`, delete the `<meta name="robots" content="noindex, nofollow">` line so Google can index the site.
4. Optional: add an `og:image` with the full live URL so WhatsApp link previews show a picture.

## Credits

Fonts are Inter, Playfair Display and Kaushan Script (SIL OFL 1.1, see `assets/fonts/LICENSE-OFL.txt`).
Icons are Lucide (ISC) and Simple Icons (CC0).
