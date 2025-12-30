/* ================= DEFAULT CONFIG ================= */
const defaultConfig = {
  background_color: "#0a0e27",
  surface_color: "#1a1f3a",
  text_color: "#e0e7ff",
  primary_action_color: "#7c3aed",
  secondary_action_color: "#10b981",
  font_family: "Inter, system-ui, sans-serif",
  font_size: 16,
  site_title: "Darshana Dalvi",
  tagline: "Aspiring Backend Developer",
  about_title: "About Me",
  about_text:
    "I'm an aspiring backend developer passionate about building robust server-side applications and APIs.",
  work_title: "My Work",
  skills_title: "Skills & Expertise",
  contact_title: "Get In Touch",
  contact_text: "Feel free to reach out for collaboration or projects.",
  send_button: "Send Message"
};

/* ================= SAFE HELPER ================= */
const $ = (id) => document.getElementById(id);

/* ================= CONFIG HANDLER ================= */
function onConfigChange(config) {
  const cfg = { ...defaultConfig, ...config };

  document.documentElement.style.setProperty("--font-family", cfg.font_family);
  document.body.style.backgroundColor = cfg.background_color;
  document.body.style.color = cfg.text_color;

  if ($("navbar")) {
    $("navbar").style.backgroundColor = cfg.background_color + "dd";
    $("navbar").style.backdropFilter = "blur(10px)";
  }

  if ($("portfolioWrapper")) {
    $("portfolioWrapper").style.backgroundColor = cfg.background_color;
  }

  if ($("ctaButton")) {
    $("ctaButton").style.backgroundColor = cfg.primary_action_color;
    $("ctaButton").style.color = "#fff";
  }

  if ($("sendButton")) {
    $("sendButton").style.backgroundColor = cfg.primary_action_color;
    $("sendButton").style.color = "#fff";
  }

  if ($("viewWorkButton")) {
    $("viewWorkButton").style.border = `2px solid ${cfg.secondary_action_color}`;
    $("viewWorkButton").style.color = cfg.text_color;
  }

  /* Text content */
  if ($("navTitle")) $("navTitle").textContent = cfg.site_title;
  if ($("heroTitle")) $("heroTitle").textContent = cfg.site_title;
  if ($("heroTagline")) $("heroTagline").textContent = cfg.tagline;
  if ($("skillsTitle")) $("skillsTitle").textContent = cfg.skills_title;
  if ($("contactTitle")) $("contactTitle").textContent = cfg.contact_title;
  if ($("contactText")) $("contactText").textContent = cfg.contact_text;
}

/* ================= SDK INIT ================= */
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange
  });
}

/* ================= PARTICLES ================= */
function createParticles() {
  const bg = $("animatedBg");
  if (!bg) return;

  bg.innerHTML = ""; // clear old particles

  for (let i = 0; i < 15; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 60 + 20;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = Math.random() * 100 + "%";
    p.style.top = Math.random() * 100 + "%";
    p.style.backgroundColor = defaultConfig.primary_action_color;
    p.style.animationDuration = Math.random() * 20 + 15 + "s";
    bg.appendChild(p);
  }
}
createParticles();

/* ================= SMOOTH SCROLL ================= */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});

/* ================= CONTACT FORM ================= */
const contactForm = $("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    contactForm.reset();
  });
}

/* ================= NAVBAR SHADOW ================= */
const wrapper = $("portfolioWrapper");
const navbar = $("navbar");

if (wrapper && navbar) {
  wrapper.addEventListener("scroll", () => {
    navbar.style.boxShadow =
      wrapper.scrollTop > 50
        ? "0 4px 10px rgba(0,0,0,.3)"
        : "none";
  });
}

/* ================= JOURNEY MODAL ================= */
const journeyBtn = $("journey-button");
const dialog = $("dialog-overlay");
const closeDialog = $("close-dialog");

if (journeyBtn && dialog) {
  journeyBtn.addEventListener("click", () => {
    dialog.classList.remove("hidden");
    dialog.style.display = "flex";
  });
}

if (closeDialog) {
  closeDialog.addEventListener("click", () => {
    dialog.classList.add("hidden");
    dialog.style.display = "none";
  });
}

if (dialog) {
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      dialog.classList.add("hidden");
      dialog.style.display = "none";
    }
  });
}

/* ================= MOBILE MENU (FINAL & CLEAN) ================= */

const menuBtn = $("menuBtn");
const mobileMenu = $("mobileMenu");
const closeMenu = $("closeMenu");

if (menuBtn && mobileMenu) {

  // OPEN menu
  menuBtn.addEventListener("click", () => {
    mobileMenu.style.left = "0";
    document.body.style.overflow = "hidden"; // stop background scroll
  });

  // CLOSE menu (X button)
  if (closeMenu) {
    closeMenu.addEventListener("click", () => {
      mobileMenu.style.left = "-100%";
      document.body.style.overflow = ""; // restore scroll
    });
  }

  // CLOSE menu on link click
  mobileMenu.querySelectorAll(".mobile-link").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.style.left = "-100%";
      document.body.style.overflow = "";
    });
  });
}


/* ================= INTERSECTION ANIMATIONS ================= */
const animatedEls = document.querySelectorAll(
  ".fade-in-up, .slide-in-left, .slide-in-right"
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.style.opacity = "1";
    entry.target.style.transform = "translate(0,0)";
  });
});

animatedEls.forEach((el) => {
  el.style.opacity = "0";

  if (el.classList.contains("slide-in-left")) {
    el.style.transform = "translateX(-40px)";
  } else if (el.classList.contains("slide-in-right")) {
    el.style.transform = "translateX(40px)";
  } else {
    el.style.transform = "translateY(40px)";
  }

  observer.observe(el);
});



