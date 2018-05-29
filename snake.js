/* HTML:
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>repl.it</title>
    <link href="index.css" rel="stylesheet" type="text/css" />
  </head>
  <body>
    <canvas id="snake" width = "400" height = "400"></canvas>
    <script src="index.js"></script>
  </body>
</html> */


window.onload=function(){
  canvas = document.getElementById("snake");
  pen = canvas.getContext("2d");
  document.addEventListener("keydown",keyPush);
  setInterval(game, 1000/15);
};

// these variables are global so don't use 'var' like normal

//player x and y position
player_x = 10;
player_y = 10;

//set grid size to 20 x 20
grid_size = 20;
tile_count = 20;

//player x and y speed
x_speed = 0;
y_speed = 0;

//apple x and y position
apple_x = 15;
apple_y = 15;

// store the whole snake x and y positions
trail=[];
//starting length
tail = 5;

//lives counter
life_counter = 3;

score = 0;

//game logic goes here
function game(){
  //update player position each frame
  player_x += x_speed;
  player_y += y_speed;
  
  //detecting boundaries
  if(player_x < 0){
    player_x = tile_count - 1;
    life_counter = life_counter - 1;
    tail = 5;
  }
  if(player_x > tile_count - 1){
    player_x = 0;
    life_counter = life_counter- 1;
    tail = 5;
  }
  if(player_y < 0){
    player_y = tile_count -1;
    life_counter = life_counter - 1;
    tail = 5;
  }
  if(player_y > tile_count -1){
    player_y = 0;
    life_counter = life_counter - 1;
    tail = 5;
  }
  //create black background
  pen.fillStyle="black";
  pen.fillRect(0,0,canvas.width,canvas.height);
  
  
  //draw the snake 
  pen.fillStyle="#35ff0c";
  
  for(var i=0;i<trail.length;i++){
    pen.fillRect(trail[i].x*grid_size, trail[i].y*grid_size , grid_size - 2, grid_size - 2);
    //detect if the player hits the trail
    if(trail[i].x==player_x&&trail[i].y==player_y){
      //set the snake back to 5 
      life_counter == life_counter- 1;
      tail = 5;
  }
  }
  //display counter
  pen.font=tile_count+("px Tahoma");
  pen.fillStyle = "white";
  pen.textAlign = "center";
  pen.fillText("Lives Left:" + life_counter, 65, 25);
  pen.fillText("Score:" + score, 53, 45);
  
  if (life_counter == 0){
    pen.fillStyle = "black";
    pen.fillRect(0,0,canvas.width,canvas.height);
    pen.fillStyle = "red";
    pen.fillText("Game Over", canvas.width/2, canvas.height/2);
    score = 0;
  }
  
  if (life_counter == -1){
    life_counter = 3;
    player_x = 10;
    player_y = 10;
  }

  countdown = 5;
  countdown_wait = 0;
  
  //adding player position to the trail
  trail.push({x:player_x,y:player_y});
  
  //this trims down the trail of the snake if it exceeds the actual length
  while(trail.length>tail){
    //this deletes the first value of an array
    trail.shift();
  }
  
  //detect apple collision
  if (apple_x == player_x && apple_y == player_y){
    //adding 1 to the tail length
    tail++;
    score = score + 10;
    //moving to random x and y
    apple_x = Math.floor(Math.random()*tile_count);
    apple_y = Math.floor(Math.random()*tile_count);
  }
  
  //draw the apple
  pen.fillStyle="red";
  pen.fillRect(apple_x*grid_size, apple_y*grid_size, grid_size - 2, grid_size - 2);
  
  setInterval(life_counter, 1000);
  
}

function keyPush(evt){
  switch(evt.keyCode){
    case 37: //left arrow
      x_speed = -1;
      y_speed = 0;
      break;
    case 38: //up arrow
      x_speed = 0; 
      y_speed = -1;
      break;
    case 39: //right arrow
      x_speed = 1;
      y_speed = 0;
      break;
    case 40: //downarrow
      x_speed = 0;
      y_speed = 1;
      break;
  }
}
