// ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
// This makes elements fade in as they come into view (psychology: progressive disclosure)
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

// Apply to all major sections
document.querySelectorAll('.interest-card, .project-card, .journal-entry, .about-content').forEach(element => {
    element.classList.add('fade-in-section');
    observer.observe(element);
});

// ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
// Enhanced for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ACTIVE NAVIGATION LINK INDICATOR =====
// Highlights current section (psychology: clear visual feedback)
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// ===== PARALLAX EFFECT ON HERO =====
// Subtle depth effect (psychology: dimension and engagement)
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// ===== CONSOLE WELCOME MESSAGE =====
// Easter egg for developers
console.log('%c🎉 Welcome to Dharmik\'s Personal Website!', 'font-size: 24px; color: #667eea; font-weight: bold; text-shadow: 0 0 10px rgba(102, 126, 234, 0.3);');
console.log('%cThanks for visiting! Feel free to explore the code and learn how it\'s built.', 'font-size: 14px; color: #764ba2; font-weight: 500;');
console.log('%c💡 Design tip: This site uses modern psychology principles for better user experience!', 'font-size: 12px; color: #999; font-style: italic;');

// ===== PERFORMANCE: LAZY LOAD ANIMATIONS =====
// Only animate when visible (saves CPU)
const lazyAnimateOnScroll = () => {
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', lazyAnimateOnScroll);
lazyAnimateOnScroll(); // Run on page load