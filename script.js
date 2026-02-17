const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 700;

/* PASSARINHO */
let bird = {
  x: 80,
  y: 250,
  radius: 13,
  gravity: 0.1,
  velocity: -2,
  jump: -5
};

/* CANOS */
let pipes = [];
let frame = 0;
let score = 0;
let gameOver = false;

document.addEventListener("keydown", jump);
document.addEventListener("click", jump);

function jump(){
  if(gameOver) location.reload();
  bird.velocity = bird.jump;
}

/* DESENHAR PASSARO */
function drawBird(){
  ctx.beginPath();
  ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI*2);
  ctx.fillStyle = "yellow";
  ctx.fill();
}

/* DESENHAR CANOS */
function drawPipes(){
  ctx.fillStyle = "green";
  pipes.forEach(pipe=>{
    ctx.fillRect(pipe.x, 0, 60, pipe.top);
    ctx.fillRect(pipe.x, pipe.bottom, 60, canvas.height);
  });
}

/* CRIAR CANOS */
function updatePipes(){
  if(frame % 180 === 0){
    let gap = 170;
    let top = Math.random()*250 + 50;

    pipes.push({
      x: canvas.width,
      top: top,
      bottom: top + gap,
      passed:false
    });
  }

  pipes.forEach(pipe=>{
    pipe.x -= 2;

    // COLISÃO
    if(
      bird.x + bird.radius > pipe.x &&
      bird.x - bird.radius < pipe.x + 60 &&
      (bird.y - bird.radius < pipe.top || bird.y + bird.radius > pipe.bottom)
    ){
      gameOver = true;
    }

    // PONTOS
    if(!pipe.passed && pipe.x + 60 < bird.x){
      score++;
      pipe.passed = true;
    }
  });
}

/* SCORE */
function drawScore(){
  ctx.fillStyle="black";
  ctx.font="30px Arial";
  ctx.fillText("JAIR JARENCHUK: "+score,10,40);
}

/* GAME LOOP */
function update(){
  frame++;
  ctx.clearRect(0,0,canvas.width,canvas.height);

  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  if(bird.y > canvas.height || bird.y < 0){
    gameOver = true;
  }

  updatePipes();
  drawPipes();
  drawBird();
  drawScore();

  if(!gameOver){
    requestAnimationFrame(update);
  }else{
    ctx.fillStyle="red";
    ctx.font="40px Arial";
    ctx.fillText("SIRLENE LUIZ DE ANDRADE",90,300);
    ctx.font="20px Arial";
    ctx.fillText("Clique para reiniciar",95,340);
  }
}

update();
