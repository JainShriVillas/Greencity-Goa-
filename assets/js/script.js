/* =========================================================================
   GREENCITY GOA — Landing Page Behaviour
   Vanilla JS, no dependencies. Covers: mobile nav, smooth scroll w/ sticky-nav
   offset, lead form + brochure modal validation/submit stubs, floor plan
   tabs, FAQ accordion, and a conversion-tracking stub.
   ========================================================================= */
(function () {
  "use strict";

  /* -----------------------------------------------------------------------
     PRELOADER
     Shown for exactly 1s regardless of actual load state (this is a fast
     static site — this is a brand touch, not a real loading indicator),
     then fades out and removes itself from the DOM.
     ------------------------------------------------------------------------- */
  var preloader = document.getElementById("preloader");
  if (preloader) {
    window.setTimeout(function () {
      preloader.classList.add("is-hidden");
      preloader.addEventListener("transitionend", function () {
        preloader.remove();
      }, { once: true });
    }, 1000);
  }

  /* -----------------------------------------------------------------------
     TRACKING STUB
     TODO: once 01-brief.md's GA4 / GTM / Meta Pixel / Google Ads IDs exist,
     replace the console.info calls below with the real dataLayer.push /
     fbq('track', ...) / gtag('event', ...) calls. Keeping everything funneled
     through this one function means that's a one-place change.
     Conversion events expected: form_submit, whatsapp_click, brochure_download.
     ------------------------------------------------------------------------- */
  function trackConversion(eventName, meta) {
    meta = meta || {};
    // eslint-disable-next-line no-console
    console.info("[trackConversion] " + eventName, meta);
    // TODO — wire in, e.g.:
    // window.dataLayer && window.dataLayer.push({ event: eventName, ...meta });
    // window.fbq && window.fbq('track', eventName, meta);
    // window.gtag && window.gtag('event', eventName, meta);
  }

  /* -----------------------------------------------------------------------
     LEAD DESTINATION STUB
     TODO (01-brief.md "Lead destination (CRM/webhook/email/sheet): TBD"):
     replace this stub with a real fetch() POST to the CRM/webhook endpoint
     once one exists. Until then it just resolves immediately so the UI can
     show its success state.
     ------------------------------------------------------------------------- */
  function submitLead(payload) {
    // eslint-disable-next-line no-console
    console.info("[submitLead] payload ready for CRM/webhook:", payload);
    // TODO — replace with e.g.:
    // return fetch('https://YOUR-ENDPOINT/leads', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload)
    // });
    return Promise.resolve({ ok: true });
  }

  /* -----------------------------------------------------------------------
     SMOOTH SCROLL WITH STICKY-NAV OFFSET
     ------------------------------------------------------------------------- */
  var navEl = document.querySelector(".nav");
  function scrollToHash(hash) {
    var target = document.querySelector(hash);
    if (!target) return;
    var navH = navEl ? navEl.offsetHeight : 0;
    var y = target.getBoundingClientRect().top + window.pageYOffset - navH - 12;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
  document.addEventListener("click", function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var hash = link.getAttribute("href");
    if (!hash || hash === "#" || hash.length < 2) return;
    var target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    scrollToHash(hash);
    closeMobileNav();
    if (hash === "#hero-form") {
      window.setTimeout(function () {
        var firstField = target.querySelector("input, select");
        if (firstField) firstField.focus({ preventScroll: true });
      }, 500);
    }
  });

  /* -----------------------------------------------------------------------
     MOBILE NAV
     ------------------------------------------------------------------------- */
  var burger = document.getElementById("nav-burger");
  var mobileNav = document.getElementById("nav-mobile");
  function closeMobileNav() {
    if (!burger || !mobileNav) return;
    burger.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("is-open");
  }
  if (burger && mobileNav) {
    burger.addEventListener("click", function () {
      var open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      mobileNav.classList.toggle("is-open", !open);
    });
  }

  /* -----------------------------------------------------------------------
     FORM VALIDATION + SUBMIT (shared by hero form + brochure modal form)
     ------------------------------------------------------------------------- */
  var MOBILE_RE = /^[+]?[\d\s-]{10,14}$/;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateField(fieldEl) {
    var input = fieldEl.querySelector("input, select");
    if (!input) return true;
    var value = (input.value || "").trim();
    var ok = true;

    if (input.tagName === "SELECT") {
      ok = value !== "";
    } else if (input.type === "email") {
      ok = EMAIL_RE.test(value);
    } else if (input.type === "tel") {
      ok = MOBILE_RE.test(value) && value.replace(/\D/g, "").length >= 10;
    } else {
      ok = value.length >= 2;
    }

    fieldEl.classList.toggle("has-error", !ok);
    input.classList.toggle("invalid", !ok);
    return ok;
  }

  function wireForm(form, opts) {
    if (!form) return;
    opts = opts || {};

    // Clear error state as the visitor fixes a field.
    form.querySelectorAll(".field").forEach(function (fieldEl) {
      var input = fieldEl.querySelector("input, select");
      if (!input) return;
      input.addEventListener("input", function () {
        if (fieldEl.classList.contains("has-error")) validateField(fieldEl);
      });
      input.addEventListener("change", function () {
        if (fieldEl.classList.contains("has-error")) validateField(fieldEl);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fields = Array.prototype.slice.call(form.querySelectorAll(".field"));
      var allValid = fields.map(validateField).every(Boolean);

      if (!allValid) {
        var firstInvalid = form.querySelector(".field.has-error input, .field.has-error select");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var payload = { form: opts.name || form.id };
      fields.forEach(function (fieldEl) {
        var input = fieldEl.querySelector("input, select");
        if (input) payload[input.name] = input.value.trim();
      });

      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }

      submitLead(payload).then(function () {
        trackConversion(opts.eventName || "form_submit", { form: opts.name || form.id });
        form.classList.add("is-hidden");
        var success = form.querySelector(".form-success");
        if (success) success.classList.add("is-visible");
        if (typeof opts.onSuccess === "function") opts.onSuccess();
      });
    });
  }

  wireForm(document.getElementById("hero-form"), { name: "hero_lead", eventName: "form_submit" });
  wireForm(document.getElementById("brochure-form"), {
    name: "brochure_download",
    eventName: "brochure_download",
  });

  /* -----------------------------------------------------------------------
     BROCHURE MODAL
     ------------------------------------------------------------------------- */
  var modal = document.getElementById("brochure-modal");
  var openBtn = document.getElementById("brochure-open");
  function openModal() {
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    var firstField = modal.querySelector("input");
    if (firstField) window.setTimeout(function () { firstField.focus(); }, 60);
    document.addEventListener("keydown", onModalKeydown);
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.removeEventListener("keydown", onModalKeydown);
  }
  function onModalKeydown(e) {
    if (e.key === "Escape") closeModal();
  }
  if (openBtn) openBtn.addEventListener("click", openModal);
  document.querySelectorAll("[data-brochure-close]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });

  /* -----------------------------------------------------------------------
     FLOOR PLAN TABS
     ------------------------------------------------------------------------- */
  var FP_BASE = "assets/img/floorplans/";
  var FP_IMAGES = {
    a: { ground: "villa-a-ground.jpg", first: "villa-a-first.jpg", second: "villa-a-second.jpg", "2d": "villa-a-2d.png" },
    b: { ground: "villa-b-ground.jpg", first: "villa-b-first.jpg", "2d": "villa-b-2d.png" },
    c: { ground: "villa-c-ground.jpg", first: "villa-c-first.jpg", "2d": "villa-c-2d.png" },
  };
  var FP_ALT = {
    ground: "ground floor layout render",
    first: "first floor layout render",
    second: "second floor layout render",
    "2d": "dimensioned line-drawing layout",
  };

  var fpTabs = document.querySelectorAll("[data-fp-tab]");
  var fpPanels = document.querySelectorAll("[data-fp-panel]");

  fpTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var key = tab.getAttribute("data-fp-tab");
      fpTabs.forEach(function (t) { t.setAttribute("aria-selected", String(t === tab)); });
      fpPanels.forEach(function (panel) {
        panel.classList.toggle("is-active", panel.getAttribute("data-fp-panel") === key);
      });
    });
  });

  fpPanels.forEach(function (panel) {
    var typeKey = panel.getAttribute("data-fp-panel");
    var floorTabs = panel.querySelectorAll("[data-fp-floor]");
    var img = panel.querySelector("[data-fp-image]");

    floorTabs.forEach(function (floorTab) {
      floorTab.addEventListener("click", function () {
        var floorKey = floorTab.getAttribute("data-fp-floor");
        floorTabs.forEach(function (t) { t.setAttribute("aria-selected", String(t === floorTab)); });
        var file = FP_IMAGES[typeKey] && FP_IMAGES[typeKey][floorKey];
        if (file && img) {
          img.src = FP_BASE + file + "?v=3";
          img.alt = "Type " + typeKey.toUpperCase() + " villa — " + (FP_ALT[floorKey] || "layout render") + ", Greencity Goa";
        }
      });
    });
  });

  /* -----------------------------------------------------------------------
     FAQ ACCORDION
     ------------------------------------------------------------------------- */
  document.querySelectorAll(".faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      var open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  /* -----------------------------------------------------------------------
     WHATSAPP CLICK TRACKING
     ------------------------------------------------------------------------- */
  document.querySelectorAll('[data-track="whatsapp_click"]').forEach(function (el) {
    el.addEventListener("click", function () {
      trackConversion("whatsapp_click", { source: "floating_button" });
    });
  });

  /* -----------------------------------------------------------------------
     PROOF-OF-DELIVERY SLIDESHOW
     Crossfades between the background photos automatically, continuously,
     from page load onward — a visitor scrolling down the page finds it
     already mid-cycle, which is what "swipes itself as you scroll through
     it" is really asking for. (An earlier version tried to gate this on
     IntersectionObserver — start only once scrolled into view, pause when
     not — but that combination has a real bug: observe() fires an initial
     callback reporting the section isn't in view yet at load time, which
     immediately cancels the timer this same code just started. Simpler
     and correct beats clever and broken here, so it's just a plain
     interval.) Respects prefers-reduced-motion by leaving the first photo
     static.
     ------------------------------------------------------------------------- */
  var slideshowEl = document.querySelector("[data-slideshow]");
  if (slideshowEl && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var slides = Array.prototype.slice.call(slideshowEl.querySelectorAll("[data-slide]"));
    var current = 0;

    function advanceSlide() {
      var next = (current + 1) % slides.length;
      slides[current].classList.remove("is-active");
      slides[next].classList.add("is-active");
      current = next;
    }

    if (slides.length > 1) {
      window.setInterval(advanceSlide, 4200);
    }
  }
})();
