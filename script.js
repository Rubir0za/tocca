document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA PARA EL SLIDESHOW DEL HERO ---
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        slides[0].classList.add('active'); // Activa el primer slide inicialmente

        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // Cambia de imagen cada 5 segundos (5000 milisegundos)
    }

    // --- LÓGICA PARA LA ANIMACIÓN AL HACER SCROLL ---
    const sections = document.querySelectorAll('.animate-on-scroll');
    
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

    sections.forEach(section => {
        observer.observe(section);
    });

});
