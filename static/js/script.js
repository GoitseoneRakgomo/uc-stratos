const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let W, H;
let particles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class Particle {
  constructor() {
    this.reset(true);
  }

  reset(rand) {
    this.x = Math.random() * W;
    this.y = rand ? Math.random() * H : H + 10;
    this.r = Math.random() * 1.2 + 0.3;
    this.vy = -(Math.random() * 0.25 + 0.08);
    this.vx = (Math.random() - 0.5) * 0.12;
    this.alpha = Math.random() * 0.18 + 0.04;
    this.life = 0;
    this.maxLife = Math.random() * 400 + 300;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life++;
    if (this.life > this.maxLife || this.y < -10) {
      this.reset(false);
    }
  }

  draw() {
    const fade =
      Math.min(this.life / 80, 1) * Math.min((this.maxLife - this.life) / 80, 1);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(128,134,139,${this.alpha * fade})`;
    ctx.fill();
  }
}

for (let i = 0; i < 120; i++) {
  particles.push(new Particle());
}

function loop() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(loop);
}

loop();
