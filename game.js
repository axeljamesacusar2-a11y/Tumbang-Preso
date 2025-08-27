const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

let slipper = { x: 300, y: 350, radius: 10, thrown: false, vx: 0, vy: 0 };
let can = { x: 290, y: 100, width: 20, height: 40, hit: false };
let statusText = document.getElementById('statusText');

function drawCan() {
  if (!can.hit) {
    ctx.fillStyle = 'gray';
    ctx.fillRect(can.x, can.y, can.width, can.height);
  }
}

function drawSlipper() {
  ctx.beginPath();
  ctx.arc(slipper.x, slipper.y, slipper.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.closePath();
}

function resetGame() {
  slipper = { x: 300, y: 350, radius: 10, thrown: false, vx: 0, vy: 0 };
  can = { x: 290, y: 100, width: 20, height: 40, hit: false };
  statusText.textContent = "Click to throw the tsinelas!";
}

function update() {
  if (slipper.thrown) {
    slipper.x += slipper.vx;
    slipper.y += slipper.vy;
    slipper.vy += 0.2; // gravity

    // collision detection
    if (
      !can.hit &&
      slipper.x > can.x &&
      slipper.x < can.x + can.width &&
      slipper.y > can.y &&
      slipper.y < can.y + can.height
    ) {
      can.hit = true;
      statusText.textContent = "🎉 You hit the can! Press anywhere to play again.";
    }

    // out of bounds
    if (slipper.y > canvas.height) {
      statusText.textContent = "😢 You missed! Press anywhere to try again.";
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCan();
  drawSlipper();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', (e) => {
  if (!slipper.thrown) {
    let rect = canvas.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;

    // calculate velocity
    let dx = mouseX - slipper.x;
    let dy = mouseY - slipper.y;
    slipper.vx = dx / 20;
    slipper.vy = dy / 20;
    slipper.thrown = true;
  } else {
    resetGame();
  }
});

gameLoop();
