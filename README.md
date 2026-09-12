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

The site is static, so there is no server to receive a form. Until you paste in an access
key, a submitted request is handed to WhatsApp fully written out and the page says plainly
that **Zenvoy has not received it yet**.

### Setting it up (about three minutes)

1. Go to **[web3forms.com](https://web3forms.com)**, enter the address that should receive
   bookings, and they email you an **access key** (a UUID). No password, no dashboard.
2. Open `assets/js/booking.js` and paste it into the first line of configuration:

   ```js
   var WEB3FORMS_KEY = "your-access-key-here";
   ```

   The key is designed to be public in client-side code, so it is safe in a public repo.
3. Commit, push, and **send yourself a test booking** to prove it works end to end.
4. In your email, add a filter for it: **never send to spam**, apply a `Zenvoy bookings`
   label, and mark it important. A Gmail filter does all three and costs nothing.

Everything above is on the free plan. The form sends only `access_key`, `subject`,
`from_name` and a honeypot field — no paid feature is used, and none is needed.

### Email is the notification, not the booking record

The free plan emails you each request and does not store it. So treat that email as a
**doorbell, not a filing cabinet**: it tells you a request has arrived. The moment you act
on one, put it wherever you actually track bookings — a notebook, a spreadsheet, your phone
calendar. Do not let the inbox be the only place a live booking exists.

Two habits make this safe, both free: the spam filter above, so a request cannot vanish
quietly, and the reference number on every request (`ZV-260912-9TAE`), which gives you and
the customer a shared handle for it.

Roughly 250 submissions a month on the free tier, against Formspree's ~50, and no account to
create. Free tiers change, so check the current numbers when you sign up. If you later want
a service that keeps a dashboard record, put its URL in `CUSTOM_ENDPOINT` and leave
`WEB3FORMS_KEY` empty — nothing else changes.

### What the customer sees, in each case

| Outcome | What the page says |
| --- | --- |
| Submitted successfully | **"Booking request received."** plus the reference, and that the booking is not confirmed until Zenvoy comes back |
| Submission failed (any reason) | **"We could not submit your request."** — states that Zenvoy has *not* received it, offers WhatsApp, and offers a retry that restores the filled-in form |
| No key configured yet | **"Your request is ready to send."** — hands off to WhatsApp |

A failure is never dressed up as a success. That includes the likeliest misconfiguration:
a wrong access key, which returns HTTP 200 with `success: false` and is treated as a failure.

Requests time out after 15 seconds rather than leaving the customer looking at "Sending…",
and a hidden honeypot field drops bot submissions without bothering anyone.

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

## Contact details

Three places carry contact details, and they are generated from constants in the site
tooling, so change them together:

* **Phone** `+234 810 721 7858` — header of the mobile menu, footer, contact page, sticky bar
* **WhatsApp** the same number, in every `wa.me` link
* **Email** `hellozenvoy@gmail.com` — footer, contact page, corporate page, booking page,
  the `noscript` fallback, and the `LocalBusiness` structured data

The email is there mainly for corporate buyers: WhatsApp is blocked on managed laptops in
plenty of Lagos banks, law firms and consultancies, and without an email address those
enquiries simply do not happen. Mailto links carry a subject line so enquiries are easy to
filter: "Zenvoy enquiry", "Zenvoy booking enquiry", "Zenvoy Corporate enquiry".

**Worth upgrading when you can.** A personal Gmail address reads differently to a corporate
buyer than `hello@zenvoymobility.com` does. You already own the domain; when you set up
email on it, find and replace the address across the site and it is done.

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
