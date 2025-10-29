function saveCurrentLesson() {
    const currentPage = window.location.pathname.split('/').pop();
    const lessonId = currentPage.split('.')[0];
    if (!currentPage.startsWith('les')) {
        return; // Not a lesson page
    } else if (currentPage.startsWith('les')) {
        const completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];
        if (!completedLessons.includes(lessonId)) {
            completedLessons.push(lessonId);
            // Add the current chapter ID to the list if it's not already there
        }
    }
}

function goToCurrentChapter() {
    const completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];
    let currentLesson;

    if (completedLessons.length === 0) {
        currentLesson = 'les1.html';
    } else {
        const lastCompletedLesson = completedLessons[completedLessons.length - 1];
        currentLesson = `${lastCompletedLesson}.html`;
    }

    window.location.href = `Lessons/${currentLesson}`;
}
function goToNextLesson() {
    const completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];
    let nextLesson;

    if (completedLessons.length === 0) {
        nextLesson = 'les1.html';
    } else {
        const lastCompletedLesson = completedLessons[completedLessons.length - 1];
        const lessonNumber = parseInt(lastCompletedLesson.replace('les', ''), 10);
        nextLesson = `les${lessonNumber + 1}.html`;
    }

    window.location.href = `Lessons/${nextLesson}`;
}



function homepageCapterLink() {
    // Hide the link if the current page is les1.html
    if (currentLesson === 'les1.html') {
        homepageLesson.hidden = 'true';
    } else {
        // Otherwise, make sure it's visible and points to the right place
        homepageLesson.hidden = 'false';
        homepageLesson.onclick = goToCurrentChapter;
    }
}

function lessonsCapterLink() {
    if (currentLesson === 'les1') {
        this.innerHTML = 'Start Lessons &rarr;';
    } else {
        this.innerHTML = 'Continue Lessons';
    }
}


function goToPastLesson() {
    const completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];
    let pastLesson;

    if (completedLessons.length <= 1) {
        pastLesson = 'les1.html';
    } else {
        const lastCompletedLesson = completedLessons[completedLessons.length - 1];
        const lessonNumber = parseInt(lastCompletedLesson.replace('les', ''), 10);
        pastLesson = `les${lessonNumber - 1}.html`;
    }

    window.location.href = `Lessons/${pastLesson}`;
}

function goToNextLesson() {
    const completedLessons = JSON.parse(localStorage.getItem('completedLessons')) || [];
    let nextLesson;

    if (completedLessons.length === 0) {
        nextLesson = 'les1.html';
    } else {
        const lastCompletedLesson = completedLessons[completedLessons.length - 1];
        const lessonNumber = parseInt(lastCompletedLesson.replace('les', ''), 10);
        nextLesson = `les${lessonNumber + 1}.html`;
    }

    window.location.href = `Lessons/${nextLesson}`;
}
window.onload = saveCurrentLesson;


//plexus code
const canvas = document.getElementById('plexusCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const numParticles = 100;
const maxDistance = 100; // Max distance for connecting lines

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = Math.random() * 2 - 1; // Random velocity x (-1 to 1)
        this.vy = Math.random() * 2 - 1; // Random velocity y (-1 to 1)
        this.radius = Math.random() * 2 + 1; // Random radius
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
    }
}

function init() {
    resizeCanvas();
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - (distance / maxDistance)})`;
                ctx.stroke();
            }
        }
    }
}

window.addEventListener('resize', resizeCanvas);
init();
animate();