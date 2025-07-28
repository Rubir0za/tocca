document.addEventListener('DOMContentLoaded', function() {

    // --- LOGIC FOR ANIMATION ON SCROLL ---
    const sectionsToAnimate = document.querySelectorAll('.animate-on-scroll');

    // If there are no elements to animate, do not proceed.
    if (sectionsToAnimate.length === 0) {
        return;
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // When a section is visible in the viewport
            if (entry.isIntersecting) {
                // Add the 'is-visible' class to trigger the CSS animation
                entry.target.classList.add('is-visible');
                // Stop observing the section so the animation doesn't repeat
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // Observe intersections relative to the viewport
        threshold: 0.1 // Triggers when at least 10% of the section is visible
    });

    // Observe each of the sections
    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });

});
