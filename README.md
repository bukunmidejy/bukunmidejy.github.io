# Zenvoy Mobility — website

A hand-built static site. No framework, no build step, no dependencies: plain HTML,
one stylesheet, one small JavaScript file, self-hosted fonts. Hosted on GitHub Pages.

```
/                      index.html            Home
/services/             index.html            Services
/electric/             index.html            Electric
/corporate/            index.html            Zenvoy Corporate
/how-it-works/         index.html            How it works
/faq/                  index.html            FAQ (+ FAQ structured data)
/contact/              index.html            Contact / book
404.html                                     Not-found page
assets/css/zenvoy.css                        All styling (tokens at the top)
assets/js/zenvoy.js                          Menu, sticky booking bar, reveal-on-scroll
assets/fonts/                                Self-hosted, subset Source Serif 4 + Inter (~65 KB total)
assets/img/                                  Imagery — see assets/img/README.md
favicon.svg, favicon.png, sitemap.xml, robots.txt
```

## Editing content

Each page is a single readable HTML file. Change the words in the file, commit, push —
GitHub Pages redeploys within a minute or two.

The header, footer and sticky booking bar are repeated in each page file. If you change
one of them, change it in all eight files (search for `<header class="site-header">`,
`<footer class="site-footer">`, `sticky-cta`).

## Changing the WhatsApp number or the pre-filled messages

Every booking button is a `https://wa.me/...` link with the message URL-encoded into it.

* **Number:** find and replace `2348107217858` across all `.html` files, and
  `+234 810 721 7858` / `tel:+2348107217858` for the display and call links.
* **Message text:** the encoded text after `?text=` . `%0A` is a line break, `%20` a
  space, `%3A` a colon. Easiest way to rewrite one: open
  <https://wa.me/2348107217858?text=> in a browser, type the message you want, and copy
  the resulting URL — or ask a developer to regenerate them.

Current messages:

| Used by | Asks for |
| --- | --- |
| Book a ride / Book on WhatsApp | Name, date, pickup time, pickup location, duration, passengers, vehicle preference, destination, special requirements |
| Book the electric | Same, with vehicle preference pre-set to Electric |
| Airport transfer | Same, plus airport/terminal and flight number |
| Events | Same, plus event type and venue |
| Corporate enquiry | Company, contact person, role, phone/email, needs, booking frequency |

## Replacing the images

See `assets/img/README.md`. Keep the file names identical and nothing else needs editing.

## Prices

Electric rates appear in two places: `/electric/index.html` (full table) and
`index.html` (homepage preview). The launch-offer line appears in the black announcement
bar at the top of every page — search for `Launch offer` to remove or change it when the
first five bookings are gone.

## SEO

Titles, meta descriptions, Open Graph tags, canonical URLs and JSON-LD structured data
are set per page in the `<head>`. `sitemap.xml` lists all seven pages.

**Before launch:** if you move to a custom domain (e.g. `zenvoy.ng`), find and replace
`https://bukunmidejy.github.io` across all `.html` files, `sitemap.xml` and `robots.txt`,
then add a `CNAME` file containing the bare domain and point the DNS at GitHub Pages.

## Local preview

```sh
python3 -m http.server 8000     # then open http://localhost:8000
```

## Legacy files

`cv.html`, `cv.css`, `Gold.html`, `form.html`, `form.js`, `FORM.css` are the previous
contents of this repository (a personal CV page), kept so nothing was lost. They are
excluded from search engines in `robots.txt` and can be deleted at any time.
