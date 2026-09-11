# Imagery

Every photograph on the site is a real photograph of Zenvoy's own vehicle, a white
**Geely Geometry E**, shot in Lagos. No stock photography is used anywhere, and none should be.

## What is in here

| File | Where it appears | Shows |
| --- | --- | --- |
| `geely-geometry-e-hero-tall.jpg` | Homepage hero, 900px and wider | Front three-quarter composed for the tall desktop column: the car fills the frame, the rear runs out of frame, the neighbouring car is out of shot. |
| `geely-geometry-e-hero-wide.jpg` | Homepage hero, phones | The same frame composed wide: the whole car, nose to tail, with the ground under it. |
| `geely-geometry-e-front.jpg` | Homepage electric section | Straight-on front view. |
| `geely-geometry-e-rear-three-quarter.jpg` | Electric page, left | Rear three-quarter, GEOME badge visible. |
| `geely-geometry-e-interior-front.jpg` | **Not used on the site** | Front cabin. Held back until the protective wrapping is off the steering wheel and the car reads as in service. |
| `geely-geometry-e-interior-rear.jpg` | Homepage, "You book Zenvoy, not a driver"; Corporate page | Rear passenger cabin: the passenger's view. The clearest picture of what a customer actually experiences. |
| `geely-geometry-e-rear-seats.jpg` | Electric page, right | Rear bench, second angle. |
| `geely-geometry-e-side.jpg` | Services page | Side detail: door, wheel and QR sticker. Cropped past the photographer's own wing mirror. |
| `geely-geometry-e-street.jpg` | How it works page | On the road in Lagos. |
| `og-cover.jpg` | Link preview on WhatsApp, LinkedIn, X | Typographic card, 1200×630. |
| `apple-touch-icon.png` | Phone home-screen icon | Wordmark on charcoal. |

All photographs are 780–900px wide, JPEG, 60–140 KB, metadata stripped. Cropping for different
screen shapes is done in CSS with `object-fit: cover`, so the images are never distorted. The
hero uses `object-position: 45% 50%` to keep the front of the car in frame on narrow screens.

## Retouching

**Editorial grade (all eight).** A light grade settles the photographs into the site's warm
ivory and charcoal palette instead of leaving them looking like phone pictures placed on the
page: a small warm shift, a slight black lift so shadows land near charcoal rather than pure
black, about 10% desaturation overall and a little more on foliage green, which is the one
colour that fights the olive accent. Daylight, white balance on the car and real colour are all
preserved — the car is still white, the sky is still overcast.

**Depth of field (the five exteriors).** the vehicle is
untouched and fully sharp, and the environment is progressively softened — lightly just behind
the car, more for distant trees, buildings, signage, utility wires and surrounding vehicles, and
mildly again in the foreground. Maximum blur radius is 5px on a 900px-wide frame, which reads as
a wide aperture rather than a cut-out: the fence, the buildings and the Lagos context all stay
legible.

The number plate (MUS-616JW) is blurred in all three photographs where it is legible — the
hero, the straight front and the rear three-quarter. The blur is tight to the plate itself and
soft-edged, so it reads as defocus rather than a pasted patch. It is not legible in the side or
street photographs, which are untouched in that respect.

Nothing about the vehicle itself was altered — no change to shape, colour, wheels, trim,
badging or proportions, no added logos, text, props or people, and no background replacement.
Natural daylight, shadows and reflections are as shot. The **three interior** photographs are
completely untouched: there is no background to separate inside a car, and blurring anything
there would mean blurring the vehicle.

**Cropping is part of the art direction, and never changes the vehicle.** The hero crops away a
third-party advertising banner above the car, the empty apron below it and the neighbouring
parked car; the rear three-quarter is tightened to drop sky; the side shot is cropped past the
photographer's own wing mirror, which was the one element on the site that gave away a picture
taken from a moving car. If you ever need the untouched originals, they are the
files you supplied — keep a copy outside the repository, since what is committed here is the
retouched version.

