// ============================================================
// C.I.A.M. ADORA-SIÓN — Animaciones premium (Motion One)
// Este módulo solo maneja animaciones. La lógica crítica de UI
// (menú, tabs, formulario, video) vive en ui.js y funciona siempre.
// ============================================================

import {
  animate,
  inView,
  stagger,
  scroll,
} from "https://cdn.jsdelivr.net/npm/motion@11.11.13/+esm";

document.addEventListener("DOMContentLoaded", () => {
  // Motion se cargó correctamente → activar animaciones (progressive enhancement)
  document.documentElement.classList.add("js");

  /* --------- Scroll reveal --------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length) {
    revealEls.forEach((el) => {
      inView(el, () => {
        el.classList.add("is-revealed");
        const children = el.querySelectorAll("[data-stagger]");
        if (children.length) {
          animate(
            children,
            { opacity: [0, 1], transform: ["translateY(30px)", "none"] },
            { duration: 0.6, delay: stagger(0.08), easing: "ease-out" }
          );
        }
      }, { amount: 0.15, margin: "0px 0px -10% 0px" });
    });

    // Fallback: revelar lo ya visible
    setTimeout(() => {
      revealEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight + 80 && r.bottom > -80) {
          el.classList.add("is-revealed");
        }
      });
    }, 800);
  }

  /* --------- Hero: entrada cinematográfica --------- */
  const heroSeq = [".hero-badge", ".hero-title", ".hero-subtitle", ".hero-actions", ".hero-stats"];
  heroSeq.forEach((sel, i) => {
    const el = document.querySelector(sel);
    if (el) {
      animate(
        el,
        { opacity: [0, 1], transform: ["translateY(28px)", "none"] },
        { duration: 0.9, delay: 0.15 + i * 0.14, easing: "ease-out" }
      );
    }
  });

  /* --------- Contadores animados --------- */
  const counters = document.querySelectorAll("[data-count]");
  counters.forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    inView(el, () => {
      animate(0, target, {
        duration: 2,
        ease: "ease-out",
        onUpdate: (v) => {
          el.textContent = Math.floor(v).toString() + suffix;
        },
      });
    }, { amount: 0.2, margin: "0px 0px -10% 0px" });
  });

  /* --------- Parallax del hero --------- */
  const heroBg = document.querySelector(".hero-bg");
  if (heroBg && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    scroll(
      animate(heroBg, { transform: ["translateY(0px)", "translateY(80px)"] }),
      { target: document.querySelector(".hero"), offset: ["start start", "end start"] }
    );
  }
});