
//random function to give random speeds to enemy bugs
function getRandomArbitrary(min, max) 
{
  return Math.floor(Math.random() * (max - min)) + min;
}

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.max = 150;//minimum speed for random function
    this.min = 100;//maximum speed for random function
    this.speed = getRandomArbitrary(this.min,this.max);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + (this.speed*dt);
    if(this.x > 550){
            this.x = -100;
            this.speed = getRandomArbitrary(this.min,this.max);
        if(life <= 0)//if life left are zero then stop movement of bugs
            {
                this.speed = 0;
                score = 0;
                gameLevel = 0;
               
            }
        }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var score = 0;
var gameLevel = 1;
var life = 3;
var totalScore = 0;
var count = 0;
var Player = function(x,y)
{   
    this.x= x;
    this.y= y;
    this.sprite = 'images/char-boy.png';
};// Now write your own player class
Player.prototype.resetPlayer = function(){
    this.x = 202;
    this.y = 305;
};

Player.prototype.update = function() {
    //detects collision of bug and player  
     document.getElementById('score&level').innerHTML = "SCORE : " + score + " | GAME LEVEL : " + gameLevel + " | LIFE : " + life;
    for (var i=0;i<3;i++){
            
          if ((this.y + 38 > allEnemies[i].y) && (this.y < allEnemies[i].y + 38) && (this.x + 38 > allEnemies[i].x ) && (this.x < allEnemies[i].x + 38)){
             life -= 1;
             this.resetPlayer();
             score = 0;
          }
        }
     
        if(this.y<-10)
        {
            score += 1;
            this.resetPlayer();
            totalScore += 1;
            gameLevel += 1;
        }    
   
    
         if(life == 0)
             {
                 
                // Create gradient
                ctx.font = "30px Verdana";
                var gradient = ctx.createLinearGradient(0, 0, 10, 0);
                gradient.addColorStop("0", "magenta");
                gradient.addColorStop("0.5", "blue");
                gradient.addColorStop("1.0", "red");

                // Fill with gradient
                ctx.strokeStyle = gradient;
                ctx.strokeText("Game over! ", 180, 40);
                 
                 ctx.font = "20px Verdana";
                var gradient = ctx.createLinearGradient(0, 0, 10, 0);
                gradient.addColorStop("0", "magenta");
                gradient.addColorStop("0.5", "blue");
                gradient.addColorStop("1.0", "red");

                // Fill with gradient
                ctx.strokeStyle = gradient;
                ctx.strokeText("PRESS F5 TO CONTINUE", 155, 600);
                 
             }
    

        

};
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.updateScore = function(){
    this.resetPlayer();
    score += 1;
    count++;
    totalScore += 1;
    if((count%3)==0)
        {
            gameLevel += 1;
            for (var i=0;i<3;i++){
                allEnemies[i].min += 50;
                allEnemies[i].max += 50;
            }
        }
    
};
Player.prototype.handleInput = function(e){
    if( e == 'left')
        {
            this.x -= 101 ;
        }
    if( e == 'right')
        {
            this.x += 101 ;
        }
    if(e == 'up')
       {
           this.y -=85;
       }
    
    if( e == 'down')
        {
            this.y += 85 ;
        }
    
    if(this.y<-10)
        {
           // this.y += (85*4);
           this.updateScore();
        }
    if(this.y>420)
        {
            this.y -= 85*2;
        }
    if(this.x > 420)
      {
          this.x -= 101*3;
      }
    if(this.x < -20)
        {
            this.x += 101*3;
        }
       
};

// This class requires an update(), render() and
// a handleInput() method.
// Now instantiate your objects.
var allEnemies=[ new Enemy(-10,63),new Enemy(-10,146),new Enemy(-10,232)];
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(202,305);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
       
    };
    player.handleInput(allowedKeys[e.keyCode]);
});









