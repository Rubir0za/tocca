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
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const carouselItems = document.querySelectorAll('.carousel-item');

    if (carouselTrack && prevButton && nextButton && carouselItems.length > 0) {
        let currentIndex = 0;
        const getItemWidth = () => {
            // Calcular el ancho de un ítem incluyendo el gap
            const itemWidth = carouselItems[0].offsetWidth;
            // Obtener el gap dinámicamente del estilo calculado
            const gap = parseFloat(getComputedStyle(carouselTrack).gap);
            return itemWidth + (isNaN(gap) ? 0 : gap); // Sumar el gap si es un número válido
        };

        function moveToSlide(index) {
            // Lógica de bucle infinito (circular carousel)
            if (index < 0) {
                currentIndex = carouselItems.length - 1; // Si llega al principio, va al final
            } else if (index >= carouselItems.length) {
                currentIndex = 0; // Si llega al final, va al principio
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
            // Reinicia el carrusel a la posición actual para recalcular el offset
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

    /*
       **************************************************************
       * AJUSTE CLAVE 8: LÓGICA DE COLAPSABLES PARA ITINERARIO      *
       * Al hacer clic en una tarjeta de itinerario, se expande/colapsa *
       **************************************************************
    */
    const itineraryCards = document.querySelectorAll('.itinerary-card');
    itineraryCards.forEach(card => {
        card.addEventListener('click', () => {
            // Colapsa cualquier otra tarjeta abierta (opcional, para que solo una esté abierta a la vez)
            itineraryCards.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('active')) {
                    otherCard.classList.remove('active');
                }
            });
            // Expande o colapsa la tarjeta clicada
            card.classList.toggle('active');
        });
    });

    /*
       **************************************************************
       * AJUSTE CLAVE 9: LÓGICA DE COLAPSABLES PARA "QUÉ INCLUYE"   *
       * Al hacer clic en un ítem de "Qué Incluye", se expande/colapsa *
       **************************************************************
    */
    const includedItems = document.querySelectorAll('.included-item');
    includedItems.forEach(item => {
        const toggleElement = item.querySelector('.description-toggle'); // El h3 con la clase description-toggle
        if (toggleElement) {
            toggleElement.addEventListener('click', () => {
                // Colapsa cualquier otro ítem abierto (opcional)
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

});
