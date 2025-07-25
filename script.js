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

    // Lógica del Carrusel
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');

    if (carouselTrack && carouselItems.length > 0 && prevButton && nextButton) {
        let currentIndex = 0;

        function getItemWidth() {
            // Asegura que el cálculo del ancho del item se haga correctamente considerando el gap
            const itemStyle = window.getComputedStyle(carouselItems[0]);
            const itemWidth = parseFloat(itemStyle.width);
            const gap = parseFloat(window.getComputedStyle(carouselTrack).gap);
            return itemWidth + gap; // Suma el gap para el desplazamiento total por item
        }


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

    // NO LÓGICA DE COLAPSABLES PARA "QUÉ INCLUYE" (ELIMINADO SEGÚN REQUERIMIENTO DE MOSTRAR TODO SIMULTÁNEAMENTE)
    // El código anterior para '.included-item' ha sido removido.

});
