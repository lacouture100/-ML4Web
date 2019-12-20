// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
Made by Alvaro Lacouture using the
PoseNet example in ML5.js and p5.js
=== */

let video;
let poseNet;
let poses = [];
let prevPoses = [];

let bgImages = [];
let drawings = [];
let drawObstacles = [];
let playerArray = [];

let scaledKeypoints = [
  sNoseX = 0,
  sNoseY = 0,
  sNeckX = 0,
  sNeckY = 0,
  sElbowLX = 0,
  sElbowLY = 0,
  sElbowRX = 0,
  sElbowRY = 0,
  sWristLX = 0,
  sWristLY = 0,
  sWristRX = 0,
  sWristRY = 0,
  sHipX = 0,
  sHipY = 0,
  sKneeLX = 0,
  sKneeLY = 0,
  sKneeRX = 0,
  sKneeRY = 0,
  sAnkleLX = 0,
  sAnkleLY = 0,
  sAnkleRX = 0,
  sAnkleRY = 0
]

let notebookPage;
let bg;

let gameWidth = 640;
let gameHeight = 480;

let lerpAmount = 0.5;

let stickScale = 0.12;

let headSizeX = 20;
let headSizeY = 30;

let startPosX = 300;
let startPosY = 350;

let playersDetected = "No players Detected";
let playerLimit = 1;

let fontSubscriber;
let fontOpen;
let heartImg;
let planeImg;

let confidenceMin = 0.9;

let count = 0
let lastCountPeople = 0
let countPeople = 0
let stable = false

let run = true;
let runGame = false;
let newcount = 23

let mainCanvas
let mainTitle;
  let tryButton
let gameScore = 1;
let speed = 2;
let movementX = 0
let movementY = 0

let menuSound;
let gameSound;

let gameScores = []
let powImg


function preload() {
  menuSound = loadSound("sound/intro.mp3")
  gameSound = loadSound("sound/soundtrack.mp3")
  loseSound = loadSound("sound/loseSound.mp3")

  heartImg = loadImage('images/heart.png');
  gameTitleImg = loadImage('images/mainTitle.png');
  planeImg = loadImage('images/paperPlane.png');
  loseImg = loadImage('images/yoLose.png');
  powImg = loadImage('images/pow.png')

  fontSubscriber = loadFont('fonts/DK-Brush-Crush.otf');
  fontOpen = loadFont('fonts/OpenSans-Regular.ttf');
  fontLemon = loadFont('fonts/DK-Lemon-Yellow-Sun.otf');

  //load the background notebook images
  for (let i = 0; i < 10; i++) {
    loadImage("images/nb00" + i + ".png", function(img) {
      bgImages.push(img);
    });
  }
  for (let i = 10; i < 24; i++) {
    loadImage("images/nb0" + i + ".png", function(img) {
      bgImages.push(img);
    });
  }

  //load the drawing images
  for (let i = 0; i < 4; i++) {
    drawings[i] = loadImage("images/drawings/rock" + i + '.png')
  }
}

function setup() {
  frameRate(12);

  //create the sketch canvas
  mainCanvas = createCanvas(gameWidth, gameHeight);

  //creates the video capture from the webcam
  video = createCapture(VIDEO);
  video.size(gameWidth, gameHeight);



  //hide the video feed
  video.hide();

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);

  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });

}

function draw() {
  drawNotebook();
  if (runGame != false) {



    mainTitle.hide()

    startButton.hide()
    //Draw the video image as the background
    image(video, width, 0, width, height);
    //Draw the notebook page as the background image
    fill(0, 0, 0, 255);
    // We can call both functions to draw the stickmans
    strokeWeight(2);
    drawNotebook();
    displayPlayerlife();
    drawStickHuman();

    if (gameScore <= 0) {
      gameScores.push(gameScore);
      gameLose();
    }
    let spawnRate = 30;
    spawnDrawings(spawnRate)
    if (frameCount % 120 == 0) {
      spawnRate--
    }
    //drawKeypoints();
    //drawSkeleton();

    gameScore++;
    for (let j = 0; j < playerArray.length; j++) {
      playerArray[j].move(movementX, movementY);
      playerArray[j].draw();

      for (let i = 0; i < drawObstacles.length; i++) {
        drawObstacles[i].move()
        drawObstacles[i].show()
        if (playerArray[j].hits(drawObstacles[i])) {
          console.log("HITTTTTT")
          drawObstacles.splice(i)
          gameScore -= 100;



        }
      }
    }
  }

}

