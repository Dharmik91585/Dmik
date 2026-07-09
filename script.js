// ===== MINI GAME: CLICK MASTER ===== 
// A simple, fun reflex-testing game

let gameActive = false;
let gameScore = 0;
let gameTime = 30;
let gameInterval;
let firstSquareId = 1;

function initializeGame() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    
    for (let i = 1; i <= 9; i++) {
        const square = document.createElement('button');
        square.className = 'game-square';
        square.id = `square-${i}`;
        square.textContent = '✓';
        square.addEventListener('click', clickSquare);
        gameBoard.appendChild(square);
    }
}

function startGame() {
    if (gameActive) return;
    
    gameActive = true;
    gameScore = 0;
    gameTime = 30;
    firstSquareId = 1;
    
    document.getElementById('score').textContent = '0';
    document.getElementById('timer').textContent = '30';
    document.getElementById('startBtn').textContent = 'Game Running...';
    document.getElementById('startBtn').disabled = true;
    document.getElementById('instruction').textContent = 'Click the squares!';
    
    initializeGame();
    activateRandomSquare();
    
    gameInterval = setInterval(() => {
        gameTime--;
        document.getElementById('timer').textContent = gameTime;
        
        if (gameTime <= 0) {
            endGame();
        }
    }, 1000);
}

function activateRandomSquare() {
    if (!gameActive) return;
    
    // Hide all squares first
    document.querySelectorAll('.game-square').forEach(sq => {
        sq.classList.remove('hidden');
    });
    
    // Show a random square
    const randomId = Math.floor(Math.random() * 9) + 1;
    firstSquareId = randomId;
}

function clickSquare(e) {
    if (!gameActive) return;
    
    const clickedId = parseInt(e.target.id.split('-')[1]);
    
    if (clickedId === firstSquareId) {
        gameScore++;
        document.getElementById('score').textContent = gameScore;
        activateRandomSquare();
        
        // Bounce effect
        e.target.style.transform = 'scale(0.9)';
        setTimeout(() => {
            e.target.style.transform = 'scale(1)';
        }, 100);
    }
}

function endGame() {
    gameActive = false;
    clearInterval(gameInterval);
    
    document.getElementById('startBtn').textContent = 'Start Game';
    document.getElementById('startBtn').disabled = false;
    document.getElementById('instruction').textContent = `Game Over! Final Score: ${gameScore} points! 🎉`;
    
    // Hide all squares
    document.querySelectorAll('.game-square').forEach(sq => {
        sq.classList.add('hidden');
    });
}

// ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
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
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// ===== CONSOLE WELCOME MESSAGE =====
console.log('%c🎉 Welcome to Dharmik\'s Personal Website!', 'font-size: 24px; color: #667eea; font-weight: bold; text-shadow: 0 0 10px rgba(102, 126, 234, 0.3);');
console.log('%cThanks for visiting! Feel free to explore the code and learn how it\'s built.', 'font-size: 14px; color: #764ba2; font-weight: 500;');
console.log('%c💡 Design tip: This site uses modern psychology principles for better user experience!', 'font-size: 12px; color: #999; font-style: italic;');
console.log('%c🎮 Don\'t forget to play the mini game! Scroll down to find it!', 'font-size: 12px; color: #667eea; font-style: italic;');

// ===== INITIALIZE GAME BOARD ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', initializeGame);