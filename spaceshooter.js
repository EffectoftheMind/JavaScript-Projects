window.onload = function(){
  canvas = document.createElement("canvas");
  //define width and height
  canvas.width = 640;
  canvas.height = 480;
  //insert into html
  document.body.appendChild(canvas)

  pen = canvas.getContext('2d');
  document.addEventListener("keydown", keyPush);

  //mouse listeners
  document.addEventListener("mousemove", mouseMoveHandler, false);
  document.addEventListener("mousedown", mouseClickHandler, false);

  spaceship = new Image();
  spaceship.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPA3v7fsu1tdwvSs0FPxdgvDqJxaZqU9hZpHsEnwrZ5ci8j4Zz"

  //frames per second
  var fps = 30;
  setInterval(update, 1000/fps);
  //enemy spawn rate
  setInterval(spawn, 1000)
}

lives_left = 3
score = 0

//player stats
player_x = 100;
player_y = 100;
player_speed = 15;
player_dim = 30;

//enemy stats
enemy_list = [];
enemy_speed = 5;
enemy_dim = 25;

//shot stats
shots_list = [];
shot_speed = 7;
shot_dim = 4;

function update(){

  //draw black bacground
  pen.fillStyle = 'black';
  pen.fillRect(0,0,canvas.width,canvas.height)

  //draw player
  /*pen.fillStyle= 'white';
  pen.fillRect(player_x - player_dim/2,
              player_y - player_dim/2,
              player_dim,
              player_dim)*/

  pen.drawImage(spaceship, 
                player_x - player_dim / 2,
                player_y - player_dim / 2,
                player_dim,
                player_dim);

  pen.font=32+("px Tahoma");
  pen.fillStyle = 'white';
  pen.textAlign = 'center';
  pen.fillText("Lives Left:" + lives_left, 85, 30)
  pen.fillText("Score:" + score, 80, 60)

  //drawing our shots list 
  pen.fillStyle = 'lime';
  for(var s = 0; s < shots_list.length; s++){
    shots_list[s].x += shot_speed;
    pen.fillRect(shots_list[s].x - shot_dim / 2,
                shots_list[s].y - shot_dim / 2,
                shot_dim,
                shot_dim);
    for(var e = enemy_list.length - 1; e >= 0; e--){
      //calculate the distance between the shots and enemies
      var diff_x = Math.abs(enemy_list[e].x - shots_list[s].x);
      var diff_y = Math.abs(enemy_list[e].y - shots_list[s].y);
      var dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y);

      //detects if a shot hits the enemy
      if(dist < (shot_dim + enemy_dim) / 2){
        enemy_list.splice(e,1);
        score = score + 10
      }
    }
  }
  pen.fillStyle = 'red';
  for(var e = 0; e < enemy_list.length; e++){
    enemy_list[e].x -= enemy_speed;
    pen.fillRect(enemy_list[e].x - enemy_dim /2,
                enemy_list[e].y - enemy_dim /2,
                enemy_dim,
                enemy_dim);
    var diff_x = Math.abs(enemy_list[e].x - player_x);
    var diff_y = Math.abs(enemy_list[e].y - player_y);
    var dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y);
    
    //detect if an enemy hits our hero
    if(dist < (player_dim + enemy_dim) /2){
      //clear the stats and reset the player if he gets hits
      shots_list = []
      enemy_list = [];
      player_x = player_y = 100;
      lives_left = lives_left -1
      break;
    }
  }
  if(lives_left == 0){
    pen.fillStyle = 'black';
    pen.fillRect(0,0,canvas.width,canvas.height)
    pen.fillStyle = 'red';
    pen.fillText("GAME OVER", canvas.width / 2, canvas.height /2)
  }
}
function spawn(){
  enemy_list.push({x:canvas.width, y:Math.random()*canvas.height});
}

function keyPush(evt){
  switch(evt.keyCode){
    case 37: //left arrow
      player_x -= player_speed
      break;
    case 39: //right arrow
      player_x += player_speed
      break;
    case 38: //up arrow
      player_y -= player_speed
      break;
    case 40: //down arrow
      player_y += player_speed
      break;
    case 32: //spacebar
      shots_list.push({x: player_x, y: player_y})
  }
}

function mouseMoveHandler(e){
  player_y = e.clientY
}

function mouseClickHandler(e){
  //this checks for the left button
  if(e.button == 0){
    shots_list.push({x:player_x, y:player_y})
  }
}
