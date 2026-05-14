/* =============================================================================
   Little Things — marketing-site interaction layer
   ============================================================================= */

const orbitSteps = [
  {
    key: "people",
    topline: "People",
    heading: "Start with a few close people.",
    body: "Add the people you want to remember well.",
    screen: `
      <img class="screen-capture" src="./assets/screenshots/start-with-someone.webp" alt="" loading="lazy" decoding="async" />
    `,
    notes: [
      { label: "Private list", text: "People you care about", x: "-18rem", y: "-13rem", rotate: "-8deg", bg: "#fdfcf8" },
      { label: "Add someone", text: "By name or contacts", x: "17rem", y: "-12rem", rotate: "6deg", bg: "#d4dfc7" },
      { label: "Start small", text: "One person is enough", x: "-19rem", y: "12rem", rotate: "5deg", bg: "#ebccbc" },
      { label: "Close circle", text: "Friends and family", x: "18rem", y: "12rem", rotate: "-5deg", bg: "#d6cee0" },
    ],
  },
  {
    key: "glints",
    topline: "Details",
    heading: "Save the details you want to remember.",
    body: "Keep gift ideas, preferences, stories, important dates, and what's happening in their life.",
    screen: `
      <img class="screen-capture" src="./assets/screenshots/what-you-notice.webp" alt="" loading="lazy" decoding="async" />
    `,
    notes: [
      { label: "Before a call", text: "Ask how it went", x: "-19rem", y: "-9rem", rotate: "-3deg", bg: "#ebccbc" },
      { label: "Preference", text: "Bergamot, not lavender", x: "18rem", y: "-14rem", rotate: "9deg", bg: "#d4dfc7" },
      { label: "Gift idea", text: "Vintage camera strap", x: "-16rem", y: "14rem", rotate: "8deg", bg: "#d6cee0" },
      { label: "Important date", text: "Interview on Thursday", x: "19rem", y: "10rem", rotate: "-8deg", bg: "#fdfcf8" },
    ],
  },
  {
    key: "your-space",
    topline: "Reminders",
    heading: "Set gentle nudges for moments that matter.",
    body: "Use local reminders for birthdays, check-ins, appointments, or moments when a message would matter.",
    screen: `
      <img class="screen-capture" src="./assets/screenshots/your-space.webp" alt="" loading="lazy" decoding="async" />
    `,
    notes: [
      { label: "Birthday", text: "Send a message", x: "-20rem", y: "-12rem", rotate: "6deg", bg: "#fdfcf8" },
      { label: "Check-in", text: "Ask about the knee", x: "16rem", y: "-10rem", rotate: "-7deg", bg: "#d6cee0" },
      { label: "Appointment", text: "Wish them luck", x: "-18rem", y: "11rem", rotate: "-8deg", bg: "#d4dfc7" },
      { label: "Later", text: "When it matters", x: "19rem", y: "13rem", rotate: "5deg", bg: "#ebccbc" },
    ],
  },
  {
    key: "privacy",
    topline: "Privacy",
    heading: "Keep your notes on your device.",
    body: "Your notes stay on your device. No account. No Little Things cloud.",
    screen: `
      <img class="screen-capture" src="./assets/screenshots/app-lock.jpg" alt="" loading="lazy" decoding="async" />
    `,
    notes: [
      { label: "No account", text: "Use it without sign-in", x: "-18rem", y: "-14rem", rotate: "-10deg", bg: "#d6cee0" },
      { label: "Local", text: "Stored on this device", x: "18rem", y: "-11rem", rotate: "5deg", bg: "#fdfcf8" },
      { label: "Privacy lock", text: "A screen barrier", x: "-20rem", y: "10rem", rotate: "4deg", bg: "#ebccbc" },
      { label: "Device handled", text: "No biometric data leaves", x: "17rem", y: "14rem", rotate: "-6deg", bg: "#d4dfc7" },
    ],
  },
];

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const compactView = window.matchMedia("(max-width: 820px)");