function spawnDrawings(spawnRate) {
  if (frameCount % spawnRate == 0) {
    let drawing = new Drawing(drawings[1], width + 10, random(40, gameHeight - 30), random(50, 100), random(50, 100), random(2, 5));
    drawObstacles.push(drawing);
  }
}

function gameLose() {
  // fill(0, 0, 0, 200)
  // textFont(fontLemon);
  // textSize(20);
  // text('SKETCHY HUMANS', 0, 0)
  runGame = false;
  mainCanvas.clear()
  gameSound.stop()
  background(bgImages[0])


  tryButton = createImg('images/button_tryAgain.png');
  tryButton.position(100, 0);
  tryButton.mousePressed(startMenu)

    loseSound.play()

    fill(0, 0, 0, 200)
    textFont(fontSubscriber);
    textSize(20);
    //ellipse(20, 40, 10);

      text(gameScores[-1],300,300);
      text(gameScore, startPosition + 90, 40 + (20 * i));

}

function drawStickHuman() {

  let previousPoses = [];
  let directionX = 0
  let directionY = 0
  movementX = speed * directionX
  movementY = speed * directionY

  //for (let j = 0; j < countPeople; j++) {
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;

    // Only draw an ellipse is the pose confidence is bigger than confidenceMin
    previousPoses = [];
    if (pose.nose.confidence > confidenceMin) {
      for (pose in poses) {

        sElbowLX = scaleFigure(poses[i].pose.leftElbow.x, stickScale, i);
        sElbowLY = scaleFigure(poses[i].pose.leftElbow.y, stickScale, i);
        sElbowRX = scaleFigure(poses[i].pose.rightElbow.x, stickScale, i);
        sElbowRY = scaleFigure(poses[i].pose.rightElbow.y, stickScale, i);
        sWristLX = scaleFigure(poses[i].pose.leftWrist.x, stickScale, i);
        sWristLY = scaleFigure(poses[i].pose.leftWrist.y, stickScale, i)
        sWristRX = scaleFigure(poses[i].pose.rightWrist.x, stickScale, i);
        sWristRY = scaleFigure(poses[i].pose.rightWrist.y, stickScale, i);
        sHipX = scaleFigure(((poses[i].pose.rightHip.x + poses[i].pose.leftHip.x) / 2), stickScale, i);
        sHipY = scaleFigure(((poses[i].pose.rightHip.y + poses[i].pose.leftHip.y) / 2), stickScale, i);


        let limbSize = 10;
        sNoseX = poses[i].pose.nose.x
        sNoseY = poses[i].pose.nose.y


        sNeckX = poses[i].pose.nose.x
        sNeckY = poses[i].pose.nose.y + 13
        // sElbowLX = poses[i].pose.leftElbow.x
        // sElbowLY = poses[i].pose.leftElbow.y
        // sElbowRX = poses[i].pose.rightElbow.x
        // sElbowRY =  poses[i].pose.rightElbow.y
        // sWristLX = poses[i].pose.leftWrist.x
        // sWristLY = poses[i].pose.leftWrist.y
        // sWristRX = poses[i].pose.rightWrist.x
        // sWristRY = poses[i].pose.rightWrist.y
        // sHipX =poses[i].pose.rightHip.x
        // sHipY = poses[i].pose.rightHip.y
        // sKneeLX = scaleFigure(poses[i].pose.leftKnee.x, stickScale, 300, i);
        // sKneeLY = scaleFigure(poses[i].pose.leftKnee.y, stickScale, 500, i);
        // sKneeRX = scaleFigure(poses[i].pose.rightKnee.x, stickScale, 300, i);
        // sKneeRY = scaleFigure(poses[i].pose.rightKnee.y, stickScale, 500, i);
        // sAnkleLX = scaleFigure(poses[i].pose.leftAnkle.x, stickScale, 300, i);
        // sAnkleLY = scaleFigure(poses[i].pose.leftAnkle.y, stickScale, 500, i);
        // sAnkleRX = scaleFigure(poses[i].pose.rightAnkle.x, stickScale, 300, i);
        // sAnkleRY = scaleFigure(poses[i].pose.rightAnkle.y, stickScale, 500, i);

        //console.log(sNeckX)
        if (dist(poses[i].pose.nose.x, poses[i].pose.nose.y, gameWidth / 2, gameHeight) > gameHeight / 2) {
          movementY = 2

        } else {
          movementY = -2
        }

        if (dist(poses[i].pose.nose.x, poses[i].pose.nose.y, gameWidth, gameHeight) > gameWidth / 2) {
          movementX = 2

        } else {
          movementX = -2
        }
        // sNoseX += movementX;
        // sNeckX += movementX;
        // sElbowLX += movementX;
        // sElbowRX += movementX;
        // sWristLX += movementX;
        // sWristRX += movementX;
        // sHipX += movementX;
        //
        // sNoseY += movementY;
        // sNeckY += movementY;
        // sElbowLY += movementY;
        // sElbowRY += movementY;
        // sWristLY += movementY;
        // sWristRY += movementY;
        // sHipY += movementY;

        //console.log(movementX)
        //console.log(movementY)
        //
        // console.log(sNeckX)
        // line(sNeckX, sNeckY, sHipX, sHipY);
        // //Draw the right arm
        // line(sNeckX, sNeckY,sElbowRX, sElbowRY);
        // line(sElbowRX, sElbowRY, sWristRX, sWristRY);
        // //Draw the left arm
        // line(sNeckX, sNeckY, sElbowLX, sElbowLY);
        // line(sElbowLX, sElbowLY, sWristLX, sWristLY);
        //
        // previousPoses.push(sNeckX, sNeckY, sHipX, sHipY,sElbowRX, sElbowRY, sWristRX, sWristRY,sElbowLX, sElbowLY, sWristLX, sWristLY)

        // sNoseX += movementX;
        // sNeckX += movementX;
        // sElbowLX += movementX;
        // sElbowRX += movementX;
        // sWristLX += movementX;
        // sWristRX += movementX;
        // sHipX += movementX;
        //
        // sNoseY += movementY;
        // sNeckY += movementY;
        // sElbowLY += movementY;
        // sElbowRY += movementY;
        // sWristLY += movementY;
        // sWristRY += movementY;
        // sHipY += movementY;



        playerArray = []
        let player = new StickFigure(
          i,
          sNoseX,
          sNoseY,
          sNeckX,
          sNeckY,
          sElbowLX,
          sElbowLY,
          sElbowRX,
          sElbowRY,
          sWristLX,
          sWristLY,
          sWristRX,
          sWristRY,
          sHipX,
          sHipY,
          // sKneeLX,
          // sKneeLY,
          // sKneeRX,
          // sKneeRY,
          // sAnkleLX,
          // sAnkleLY,
          // sAnkleRX,
          // sAnkleRY
        )
        playerArray.push(player);



      }
    }
  }
}

