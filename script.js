document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor logic
    const cursor = document.getElementById('cursor-follower');
    
    // Check if device supports hover
    const isHoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (cursor && isHoverCapable && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        const iteractives = document.querySelectorAll('a, .avatar');
        iteractives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.backgroundColor = 'rgba(167, 139, 250, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.backgroundColor = 'transparent';
            });
        });
    } else if (cursor) {
        cursor.style.display = 'none';
    }

    // Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });
    
    // Smooth scroll for nav links
    document.querySelectorAll('.header nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Background fade on scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        // Fade in slowly (over 150% of viewport height)
        const maxScroll = window.innerHeight * 1.5;
        let opacity = (scrollY / maxScroll) * 0.35;
        if (opacity > 0.35) opacity = 0.35;
        document.documentElement.style.setProperty('--bg-opacity', opacity);
    });
});
