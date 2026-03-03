/* TN Service Madagascar — JS (UX marketing)
   - Mobile menu toggle
   - Services dropdown
   - Floating WhatsApp button injection
*/
(function () {
  const $ = (sel, parent = document) => parent.querySelector(sel);

  // Mobile menu toggle
  const mobileBtn = $("#mobileToggle");
  const mobileMenu = $("#mobileMenu");
  if (mobileBtn && mobileMenu) {
    mobileMenu.style.display = "none";
    mobileMenu.setAttribute("data-open", "false");
    mobileBtn.setAttribute("aria-expanded", "false");

    mobileBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.getAttribute("data-open") === "true";
      mobileMenu.setAttribute("data-open", String(!isOpen));
      mobileMenu.style.display = isOpen ? "none" : "block";
      mobileBtn.setAttribute("aria-expanded", String(!isOpen));
    });
  }

  // Desktop dropdown (services)
  const dropdown = $("#servicesDropdown");
  const dropdownBtn = $("#servicesDropdownBtn");
  if (dropdown && dropdownBtn) {
    const closeDropdown = () => {
      dropdown.classList.remove("open");
      dropdownBtn.setAttribute("aria-expanded", "false");
    };

    dropdownBtn.setAttribute("aria-expanded", "false");

    dropdownBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const open = dropdown.classList.toggle("open");
      dropdownBtn.setAttribute("aria-expanded", String(open));
    });

    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) closeDropdown();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDropdown();
    });
  }

  // Floating WhatsApp CTA (inject on all pages)
  const waAlready = $(".wa-float");
  if (!waAlready) {
    const a = document.createElement("a");
    a.className = "wa-float";
    a.href = "https://wa.me/261344691084";
    a.target = "_blank";
    a.rel = "noopener";
    a.setAttribute("aria-label", "Contacter TN Service sur WhatsApp");
    a.innerHTML = '<span class="wa-dot" aria-hidden="true"></span><span class="label">Devis WhatsApp</span>';
    document.body.appendChild(a);
  }

  // Optional: Contact form mailto (only if ids exist)
  const form = $("#contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = $("#name")?.value?.trim() || "";
      const email = $("#email")?.value?.trim() || "";
      const message = $("#message")?.value?.trim() || "";

      const subject = encodeURIComponent("Demande de devis - TN Service Madagascar");
      const body = encodeURIComponent(
        `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nEnvoyé depuis le site TN Service Madagascar`
      );
      const to = "tnservicesmdg@gmail.com";
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
  }
})();

/* ===== Scroll reveal (IntersectionObserver) ===== */
(function () {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target); // une seule fois (plus fluide)
      }
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -10% 0px" });

  els.forEach((el) => io.observe(el));
})();

/* ===== Scroll reveal + stagger ===== */
(function () {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  // Stagger: si un parent a la classe .stagger, on applique un délai progressif
  document.querySelectorAll(".stagger").forEach((wrap) => {
    const items = wrap.querySelectorAll(".reveal");
    items.forEach((el, i) => {
      el.setAttribute("data-delay", "1");
      el.style.setProperty("--d", `${i * 90}ms`); // 90ms = vitesse (ajuste)
    });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -10% 0px" });

  els.forEach((el) => io.observe(el));
})();

/* ===== Counter up on scroll ===== */
(function () {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseFloat(el.getAttribute("data-count")) || 0;
    const suffix = el.getAttribute("data-suffix") || "";
    const prefix = el.getAttribute("data-prefix") || "";
    const duration = parseInt(el.getAttribute("data-duration") || "900", 10);

    const start = 0;
    const startTime = performance.now();

    const step = (t) => {
      const p = Math.min(1, (t - startTime) / duration);
      const value = start + (target - start) * (1 - Math.pow(1 - p, 3)); // easeOutCubic
      const shown = Number.isInteger(target) ? Math.round(value) : value.toFixed(1);
      el.textContent = `${prefix}${shown}${suffix}`;
      if (p < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });

  counters.forEach((el) => io.observe(el));
})();
