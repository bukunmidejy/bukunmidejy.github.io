# Imagery

Every image in `assets/img/` is currently a **placeholder** — a plain toned plate, not a
photograph. They are sized and cropped exactly like the real photographs should be, so
replacing them is a drag-and-drop job: **keep the file name, keep roughly the aspect
ratio, and no code needs to change.**

| File | Where it appears | Ratio / size | What the photograph should show |
| --- | --- | --- | --- |
| `hero-chauffeur-lagos.jpg` | Homepage hero (the first thing anyone sees) | 4:5 · 1000×1250 | The strongest image you own. A chauffeur at the rear door of a clean vehicle, or a vehicle waiting outside a recognisable Lagos building. Shoot vertical; it is cropped to 4:3 on phones. |
| `rear-seat-interior.jpg` | Homepage, "A service, not a car with a stranger in it" | 3:4 · 900×1200 | Rear cabin, doors closed, clean and prepared — the passenger's view. |
| `electric-vehicle.jpg` | Homepage electric section | 3:4 · 1000×1000+ | The electric vehicle, three-quarter view, daylight. |
| `electric-vehicle-wide.jpg` | Electric page banner | 16:9 · 1600×900 | The electric vehicle in context — street, driveway or hotel forecourt. |
| `corporate-executive-transport.jpg` | Corporate page | 3:4 · 900×1200 | An executive being received at a car, or a chauffeur holding a door outside an office. |
| `lagos-business-day.jpg` | Services page | 3:4 · 900×1200 | The vehicle waiting between meetings; Lagos visible but not chaotic. |
| `chauffeur-standing.jpg` | How it works page | 3:4 · 900×1200 | A chauffeur, presentable, beside the vehicle. Faces are fine with consent. |
| `og-cover.jpg` | The preview card when the link is shared on WhatsApp, LinkedIn, X | 1200×630 exactly | Currently a typographic card that reads well at small sizes. Replace only with something equally legible — this is what people see in WhatsApp. |
| `apple-touch-icon.png` | Phone home-screen icon | 180×180 | Logo mark on a dark ground. |

## Shooting notes

* Daylight, no heavy filters. Calm and real beats glossy.
* Keep number plates either clean or deliberately out of frame.
* Get written permission from anyone recognisable in a photo, chauffeurs included.
* Vertical (portrait) frames for everything except `electric-vehicle-wide.jpg` and `og-cover.jpg`.

## Before uploading

* Export JPEG, quality ~80, **longest edge no more than 1600px**.
* Aim for under 250 KB per file. Large photographs are the fastest way to make the
  site feel slow on Nigerian mobile data.
* Update the `alt=""` text in the HTML if a photo shows something different from the
  description already there — it is read aloud by screen readers and used by Google.