/* ========================  mobile menu  ======================== */

const body = document.body;
const siteNav = document.querySelector(".site-nav");
const menuButton = document.querySelector("[data-menu-toggle]");
const menuClose = document.querySelector("[data-menu-close]");
const menuOverlay = document.querySelector("[data-menu-overlay]");
const backToTop = document.querySelector("[data-back-to-top]");
let lastScrollY = Math.max(0, window.scrollY);
let navIsCompact = false;
let navRestoreTimer;

const setScrolledNav = (isScrolled) => {
  siteNav?.classList.toggle("is-scrolled", isScrolled);
};

const clearNavRestore = () => {
  window.clearTimeout(navRestoreTimer);
  siteNav?.classList.remove("is-restoring");
};

const setCompactNav = (isCompact, options = {}) => {
  if (!siteNav) return;

  if (isCompact || !options.slowRestore) {
    clearNavRestore();
  }

  const slowRestore = !isCompact && options.slowRestore && navIsCompact;

  if (slowRestore) {
    window.clearTimeout(navRestoreTimer);
    siteNav.classList.add("is-restoring");
    navRestoreTimer = window.setTimeout(() => {
      siteNav.classList.remove("is-restoring");
    }, 1050);
  }

  if (navIsCompact === isCompact) return;
  navIsCompact = isCompact;
  siteNav.classList.toggle("is-compact", isCompact);
};

const setBackToTop = (isVisible) => {
  if (!backToTop) return;
  backToTop.classList.toggle("is-visible", isVisible);
  backToTop.setAttribute("aria-hidden", String(!isVisible));
  backToTop.tabIndex = isVisible ? 0 : -1;
};

const syncScrollChrome = () => {
  const currentY = Math.max(0, window.scrollY);
  const delta = currentY - lastScrollY;
  const canCompact = !compactView.matches && currentY > 88;

  if (!canCompact) {
    setCompactNav(false);
  } else if (delta > 8 || (!navIsCompact && currentY > 180 && Math.abs(delta) < 2)) {
    setCompactNav(true);
  } else if (delta < -8) {
    setCompactNav(false, { slowRestore: true });
  }

  setScrolledNav(currentY > 24);
  setBackToTop(currentY > 680);
  lastScrollY = currentY;
};

window.addEventListener("scroll", syncScrollChrome, { passive: true });
window.addEventListener("resize", syncScrollChrome);
syncScrollChrome();

backToTop?.addEventListener("click", (event) => {
  event.preventDefault();
  setCompactNav(false, { slowRestore: true });
  window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
});

if (menuButton && menuOverlay) {
  const setMenu = (isOpen) => {
    const shouldRestoreFocus =
      !isOpen && menuOverlay.contains(document.activeElement);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    menuOverlay.classList.toggle("is-open", isOpen);
    menuOverlay.setAttribute("aria-hidden", String(!isOpen));
    body.classList.toggle("menu-open", isOpen);
    if (isOpen && menuClose) menuClose.focus({ preventScroll: true });
    if (shouldRestoreFocus) menuButton.focus({ preventScroll: true });
  };

  menuButton.addEventListener("click", () => {
    setMenu(menuButton.getAttribute("aria-expanded") !== "true");
  });

  menuClose?.addEventListener("click", () => setMenu(false));

  menuOverlay.addEventListener("click", (event) => {
    if (event.target === menuOverlay) setMenu(false);
  });

  menuOverlay.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setMenu(false);
    }
  });
}

/* ========================  hero headline reveal  ======================== */

/* Hero headline kept static — relies on its typographic weight, not motion. */

/* ========================  generic reveals  ======================== */

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 },
);

document.querySelectorAll(".reveal, .manifesto, .examples-board").forEach((el) =>
  revealObserver.observe(el),
);

/* ========================  optional H2/H3 reveal  ======================== */

const headingObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        headingObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.28, rootMargin: "0px 0px -8% 0px" },
);

