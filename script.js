document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       DINAMISMO 1: NAVEGACIÓN QUE SE ENCOGE
       ========================================= */
    const navbar = document.getElementById('navbar-ciam');

    if (navbar) {
        window.addEventListener("scroll", function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > 50) { 
                navbar.classList.add('scrolled');
            } else { 
                navbar.classList.remove('scrolled');
            }
        }, false);
    }

    /* =========================================
       DINAMISMO 2: ANIMACIÓN AL DESPLAZAR (Intersection Observer)
       ========================================= */
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

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

    // Forzar visibilidad inicial para elementos ya visibles en la pantalla
    // (soluciona problema en móviles donde el observer no detecta elementos visibles al cargar)
    setTimeout(() => {
        hiddenElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            if (rect.top < windowHeight - 50 && rect.bottom > 0) {
                el.classList.add('visible');
                observer.unobserve(el);
            }
        });
    }, 100);


    /* =========================================
       DINAMISMO 3: ENVÍO DE FORMULARIO (AJAX) Y VALIDACIÓN
       ========================================= */
    
    const form = document.getElementById("inscripcion-form");
    const formStatus = document.getElementById("form-status");
    const formButton = document.getElementById("form-submit-btn");

    // Función de validación del lado del cliente
    function validateForm(form) {
        let isValid = true;
        formStatus.innerHTML = ""; // Limpiar mensajes de estado

        // Bootstrap ya maneja la clase 'was-validated', pero podemos forzarla
        form.classList.add('was-validated'); 

        // Recorre todos los campos y verifica si son válidos según HTML5/Bootstrap
        form.querySelectorAll('input:required, select:required, textarea:required').forEach(input => {
            if (!input.checkValidity()) {
                isValid = false;
                // Opcional: desplázate al primer campo inválido para guiar al usuario
                // input.focus(); 
            }
        });

        if (!isValid) {
            formStatus.innerHTML = "<div class='alert alert-warning'>Por favor, completa todos los campos obligatorios correctamente.</div>";
        }

        return isValid;
    }

    async function handleSubmit(event) {
        event.preventDefault(); 
        
        // 🚨 PASO DE VALIDACIÓN AGREGADO 🚨
        if (!validateForm(form)) {
            // Detiene el proceso si la validación falla
            return; 
        }

        const data = new FormData(event.target);
        
        // Cambia el estado del botón
        const originalText = formButton.innerText;
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
                formStatus.innerHTML = "<div class='alert alert-success'>¡Gracias por tu mensaje! Ha sido enviado.</div>";
                form.reset(); // ¡Borra los campos del formulario!
                form.classList.remove('was-validated'); // Quita las validaciones visuales
            } else {
                // Error (si Formspree da un error)
                const errorData = await response.json();
                if (Object.hasOwn(errorData, 'errors')) {
                    formStatus.innerHTML = "<div class='alert alert-danger'>" + errorData["errors"].map(error => error["message"]).join(", ") + "</div>";
                } else {
                    formStatus.innerHTML = "<div class='alert alert-danger'>Oops! Hubo un problema al enviar tu formulario.</div>";
                }
            }
        } catch (error) {
            // Error (si no hay conexión)
            formStatus.innerHTML = "<div class='alert alert-danger'>Oops! Hubo un problema de conexión.</div>";
        }

        // Restaura el botón
        formButton.disabled = false;
        formButton.innerText = originalText;
    }

    // Solo añade el listener si el formulario existe en la página
    if (form) {
        form.addEventListener("submit", handleSubmit);
    }

    /* =========================================
       4. CONTROL DE VOLUMEN (VIDEO DE FONDO)
       ========================================= */
    const video = document.getElementById('hero-video');
    const muteBtn = document.getElementById('mute-btn');
    const muteIcon = document.getElementById('mute-icon');

    if (video && muteBtn) {
        muteBtn.addEventListener('click', function () {
            if (video.muted) {
                video.muted = false; // Activar sonido
                muteIcon.classList.remove('bi-volume-mute-fill');
                muteIcon.classList.add('bi-volume-up-fill');
            } else {
                video.muted = true; // Silenciar
                muteIcon.classList.remove('bi-volume-up-fill');
                muteIcon.classList.add('bi-volume-mute-fill');
            }
        });
    }
});