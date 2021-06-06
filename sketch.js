var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;
var obst,obstImg,obst2,obst2Img,obst3,obst3Img
var opp,opp2,opp3
var oppImg,opp2Img,opp3Img
var oppImg2,opp2Img2,opp3Img3
var gameOver,gameOverImg
var bell
var END =0;
var PLAY =1;
var gameState = PLAY;
var ground;
var distance=0;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  obstImg=loadImage("obstacle1.png");
  obst2Img=loadImage("obstacle2.png");
  obst3Img=loadImage("obstacle3.png");
  oppImg=loadAnimation("opponent1.png","opponent2.png")
  oppImg2=loadAnimation("opponent3.png")
  opp2Img=loadAnimation("opponent4.png","opponent5.png")
  opp2Img2=loadAnimation("opponent6.png")
   opp3Img=loadAnimation("opponent7.png","opponent8.png")
  opp3Img2=loadAnimation("opponent9.png")
  ground=loadImage("Road.png")
  gameOverImg=loadImage("gameOver.png")
  
  bell=loadSound("bell.mp3")
}

function setup(){
  
createCanvas(1500,500);
  
// Moving background
path=createSprite(175,350,1000,100);
path.addImage(pathImg);

path.scale=2
//creating boy running
mainCyclist  = createSprite(0,350,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.addAnimation("SahilCollide",mainRacerImg2);
mainCyclist.scale=0.07;

  
 mainCyclist.setCollider("circle",0,0,500);
  
  gameOver=createSprite(275,250,10,10)
  gameOver.addImage("gameover",gameOverImg)
  gameOver.visible=false;
  obstG=new Group();
  obst2G=new Group();
  obst3G=new Group();
  oppG=new Group();
  opp2G=new Group();
  opp3G=new Group();
}

function draw() {
  background(ground);
   drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  mainCyclist.velocityX=0;
  path.velocityX=0;
  
  if(gameState===PLAY){
  
   mainCyclist.y = World.mouseY;
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = displayWidth/2;
  }
  
    if(mainCyclist.isTouching(oppG)){
      opp.changeAnimation("fall",oppImg2)
      opp.lifetime=-1;
      gameState=END;
       
    }
    if (mainCyclist.isTouching(opp2G)){
      opp2.changeAnimation("fall2",opp2Img2)
      opp2.lifetime=-1;
      gameState=END;
    }
    if(mainCyclist.isTouching(opp3G)){
      opp3.changeAnimation("fall3",opp3Img2)
      opp3.lifetime=-1;
      gameState=END;
      
    }
    if (mainCyclist.isTouching(obstG)||mainCyclist.isTouching(obst2G)||mainCyclist.isTouching(obst3G)){
      gameState=END;
        oppG.destroyEach();
      
        }
    
    if (keyDown("space")){
       bell.play();
    }
    camera.position.x=mainCyclist.x;
    camera.position.y=displayHeight/2
    if(keyDown(RIGHT_ARROW)){
      mainCyclist.velocityX=10;
      path.velocityX=-10;
      var rand=Math.round(random(1,3));
      switch(rand){
        case 1:obstacle();
          break;
        case 2:obstacle2();
          break;
        case 3:obstacle3();
          break;
          default:break;
      }
      var select_Rand=Math.round(random(1,3));
    switch(select_Rand){
      case 1:opponent();
        break;
      case 2:opponent2();
        break;
      case 3:opponent3();
        break;
        default:break;
      }
     console.log(mainCyclist.x);
      
      
    
    gameOver.x=mainCyclist.x;
    }
    distance=distance+Math.round(getFrameRate()/60);
    if(mainCyclist.x > 5060){
      gameState=END
    }
 }
  else if (gameState==END){
    path.velocityX=0;
    mainCyclist.changeAnimation("SahilCollide",mainRacerImg2)
    obstG.setVelocityXEach(0);
    obst2G.setVelocityXEach(0);
    obst3G.setVelocityXEach(0);
    oppG.setVelocityXEach(0);
    opp2G.setVelocityXEach(0);
    opp3G.setVelocityXEach(0);
    gameOver.visible=true;
    text("Press upArrow to restart",mainCyclist.x,300);
   
    if (keyDown("UP_ARROW")){
      reset();
    }
  }
  
}
function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  
  mainCyclist.changeAnimation("SahilRunning",mainRacerImg1)
  mainCyclist.x=70
  oppG.destroyEach();
  opp2G.destroyEach();
  opp3G.destroyEach();
  obstG.destroyEach();
   obst2G.destroyEach();
   obst3G.destroyEach();
  
  distance=0;
}
function obstacle(){
  if (frameCount%60==0){
    obst=createSprite(5060,random(10,490),10,10)
    obst.addImage(obstImg);
    obst.scale=0.1;
    obst.velocityX=(-10);
     obstG.add(obst);
  }
}
function obstacle2(){
  if (frameCount%70==0){
    obst2=createSprite(5060,random(50,450),10,10)
    obst2.addImage(obst2Img);
    obst2.scale=0.1;
    obst2.velocityX=(-10);
    obst2G.add(obst2);
  }
}
function obstacle3(){
  if (frameCount%80==0){
    obst3=createSprite(5060,random(50,450),10,10)
    obst3.addImage(obst3Img);
    obst3.scale=0.1;
    obst3.velocityX=(-10);
    obstG.add(obst3);
  }
}
function opponent(){
  if (frameCount%60==0){
    opp=createSprite(5060,random(0,500),10,10)
    opp.addAnimation("ride",oppImg);
    opp.addAnimation("fall",oppImg2)
    opp.lifetime=250;
    opp.scale=0.1;
    opp.velocityX=(-10);
    
  oppG.add(opp);
  }
}
function opponent2(){
  if (frameCount%60==0){
    opp2=createSprite(5060,random(0,500),10,10)
    opp2.addAnimation("ride2",opp2Img);
    opp2.addAnimation("fall2",opp2Img2)
    opp2.lifetime=250;
    opp2.scale=0.1;
    opp2.velocityX=(-10);
    
  opp2G.add(opp2);
  }
}
function opponent3(){
  if (frameCount%60==0){
    opp3=createSprite(5060,random(0,500),10,10)
    opp3.addAnimation("ride3",opp3Img);
    opp3.addAnimation("fall3",opp3Img2)
    opp3.lifetime=250;
    opp3.scale=0.1;
    opp3.velocityX=(-10);
  opp3G.add(opp3);
  }
}
