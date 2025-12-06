document.addEventListener("DOMContentLoaded", function () {

  /* =========================================
     DINAMISMO 1: NAVEGACIÓN QUE SE ENCOGE
     ========================================= */
  const navbar = document.getElementById('navbar-ciam');

  if (navbar) {
    window.addEventListener("scroll", function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  /* =========================================
     DINAMISMO 2: ANIMACIÓN AL DESPLAZAR (Fade-In)
     ========================================= */
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach(el => observer.observe(el));

  /* =========================================
     DINAMISMO 3: ENVÍO DE FORMULARIO (Google Sheets)
     ========================================= */
  
  // URL de tu Script de Google (la que me proporcionaste)
  const scriptURL = 'https://script.google.com/macros/s/AKfycbw1pZfDjhz-NwuqnaHCW4cIUzOzuIRFeDEEQcT5n_9LCPDHkMTUZy6I0rtJxMMCIN28/exec';
  const form = document.forms['google-sheet']; // Buscamos por nombre "google-sheet"
  const btn = document.getElementById('form-submit-btn');
  const statusDiv = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      
      // 1. Bloquear botón y mostrar estado
      btn.disabled = true;
      btn.innerHTML = "Enviando información...";
      statusDiv.innerHTML = "";
      statusDiv.className = "mt-3 text-center text-primary fw-bold";

      // 2. Enviar datos a Google Sheets
      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
          // 3. Éxito
          statusDiv.className = "mt-3 text-center text-success fw-bold";
          statusDiv.innerHTML = "<div class='alert alert-success'>¡Gracias! Hemos recibido tu inscripción correctamente.</div>";
          
          // Limpiar formulario
          form.reset();
          
          // Restaurar botón después de 3 segundos
          setTimeout(() => {
              btn.disabled = false;
              btn.innerHTML = "ENVIAR PRE-INSCRIPCIÓN";
          }, 3000);
        })
        .catch(error => {
          // 4. Error
          statusDiv.className = "mt-3 text-center text-danger fw-bold";
          statusDiv.innerHTML = "<div class='alert alert-danger'>Hubo un error al enviar. Por favor contáctanos por WhatsApp.</div>";
          btn.disabled = false;
          btn.innerHTML = "ENVIAR PRE-INSCRIPCIÓN";
          console.error('Error!', error.message);
        });
    });
  }
});