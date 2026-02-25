// ============================================
// Valentine's Day Website - Interactive Script
// ============================================

// Love Messages Array
const loveMessages = [
    "You are my everything! 💕",
    "I love you to the moon and back! 🌙",
    "You make my heart skip a beat! 💓",
    "Forever and always, my love! 💞",
    "You are my sunshine! ☀️",
    "My heart belongs to you! 💖",
    "You complete me! 💗",
    "Every love song is about you! 🎵",
    "You are my dream come true! ✨",
    "I fall for you every single day! 🌹",
    "You are the best thing in my life! 🌟",
    "My love for you is endless! ♾️",
    "You are my favorite person! 💝",
    "Thank you for loving me! 🥰",
    "You are my happy place! 🏠"
];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initLoveOverlay();
    initFloatingHearts();
    initInteractiveHeart();
    initScrollReveal();
    initMusicToggle();
    initParallaxEffect();
});

// ============================================
// Love Question Overlay
// ============================================
let girlfriendName = 'Beautiful';

function initLoveOverlay() {
    const overlay = document.getElementById('love-overlay');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const hintText = document.getElementById('hint-text');
    const mainContent = document.getElementById('main-content');
    const openLetterBtn = document.getElementById('open-letter-btn');
    const startBtn = document.getElementById('start-btn');
    const nameInput = document.getElementById('girlfriend-name');
    const colorSelect = document.getElementById('favorite-color');

    let noClickCount = 0;

    const funnyMessages = [
        "Hehe, you can't click me! 😜",
        "Nice try! But no! 💕",
        "Come on, you know you love me! 🥰",
        "The No button is scared! 😂",
        "Just say YES already! 💖",
        "I'm too fast for you! 😎",
        "You're only making me run more! 🏃‍♂️💨",
        "Love always wins! 💗",
        "Stop chasing me! Click YES! 😘",
        "I'll never let you click me! 💝"
    ];

    // Start button - apply personalization and go to greeting
    startBtn.addEventListener('click', () => {
        // Get the name
        girlfriendName = nameInput.value.trim() || 'Beautiful';

        // Get the color and apply theme
        const selectedColor = colorSelect.value;
        applyColorTheme(selectedColor);

        // Update all name placeholders
        updateNamePlaceholders(girlfriendName);

        // Go to greeting step
        goToStep(2);
    });

    // Handle Next buttons for dialogue flow
    document.querySelectorAll('.next-btn').forEach(btn => {
        if (btn.id !== 'start-btn') {
            btn.addEventListener('click', () => {
                const nextStep = btn.dataset.next;
                if (nextStep) {
                    goToStep(nextStep);
                }
            });
        }
    });

    // Handle Quiz option buttons
    document.querySelectorAll('.quiz-option').forEach(btn => {
        btn.addEventListener('click', () => {
            const nextStep = btn.dataset.next;
            if (nextStep) {
                // Add selected animation
                btn.style.background = 'var(--gradient-romantic)';
                btn.style.color = 'white';
                btn.style.transform = 'scale(1.05)';

                // Go to next question after brief delay
                setTimeout(() => {
                    goToStep(nextStep);
                }, 300);
            }
        });
    });

    // Yes button click - go to next step (happy response)
    yesBtn.addEventListener('click', () => {
        createCelebration();
        setTimeout(() => {
            goToStep(4);
        }, 500);
    });

    // No button - escape on hover/touch
    function moveNoButton() {
        const btnRect = noBtn.getBoundingClientRect();

        // Calculate random position within reasonable bounds
        const maxX = window.innerWidth - btnRect.width - 50;
        const maxY = window.innerHeight - btnRect.height - 50;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${Math.max(50, randomX)}px`;
        noBtn.style.top = `${Math.max(50, randomY)}px`;
        noBtn.style.zIndex = '10002';

        // Show funny message
        noClickCount++;
        hintText.textContent = funnyMessages[noClickCount % funnyMessages.length];

        // Make Yes button bigger after several attempts
        if (noClickCount >= 3) {
            yesBtn.style.transform = `scale(${1 + noClickCount * 0.1})`;
        }

        // After many attempts, make No button smaller
        if (noClickCount >= 5) {
            noBtn.style.transform = `scale(${Math.max(0.5, 1 - noClickCount * 0.05)})`;
        }
    }

    // Desktop: Move on hover
    noBtn.addEventListener('mouseenter', moveNoButton);

    // Mobile: Move on touch
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoButton();
    });

    // Also move if they somehow manage to click
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveNoButton();
    });

    // Open Love Letter button - reveal main content
    openLetterBtn.addEventListener('click', () => {
        createCelebration();

        setTimeout(() => {
            overlay.classList.add('hidden');
            mainContent.classList.remove('hidden');

            setTimeout(() => {
                overlay.style.display = 'none';
            }, 1000);
        }, 500);
    });
}

// Go to a specific dialogue step
function goToStep(stepNumber) {
    const allSteps = document.querySelectorAll('.dialogue-step');
    const targetStep = document.getElementById(`step-${stepNumber}`);

    // Hide current step with exit animation
    allSteps.forEach(step => {
        if (step.classList.contains('active')) {
            step.classList.add('exit');
            setTimeout(() => {
                step.classList.remove('active', 'exit');
            }, 400);
        }
    });

    // Show target step after animation
    setTimeout(() => {
        targetStep.classList.add('active');
    }, 400);
}

// Apply color theme based on selection
function applyColorTheme(color) {
    // Remove any existing theme classes
    document.body.classList.remove('theme-pink', 'theme-purple', 'theme-blue', 'theme-red', 'theme-green', 'theme-gold');

    // Apply new theme (pink is default, no class needed)
    if (color !== 'pink') {
        document.body.classList.add(`theme-${color}`);
    }
}

// Update all name placeholders with the girlfriend's name
function updateNamePlaceholders(name) {
    document.querySelectorAll('.name-placeholder').forEach(el => {
        el.textContent = name;
    });

    // Also update the love letter content
    const letterTitle = document.querySelector('.letter-title');
    if (letterTitle) {
        letterTitle.textContent = `My Dearest ${name},`;
    }

    // Update the hero title
    const heroTitle = document.querySelector('.title');
    if (heroTitle) {
        heroTitle.textContent = `To My Dearest ${name}`;
    }
}

// Create celebration hearts explosion
function createCelebration() {
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💞', '💝', '🩷', '💘'];

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.className = 'celebrate-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.top = `${Math.random() * 100}vh`;
            heart.style.fontSize = `${20 + Math.random() * 40}px`;
            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 1500);
        }, i * 50);
    }
}

// ============================================
// Floating Hearts Background
// ============================================
function initFloatingHearts() {
    const container = document.getElementById('hearts-container');
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💞', '💝', '🩷', '🤍'];

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

        // Random properties
        const size = Math.random() * 20 + 15;
        const left = Math.random() * 100;
        const duration = Math.random() * 5 + 8;
        const delay = Math.random() * 2;

        heart.style.cssText = `
            left: ${left}%;
            font-size: ${size}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;

        container.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, (duration + delay) * 1000);
    }

    // Create initial hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(createHeart, i * 300);
    }

    // Continue creating hearts
    setInterval(createHeart, 1500);
}

