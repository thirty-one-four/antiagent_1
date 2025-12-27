
// ==========================================
// 🚀 SUPABASE CONFIGURATION
// ==========================================
const SUPABASE_URL = 'https://xhkcmfrqlgbxifebisth.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_AvEkK2jlqo_8YLrAjOeggw_6MwJT7tj';

// Initialize the client - renamed to avoid conflict with global supabase library
let supabaseClient;
if (typeof window.supabase !== 'undefined' &&
    SUPABASE_URL !== 'YOUR_SUPABASE_URL_HERE' &&
    SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY_HERE') {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// ==========================================
// ✨ INTERACTIVE STAR BACKGROUND
// ==========================================
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];
const STAR_COUNT = 300;
const MOUSE_RADIUS = 150;

// Resize handling
function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initStars();
}
window.addEventListener('resize', resize);

// Mouse handling
let mouse = { x: -1000, y: -1000 };
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

class Star {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 10) + 1;
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        // Calculate distance from mouse
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        // Repulsion logic
        if (distance < MOUSE_RADIUS) {
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            this.x -= directionX * 5;
            this.y -= directionY * 5;
        } else {
            // Return to original position nicely
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 20;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 20;
            }
        }
        this.draw();
    }
}

function initStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push(new Star());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < stars.length; i++) {
        stars[i].update();
    }
    requestAnimationFrame(animate);
}

// Start animation
resize();
animate();


// ==========================================
// 📡 FORM SUBMISSION
// ==========================================
const form = document.querySelector('#questionForm');
const statusMessage = document.querySelector('#statusMessage');
const questionInput = document.querySelector('#question');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get values
    const question = questionInput.value;
    if (!question) return;

    try {
        statusMessage.className = '';
        statusMessage.textContent = 'Transmitting...';

        if (!supabaseClient) {
            throw new Error('Please configure Supabase credentials in app.js');
        }

        const { data, error } = await supabaseClient
            .from('questions')
            .insert([
                { content: question }
            ]);

        if (error) throw error;

        // Success
        statusMessage.textContent = 'Sent.';
        form.reset();

        // Clear message after a delay
        setTimeout(() => {
            statusMessage.textContent = '';
        }, 3000);

    } catch (err) {
        console.error('Error:', err);
        statusMessage.textContent = err.message || 'Transmission failed.';
    }
});
