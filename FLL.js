/* ================================================ */
/*  FLL.js — AzerHistory 3D  (Tam yenilənmiş)      */
/* ================================================ */

// =======================================
// 2. HERO CANVAS — Floating particles
// =======================================
(function initHeroCanvas() {
    const canvas = document.getElementById("heroCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W,
        H,
        particles = [];

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        const count = Math.floor(W / 12);
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * W,
                y: Math.random() * H,
                r: Math.random() * 1.4 + 0.3,
                dx: (Math.random() - 0.5) * 0.4,
                dy: (Math.random() - 0.5) * 0.4,
                alpha: Math.random() * 0.5 + 0.1
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach((p) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,195,255,${p.alpha})`;
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > W) p.dx *= -1;
            if (p.y < 0 || p.y > H) p.dy *= -1;
        });
        requestAnimationFrame(draw);
    }

    window.addEventListener("resize", () => {
        resize();
        createParticles();
    });
    resize();
    createParticles();
    draw();
})();

// =======================================
// 3. HAMBURGER MENU
// =======================================
const menuBtn = document.getElementById("menu");
const navbar = document.getElementById("navbar");

if (menuBtn && navbar) {
    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        navbar.classList.toggle("active");
    });
    document.addEventListener("click", (e) => {
        if (!navbar.contains(e.target) && !menuBtn.contains(e.target)) {
            navbar.classList.remove("active");
        }
    });
}

// =======================================
// 4. HEADER SCROLL STYLE
// =======================================
window.addEventListener("scroll", () => {
    const header = document.getElementById("mainHeader");
    if (!header) return;
    if (window.scrollY > 80) {
        header.style.padding = "10px 7%";
        header.style.background = "rgba(0,0,0,0.97)";
    } else {
        header.style.padding = "14px 7%";
        header.style.background = "rgba(0,0,0,0.85)";
    }
});

// =======================================
// 5. REVEAL ANIMATION
// =======================================
function checkReveal() {
    document.querySelectorAll(".reveal").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 80) {
            el.classList.add("active");
        }
    });
}
window.addEventListener("scroll", checkReveal);
window.addEventListener("load", checkReveal);

// =======================================
// 6. COUNTER ANIMATION (hero stats)
// =======================================
function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = target >= 10000 ? Math.floor(current).toLocaleString() : Math.floor(current);
    }, 16);
}

const counterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

document.querySelectorAll(".stat-num").forEach((el) => counterObserver.observe(el));

// =======================================
// 7. MODEL-VIEWER LOG
// =======================================
document.querySelectorAll("model-viewer").forEach((mv) => {
    mv.addEventListener("load", () => console.log("✅ Yükləndi:", mv.alt));
    mv.addEventListener("error", () => console.warn("❌ Yüklənmədi:", mv.alt));
});

// =======================================
// 8. MUSIC SYSTEM — now handled by shared music.js
// =======================================

// =======================================
// (Language/i18n now handled by shared lang.js)
