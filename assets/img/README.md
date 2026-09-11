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

**Other vehicle categories are deliberately text-led.** Executive sedans, SUVs and premium
vehicles appear as text on the homepage and services page, with no imagery, because Zenvoy has
no approved photographs of those vehicles yet. Do not fill those slots with stock photography or
with pictures of the Geely: that would imply a Camry or a Prado is pictured when it is not.

When you photograph an actual sedan or SUV that Zenvoy can arrange:

1. Save it here as `toyota-camry-exterior.jpg`, `toyota-prado-exterior.jpg` and so on.
2. Add it to the matching tile in the "Choose the vehicle you need" grid.
3. Write `alt` text describing that specific car, and caption it so nobody mistakes it for
   part of an owned fleet — for example "Arranged through a Zenvoy vehicle partner."

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
