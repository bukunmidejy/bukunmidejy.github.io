/* Zenvoy Mobility — booking request form.
 *
 * This is a REQUEST-to-confirm flow, not instant booking. Nothing here checks
 * live availability, assigns a vehicle, or takes payment. The customer completes
 * a structured request; Zenvoy confirms availability and the final price.
 *
 * ---------------------------------------------------------------------------
 * WHERE REQUESTS GO — three minutes of setup, and the site becomes the
 * booking channel rather than a nicer way to write a WhatsApp message.
 *
 * 1. Go to https://web3forms.com, enter the address that should receive
 *    bookings, and they email you an access key (a UUID).
 * 2. Paste it into WEB3FORMS_KEY below. That is the whole setup: the key is
 *    designed to be public in client-side code, so it is safe in a public repo.
 * 3. Send yourself a test booking, and add an email filter so it never lands in
 *    spam. The free plan emails each request and does not store it, so treat
 *    that email as a doorbell, not a filing cabinet: move a booking into
 *    wherever you actually track bookings as soon as you act on it.
 *
 * Everything here works on the free plan. The only fields sent beyond the
 * request itself are access_key, subject, from_name and a honeypot.
 *
 * Prefer a service that keeps a dashboard record (Formspree, Basin, Getform)?
 * Put its URL in CUSTOM_ENDPOINT instead and leave WEB3FORMS_KEY empty.
 *
 * Until one of them is set, the form hands the finished request to WhatsApp and
 * says plainly that Zenvoy has not received it yet. If a submission fails, the
 * customer is told it failed — never that it was received.
 * --------------------------------------------------------------------------- */
