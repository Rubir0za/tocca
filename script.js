document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA PARA EL SLIDESHOW DEL HERO ---
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        // La animación ahora se maneja puramente por CSS con @keyframes fadeSlideshow
        // y no necesita la clase 'active' o setInterval para el cambio de slides.
        // Si se desea control JS para el slideshow, habría que añadir/quitar la clase 'active'
        // y manejar la opacidad con JS en lugar de la animación CSS.
        // Por ahora, se mantiene el CSS para un slideshow más suave y menos propenso a 'jumps'.
    }

    // --- LÓGICA PARA EL MENÚ DE SUPERPOSICIÓN (OVERLAY MENU) ---
    const menuToggle = document.getElementById('menuToggle');
    const overlayMenu = document.getElementById('overlayMenu');
    const closeMenuButton = document.getElementById('closeMenu');
    const overlayMenuLinks = document.querySelectorAll('#overlayMenu ul li a');

    if (menuToggle && overlayMenu && closeMenuButton) {
        // Abrir el menú al hacer clic en el ícono de hamburguesa
        menuToggle.addEventListener('click', function(event) {
            event.preventDefault(); // Evita el comportamiento de enlace predeterminado
            overlayMenu.classList.add('open');
            document.body.style.overflow = 'hidden'; // Evita el scroll del cuerpo cuando el menú está abierto
        });

        // Cerrar el menú al hacer clic en el botón de cerrar (X)
        closeMenuButton.addEventListener('click', function(event) {
            event.preventDefault(); // Evita el comportamiento de enlace predeterminado
            overlayMenu.classList.remove('open');
            document.body.style.overflow = ''; // Restaura el scroll del cuerpo
        });

        // Cerrar el menú al hacer clic en cualquier enlace dentro del menú
        overlayMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                overlayMenu.classList.remove('open');
                document.body.style.overflow = ''; // Restaura el scroll del cuerpo
            });
        });
    }

    // --- LÓGICA PARA LA ANIMACIÓN AL HACER SCROLL ---
    // (Esta parte asume que tienes elementos con la clase 'animate-on-scroll' en tu HTML)
    const sectionsToAnimate = document.querySelectorAll('.animate-on-scroll'); // Renombrado para evitar conflicto

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