document.querySelectorAll("main h2:not(.privacy-headline):not(.manifesto-headline)").forEach((heading) => {
  if (heading.querySelector(".heading-reveal-inner")) return;
  const headingContent = heading.innerHTML.trim();
  if (!headingContent) return;
  const inner = document.createElement("span");
  inner.className = "heading-reveal-inner";
  inner.innerHTML = headingContent;
  heading.innerHTML = "";
  heading.append(inner);
  heading.classList.add("heading-reveal");
  headingObserver.observe(heading);
});

/* ========================  hero pointer parallax  ======================== */

const tiltStage = document.querySelector("[data-tilt-stage]");
if (tiltStage && !reducedMotion.matches) {
  let tiltFrame = 0;
  const handleMove = (event) => {
    if (tiltFrame) cancelAnimationFrame(tiltFrame);
    tiltFrame = requestAnimationFrame(() => {
      const rect = tiltStage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      tiltStage.style.setProperty("--tilt-x", String(x * 1.4));
      tiltStage.style.setProperty("--tilt-y", String(y * 1.4));
    });
  };
  tiltStage.addEventListener("pointermove", handleMove);
  tiltStage.addEventListener("pointerleave", () => {
    tiltStage.style.setProperty("--tilt-x", "0");
    tiltStage.style.setProperty("--tilt-y", "0");
  });
}

/* ========================  pinned story (orbit)  ======================== */

