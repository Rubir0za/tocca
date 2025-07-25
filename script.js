document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            // Cerrar el menú móvil si está abierto al hacer clic en un enlace
            const mobileMenu = document.getElementById('mobile-menu');
            const hamburgerMenu = document.getElementById('hamburger-menu');
            if (mobileMenu && hamburgerMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                hamburgerMenu.classList.remove('active');
            }

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animación de elementos al hacer scroll (Intersection Observer)
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null, // relativo al viewport
        rootMargin: '0px',
        threshold: 0.2 // 20% de la sección debe ser visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Lógica del Menú Hamburguesa
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburgerMenu && mobileMenu) {
        hamburgerMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            hamburgerMenu.classList.toggle('active'); // Para la animación de la "X"
        });
    }

    /*
       **************************************************************
       * AJUSTE CLAVE 8: LÓGICA DE COLAPSABLES PARA "QUÉ INCLUYE"   *
       * Al hacer clic en un ítem de "Qué Incluye", se expande/colapsa *
       **************************************************************
    */
    const includedItems = document.querySelectorAll('.included-item.itinerary-card');
    includedItems.forEach(item => {
        const cardHeader = item.querySelector('.card-header');
        if (cardHeader) {
            cardHeader.addEventListener('click', () => {
                // Colapsa cualquier otro ítem abierto (opcional, para que solo uno esté abierto a la vez)
                includedItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                // Expande o colapsa el ítem clicado
                item.classList.toggle('active');
            });
        }
    });

    // Automatic Carousel Sliding
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        // The animation is now handled purely by CSS using `@keyframes slideImages`
        // The JavaScript part for manual control (buttons) is removed.
        // We only need to ensure the track and items are correctly sized and the animation runs.
        // No additional JS needed for auto-sliding beyond the CSS keyframes.
    }
});