function startMenu() {
  loseSound.stop()

  menuSound.play()
  menuSound.loop()


  fill(0, 0, 0, 200)

  mainTitle = createImg('images/mainTitle.png');
  mainTitle.position(50, gameHeight / 2 - 150, );

  startButton = createImg('images/button_play.png');
  startButton.position(200, gameHeight / 2 + 50);

  startButton.mousePressed(startGame);
  console.log("Menu started")
  image(planeImg, 100, 124);
  tryButton.hide()

}

function startGame() {
  runGame = true;
  console.log("game started")
  gameSound.play()
  menuSound.stop()

}

function scaleFigure(value, stickScale, startPosDist, playerIndex) {

  let mapVal = map(value, 0, width, 0, (width * stickScale)) + 100


  return mapVal +40
}

function modelReady() {
  //change the "Model loading" to "Model loaded" status
  //select('#status').html('Ready to Play!');
  startMenu();

}

function drawNotebook() {
  if (run == true) {
    newcount--;
    if (newcount > 0) {
      background(bgImages[newcount]);
    } else {
      newcount = 23
    }
  }
}

function displayPlayerlife() {
  if (!poses.length == 0) {
    let startPosition = 60;
    fill(0, 0, 0, 200)
    textFont(fontSubscriber);
    textSize(20);
    //ellipse(20, 40, 10);
    for (let i = 0; i < playerLimit; i++) {
      let playerName = "Human " + i;
      playerName = 'Score'
      text(playerName, startPosition, 40 + (20 * i));
      text(gameScore, startPosition + 90, 40 + (20 * i));
      // image(heartImg, startPosition + 70, 23 + (20 * i), 30, 20);
      // image(heartImg, startPosition + 90, 23 + (20 * i), 30, 20);
      // image(heartImg, startPosition + 110, 23 + (20 * i), 30, 20);
    }
  }
}

function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {

    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;

    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];

      if (keypoint.score > 0.7) {
        fill(255, 0, 0, 200);
        noStroke();
        textSize(12)
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
        text('User ' + i, keypoint.position.x, keypoint.position.y + 30)
        text(keypoint.part, keypoint.position.x, keypoint.position.y)

      }
    }
  }
}

function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      ellipse();
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
