// Audio Control
const music = document.getElementById('bg-music');

// Scene Transitions
function switchScene(currentId, nextId) {
    document.getElementById(currentId).classList.remove('active');
    document.getElementById(currentId).classList.add('hidden');
    
    document.getElementById(nextId).classList.remove('hidden');
    document.getElementById(nextId).classList.add('active');
}

// 1. Hold Button Logic
const holdBtn = document.getElementById('hold-btn');
let holdTimer;

holdBtn.addEventListener('mousedown', startHold);
holdBtn.addEventListener('touchstart', startHold); // For mobile
holdBtn.addEventListener('mouseup', endHold);
holdBtn.addEventListener('touchend', endHold);

function startHold() {
    // Try to play music on first interaction
    music.play().catch(e => console.log("User must interact first"));
    
    holdBtn.style.transform = "scale(1.2)";
    // Hold for 2 seconds to trigger next scene
    holdTimer = setTimeout(() => {
        switchScene('scene-intro', 'scene-cards');
    }, 1500); 
}

function endHold() {
    clearTimeout(holdTimer);
    holdBtn.style.transform = "scale(1)";
}

// 2. Card Swipe Logic
function flyAway(card) {
    card.classList.add('fly-away');
    // After animation, remove from DOM to allow clicking the one below
    setTimeout(() => {
        card.style.display = 'none';
    }, 500);
}

function showTicket() {
    switchScene('scene-cards', 'scene-ticket');
}

function showGallery() {
    switchScene('scene-ticket', 'scene-gallery');
}

function showLetter() {
    switchScene('scene-gallery', 'scene-letter');
}

function startFloatingHearts() {
    const container = document.getElementById('heart-container');
    
    // 1. Make the container visible
    container.style.display = 'block';

    // 2. Start creating hearts
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Random Position & Size
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = Math.random() * 2 + 3 + "s"; // 3-5 seconds
        
        // Randomize size slightly
        const size = Math.random() * 0.5 + 0.8; 
        heart.style.transform = `scale(${size}) rotate(-45deg)`;
        
        container.appendChild(heart);
        
        // Clean up heart after animation to keep site smooth
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 300); // New heart every 300ms
}

function openLetter() {
    const envelope = document.querySelector('.envelope');
    envelope.classList.add('open');

}