// ============================================
// Interactive Heart Click
// ============================================
function initInteractiveHeart() {
    const bigHeart = document.getElementById('big-heart');
    const loveMessage = document.getElementById('love-message');
    let currentIndex = 0;

    bigHeart.addEventListener('click', () => {
        // Add animation class
        bigHeart.classList.add('clicked');

        // Create burst effect
        createHeartBurst(bigHeart);

        // Change message
        currentIndex = (currentIndex + 1) % loveMessages.length;
        loveMessage.style.opacity = '0';
        loveMessage.style.transform = 'translateY(20px)';

        setTimeout(() => {
            loveMessage.textContent = loveMessages[currentIndex];
            loveMessage.style.opacity = '1';
            loveMessage.style.transform = 'translateY(0)';
        }, 300);

        // Remove animation class
        setTimeout(() => {
            bigHeart.classList.remove('clicked');
        }, 600);
    });
}

// Create heart burst effect
function createHeartBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const hearts = ['❤️', '💕', '💖', '💗', '💓'];

    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('span');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: 24px;
            pointer-events: none;
            z-index: 1000;
            animation: burstOut 1s ease-out forwards;
        `;

        // Random direction
        const angle = (i / 12) * 360;
        const distance = 100 + Math.random() * 50;
        const tx = Math.cos(angle * Math.PI / 180) * distance;
        const ty = Math.sin(angle * Math.PI / 180) * distance;

        heart.style.setProperty('--tx', `${tx}px`);
        heart.style.setProperty('--ty', `${ty}px`);

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1000);
    }
}

// Add burst animation style
const burstStyle = document.createElement('style');
burstStyle.textContent = `
    @keyframes burstOut {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(burstStyle);

// ============================================
// Scroll Reveal Animation
// ============================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.letter-container, .reason-card, .timeline-content, .final-content'
    );

    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }

    // Initial check
    checkReveal();

    // Check on scroll
    window.addEventListener('scroll', checkReveal);
}

// ============================================
// Music Toggle (Visual Only)
// ============================================
function initMusicToggle() {
    const musicBtn = document.getElementById('music-toggle');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;

        if (isPlaying) {
            musicBtn.classList.add('playing');
            musicBtn.innerHTML = '<span class="music-icon">🎶</span>';
        } else {
            musicBtn.classList.remove('playing');
            musicBtn.innerHTML = '<span class="music-icon">🎵</span>';
        }

        // Create visual feedback
        createMusicNotes(musicBtn);
    });
}

