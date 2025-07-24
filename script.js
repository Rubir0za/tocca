document.addEventListener('DOMContentLoaded', function() {
    // Ajustar padding superior del body para el fixed header en escritorio
    const desktopNav = document.querySelector('.desktop-nav');
    if (desktopNav) {
        // Usa requestAnimationFrame para asegurar que el cálculo se haga después del renderizado
        requestAnimationFrame(() => {
            const navHeight = desktopNav.offsetHeight;
            document.body.style.paddingTop = navHeight + 'px';
        });

        // Reajustar en caso de redimensionamiento de ventana (útil si la altura del nav cambia)
        window.addEventListener('resize', () => {
            requestAnimationFrame(() => {
                const navHeight = desktopNav.offsetHeight;
                document.body.style.paddingTop = navHeight + 'px';
            });
        });
    }

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

            // Desplazarse al elemento, considerando la altura de la barra de navegación fija
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = desktopNav ? desktopNav.offsetHeight : 0; // Altura de la barra de navegación
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
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
                // Si la sección es el hero, no la desobservamos para permitir cambios de fondo
                if (entry.target.id !== 'hero-section') {
                    observer.unobserve(entry.target);
                }
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

    // Lógica de navegación del menú móvil
    const mobileMenuItems = document.querySelectorAll('#mobile-menu a');
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburgerMenu.classList.remove('active');
        });
    });

    // Lógica del Carrusel de imágenes de fondo del Hero
    const carouselItems = document.querySelectorAll('.hero-background-carousel .carousel-item');
    if (carouselItems.length > 1) { // Solo si hay más de una imagen para el carrusel
        let currentCarouselIndex = 0;

        function showNextCarouselItem() {
            carouselItems[currentCarouselIndex].classList.remove('active');
            currentCarouselIndex = (currentCarouselIndex + 1) % carouselItems.length;
            carouselItems[currentCarouselIndex].classList.add('active');
        }

        // Mostrar la primera imagen activa al cargar
        carouselItems[0].classList.add('active');

        // Cambiar la imagen cada 5 segundos (ajustable)
        setInterval(showNextCarouselItem, 5000);
    }
});
