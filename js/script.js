/* TN Service Madagascar  JS (UX marketing)
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