## Adding photographs later

**Category imagery: what is real and what is representative.**

| Tile | File | Status |
| --- | --- | --- |
| Electric | `category-electric.jpg` | The actual car. Captioned "Geely Geometry E · the actual car". |
| Executive sedans | `category-executive-sedan.jpg` | Stock. Captioned "Representative · Camry, Accord or similar". |
| SUVs | `category-suv.jpg` | Stock. Captioned "Representative · Highlander, Prado or similar". |
| Premium | — | No image yet. The tile reserves the space so the row keeps one baseline. |

The captions and the sentence under the grid are **generated, not typed into each page**: add or
remove a category image and the wording follows automatically. Never use a picture of the Geely
to stand in for a Camry or a Prado.

⚠️ **The two stock images need replacing before any paid promotion.** They appear to be
manufacturer or motoring-press photographs rather than royalty-free stock, which is a copyright
exposure on a commercial site. Swap them for Unsplash or Pexels equivalents (both licences allow
commercial use with no attribution) when there is a spare ten minutes. The sedan image is also
only 499px wide, which is soft on a high-density screen.

### Adding the three category photographs

The page already supports them. Drop the files in and set four values — nothing else changes.

1. Save the files here as:

   * `category-executive-sedan.jpg`
   * `category-suv.jpg`
   * `category-premium.jpg`

   Landscape, 3:2, 1200×800 or thereabouts, exported at quality ~80 and under 200 KB.

2. In the site generator, set `image` on all four entries of `VEHICLES` — including the
   electric one, which uses `geely-geometry-e-hero-wide.jpg`. Set them **together**: the tiles
   render as text until every category has a photograph, because one photographed tile beside
   three text tiles reads as a mistake rather than a decision.

3. Run the images through the same editorial grade as the Geely photographs
   (`grade()` in the build tooling). Ungraded stock will sit noticeably cooler and glossier
   than the real car and will give itself away immediately.

Each category image then carries a caption — "Representative · Camry, Accord or similar" — and a
sentence appears under the grid automatically: *"Photographs of sedans, SUVs and premium
vehicles show the category rather than a specific car: the exact vehicle is confirmed with your
booking."* Both are generated, so the honesty cannot be lost by editing one file and forgetting
another.

### Choosing the stock images

* **Licence:** Unsplash and Pexels both permit commercial use with no attribution. Prefer those.
  Avoid Wikimedia Commons unless you are willing to carry the CC-BY attribution, and never
  right-click an image out of a Google search — those are somebody's copyright.
* **Search terms that work:** "Toyota Camry exterior", "executive sedan black", "Toyota
  Highlander SUV", "Land Cruiser Prado", "black SUV city street".
* **Choose photographs that could plausibly be Lagos.** Daylight, ordinary street or forecourt,
  no snow, no alpine passes, no European plaza.
* **Avoid:** dealership branding, showroom floors, another company's logo or livery, visible
  number plates, heavy colour grading, motion-blur advertising shots, and anything with a
  driver or passenger in it (a stock person implies a Zenvoy chauffeur who does not exist).
* Match the Geely's restraint: a clean three-quarter of a parked car beats a dramatic
  advertisement every time.

## Shooting notes

* Daylight, no heavy filters. Calm and real beats glossy.
* Vertical (portrait) frames. The layout is built for 3:4 images.
* Keep other businesses' signage and phone numbers out of frame.
* Get written permission from anyone recognisable in a photo, chauffeurs included.
* Export JPEG, quality ~80, longest edge 1600px or less, under 250 KB.
## Next shoot — agreed shot list

In priority order:

1. Chauffeur standing beside the vehicle, and opening it
2. Chauffeur receiving a passenger at the vehicle
3. Passenger entering the rear seat
4. Chauffeur opening the rear passenger door
5. Clean exterior three-quarter in a polished Lagos setting
6. Clean rear passenger interior
7. Dashboard and front cabin with all protective wrapping removed

Natural, professional, understated. No staged luxury clichés.
