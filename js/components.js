/* =========================================
   Collection By Hareem - Shared Components
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  initNavbarToggle();
  initDropdowns();
  initImageFallbacks();
  initContactForm();
});

function initNavbarToggle() {
  const toggleBtn = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

function initDropdowns() {
  const dropdowns = document.querySelectorAll(".nav-dropdown");
  if (!dropdowns.length) return;

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  });

  document.addEventListener("click", (e) => {
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
        const toggle = dropdown.querySelector(".dropdown-toggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

function initImageFallbacks() {
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      if (img.src !== FALLBACK_IMAGE) {
        img.src = FALLBACK_IMAGE;
      }
    });
  });
}

function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contactName").value.trim();
    const phone = document.getElementById("contactPhone").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !message) {
      showToast("Please enter your name and message.");
      return;
    }

    const waText =
      `Assalam-o-Alaikum ${STORE_CONFIG.brandName}!
` +
      `Name: ${name}
` +
      (phone ? `Phone: ${phone}
` : "") +
      `Message: ${message}`;

    const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`;
    showToast("Opening WhatsApp with your message...");
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
    }, 500);
    form.reset();
  });
}
