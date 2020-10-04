var monkey, monkey_running, bananaImage, stoneImage, jungleImage, score, bg, ground, obstaclesGroup, FoodGroup, score;

function preload(){
 monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  jungleImage = loadImage("jungle.jpg");

bananaImage = loadImage("banana.png");

stoneImage = loadImage("stone.png");
 
}


function setup() {
  createCanvas(550, 400);
  
  bg = createSprite(200, 200, 400, 400);
  bg.addImage("background", jungleImage);
  bg.velocityX = -3;
  bg.x = bg.width/2;
  bg.scale = 1.15;
  
  ground = createSprite(400,380,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  monkey = createSprite(100,360,20,50);
  monkey.addAnimation("Running",monkey_running);
  monkey.scale = 0.1;
  
  obstaclesGroup = new Group();
  FoodGroup = new Group();
  
  score = 0;
}

function draw() {
  background(220);
  
  
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  

  if(bg.x<0){
   bg.x = bg.width/2;
   }
  
  if(ground.x<0){
   ground.x = ground.width/2;
   }
  
   if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
  
  
  
  monkey.collide(ground);
  
  spawnObstacles();
  spawnFood();
  
  drawSprites();
  
  textSize(25);
  stroke("red");
  fill("green");
  
  text("Score : "+ score, 370, 30);
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(stoneImage);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}