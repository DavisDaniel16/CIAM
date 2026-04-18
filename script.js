document.addEventListener("DOMContentLoaded", function () {

    //Navegación dinámica (Sticky Navbar)
    const navbar = document.getElementById('navbar-ciam');
    if (navbar) {
        window.addEventListener("scroll", function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 50) { 
                navbar.classList.add('scrolled');
            } else { 
                navbar.classList.remove('scrolled');
            }
        });
    }

    //Animaciones al hacer scroll (Intersection Observer)
    const hiddenElements = document.querySelectorAll('.hidden');
    if (hiddenElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        hiddenElements.forEach(el => observer.observe(el));
    }

    //Validación y envío del formulario (AJAX)
    const form = document.getElementById("inscripcion-form");
    if (form) {
        const phoneInput = document.getElementById("telefono");
        const nameInput = document.getElementById("nombre");
        const formStatus = document.getElementById("form-status");
        const formButton = document.getElementById("form-submit-btn");

        if (phoneInput) {
            phoneInput.addEventListener("input", function() {
                this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
                if (this.value.length === 10) {
                    this.classList.add("is-valid");
                    this.classList.remove("is-invalid");
                } else {
                    this.classList.remove("is-valid");
                }
            });
        }

        if (nameInput) {
            nameInput.addEventListener("blur", function() {
                if (this.value.length > 3) {
                    this.classList.add("is-valid");
                    this.classList.remove("is-invalid");
                }
            });
        }

        form.addEventListener("submit", async function(e) {
            e.preventDefault();
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }

            const data = new FormData(form);
            const originalText = formButton.innerText;
            formButton.disabled = true;
            formButton.innerText = "Enviando...";

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formStatus.innerHTML = "<div class='alert alert-success'>¡Gracias! Mensaje enviado correctamente.</div>";
                    form.reset();
                    form.classList.remove('was-validated');
                } else {
                    formStatus.innerHTML = "<div class='alert alert-danger'>Error al enviar. Inténtalo de nuevo.</div>";
                }
            } catch (error) {
                formStatus.innerHTML = "<div class='alert alert-danger'>Error de conexión.</div>";
            }
            formButton.disabled = false;
            formButton.innerText = originalText;
        });
    }

    //Efecto Parallax en el Hero
    const hero = document.querySelector('.hero-section');
    const heroContent = document.querySelector('.animate-up');
    if (hero && heroContent && window.innerWidth > 992) {
        hero.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) / 50;
            const moveY = (e.clientY - window.innerHeight / 2) / 50;
            heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        hero.addEventListener('mouseleave', () => {
            heroContent.style.transform = `translate(0px, 0px)`;
            heroContent.style.transition = 'transform 0.5s ease-out';
        });
        hero.addEventListener('mouseenter', () => {
            heroContent.style.transition = 'none';
        });
    }

    //Control de sonido del video de fondo
    const video = document.getElementById('hero-video');
    const muteBtn = document.getElementById('mute-btn');
    const muteIcon = document.getElementById('mute-icon');

    if (video && muteBtn && muteIcon) {
        video.muted = true;
        muteBtn.onclick = function() {
            if (video.muted) {
                video.muted = false;
                video.volume = 1.0;
                video.play();
                muteIcon.className = 'bi bi-volume-up-fill';
                muteBtn.style.backgroundColor = 'var(--ciam-gold)';
                muteBtn.style.color = 'var(--ciam-black)';
            } else {
                video.muted = true;
                muteIcon.className = 'bi bi-volume-mute-fill';
                muteBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                muteBtn.style.color = 'white';
            }
        };
    }

    //Galería de imágenes (Lightbox)
    const galleryImages = document.querySelectorAll('.card-program img, .carousel-item img');
    if (galleryImages.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-img" src="" alt="Vista ampliada">
        `;
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector('.lightbox-img');
        const closeBtn = lightbox.querySelector('.lightbox-close');

        galleryImages.forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
    }
});