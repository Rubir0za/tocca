document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
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
                observer.unobserve(entry.target); // Dejar de observar una vez que se ha animado
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Lógica del Carrusel
    const carouselTrack = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const carouselItems = document.querySelectorAll('.carousel-item');

    if (carouselTrack && prevButton && nextButton && carouselItems.length > 0) {
        let currentIndex = 0;
        const itemWidth = carouselItems[0].offsetWidth + 30; // Ancho del item + gap

        // Función para mover el carrusel
        function moveToSlide(index) {
            if (index < 0) {
                currentIndex = carouselItems.length - 1; // Volver al final si es menor que 0
            } else if (index >= carouselItems.length) {
                currentIndex = 0; // Volver al inicio si excede el número de items
            } else {
                currentIndex = index;
            }
            carouselTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        }

        nextButton.addEventListener('click', () => {
            moveToSlide(currentIndex + 1);
        });

        prevButton.addEventListener('click', () => {
            moveToSlide(currentIndex - 1);
        });

        // Asegurar que el carrusel se ajuste al redimensionar la ventana
        window.addEventListener('resize', () => {
            // Re-calcular itemWidth si el diseño cambia (responsive)
            const newItemWidth = carouselItems[0].offsetWidth + 30;
            if (newItemWidth !== itemWidth) {
                 // Si el ancho cambia, reajustar la posición actual
                moveToSlide(currentIndex);
            }
        });

        // Clonar elementos para un carrusel "infinito" (opcional y más avanzado, no incluido en esta implementación básica)
        // Para una implementación simple, el carrusel se reinicia al principio/final.
    }
});
