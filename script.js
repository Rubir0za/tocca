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

    // Lógica del Carrusel (ACTIVADA)
    const carouselTrack = document.querySelector('.included-grid');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const carouselItems = document.querySelectorAll('.carousel-item');

    if (carouselTrack && prevButton && nextButton && carouselItems.length > 0) {
        let currentIndex = 0;
        // Ajuste para el ancho del item y el gap
        // Asegúrate de que este cálculo sea correcto con tu CSS real
        const getItemWidth = () => {
            // Calcula el ancho real de un item visible
            const item = carouselItems[0];
            const itemStyle = window.getComputedStyle(item);
            const itemWidth = item.getBoundingClientRect().width;
            const gap = parseFloat(itemStyle.marginRight) || parseFloat(itemStyle.gap); // Ajustar según cómo se defina el gap en CSS
            return itemWidth + (gap || 0); // Asume 0 si no hay gap definido como margin-right
        };


        function moveToSlide(index) {
            if (index < 0) {
                currentIndex = carouselItems.length - 1; // Bucle al final desde el principio
            } else if (index >= carouselItems.length) {
                currentIndex = 0; // Bucle al principio desde el final
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

        // Inicializa la posición del carrusel en caso de que no esté en el índice 0 inicialmente
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
});
