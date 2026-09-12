# Zenvoy Mobility — website

On-demand chauffeur service, Lagos. A hand-built static site. No framework, no build step, no dependencies: plain HTML,
one stylesheet, one small JavaScript file, self-hosted fonts. Hosted on GitHub Pages.

```
/                      index.html            Home
/services/             index.html            Services
/electric/             index.html            Electric
/corporate/            index.html            Zenvoy Corporate
/how-it-works/         index.html            How it works
/faq/                  index.html            FAQ (+ FAQ structured data)
/book/                 index.html            Booking request form  ← primary conversion path
/contact/              index.html            Contact
404.html                                     Not-found page
assets/css/zenvoy.css                        All styling (tokens at the top)
assets/js/zenvoy.js                          Menu, sticky booking bar, reveal-on-scroll
assets/js/booking.js                         The booking request form — READ THE TOP OF THIS FILE
assets/fonts/                                Self-hosted, subset Source Serif 4 + Inter (~65 KB total)
assets/img/                                  Photographs of the Geely Geometry E — see assets/img/README.md
favicon.svg, favicon.png, sitemap.xml, robots.txt
```

## Editing content

Each page is a single readable HTML file. Change the words in the file, commit, push —
GitHub Pages redeploys within a minute or two.

The header, footer and sticky booking bar are repeated in each page file. If you change
one of them, change it in all nine files (search for `<header class="site-header">`,
`<footer class="site-footer">`, `sticky-cta`).

## Where booking requests go — the one thing to set up

The site is static, so there is no server to receive a form. Until you configure an
endpoint, a submitted request is handed to WhatsApp fully written out, and the page says
plainly that **Zenvoy has not received it yet** until the customer presses send.

To take requests on the site instead:

1. Create a free form endpoint at [formspree.io](https://formspree.io),
   [web3forms.com](https://web3forms.com), basin or getform. It takes a few minutes and
   they email you each submission.
2. Open `assets/js/booking.js` and paste the URL into the first line of configuration:

   ```js
   var ENDPOINT = "https://formspree.io/f/xxxxxxx";
   ```

3. That is the whole change. The form then POSTs the request as JSON and the customer sees
   "Request received" instead of the WhatsApp hand-off.

Test it once with a real submission before you rely on it. If the POST fails for any
reason, the form falls back to the WhatsApp hand-off rather than losing the request.

**This is a request-to-confirm flow, not instant booking.** Nothing on the site checks live
availability, assigns a vehicle or takes payment. Every request gets a reference number
(`ZV-260912-4KPQ`), and the copy says throughout that the booking is confirmed only when
Zenvoy confirms availability and the final price.

## Changing the WhatsApp number or the pre-filled messages

Every booking button is a `https://wa.me/...` link with the message URL-encoded into it.

* **Number:** find and replace `2348107217858` across all `.html` files, and
  `+234 810 721 7858` / `tel:+2348107217858` for the display and call links.
* **Message text:** the encoded text after `?text=` . `%0A` is a line break, `%20` a
  space, `%3A` a colon. Easiest way to rewrite one: open
  <https://wa.me/2348107217858?text=> in a browser, type the message you want, and copy
  the resulting URL — or ask a developer to regenerate them.

Current messages:

WhatsApp is now the secondary route — "Prefer to speak with us? WhatsApp Zenvoy." The
pre-filled messages below still apply to those buttons, and to the hand-off at the end of
the booking form.

| Used by | Asks for |
| --- | --- |
| Book a Car / Book on WhatsApp | Name, when the car is needed (now / later today / a date), pickup time, pickup location, how long, passengers, vehicle preference, destination, special requirements |
| Book the electric | Same, with vehicle preference set to Electric |
| Airport transfer | Same, plus airport/terminal and flight number |
| Meetings / multi-stop day | Same, framed as a day of meetings |
| Events | Same, plus event type and venue |
| Corporate enquiry | Company, contact person, role, phone/email, needs, booking frequency |

## Images

All photography is of Zenvoy's own Geely Geometry E. Other vehicle categories (sedans,
SUVs, premium) are text-led until real photographs of those vehicles exist — see
`assets/img/README.md` before adding any.

## Prices

The booking form shows the published electric rate as an **estimate** once a customer picks
the electric vehicle and a 2/4/8/12-hour duration; everything else reads "Quoted". If you
change the rates, change them in `assets/js/booking.js` (the `PRICES` map) as well as the
two places below, or the form will quote stale prices.

Electric rates appear in two places: `/electric/index.html` (full table) and
`index.html` (homepage preview). The launch-offer line appears in the black announcement
bar at the top of every page — search for `Launch offer` to remove or change it when the
first five bookings are gone.

## SEO

Titles, meta descriptions, Open Graph tags, canonical URLs and JSON-LD structured data
are set per page in the `<head>`. `sitemap.xml` lists all eight pages.

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
