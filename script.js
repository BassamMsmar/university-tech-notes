document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.course-content h2');
    const navLinks = document.querySelectorAll('.toc ul li a');

    if (!sections.length || !navLinks.length) return;

    // Intersection Observer Options
    const options = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to the current section
                const targetId = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.toc ul li a[href="#${targetId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, options);

    // Observe all h2 elements that have an ID
    sections.forEach(section => {
        if (section.getAttribute('id')) {
            observer.observe(section);
        }
    });

    // Smooth scrolling for links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetDOM = document.querySelector(targetId);
            
            if(targetDOM) {
                // Determine a good scroll position considering the fixed header
                const topOffset = targetDOM.getBoundingClientRect().top + window.pageYOffset - 100;
                window.scrollTo({
                    top: topOffset,
                    behavior: 'smooth'
                });
            }
        });
    });
});