(function () {
  "use strict";

  var WEB3FORMS_KEY = "e18d911f-b598-48f7-a0a0-805310834ee4";   // Web3Forms, free plan
  var CUSTOM_ENDPOINT = "";      // <-- or a Formspree/Basin/Getform URL instead
  var WHATSAPP = "2348107217858";
  var TIMEOUT_MS = 15000;

  var ENDPOINT = CUSTOM_ENDPOINT || (WEB3FORMS_KEY ? "https://api.web3forms.com/submit" : "");

  var form = document.getElementById("booking-form");
  if (!form) return;

  var PRICES = { "2": 30000, "4": 55000, "8": 100000, "12": 140000 };
  var VEHICLE_LABEL = {
    electric: "Electric — Geely Geometry E",
    sedan: "Executive sedan",
    suv: "SUV",
    premium: "Premium",
    unsure: "Not sure yet — advise me"
  };

  var $ = function (id) { return document.getElementById(id); };
  var naira = function (n) { return "₦" + n.toLocaleString("en-NG"); };

  /* ---- pre-selection from the link that brought them here ---------------- */
  var params = new URLSearchParams(window.location.search);
  var wanted = (params.get("vehicle") || "").toLowerCase();
  if (VEHICLE_LABEL[wanted]) {
    var radio = form.querySelector('input[name="vehicle"][value="' + wanted + '"]');
    if (radio) radio.checked = true;
  }
  var wantedDuration = params.get("duration");
  if (wantedDuration && $("duration").querySelector('option[value="' + wantedDuration + '"]')) {
    $("duration").value = wantedDuration;
  }
  var wantedService = params.get("service");
  if (wantedService) {
    var note = $("itinerary");
    var seed = { airport: "Airport transfer. ", meetings: "Meetings across Lagos, several stops. ",
                 events: "Event transportation. ", day: "Full day. ", hourly: "" }[wantedService];
    if (seed && !note.value) note.value = seed;
  }

  /* ---- conditional "preferred vehicle" + live estimate ------------------- */
  function currentVehicle() {
    var picked = form.querySelector('input[name="vehicle"]:checked');
    return picked ? picked.value : "";
  }

  function syncVehicleDetail() {
    var v = currentVehicle();
    ["sedan", "suv", "premium"].forEach(function (key) {
      var block = $("pref-" + key);
      if (block) block.hidden = v !== key;
    });
    syncEstimate();
  }

  function syncEstimate() {
    var v = currentVehicle(), d = $("duration").value, box = $("estimate");
    if (v === "electric" && PRICES[d]) {
      box.hidden = false;
      $("estimate-value").textContent = naira(PRICES[d]);
      $("estimate-label").textContent = "Estimated price · " + d + " hours";
      $("estimate-note").textContent =
        "The published rate for the Geely Geometry E. It is an estimate on this request, " +
        "not a confirmed price: Zenvoy confirms availability and the final price before anything is booked.";
    } else if (v && v !== "electric") {
      box.hidden = false;
      $("estimate-value").textContent = "Quoted";
      $("estimate-label").textContent = "Price";
      $("estimate-note").textContent =
        "Sedans, SUVs and premium vehicles are quoted per booking. Zenvoy comes back with the " +
        "price once availability is confirmed, before anything is booked.";
    } else {
      box.hidden = true;
    }
  }

  form.querySelectorAll('input[name="vehicle"]').forEach(function (el) {
    el.addEventListener("change", syncVehicleDetail);
  });
  $("duration").addEventListener("change", syncEstimate);
  syncVehicleDetail();

  /* ---- reference number -------------------------------------------------- */
  function reference() {
    var d = new Date(), p = function (n) { return String(n).padStart(2, "0"); };
    var alphabet = "ACDEFGHJKLMNPQRTUVWXY34679", tail = "";   // no 0/O/1/I/S/5/B/8
    var rand = window.crypto && window.crypto.getRandomValues
      ? window.crypto.getRandomValues(new Uint32Array(4))
      : [Date.now(), Math.random() * 1e9, Math.random() * 1e9, Math.random() * 1e9];
    for (var i = 0; i < 4; i++) tail += alphabet[Math.floor(rand[i]) % alphabet.length];
    return "ZV-" + String(d.getFullYear()).slice(2) + p(d.getMonth() + 1) + p(d.getDate()) + "-" + tail;
  }

  /* ---- collect + validate ------------------------------------------------ */
  function clearErrors() {
    form.querySelectorAll(".field--error").forEach(function (f) { f.classList.remove("field--error"); });
    form.querySelectorAll(".field__error").forEach(function (e) { e.remove(); });
    var banner = form.querySelector(".form-error");
    if (banner) banner.remove();
  }

  function fail(el, message) {
    var field = el.closest(".field") || el.parentNode;
    field.classList.add("field--error");
    var msg = document.createElement("span");
    msg.className = "field__error";
    msg.textContent = message;
    field.appendChild(msg);
    el.setAttribute("aria-invalid", "true");
  }

  function collect() {
    clearErrors();
    var problems = [], v = currentVehicle();

    if (!v) {
      var group = $("vehicle-group");
      group.classList.add("field--error");
      var m = document.createElement("span");
      m.className = "field__error";
      m.textContent = "Choose a vehicle, or pick “Not sure yet”.";
      group.appendChild(m);
      problems.push(group);
    }
    [["date", "Tell us which day you need the car."],
     ["time", "Tell us what time the pickup should be."],
     ["pickup", "We need a pickup location."],
     ["name", "Tell us your name."],
     ["phone", "We need a phone number to confirm your booking."]].forEach(function (pair) {
      var el = $(pair[0]);
      if (!el.value.trim()) { fail(el, pair[1]); problems.push(el); }
    });

    var phone = $("phone");
    if (phone.value.trim() && phone.value.replace(/[^0-9]/g, "").length < 7) {
      fail(phone, "That does not look like a complete phone number.");
      problems.push(phone);
    }
    var email = $("email");
    if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      fail(email, "Check the email address.");
      problems.push(email);
    }

    if (problems.length) {
      var banner = document.createElement("p");
      banner.className = "form-error";
      banner.setAttribute("role", "alert");
      banner.textContent = problems.length === 1
        ? "One thing needs your attention before we can send this."
        : problems.length + " things need your attention before we can send this.";
      form.insertBefore(banner, form.firstChild);
      problems[0].focus({ preventScroll: true });
      problems[0].scrollIntoView({ behavior: "smooth", block: "center" });
      return null;
    }

    var pref = "";
    if (v === "sedan" || v === "suv") {
      var sel = $("pref-" + v + "-select");
      pref = sel ? sel.value : "";
    } else if (v === "premium") {
      pref = $("pref-premium-text").value.trim();
    }
    var d = $("duration").value;

    return {
      reference: reference(),
      vehicle: VEHICLE_LABEL[v] || v,
      preferred_vehicle: pref,
      date: $("date").value,
      pickup_time: $("time").value,
      duration: d ? (PRICES[d] ? d + " hours" : d) : "",
      estimated_price: v === "electric" && PRICES[d] ? naira(PRICES[d]) + " (estimate, subject to confirmation)"
                                                     : "Quoted on confirmation",
      pickup_location: $("pickup").value.trim(),
      itinerary: $("itinerary").value.trim(),
      passengers: $("passengers").value,
      name: $("name").value.trim(),
      phone: $("phone").value.trim(),
      email: $("email").value.trim(),
      company: $("company").value.trim(),
      requirements: $("requirements").value.trim(),
      submitted: new Date().toISOString()
    };
  }

  function asText(r) {
    var lines = [
      "ZENVOY BOOKING REQUEST",
      "Reference: " + r.reference,
      "",
      "Vehicle: " + r.vehicle + (r.preferred_vehicle ? " (" + r.preferred_vehicle + ")" : ""),
      "Date: " + r.date,
      "Pickup time: " + r.pickup_time,
      "Duration: " + (r.duration || "not specified"),
      "Price: " + r.estimated_price,
      "Pickup: " + r.pickup_location,
      "Destination / itinerary: " + (r.itinerary || "—"),
      "Passengers: " + (r.passengers || "—"),
      "",
      "Name: " + r.name,
      "Phone: " + r.phone
    ];
    if (r.email) lines.push("Email: " + r.email);
    if (r.company) lines.push("Company: " + r.company);
    if (r.requirements) lines.push("", "Special requirements: " + r.requirements);
    return lines.join("\n");
  }

  /* ---- confirmation ------------------------------------------------------
     Three outcomes, and they are never blurred together:
       sent          the endpoint accepted it — "Booking request received"
       failed        the endpoint was tried and did not accept it — say so
       unconfigured  no endpoint set up yet — hand off to WhatsApp
     A failure must never read as a success: a customer who thinks Zenvoy has
     their booking, when Zenvoy does not, is the worst outcome this page has. */
  function show(r, state) {
    var panel = $("booking-result");
    var rows = [
      ["Vehicle", r.vehicle + (r.preferred_vehicle ? "\n" + r.preferred_vehicle : "")],
      ["Date", r.date],
      ["Pickup", r.pickup_time + "\n" + r.pickup_location],
      ["Duration", r.duration || "Not specified"],
      ["Price", r.estimated_price],
      ["Contact", r.name + "\n" + r.phone]
    ].map(function (row) {
      return '<div class="row"><dt>' + row[0] + "</dt><dd>" + row[1].replace(/[<>&]/g, "") + "</dd></div>";
    }).join("");

    var wa = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(asText(r));
    var eyebrow, head, body, actions;

    if (state === "sent") {
      eyebrow = "Received";
      head = "Booking request received.";
      body = "<p>Zenvoy will check vehicle and chauffeur availability and confirm your booking and " +
             "final price. Your booking is not confirmed until we come back to you.</p>";
      actions = '<a class="btn btn--ghost" href="' + wa + '" target="_blank" rel="noopener">' +
                "Add something on WhatsApp</a>";
    } else if (state === "failed") {
      eyebrow = "Not submitted";
      head = "We could not submit your request.";
      body = "<p><strong>Zenvoy has not received this.</strong> Something went wrong between your " +
             "browser and us &mdash; it may be your connection. Your details are saved below and on the " +
             "WhatsApp button, so nothing is lost. Send it on WhatsApp and it reaches us straight away, " +
             "or try submitting again.</p>";
      actions = '<a class="btn btn--primary" href="' + wa + '" target="_blank" rel="noopener">' +
                "Send this request on WhatsApp</a>" +
                '<button type="button" class="btn btn--ghost" id="retry-request">Try submitting again</button>';
    } else {
      eyebrow = "Ready to send";
      head = "Your request is ready to send.";
      body = "<p><strong>Zenvoy has not received this yet.</strong> Send it on WhatsApp and it reaches " +
             "us with every detail and your reference attached. We will then check vehicle and chauffeur " +
             "availability and confirm your booking and final price.</p>";
      actions = '<a class="btn btn--primary" href="' + wa + '" target="_blank" rel="noopener">' +
                "Send this request on WhatsApp</a>" +
                '<button type="button" class="btn btn--ghost" id="copy-request">Copy the request</button>';
    }

    panel.innerHTML =
      '<div class="receipt">' +
      '<p class="eyebrow">' + eyebrow + "</p>" +
      "<h2>" + head + "</h2>" +
      '<p class="receipt__ref">' + r.reference + "</p>" +
      body +
      "<dl>" + rows + "</dl>" +
      '<div class="btn-row">' + actions + "</div>" +
      '<p class="fineprint mt-2">Quote your reference if you contact us about this request. ' +
      "Nothing is charged now: Zenvoy confirms availability and the final price first.</p>" +
      "</div>";

    form.hidden = true;
    panel.hidden = false;
    panel.focus();
    panel.scrollIntoView({ behavior: "smooth", block: "start" });

    var retry = $("retry-request");
    if (retry) {
      retry.addEventListener("click", function () {
        panel.hidden = true;
        panel.innerHTML = "";
        form.hidden = false;
        form.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    var copy = $("copy-request");
    if (copy) {
      copy.addEventListener("click", function () {
        var text = asText(r);
        var done = function () { copy.textContent = "Copied"; };
        if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done);
        else {
          var ta = document.createElement("textarea");
          ta.value = text; document.body.appendChild(ta); ta.select();
          try { document.execCommand("copy"); } catch (e) {}
          document.body.removeChild(ta); done();
        }
      });
    }
  }

  /* ---- submit ------------------------------------------------------------ */
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Honeypot: a field no person can see or tab into. Anything that fills it in
    // is a bot, and we drop the submission without comment.
    var trap = $("botcheck");
    if (trap && trap.value) return;

    var r = collect();
    if (!r) return;

    var button = $("booking-submit");

    if (!ENDPOINT) { show(r, "unconfigured"); return; }

    var payload = {};
    Object.keys(r).forEach(function (k) { payload[k] = r[k]; });
    if (WEB3FORMS_KEY) {
      payload.access_key = WEB3FORMS_KEY;
      payload.subject = "Zenvoy booking request " + r.reference + " — " + r.name;
      payload.from_name = "Zenvoy website";
      payload.botcheck = "";
    }

    button.disabled = true;
    button.textContent = "Sending…";

    // A request that hangs must not leave the customer staring at "Sending…".
    var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = setTimeout(function () { if (controller) controller.abort(); }, TIMEOUT_MS);

    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: controller ? controller.signal : undefined
    }).then(function (res) {
      clearTimeout(timer);
      // Some services answer 200 with {"success": false}; treat that as a failure.
      return res.json().then(function (data) {
        return res.ok && data && data.success !== false;
      }, function () {
        return res.ok;
      });
    }).then(function (ok) {
      show(r, ok ? "sent" : "failed");
    }).catch(function () {
      clearTimeout(timer);
      show(r, "failed");
    }).then(function () {
      button.disabled = false;
      button.textContent = "Send booking request";
    });
  });
})();
