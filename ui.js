// ============================================================
// C.I.A.M. ADORA-SIÓN — Lógica crítica de UI (sin dependencias)
// Este archivo NO depende de Motion One. Garantiza que el menú,
// las pestañas, el formulario y el video funcionen siempre.
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  /* --------- Navbar: encoge al hacer scroll --------- */
  const navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 50) navbar.classList.add("scrolled");
        else navbar.classList.remove("scrolled");
      },
      { passive: true }
    );
  }

  /* --------- Menú hamburguesa móvil --------- */
  const toggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  if (toggle && navLinks) {
    const toggleIcon = toggle.querySelector("i");
    const DESKTOP_BP = 1024;

    const setMenu = (open) => {
      navLinks.classList.toggle("open", open);
      toggle.classList.toggle("is-open", open);
      document.documentElement.classList.toggle("menu-open", open);
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      if (toggleIcon) {
        toggleIcon.classList.toggle("bi-list", !open);
        toggleIcon.classList.toggle("bi-x-lg", open);
      }
    };

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      setMenu(!navLinks.classList.contains("open"));
    });

    // Cerrar al hacer clic en un enlace
    navLinks.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => setMenu(false))
    );

    // Cerrar al hacer clic fuera (incluye el velo oscuro)
    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
        setMenu(false);
      }
    });

    // Cerrar con la tecla Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navLinks.classList.contains("open")) {
        setMenu(false);
        toggle.focus();
      }
    });

    // Cerrar si el viewport vuelve al tamaño de escritorio o rota
    const closeIfDesktop = () => {
      if (window.innerWidth > DESKTOP_BP) setMenu(false);
    };
    window.addEventListener("resize", closeIfDesktop);
    window.addEventListener("orientationchange", () => setMenu(false));
  }

  /* --------- Tabs: Misión / Visión / Historia --------- */
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabPanels.forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      const panel = document.getElementById(target);
      if (panel) panel.classList.add("active");
    });
  });

  /* --------- Video de fondo del hero ---------
     Es puramente decorativo: se reproduce siempre en silencio.
     Se pausa si la pestaña deja de estar visible para ahorrar batería. */
  const video = document.getElementById("hero-video");
  if (video) {
    video.muted = true;
    video.volume = 0;
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) video.pause();
      else if (video.autoplay) video.play().catch(() => {});
    });
  }

  /* --------- Reels: videos promocionales verticales --------- */
  const reels = Array.from(document.querySelectorAll(".reel"));
  if (reels.length) {
    const items = reels
      .map((el) => {
        const vid = el.querySelector(".reel-video");
        const btn = el.querySelector(".reel-toggle");
        const titleEl = el.querySelector(".reel-caption strong");
        return vid && btn
          ? { el, vid, btn, title: titleEl ? titleEl.textContent.trim() : "video" }
          : null;
      })
      .filter(Boolean);

    items.forEach((item) => {
      const { el, vid, btn, title } = item;

      const setReady = (ready) => {
        el.classList.toggle("is-ready", ready);
        btn.disabled = !ready;
        btn.setAttribute("aria-label", `Reproducir video: ${title}`);
        if (!ready) {
          el.classList.remove("is-playing");
          btn.querySelector("i").classList.replace("bi-pause-fill", "bi-play-fill");
        }
      };

      const setPlaying = (playing) => {
        el.classList.toggle("is-playing", playing);
        const icon = btn.querySelector("i");
        if (icon) {
          icon.classList.toggle("bi-play-fill", !playing);
          icon.classList.toggle("bi-pause-fill", playing);
        }
        btn.setAttribute(
          "aria-label",
          `${playing ? "Pausar" : "Reproducir"} video: ${title}`
        );
      };

      // El marcador de posición se oculta en cuanto el archivo existe
      setReady(false);
      vid.addEventListener("loadedmetadata", () => setReady(true));
      vid.addEventListener("error", () => setReady(false), true);
      vid.addEventListener("pause", () => setPlaying(false));
      vid.addEventListener("play", () => setPlaying(true));

      btn.addEventListener("click", () => {
        if (!vid.paused) {
          vid.pause();
          return;
        }
        // Solo un video con sonido a la vez
        items.forEach((other) => {
          if (other !== item && !other.vid.paused) other.vid.pause();
        });
        vid.muted = false;
        const promise = vid.play();
        if (promise && typeof promise.catch === "function") {
          promise.catch(() => setPlaying(false));
        }
      });
    });

    // Pausar lo que salga de pantalla
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              const vid = entry.target.querySelector(".reel-video");
              if (vid && !vid.paused) vid.pause();
            }
          });
        },
        { threshold: 0.25 }
      );
      items.forEach((item) => io.observe(item.el));
    }
  }

  /* --------- Formulario: validación + envío AJAX --------- */
  const form = document.getElementById("inscripcion-form");
  const formStatus = document.getElementById("form-status");
  const formButton = document.getElementById("form-submit-btn");

  if (form && formButton) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      form.querySelectorAll(".input-invalid").forEach((el) =>
        el.classList.remove("input-invalid")
      );

      if (!form.checkValidity()) {
        form.querySelectorAll(":invalid").forEach((el) =>
          el.classList.add("input-invalid")
        );
        if (formStatus) {
          formStatus.innerHTML =
            '<div class="alert alert-warning">Por favor, completa todos los campos obligatorios correctamente.</div>';
        }
        return;
      }

      // Si no hay action real (placeholder), avisar y no romper
      if (!form.action || form.action.includes("TU_ID_AQUI")) {
        if (formStatus) {
          formStatus.innerHTML =
            '<div class="alert alert-warning">El formulario aún no está conectado. Contáctanos por WhatsApp.</div>';
        }
        return;
      }

      const data = new FormData(form);
      const originalText = formButton.textContent;
      formButton.disabled = true;
      formButton.textContent = "Enviando...";

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          if (formStatus) {
            formStatus.innerHTML =
              '<div class="alert alert-success">¡Gracias por tu mensaje! Te contactaremos pronto.</div>';
          }
          form.reset();
        } else {
          if (formStatus) {
            formStatus.innerHTML =
              '<div class="alert alert-error">Hubo un problema al enviar. Intenta nuevamente.</div>';
          }
        }
      } catch (err) {
        if (formStatus) {
          formStatus.innerHTML =
            '<div class="alert alert-error">Problema de conexión. Revisa tu internet e intenta de nuevo.</div>';
        }
      }

      formButton.disabled = false;
      formButton.textContent = originalText;
    });
  }
});