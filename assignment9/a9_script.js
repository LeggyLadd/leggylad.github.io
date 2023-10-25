const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

const boundaryX = 50;
const boundaryY = 50;
const boundaryWidth = canvas.width - 2 * boundaryX;
const boundaryHeight = canvas.height - 2 * boundaryY;

const objectSize = 30;
const maxParticles = 100; // Maximum number of particles
const particles = [];

let isDragging = false;
let dragTargetX = canvas.width / 2;
let dragTargetY = canvas.height / 2;

function getRandomYellowColor() {
    const hue = Math.floor(Math.random() * 50) + 1600;
    const saturation = 100;
    const lightness = Math.floor(Math.random() * 40) + 60;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function createParticle() {
    const x = boundaryX + objectSize + Math.random() * (boundaryWidth - objectSize * 2);
    const y = boundaryY + objectSize + Math.random() * (boundaryHeight - objectSize * 2);
    const speedX = (Math.random() - 0.5) * 5;
    const speedY = (Math.random() - 0.5) * 5;
    const color = getRandomYellowColor();
    return { x, y, speedX, speedY, color };
}

function initializeParticles(num) {
    for (let i = 0; i < num; i++) {
        particles.push(createParticle());
    }
    updateButtons();
}

function clearCanvas() {
    particles.length = 0; // Clear all particles
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateButtons();
}

function updateButtons() {
    const objectCount = particles.length;
    const spawn10Button = document.getElementById('spawn10');
    const spawn50Button = document.getElementById('spawn50');
    const spawn100Button = document.getElementById('spawn100');

    if (objectCount >= 100) {
        spawn10Button.disabled = true;
        spawn50Button.disabled = true;
        spawn100Button.disabled = true;
        spawn10Button.style.opacity = 0.5;
        spawn50Button.style.opacity = 0.5;
        spawn100Button.style.opacity = 0.5;
        spawn10Button.style.cursor = 'not-allowed';
        spawn50Button.style.cursor = 'not-allowed';
        spawn100Button.style.cursor = 'not-allowed';
    } else {
        spawn10Button.disabled = false;
        spawn50Button.disabled = false;
        spawn100Button.disabled = false;
        spawn10Button.style.opacity = 1;
        spawn50Button.style.opacity = 1;
        spawn100Button.style.opacity = 1;
        spawn10Button.style.cursor = 'pointer';
        spawn50Button.style.cursor = 'pointer';
        spawn100Button.style.cursor = 'pointer';
    }
}

initializeParticles(0); // Start with an empty canvas

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#3a7bd5';
    ctx.lineWidth = 5;
    ctx.strokeRect(boundaryX, boundaryY, boundaryWidth, boundaryHeight);

    if (isDragging) {
        const dx = dragTargetX - canvas.width / 2;
        const dy = dragTargetY - canvas.height / 2;
        if (Math.sqrt(dx * dx + dy * dy) < canvas.width / 2) {
            particles.forEach((particle, index) => {
                const angleOffset = (index / maxParticles) * Math.PI * 2;
                const orbitRadius = 30; // Adjust the orbit radius to your liking
                const orbitX = dragTargetX + Math.cos(angleOffset) * orbitRadius;
                const orbitY = dragTargetY + Math.sin(angleOffset) * orbitRadius;
                const dx = orbitX - particle.x;
                const dy = orbitY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance > 5) {
                    const angle = Math.atan2(dy, dx);
                    particle.x += Math.cos(angle) * 2;
                    particle.y += Math.sin(angle) * 2;
                }
            });
        }
    }

    particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Ensure particles stay within the canvas boundaries
        if (particle.x < boundaryX) {
            particle.x = boundaryX;
            particle.speedX *= -1;
        } else if (particle.x > boundaryX + boundaryWidth - objectSize) {
            particle.x = boundaryX + boundaryWidth - objectSize;
            particle.speedX *= -1;
        }

        if (particle.y < boundaryY) {
            particle.y = boundaryY;
            particle.speedY *= -1;
        } else if (particle.y > boundaryY + boundaryHeight - objectSize) {
            particle.y = boundaryY + boundaryHeight - objectSize;
            particle.speedY *= -1;
        }

        ctx.fillStyle = particle.color;
        ctx.fillRect(particle.x, particle.y, objectSize, objectSize);
    });

    requestAnimationFrame(animate);
}

canvas.addEventListener('mousedown', (event) => {
    isDragging = true;
    dragTargetX = event.clientX - canvas.getBoundingClientRect().left;
    dragTargetY = event.clientY - canvas.getBoundingClientRect().top;
});

canvas.addEventListener('mousemove', (event) => {
    if (isDragging) {
        dragTargetX = event.clientX - canvas.getBoundingClientRect().left;
        dragTargetY = event.clientY - canvas.getBoundingClientRect().top;
    }
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
});

const spawn10Button = document.getElementById('spawn10');
spawn10Button.addEventListener('click', () => {
    // Add 10 objects when the button is clicked
    if (particles.length + 10 <= maxParticles) {
        initializeParticles(10);
    }
});

const spawn50Button = document.getElementById('spawn50');
spawn50Button.addEventListener('click', () => {
    // Add 50 objects when the button is clicked
    if (particles.length + 50 <= maxParticles) {
        initializeParticles(50);
    }
});

const spawn100Button = document.getElementById('spawn100');
spawn100Button.addEventListener('click', () => {
    // Add 100 objects when the button is clicked
    if (particles.length + 100 <= maxParticles) {
        initializeParticles(100);
    }
});

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => {
    // Clear the canvas when the button is clicked
    clearCanvas();
});

animate();