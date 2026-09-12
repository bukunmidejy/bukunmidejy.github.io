/* Zenvoy Mobility — progressive enhancement only.
   Everything on the site works with JavaScript disabled. */
(function () {
  "use strict";

  window.zenvoyReady = true;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Mobile navigation ------------------------------------------------ */
  var toggle = document.querySelector("[data-nav-toggle]");
  var panel = document.getElementById("mobile-nav");

  function setNav(open) {
    if (!toggle || !panel) return;
    panel.setAttribute("data-open", open ? "true" : "false");
    panel.setAttribute("aria-hidden", open ? "false" : "true");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) {
      var first = panel.querySelector("a, button");
      if (first) first.focus();
    }
  }

  if (toggle && panel) {
    setNav(false);
    toggle.addEventListener("click", function () {
      setNav(panel.getAttribute("data-open") !== "true");
    });
    panel.addEventListener("click", function (e) {
      if (e.target.closest("a") || e.target.closest("[data-nav-close]")) setNav(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.getAttribute("data-open") === "true") {
        setNav(false);
        toggle.focus();
      }
    });
  }

  /* ---- Sticky booking bar (mobile) -------------------------------------- */
  var sticky = document.querySelector("[data-sticky-cta]");
  if (sticky) {
    document.body.classList.add("has-sticky-cta");
    var showAfter = 420;
    var shown = false;
    var onScroll = function () {
      var should = window.scrollY > showAfter;
      if (should !== shown) {
        shown = should;
        sticky.setAttribute("data-visible", should ? "true" : "false");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- Reveal on scroll -------------------------------------------------- */
  var revealables = document.querySelectorAll("[data-reveal]");
  if (revealables.length && "IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---- Current year ------------------------------------------------------ */
  var years = document.querySelectorAll("[data-year]");
  for (var i = 0; i < years.length; i++) {
    years[i].textContent = String(new Date().getFullYear());
  }
})();
