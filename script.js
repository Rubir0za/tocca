document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para los enlaces internos (sin cambios)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
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

    // Animación de elementos al hacer scroll (sin cambios)
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
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

    // --- LÓGICA DEL CARRUSEL (CORREGIDA Y MEJORADA) ---
    const carouselTrack = document.querySelector('.carousel-track');
    // Corregidos los selectores para que coincidan con el HTML (.carousel-button.prev y .next)
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const carouselItems = document.querySelectorAll('.carousel-item');

    if (carouselTrack && prevButton && nextButton && carouselItems.length > 0) {
        let currentIndex = 0;

        // Función mejorada para obtener el ancho total de un elemento (incluyendo el gap)
        const getItemTotalWidth = () => {
            const item = carouselItems[0];
            if (!item) return 0;
            const trackStyle = window.getComputedStyle(carouselTrack);
            const gap = parseFloat(trackStyle.getPropertyValue('gap')) || 0;
            return item.offsetWidth + gap;
        };

        const updateCarouselPosition = () => {
            const itemWidth = getItemTotalWidth();
            const newTransformValue = -currentIndex * itemWidth;
            carouselTrack.style.transition = 'transform 0.5s ease-in-out';
            carouselTrack.style.transform = `translateX(${newTransformValue}px)`;
        };
        
        const moveToSlide = (newIndex) => {
            const container = document.querySelector('.carousel-container');
            const itemWidth = getItemTotalWidth();
            if (itemWidth === 0) return;

            // Calcula cuántos items son visibles a la vez
            const visibleItems = Math.max(1, Math.floor(container.offsetWidth / itemWidth));
            
            // El último índice posible para que la vista no quede vacía
            const maxIndex = carouselItems.length - visibleItems;

            // Lógica de bucle: si se pasa del final, vuelve al inicio y viceversa
            if (newIndex > maxIndex) {
                currentIndex = 0;
            } else if (newIndex < 0) {
                currentIndex = maxIndex;
            } else {
                currentIndex = newIndex;
            }
            
            updateCarouselPosition();
        };

        nextButton.addEventListener('click', () => {
            moveToSlide(currentIndex + 1);
        });

        prevButton.addEventListener('click', () => {
            moveToSlide(currentIndex - 1);
        });

        // Reajusta el carrusel si cambia el tamaño de la ventana para evitar desajustes
        window.addEventListener('resize', () => {
            // Elimina la transición para un ajuste instantáneo
            carouselTrack.style.transition = 'none';
            // Vuelve a una posición válida en caso de que el layout cambie
            moveToSlide(currentIndex);
        });

        // Posiciona el carrusel correctamente al cargar la página
        moveToSlide(currentIndex);
    }

    // Lógica del Menú Hamburguesa (sin cambios)
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburgerMenu && mobileMenu) {
        hamburgerMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
        });
    }
});
