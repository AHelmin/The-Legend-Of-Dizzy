import {ChangeScore}  from "../src/components/ChangeScore";

/*  
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

const font = new FontFace(
  "Press Start 2P", 
  
  "url(https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK3nVivNm4I81.woff2)", 
);
document.fonts.add(font);

// Create the canvas for the game to display in
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  // show the background image
  // var pat = ctx.createPattern(bgImage, 'repeat');
  // ctx.rect(0, 0, 800, 600);
  // ctx.fillStyle = pat;
  // ctx.fill();
  bgReady = true;
};
bgImage.src = "./grasstest.png";

// Load the background image


// Load the player image
var playerReady = false;
var playerImage = new Image();
playerImage.onload = function () {
  // show the player image
  playerReady = true;
};
playerImage.src = "character.png";

// Load the enemy image
var enemyReady = false;
var enemyImage = new Image();
enemyImage.onload = function () {
  // show the enemy image
  enemyReady = true;
};
enemyImage.src = "dogbone.png";

// Create the game objects
var player = {
  speed: 200 // movement speed of player in pixels per second
};
var enemy = {};
var enemiesCaught = 0;
var door = {};

// Handle keyboard controls
var keysDown = {};

// Check for keys pressed where key represents the key pressed
addEventListener("keydown", function (event) {
  keysDown[event.key] = true;
}, false);

addEventListener("keyup", function (event) {
  delete keysDown[event.key];
}, false);

// Reset the player and enemy positions when player catches an enemy
var reset = function (round) {
  if (round === 1) {
  // Reset player's position to centre of canvas
  player.x = canvas.width / 2;
  player.y = canvas.height / 2;
  round++
  }

  // Place the enemy somewhere on the canvas randomly
  enemy.x = enemyImage.width - 10 + (Math.random() * (canvas.width - (enemyImage.width*2)));
  enemy.y = enemyImage.height - 10 + (Math.random() * (canvas.height - (enemyImage.height*2)));
};

// Update game objects - change player position based on key pressed
var update = function (modifier) {
  if ("ArrowUp" in keysDown || "w" in keysDown) { // Player is holding up key
    player.y -= player.speed * modifier;
  }
  if ("ArrowDown" in keysDown || "s" in keysDown) { // Player is holding down key
    player.y += player.speed * modifier;
  }
  if ("ArrowLeft" in keysDown || "a" in keysDown) { // Player is holding left key
    player.x -= player.speed * modifier;
  }
  if ("ArrowRight" in keysDown || "d" in keysDown) { // Player is holding right key
    player.x += player.speed * modifier;
  }

  // Check if player and enemy collide
  if (
    player.x <= (enemy.x + enemyImage.width)
    && enemy.x <= (player.x + playerImage.width)
    && player.y <= (enemy.y + enemyImage.height)
    && enemy.y <= (player.y + playerImage.height)
  ) {
    ++enemiesCaught;
    let currentScore = ChangeScore(5);
    reset();
  }
};

// Draw everything on the canvas
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }

  if (playerReady) {
    ctx.drawImage(playerImage, player.x, player.y);
  }

  if (enemyReady) {
    ctx.drawImage(enemyImage, enemy.x, enemy.y);
  }


  // Display score and time 
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "18px 'Press Start 2P'";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Bones found: " + enemiesCaught, 20, 20);
  ctx.fillText("Time: " + count, 20, 50);

  //Load the font
font.load().then(
  () => {
    // Display game over message when timer finished
  if(finished==true){
    ctx.font = "24px 'Press Start 2P'";
    ctx.textAlign = "center";
    const x = canvas.width / 2;
    ctx.fillText(enemiesCaught + " bones found!", x, 220);
    ctx.fillText("Time to go find Dizzy!", x, 320);

    door.x = 300;
    door.y = 0;
    // Check if player enters door
  if (
    player.x <= (door.x + 128)
    && door.x <= (player.x + playerImage.width)
    && player.y <= (door.y + 32)
    && door.y <= (player.y + playerImage.height)
  ) {
    document.location.replace("/snes-rpg/levels/open-field.html")
  }
};
  },
  (err) => {
    console.error(err);
  },
);
};

var count = 10; // how many seconds the game lasts for - default 30
var finished = false;
var counter =function(){
  count=count-1; // countown by 1 every second
  // when count reaches 0 clear the timer, hide enemy and player and finish the game
  	if (count <= 0)
  	{
  		// stop the timer
     	clearInterval(counter);
     	// set game to finished
     	finished = true;
     	count=0;
     	// hider enemy and player
     	enemyReady=false;
     	// playerReady=false;
  	}

}

// timer interval is every second (1000ms)
setInterval(counter, 1000);

// The main game loop
var main = function () {
  // run the update function
  update(0.02); // do not change
  // run the render function
  render();
  // Request to do this again ASAP
  requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
// var w = window;
// requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
reset(1);
main();