const orbitSection = document.querySelector("[data-orbit-section]");
if (orbitSection) {
  const orbitScroll = orbitSection.querySelector("[data-orbit-scroll]");
  const orbitStage = orbitSection.querySelector("[data-orbit-stage]");
  const orbitScreen = orbitSection.querySelector("[data-orbit-screen]");
  const orbitTopline = orbitSection.querySelector("[data-orbit-topline]");
  const orbitHeading = orbitSection.querySelector("[data-orbit-heading]");
  const orbitCopy = orbitSection.querySelector("[data-orbit-copy]");
  const orbitCount = orbitSection.querySelector("[data-orbit-count]");
  const orbitProgress = orbitSection.querySelector("[data-orbit-progress]");
  const orbitNotes = Array.from(orbitSection.querySelectorAll("[data-orbit-note]"));
  const orbitNavItems = Array.from(orbitSection.querySelectorAll("[data-orbit-nav]"));
  let activeIndex = -1;
  let orbitFrame = 0;
  let orbitVisible = false;
  let screenAnimation = null;
  let textAnimations = [];

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const cssLengthToPx = (value) => {
    if (typeof value !== "string") return Number(value) || 0;
    const amount = parseFloat(value);
    if (!Number.isFinite(amount)) return 0;
    if (value.trim().endsWith("rem")) {
      const rootSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      return amount * rootSize;
    }
    return amount;
  };

  const safeNoteOffset = (noteEl, axis, value) => {
    if (!orbitStage) return value;
    const stageRect = orbitStage.getBoundingClientRect();
    const noteRect = noteEl.getBoundingClientRect();
    const desired = cssLengthToPx(value);
    const inset = 16;

    if (axis === "x") {
      const center = stageRect.left + stageRect.width / 2;
      const half = noteRect.width / 2;
      const min = inset + half - center;
      const max = window.innerWidth - inset - half - center;
      return `${clamp(desired, min, max)}px`;
    }

    const half = noteRect.height / 2;
    const min = inset + half - stageRect.height / 2;
    const max = stageRect.height - inset - half - stageRect.height / 2;
    return `${clamp(desired, min, max)}px`;
  };

  const cancelTextAnimations = () => {
    textAnimations.forEach((anim) => anim.cancel());
    textAnimations = [];
  };

  const animateText = () => {
    if (reducedMotion.matches) return;
    cancelTextAnimations();
    [orbitCount, orbitHeading, orbitCopy].forEach((node, idx) => {
      if (!node || typeof node.animate !== "function") return;
      const anim = node.animate(
        [
          { opacity: 0, transform: "translateY(0.5rem)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 460,
          delay: idx * 50,
          easing: "cubic-bezier(0.32, 0.72, 0, 1)",
          fill: "both",
        },
      );
      textAnimations.push(anim);
    });
  };

  const renderStep = (index, opts = {}) => {
    const next = clamp(index, 0, orbitSteps.length - 1);
    if (next === activeIndex && !opts.force) return;
    activeIndex = next;
    const step = orbitSteps[next];

    orbitSection.dataset.orbitActive = String(next);
    if (orbitTopline) orbitTopline.textContent = step.topline;
    if (orbitHeading) orbitHeading.textContent = step.heading;
    if (orbitCopy) orbitCopy.textContent = step.body;
    if (orbitCount) {
      const total = String(orbitSteps.length).padStart(2, "0");
      orbitCount.textContent = `${String(next + 1).padStart(2, "0")} / ${total}`;
    }
    animateText();

    if (orbitScreen) {
      if (screenAnimation) {
        screenAnimation.cancel();
        screenAnimation = null;
      }
      orbitScreen.innerHTML = step.screen;
      if (!reducedMotion.matches && typeof orbitScreen.animate === "function") {
        screenAnimation = orbitScreen.animate(
          [
            { opacity: 0, transform: "translateY(0.45rem)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 380, easing: "cubic-bezier(0.32, 0.72, 0, 1)" },
        );
      }
    }

    orbitNotes.forEach((noteEl, idx) => {
      const note = step.notes[idx];
      if (!note) return;
      noteEl.innerHTML = `<span>${note.label}</span><strong>${note.text}</strong>`;
      noteEl.style.setProperty("--note-x", safeNoteOffset(noteEl, "x", note.x));
      noteEl.style.setProperty("--note-y", safeNoteOffset(noteEl, "y", note.y));
      noteEl.style.setProperty("--note-rotate", note.rotate);
      noteEl.style.setProperty("--note-bg", note.bg);
      noteEl.style.setProperty("--note-opacity", "1");
      noteEl.style.setProperty("--note-scale", note.scale || "1");
    });

    orbitNavItems.forEach((item) => {
      item.classList.toggle("is-active", Number(item.dataset.orbitNav) === next);
    });
  };

  const updateFromScroll = () => {
    orbitFrame = 0;
    if (!orbitScroll || compactView.matches || reducedMotion.matches) return;
    const rect = orbitScroll.getBoundingClientRect();
    const available = Math.max(1, rect.height - window.innerHeight);
    const progress = clamp(-rect.top / available, 0, 1);
    const index = clamp(Math.floor(progress * orbitSteps.length), 0, orbitSteps.length - 1);
    if (orbitProgress) {
      orbitProgress.style.setProperty("--orbit-progress", String(progress));
    }
    renderStep(index);
  };

  const schedule = () => {
    if (!orbitVisible || orbitFrame) return;
    orbitFrame = requestAnimationFrame(updateFromScroll);
  };

  const stepProgress = (index) => {
    if (orbitSteps.length <= 0) return 0;
    return clamp((index + 0.5) / orbitSteps.length, 0, 1);
  };

  const syncScrollToStep = (index) => {
    if (!orbitScroll || compactView.matches || reducedMotion.matches) return;
    const rect = orbitScroll.getBoundingClientRect();
    const available = Math.max(1, rect.height - window.innerHeight);
    const targetY = window.scrollY + rect.top + available * stepProgress(index);
    const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const html = document.documentElement;
    const previousScrollBehavior = html.style.scrollBehavior;

    html.style.scrollBehavior = "auto";
    window.scrollTo({
      top: clamp(targetY, 0, maxY),
      behavior: "auto",
    });
    html.style.scrollBehavior = previousScrollBehavior;
  };

  const select = (index) => {
    const target = clamp(index, 0, orbitSteps.length - 1);
    if (orbitProgress) {
      orbitProgress.style.setProperty("--orbit-progress", String(stepProgress(target)));
    }
    renderStep(target, { force: true });
    syncScrollToStep(target);
  };

  orbitNavItems.forEach((item) => {
    item.addEventListener("click", () => select(Number(item.dataset.orbitNav)));
  });

  const orbitObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      orbitVisible = Boolean(entry && entry.isIntersecting);
      if (orbitVisible) schedule();
    },
    { threshold: 0.04 },
  );

  orbitObserver.observe(orbitSection);
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", () => {
    renderStep(activeIndex < 0 ? 0 : activeIndex, { force: true });
    schedule();
  });
  renderStep(0, { force: true });
}

