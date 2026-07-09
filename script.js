// ===== MINI GAME: REACTION TIME MASTER ===== 
// Based on evolutionary psychology: Pattern recognition + Decision-making speed
// Science: Tests visual processing speed, motor response time, and sustained attention
// Backed by research on cognitive load and decision fatigue

let gameActive = false;
let gameScore = 0;
let gameTime = 30;
let gameInterval;
let currentActiveSquare = null;
let totalClicks = 0;
let correctClicks = 0;
let gameCombo = 0;

function initializeGame() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    
    for (let i = 1; i <= 9; i++) {
        const square = document.createElement('button');
        square.className = 'game-square';
        square.id = `square-${i}`;
        square.textContent = '';
        square.setAttribute('data-active', 'false');
        square.addEventListener('click', clickSquare);
        gameBoard.appendChild(square);
    }
}

function startGame() {
    if (gameActive) return;
    
    gameActive = true;
    gameScore = 0;
    gameTime = 30;
    totalClicks = 0;
    correctClicks = 0;
    gameCombo = 0;
    
    document.getElementById('score').textContent = '0';
    document.getElementById('timer').textContent = '30';
    document.getElementById('startBtn').textContent = 'Game Running...';
    document.getElementById('startBtn').disabled = true;
    document.getElementById('instruction').textContent = 'Click the glowing squares!';
    
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
    
    // Deactivate previous square
    if (currentActiveSquare) {
        currentActiveSquare.setAttribute('data-active', 'false');
        currentActiveSquare.style.boxShadow = 'none';
    }
    
    // Activate random new square
    const randomId = Math.floor(Math.random() * 9) + 1;
    currentActiveSquare = document.getElementById(`square-${randomId}`);
    currentActiveSquare.setAttribute('data-active', 'true');
    currentActiveSquare.style.boxShadow = '0 0 20px 5px rgba(255, 107, 107, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.3)';
    
    // Pulse animation
    currentActiveSquare.style.animation = 'pulse 0.4s ease-in-out';
}

function clickSquare(e) {
    if (!gameActive) return;
    
    totalClicks++;
    const clickedSquare = e.target;
    const isActive = clickedSquare.getAttribute('data-active') === 'true';
    
    if (isActive) {
        // CORRECT CLICK
        correctClicks++;
        gameCombo++;
        gameScore += gameCombo; // Combo multiplier for consecutive correct clicks
        
        document.getElementById('score').textContent = gameScore;
        
        // Visual feedback
        clickedSquare.style.transform = 'scale(0.85)';
        clickedSquare.style.backgroundColor = '#4ade80';
        
        setTimeout(() => {
            clickedSquare.style.transform = 'scale(1)';
            clickedSquare.style.backgroundColor = '';
        }, 150);
        
        // Move to next square immediately
        setTimeout(() => {
            activateRandomSquare();
        }, 200);
        
    } else {
        // WRONG CLICK - Combo breaks
        gameCombo = 0;
        
        // Visual feedback - shake effect
        clickedSquare.style.animation = 'shake 0.3s ease-in-out';
        clickedSquare.style.backgroundColor = '#ef4444';
        
        setTimeout(() => {
            clickedSquare.style.backgroundColor = '';
            clickedSquare.style.animation = '';
        }, 300);
    }
}

function endGame() {
    gameActive = false;
    clearInterval(gameInterval);
    
    const accuracy = totalClicks > 0 ? Math.round((correctClicks / totalClicks) * 100) : 0;
    
    document.getElementById('startBtn').textContent = 'Start Game';
    document.getElementById('startBtn').disabled = false;
    document.getElementById('instruction').textContent = `Game Over! Final Score: ${gameScore} | Accuracy: ${accuracy}% ✨`;
    
    // Deactivate all squares
    document.querySelectorAll('.game-square').forEach(sq => {
        sq.setAttribute('data-active', 'false');
        sq.style.boxShadow = 'none';
    });
}

// ===== ANIMATIONS ===== 
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

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
console.log('%c🎮 Don\'t forget to play the Reaction Time Master game! Scroll down to find it!', 'font-size: 12px; color: #667eea; font-style: italic;');

// ===== INITIALIZE GAME BOARD ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', initializeGame);