document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const mobileMenu = document.getElementById('mobile-menu');
            const hamburgerMenu = document.getElementById('hamburger-menu');
            if (mobileMenu && hamburgerMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                hamburgerMenu.classList.remove('active');
            }

            const targetElement = document.querySelector(this.getAttribute('href'));
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animación de elementos al hacer scroll (Intersection Observer)
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
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

    // Lógica del Carrusel Automático con Fade
    const carouselItems = document.querySelectorAll('.carousel-item');
    if (carouselItems.length > 0) {
        let currentIndex = 0;
        const totalItems = carouselItems.length;

        function showNextItem() {
            // Quita la clase 'active' del item actual
            carouselItems[currentIndex].classList.remove('active');
            
            // Calcula el índice del siguiente item
            currentIndex = (currentIndex + 1) % totalItems;
            
            // Añade la clase 'active' al nuevo item
            carouselItems[currentIndex].classList.add('active');
        }

        // Inicia el carrusel automático
        setInterval(showNextItem, 5000); // Cambia de imagen cada 5 segundos
    }

    // Lógica del Menú Hamburguesa
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburgerMenu && mobileMenu) {
        hamburgerMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
        });
    }
});
