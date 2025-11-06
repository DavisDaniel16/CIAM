document.addEventListener("DOMContentLoaded", function () {

  /* NAVEGACIÓN QUE SE ENCOGE */
  const navbar = document.getElementById('navbar-ciam'); // <- Cambiado a 'navbar-ciam'

  // Función para manejar el scroll
  window.onscroll = function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };


  /* ANIMACIÓN AL DESPLAZAR */
  // Configuración del Intersection Observer
  const observerOptions = {
    root: null, 
    rootMargin: '0px',
    threshold: 0.1 
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      // Si el elemento está entrando en la vista
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); 
      }
    });
  };

  // Crea el observador
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Selecciona TODOS los elementos que tengan la clase ".hidden"
  const hiddenElements = document.querySelectorAll('.hidden');
  
  // Pone a cada elemento ".hidden" bajo observación
  hiddenElements.forEach(el => observer.observe(el));

});