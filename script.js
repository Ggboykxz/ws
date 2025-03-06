document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animation Observer
    const observeScrollAnimations = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-animate-active');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, {
            threshold: 0.1 // Trigger when at least 10% of the element is visible
        });

        // Observe all elements with scroll-animation class
        document.querySelectorAll('.scroll-animation').forEach(element => {
            observer.observe(element);
        });
    };

    // Fallback for browsers that don't support IntersectionObserver
    const scrollFallback = () => {
        const elements = document.querySelectorAll('.scroll-animation');
        const checkPosition = () => {
            elements.forEach(element => {
                const positionFromTop = element.getBoundingClientRect().top;
                if (positionFromTop - window.innerHeight <= 0) {
                    element.classList.add('scroll-animate-active');
                }
            });
        };
        window.addEventListener('scroll', checkPosition);
        checkPosition(); // Check positions on load
    };

    // Initialize scroll animations
    if ('IntersectionObserver' in window) {
        observeScrollAnimations();
    } else {
        scrollFallback();
    }

    // Get DOM elements
    const burgerBtn = document.getElementById('burger-btn');
    const closeBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    // Toggle mobile menu
    const toggleMobileMenu = (show) => {
        if (!mobileMenu) {
            console.warn('Mobile menu element not found');
            return;
        }
        
        if (show) {
            mobileMenu.classList.remove('hidden');
        } else {
            mobileMenu.classList.add('hidden');
        }
    };

    // Add click event listeners
    if (burgerBtn) {
        burgerBtn.addEventListener('click', () => toggleMobileMenu(true));
    } else {
        console.warn('Burger button element not found');
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => toggleMobileMenu(false));
    } else {
        console.warn('Close button element not found');
    }
});