// Create floating music notes
function createMusicNotes(element) {
    const rect = element.getBoundingClientRect();
    const notes = ['🎵', '🎶', '💕', '♪', '♫'];

    for (let i = 0; i < 5; i++) {
        const note = document.createElement('span');
        note.textContent = notes[Math.floor(Math.random() * notes.length)];
        note.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top}px;
            font-size: 20px;
            pointer-events: none;
            z-index: 99;
            animation: floatNote 2s ease-out forwards;
            animation-delay: ${i * 0.1}s;
        `;

        const randomX = (Math.random() - 0.5) * 100;
        note.style.setProperty('--tx', `${randomX}px`);

        document.body.appendChild(note);

        setTimeout(() => note.remove(), 2000);
    }
}

// Add music note animation
const noteStyle = document.createElement('style');
noteStyle.textContent = `
    @keyframes floatNote {
        0% {
            transform: translate(-50%, 0) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(calc(-50% + var(--tx)), -100px) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(noteStyle);

// ============================================
// Parallax Effect
// ============================================
function initParallaxEffect() {
    const hero = document.getElementById('hero');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        if (hero) {
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });
}

// ============================================
// Cursor Trail Hearts (Optional Feature)
// ============================================
document.addEventListener('mousemove', (e) => {
    // Only create trail occasionally
    if (Math.random() > 0.95) {
        createCursorHeart(e.clientX, e.clientY);
    }
});

function createCursorHeart(x, y) {
    const heart = document.createElement('span');
    heart.textContent = '💕';
    heart.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 16px;
        pointer-events: none;
        z-index: 1000;
        animation: cursorFade 1s ease-out forwards;
    `;

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1000);
}

// Add cursor heart animation
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    @keyframes cursorFade {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -100px) scale(0.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(cursorStyle);

// ============================================
// Smooth Scroll for Navigation
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ============================================
// Easter Egg: Konami Code
// ============================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;

        if (konamiIndex === konamiCode.length) {
            triggerEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function triggerEasterEgg() {
    const hearts = '❤️💕💖💗💓💞💝🩷❣️💘';
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ff6b9d 0%, #c9184a 100%);
            color: white;
            padding: 40px 60px;
            border-radius: 30px;
            font-family: 'Dancing Script', cursive;
            font-size: 2.5rem;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 20px 60px rgba(201, 24, 74, 0.4);
            animation: popIn 0.5s ease-out;
        ">
            💖 I Love You Forever! 💖
        </div>
    `;

    document.body.appendChild(message);

    // Create massive heart explosion
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                top: 100vh;
                font-size: ${20 + Math.random() * 30}px;
                pointer-events: none;
                z-index: 9999;
                animation: riseUp 3s ease-out forwards;
            `;
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 3000);
        }, i * 50);
    }

    setTimeout(() => message.remove(), 3000);
}

// Add easter egg animations
const easterStyle = document.createElement('style');
easterStyle.textContent = `
    @keyframes popIn {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.2); }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
    @keyframes riseUp {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(easterStyle);

console.log('%c💕 Made with love 💕', 'font-size: 24px; color: #c9184a; font-family: cursive;');

// ============================================
// AI Chatbot Widget
// ============================================
// API configuration is loaded from config.js

function initChatbot() {
    const container = document.getElementById('chatbot-container');
    const toggle = document.getElementById('chatbot-toggle');
    const messagesContainer = document.getElementById('chatbot-messages');
    const input = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send');

    if (!container || !toggle) return;

    // Open chatbot automatically on page load
    container.classList.add('open');
    input.focus();

    // Toggle chat window
    toggle.addEventListener('click', () => {
        container.classList.toggle('open');
        if (container.classList.contains('open')) {
            input.focus();
        }
    });

    // Send message
    function sendMessage() {
        const message = input.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, 'user');
        input.value = '';

        // Show typing indicator
        showTypingIndicator();

        // Send to API
        sendToAI(message);
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Add message to chat
    function addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}`;
        messageDiv.innerHTML = `<div class="message-content">${content}</div>`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }

    // Send message to AI API (Gemini)
    async function sendToAI(message) {
        try {
            // Use askLoveAssistant from config.js if available
            if (typeof askLoveAssistant === 'function') {
                const aiMessage = await askLoveAssistant(message);
                removeTypingIndicator();
                addMessage(aiMessage, 'bot');
                return;
            }

            // Direct Gemini API call
            const response = await fetch(`${CONFIG.API_URL}?key=${CONFIG.API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `${CONFIG.SYSTEM_PROMPT}\n\nUser: ${message}`
                        }]
                    }]
                })
            });

            removeTypingIndicator();

            if (response.ok) {
                const data = await response.json();
                const aiMessage = data.candidates[0].content.parts[0].text;
                addMessage(aiMessage, 'bot');
                return;
            }

            // Fallback romantic responses if API fails
            const fallbackResponses = [
                "Aww, that's so sweet! 💕 Love is in the air today! 🥰",
                "You're such a romantic soul! 💖 Keep spreading the love! ✨",
                "That's beautiful! 💕 Remember, love makes everything better! 🌹",
                "How lovely! 💗 Wishing you endless happiness and love! 😊",
                "You have such a big heart! 💝 Keep being amazing! 🦋"
            ];
            const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
            addMessage(randomResponse, 'bot');

        } catch (error) {
            removeTypingIndicator();
            // Fallback response on error
            addMessage("I'm feeling the love today! 💕 How can I help make your Valentine's Day special? 🥰", 'bot');
        }
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', initChatbot);
