document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA PARA LA BARRA DE NAVEGACIÓN Y MENÚ HAMBURGUESA ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu .nav-link");

    // Abrir/cerrar menú hamburguesa al hacer clic
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            document.body.classList.toggle("no-scroll"); // Opcional: evita el scroll en móvil
        });

        // Cerrar el menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.classList.remove("no-scroll");
            });
        });
    }

    // --- LÓGICA PARA LA ANIMACIÓN AL HACER SCROLL ---
    const sectionsToAnimate = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.1 // se activa cuando el 10% de la sección es visible
    });

    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });
});