/* ========================  beta form  ======================== */

const betaForm = document.querySelector("#beta-form");
const betaFirstName = document.querySelector("#beta-first-name");
const betaLastName = document.querySelector("#beta-last-name");
const betaEmail = document.querySelector("#beta-email");
const betaPlatform = document.querySelector("#beta-platform");
const betaFitReason = document.querySelector("#beta-fit-reason");
const betaNote = document.querySelector("#beta-note");
const betaConsent = document.querySelector("#beta-consent");
const betaCompany = document.querySelector("#beta-company");
const betaMessage = document.querySelector("#beta-message");
const betaSubmit = betaForm?.querySelector("button[type='submit']");

const BETA_INTAKE_ENDPOINT =
  window.LITTLE_THINGS_BETA_INTAKE_ENDPOINT ||
  "https://little-things-intake.kris-536.workers.dev/interest";

if (
  betaForm &&
  betaFirstName &&
  betaLastName &&
  betaEmail &&
  betaPlatform &&
  betaFitReason &&
  betaNote &&
  betaConsent &&
  betaCompany &&
  betaMessage &&
  betaSubmit
) {
  const setSubmitting = (isSubmitting) => {
    betaSubmit.disabled = isSubmitting;
    betaSubmit.querySelector("span").textContent = isSubmitting
      ? "Registering..."
      : "Register interest";
  };

  betaForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const firstName = betaFirstName.value.trim();
    const lastName = betaLastName.value.trim();
    const email = betaEmail.value.trim();

    if (!firstName) {
      betaMessage.textContent = "Please add your first name.";
      betaFirstName.focus();
      return;
    }
    if (!lastName) {
      betaMessage.textContent = "Please add your last name.";
      betaLastName.focus();
      return;
    }
    if (!email || !betaEmail.checkValidity()) {
      betaMessage.textContent = "Please add a valid email address.";
      betaEmail.focus();
      return;
    }
    if (!betaPlatform.value) {
      betaMessage.textContent = "Please choose a platform.";
      betaPlatform.focus();
      return;
    }
    if (!betaConsent.checked) {
      betaMessage.textContent = "Please confirm Little Things can contact you about the beta.";
      betaConsent.focus();
      return;
    }

    setSubmitting(true);
    betaMessage.textContent = "Registering interest...";

    try {
      const response = await fetch(BETA_INTAKE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schema_version: 1,
          first_name: firstName,
          last_name: lastName,
          email,
          platform: betaPlatform.value,
          fit_reason: betaFitReason.value || null,
          note: betaNote.value.trim() || null,
          consent_to_contact: true,
          source: "Website",
          submitted_at: new Date().toISOString(),
          company: betaCompany.value,
        }),
      });

      if (response.status === 201) {
        betaForm.reset();
        betaMessage.textContent = "You're on the interest list. Selected testers receive a beta invite when a spot opens.";
        return;
      }

      if (response.status === 429) {
        betaMessage.textContent = "Too many attempts. Please try again in a minute.";
        return;
      }

      let error = "Something went wrong. Please try again.";
      try {
        const body = await response.json();
        if (body && body.error) error = body.error;
      } catch {
        // Keep generic message.
      }
      betaMessage.textContent = error;
    } catch {
      betaMessage.textContent = "Could not reach the beta list. Please try again later.";
    } finally {
      setSubmitting(false);
    }
  });
}
