/* ============================================================================
   Little Things — marketing-site interaction layer
   Vanilla, no dependencies. Honours prefers-reduced-motion. Fails open:
   if anything here breaks, all content is still visible and readable.

   The page is calm by design. The only flourish is the finale, where the five
   glints gather into the brand mark — contained to that one section, never
   roaming the page.
   ========================================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Reveal-on-scroll -------------------------------------------------- */
  /* A gentle rise. Text stays fully opaque the whole time — content is never
     hidden, only nudged the last few pixels into place. The glint rows in the
     colour section opt in via [data-glint-row]. */
  var reveals = document.querySelectorAll("[data-reveal], [data-glint-row]");

  if (!("IntersectionObserver" in window) || reduceMotion) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---- Nav: condense on scroll + back-to-top ---------------------------- */
  var nav = document.querySelector("[data-nav]");
  var toTop = document.querySelector("[data-back-to-top]");
  var ticking = false;

  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle("is-stuck", y > 24);
    if (toTop) toTop.classList.toggle("is-shown", y > window.innerHeight * 0.9);
    ticking = false;
  }
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
    },
    { passive: true }
  );
  onScroll();

  /* ---- Mobile menu ------------------------------------------------------- */
  var menuToggle = document.querySelector("[data-menu-toggle]");
  var menuOverlay = document.querySelector("[data-menu-overlay]");
  var menuClose = document.querySelector("[data-menu-close]");

  function setMenu(open) {
    if (!menuOverlay) return;
    menuOverlay.classList.toggle("is-open", open);
    menuOverlay.setAttribute("aria-hidden", open ? "false" : "true");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (menuToggle) menuToggle.addEventListener("click", function () { setMenu(true); });
  if (menuClose) menuClose.addEventListener("click", function () { setMenu(false); });
  if (menuOverlay) {
    menuOverlay.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  /* ---- The finale: the five gather into the mark ------------------------ */
  /* CSS does the travelling; we just flip the switch when it scrolls in. */
  var getSection = document.querySelector(".get");
  if (getSection) {
    if (!("IntersectionObserver" in window) || reduceMotion) {
      getSection.classList.add("is-formed");
    } else {
      new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              getSection.classList.add("is-formed");
              obs.disconnect();
            }
          });
        },
        { threshold: 0.45 }
      ).observe(getSection);
    }
  }
})();
