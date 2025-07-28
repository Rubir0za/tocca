document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA PARA LA ANIMACIÓN AL HACER SCROLL ---
    const sectionsToAnimate = document.querySelectorAll('.animate-on-scroll');

    // Si no hay elementos para animar, no continuar.
    if (sectionsToAnimate.length === 0) {
        return;
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Cuando una sección es visible en el viewport
            if (entry.isIntersecting) {
                // Añade la clase 'is-visible' para activar la animación CSS
                entry.target.classList.add('is-visible');
                // Deja de observar la sección para que la animación no se repita
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // Observa intersecciones relativas al viewport
        threshold: 0.1 // Se activa cuando al menos el 10% de la sección es visible
    });

    // Observa cada una de las secciones
    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });

});
