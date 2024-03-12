import {useTypedMessage} from '../hooks'

// Create the canvas for the game to display in
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;
ctx.fillStyle = "black";
ctx.fillRect(0, 0, 1000, 800);
document.body.appendChild(canvas);
var bgReady = true;

// Load the player image
var garyReady = false;
var garyImage = new Image();
garyImage.onload = function () {
  // show the player image
  garyReady = true;
};
garyImage.src = "gary-pixelated-small.png";
garyImage.width = 200;

// Create the game objects
var gary = {
  // speed: 200 // movement speed of player in pixels per second
};

// Draw everything on the canvas
var render = function () {
  if (bgReady) {
    // ctx.drawImage(bgImage, 0, 0);
  }
  if (garyReady) {
    ctx.drawImage(garyImage, 350, 100);
  }
}

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
  //update(0.02); // do not change
  // run the render function
  render();
  // Request to do this again ASAP
  // requestAnimationFrame(main);
};

// Let's play this game!
main();