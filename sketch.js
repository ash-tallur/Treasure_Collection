// variables are created for the game
var path, boy, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;

//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload() {
  // images are loaded here
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png", "Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("gameOver.png");
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  // Moving background
  path = createSprite(width / 2, 200);
  path.addImage(pathImg);
  path.velocityY = 5;

  //creating boy running
  boy = createSprite(width / 2, height - 20, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;
  boy.setCollider("rectangle", 0, 0, 1500, 1500);
  boy.debug = true

  // new groups are created cash , diamonds,jwellery,swords
  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();
}

function draw() {

  if (gameState === PLAY) {
    background("gray");
    boy.x = World.mouseX;

    //edges are created for the boy to collide the edges
    edges = createEdgeSprites();
    boy.collide(edges);

    //code to reset the background
    if (path.y > 400) {
      path.y = 3;
    }

    // different functions are created
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    //if cash , jewellery or diamond id touching the boy the score increases and destroy's itself
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;
    } else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 10

    } else if (jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 5
    }

    // if the boy is touching swords the game is over everything is destroyed and the boy changes to gameOver image
    if (swordGroup.isTouching(boy)) {
      gameState = END
      boy.addAnimation("SahilRunning", endImg)
      boy.scale = 1
      boy.x = width / 2
      boy.y = height / 2
      cashG.destroyEach()
      cashG.velocityYEach = 0
      diamondsG.destroyEach()
      diamondsG.velocityYEach = 0
      jwelleryG.destroyEach()
      jwelleryG.velocityYEach = 0
      swordGroup.destroyEach()
      swordGroup.velocityYEach = 0
    }

    drawSprites();

    //displaying score 
    textSize(50);
    fill(255);
    text("Treasure: " + treasureCollection, 60, 50);
  }
}
// function created for cash
function createCash() {
  if (World.frameCount % 200 == 0) {
    var cash = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = Math.round(width / cash.velocityY);
    cashG.add(cash);
  }
}

// function created for diamonds
function createDiamonds() {
  if (World.frameCount % 320 == 0) {
    var diamonds = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = Math.round(width / diamonds.velocityY);
    diamondsG.add(diamonds);
  }
}

// function created for jwellery
function createJwellery() {
  if (World.frameCount % 410 == 0) {
    var jwellery = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = Math.round(width / jwellery.velocityY);
    jwelleryG.add(jwellery);
  }
}

//function creared for swords
function createSword() {
  if (World.frameCount % 530 == 0) {
    var sword = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = Math.round(width / sword.velocityY);
    swordGroup.add(sword);
  }
}