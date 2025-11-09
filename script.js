document.addEventListener("DOMContentLoaded", function () {

  /* =========================================
     DINAMISMO 1: NAVEGACIÓN QUE SE ENCOGE
     ========================================= */
  const navbar = document.getElementById('navbar-ciam');

  window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) { 
      // Si haces scroll HACIA ABAJO más de 50px
      navbar.classList.add('scrolled');
    } else { 
      // Si estás arriba
      navbar.classList.remove('scrolled');
    }
  }, false);


  /* =========================================
     DINAMISMO 2: ANIMACIÓN AL DESPLAZAR
     ========================================= */
  
  // Configuración del Intersection Observer
  const observerOptions = {
    root: null, // Observa en relación al viewport
    rootMargin: '0px',
    threshold: 0.1 // Se activa cuando el 10% del elemento es visible
  };

  // Función "callback" que se ejecuta cuando un elemento entra en la vista
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      // Si el elemento está entrando en la vista
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); // Añade la clase que lo hace visible
        observer.unobserve(entry.target); // Deja de observarlo
      }
    });
  };

  // Crea el observador
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Selecciona TODOS los elementos que tengan la clase ".hidden"
  const hiddenElements = document.querySelectorAll('.hidden');
  
  // Pone a cada elemento ".hidden" bajo observación
  hiddenElements.forEach(el => observer.observe(el));


  /* =========================================
     DINAMISMO 3: ENVÍO DE FORMULARIO (AJAX)
     ========================================= */
  
  const form = document.getElementById("inscripcion-form");
  const formStatus = document.getElementById("form-status");
  const formButton = document.getElementById("form-submit-btn");

  async function handleSubmit(event) {
    event.preventDefault(); // Evita la recarga de la página
    const data = new FormData(event.target);
    
    // Cambia el estado del botón
    formButton.disabled = true;
    formButton.innerText = "Enviando...";

    try {
      const response = await fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Éxito
        formStatus.innerHTML = "<div class='alert alert-success'>¡Gracias por tu mensaje!.</div>";
        form.reset(); // ¡Borra los campos del formulario!
      } else {
        // Error (si Formspree da un error)
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            formStatus.innerHTML = "<div class='alert alert-danger'>" + data["errors"].map(error => error["message"]).join(", ") + "</div>";
          } else {
            formStatus.innerHTML = "<div class='alert alert-danger'>Oops! Hubo un problema al enviar tu formulario.</div>";
          }
        });
      }
    } catch (error) {
      // Error (si no hay conexión)
      formStatus.innerHTML = "<div class='alert alert-danger'>Oops! Hubo un problema de conexión.</div>";
    }

    // Restaura el botón
    formButton.disabled = false;
    formButton.innerText = "ENVIAR PRE-INSCRIPCIÓN";
  }

  // Solo añade el listener si el formulario existe en la página
  if (form) {
    form.addEventListener("submit", handleSubmit);
  }

});