document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");

  /* -------------------------
     HERO OPACITY
  ------------------------- */

  function updateHeroOpacity() {
    if (!hero || !heroContent) return;

    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;

    let progress = scrollY / heroHeight;
    progress = Math.min(Math.max(progress, 0), 1);

    heroContent.style.opacity = 1 - Math.pow(progress, 1.4);
  }

  /* -------------------------
     NAV STATE
  ------------------------- */

  function updateNavState() {
    if (!nav) return;

    if (window.scrollY > 0) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  // Initialize state immediately (handles refresh at #about, #contact, etc.)
  updateHeroOpacity();
  updateNavState();

  /* -------------------------
     SCROLL LISTENER
  ------------------------- */

  window.addEventListener("scroll", () => {
    updateNavState();
    updateHeroOpacity();
  });

  /* -------------------------
     REVEAL ANIMATION
  ------------------------- */

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  /* -------------------------
     ACTIVE NAV LINK HIGHLIGHT
  ------------------------- */

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav a[href^='#']");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${entry.target.id}`) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    {
      rootMargin: "-30% 0px -50% 0px",
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

  /* -------------------------
    MOBILE NAV TOGGLE
  ------------------------- */

  const burger = document.querySelector(".nav-burger");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (burger && mobileMenu) {

    burger.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle("active");
    });

    // Close if clicking outside menu AND outside burger
    document.addEventListener("click", (e) => {
      if (
        mobileMenu.classList.contains("active") &&
        !mobileMenu.contains(e.target) &&
        !burger.contains(e.target)
      ) {
        mobileMenu.classList.remove("active");
      }
    });

    // Close on scroll
    window.addEventListener("scroll", () => {
      mobileMenu.classList.remove("active");
    });

  }
});