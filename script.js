const canvas = document.getElementById('rain-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let raindrops = [];

class Raindrop {
    constructor(x, y, speed, length) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.length = length;
    }

    fall() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = -this.length;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        ctx.strokeStyle = 'rgba(156, 152, 152, 0.6)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

function createRaindrops() {
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speed = Math.random() * 5 + 2;
        const length = Math.random() * 15 + 5;
        raindrops.push(new Raindrop(x, y, speed, length));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    raindrops.forEach(drop => {
        drop.fall();
        drop.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    raindrops = [];
    createRaindrops();
});

createRaindrops();
animate();

// Audio Controls
const audioPlayer = document.getElementById('audio-player');
const volumeIcon = document.getElementById('volume-icon');

volumeIcon.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
});

audioPlayer.addEventListener('play', updateVolumeIcon);
audioPlayer.addEventListener('pause', updateVolumeIcon);

function updateVolumeIcon() {
    const wave1 = document.getElementById('volume-wave-1');
    const wave2 = document.getElementById('volume-wave-2');

    if (audioPlayer.paused) {
        wave1.style.display = 'none';
        wave2.style.display = 'none';
    } else {
        wave1.style.display = 'block';
        wave2.style.display = 'block';
    }
}

// Set initial state
updateVolumeIcon();

// Typewriter effect
const typewriterText = document.getElementById('typewriter-text');
const typewriterText2 = document.getElementById('typewriter-text-2');
const scrollDownArrow = document.getElementById('scroll-down-arrow');
const text = "Hi there unknown visitor... Welcome to my Web page!";
const text2 = "Kahraman, dedicated to continuous learning and professional growth.";
let i = 0;

function typeWriter(element, txt, index, callback) {
    if (!element) return;

    if (index === 0) {
        element.innerHTML = '';
        element.classList.add('typing'); // Add typing class at the beginning
    }

    if (index < txt.length) {
        element.innerHTML += txt.charAt(index);
        setTimeout(() => typeWriter(element, txt, index + 1, callback), 100);
    } else {
        // When typing is done, remove the class that shows the caret
        element.classList.remove('typing');
        if (callback) {
            callback();
        }
    }
}

function startTypewriters() {
    typeWriter(typewriterText, text, 0, () => {
        setTimeout(() => {
            typewriterText.style.display = 'none';
            typewriterText2.style.display = 'block';
            typeWriter(typewriterText2, text2, 0, () => {
                if (scrollDownArrow) {
                    scrollDownArrow.classList.remove('hidden');
                }
            });
        }, 1000);
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    startTypewriters();
    
    const audioPlayer = document.getElementById('audio-player');

    const startAudio = () => {
        if (audioPlayer && audioPlayer.paused) {
            audioPlayer.play().catch(error => {
                console.log("Audio playback failed:", error);
            });
        }
    };
    
    document.addEventListener('click', startAudio, { once: true });

    const hideArrow = () => {
        if (scrollDownArrow && !scrollDownArrow.classList.contains('hidden')) {
            scrollDownArrow.classList.add('hidden');
        }
    };

    if (scrollDownArrow) {
        scrollDownArrow.addEventListener('click', hideArrow);
    }

    window.addEventListener('scroll', hideArrow);
});

