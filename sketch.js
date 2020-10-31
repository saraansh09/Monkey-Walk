var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var food
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 400);
 //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.scale=0.1
  
  ground = createSprite(400,380,1200,50);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.shapeColor="lightgreen";

  FoodGroup = new Group();
  obstacleGroup = new Group();

  score = 0;
  food = 0;
 
}

function draw(){

background("skyblue");
  //displaying score
  text("Score: "+ score, 500,50);
  text("food:"+food,300,50)
  monkey.debug = true 
  
  if(gameState === PLAY){
    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    spawnBanana();
    spawnObstacle();
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space") && monkey.y>=210.3 ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.6;

    
    
    if(obstacleGroup.isTouching(monkey)){
        //trex.velocityY = -12;
        gameState = END; 
    }
  }
   else if (gameState === END) {
     
      ground.velocityX = 0;
      monkey.velocityY = 0;
     
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);    
  
   }
if (FoodGroup.isTouching(monkey)){
    food = food+1
  FoodGroup.destroyEach();
    }
  
  //stop trex from falling down
  monkey.collide(ground);  
  drawSprites();
}

function spawnBanana() {
  //write code here to spawn the clouds
 if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(100,280));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}
function spawnObstacle() {
  //write code here to spawn the clouds
 if (frameCount % 100 === 0) {
    var obstacle = createSprite(600,120,40,10);
    obstacle.y = Math.round(random(330,340));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
    //adjust the depth
    obstacle.depth =monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    obstacleGroup.add(obstacle);
  }
}



