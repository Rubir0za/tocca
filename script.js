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

    // Lógica del Carrusel (ACTIVADA y MEJORADA)
    const carouselTrack = document.querySelector('.carousel-track'); // Asegúrate de que esto sea .carousel-track
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const carouselItems = document.querySelectorAll('.included-item.carousel-item'); // Asegúrate de seleccionar por ambas clases
    const carouselContainer = document.querySelector('.carousel-container'); // Obtener el contenedor del carrusel

    if (carouselTrack && prevButton && nextButton && carouselItems.length > 0 && carouselContainer) {
        let currentIndex = 0;

        // Función MEJORADA para calcular el ancho de un "slide"
        const getItemWidth = () => {
            const carouselContainerWidth = carouselContainer.offsetWidth; // Ancho visible del contenedor

            // En móvil (<= 768px), cada "slide" es el ancho completo del contenedor.
            if (window.innerWidth <= 768) {
                return carouselContainerWidth;
            } else {
                // En escritorio, cada "slide" es el ancho de un ítem más su margen derecho.
                const item = carouselItems[0];
                const itemWidth = item.getBoundingClientRect().width;
                const itemStyle = window.getComputedStyle(item);
                const marginRight = parseFloat(itemStyle.marginRight); // Obtiene el margen derecho del CSS
                return itemWidth + (marginRight || 0); // Suma el ancho del item y su margen
            }
        };

        function moveToSlide(index) {
            // Lógica de bucle para que al ir hacia atrás desde el primero, vaya al último y viceversa
            if (index < 0) {
                currentIndex = carouselItems.length - 1;
            } else if (index >= carouselItems.length) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            carouselTrack.style.transform = `translateX(-${currentIndex * getItemWidth()}px)`;
        }

        nextButton.addEventListener('click', () => {
            moveToSlide(currentIndex + 1);
        });

        prevButton.addEventListener('click', () => {
            moveToSlide(currentIndex - 1);
        });

        // Reajusta la posición del carrusel al cambiar el tamaño de la ventana
        window.addEventListener('resize', () => {
            moveToSlide(currentIndex);
        });

        // Inicializa la posición del carrusel al cargar la página
        moveToSlide(currentIndex);
    }

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
});
