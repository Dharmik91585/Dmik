// ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
// When you click a navigation link, the page smoothly scrolls to that section
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

// ===== HIGHLIGHT ACTIVE NAVIGATION LINK =====
// This highlights the navigation link of the section currently being viewed
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

// ===== WELCOME MESSAGE IN CONSOLE =====
// This shows a fun message when someone opens the browser console
console.log('%cWelcome to Dharmik\'s Website! 🎉', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cFeel free to explore the code and learn how it works!', 'font-size: 14px; color: #764ba2;');

// ===== ADD ANIMATION ON SCROLL =====
// This makes elements appear with animation as you scroll down the page
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to cards and entries
document.querySelectorAll('.interest-card, .project-card, .journal-entry').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});