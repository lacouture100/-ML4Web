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
let previousPoses = [];

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



function preload() {
  heartImg = loadImage('images/heart.png');
  gameTitleImg = loadImage('images/gameTitle.png');

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


  //create the sketch canvas
  mainCanvas = createCanvas(gameWidth, gameHeight);

  //creates the video capture from the webcam
  video = createCapture(VIDEO);
  video.size(360, 240);
  video.position(gameWidth/2, gameHeight)

  //hide the video feed
  video.hide();

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);

  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  startMenu()
}

function draw() {

  if (runGame != false) {
    mainTitle.hide()
    startButton.hide()
    //Draw the video image as the background
    image(video, width, 0,width, height);
    //Draw the notebook page as the background image
    fill(0, 0, 0, 255);
    // We can call both functions to draw the stickmans
    strokeWeight(2);
    drawNotebook();
    displayPlayerlife();
    drawStickHuman();
    drawKeypoints();
    //drawSkeleton();

    for (let i = 0; i < drawObstacles.length; i++) {
      drawObstacles[i].show()
      drawObstacles[i].move()
    }
    for (let i = 0; i < playerArray.length; i++) {
      playerArray[i].move()
      playerArray[i].draw()
    }
  }
}

function mousePressed() {
  let drawing = new Drawing(drawings[1], random(70, 500), gameHeight, random(50, 100), random(50, 100), 2);
  drawObstacles.push(drawing);

}

function drawStickHuman() {
  previousPoses = [];
  //for (let j = 0; j < countPeople; j++) {
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;

    // Only draw an ellipse is the pose confidence is bigger than confidenceMin
    if (pose.nose.confidence > confidenceMin) {
      for (pose in poses) {
        sNoseX = scaleFigure(poses[i].pose.nose.x, stickScale, 300, i);
        sNoseY = scaleFigure(poses[i].pose.nose.y, stickScale, 500, i);
        sNeckX = scaleFigure(poses[i].pose.nose.x, stickScale, 300, i);
        sNeckY = scaleFigure(poses[i].pose.nose.y + 50, stickScale, 500, i);
        sElbowLX = scaleFigure(poses[i].pose.leftElbow.x, stickScale, 300, i);
        sElbowLY = scaleFigure(poses[i].pose.leftElbow.y, stickScale, 500, i);
        sElbowRX = scaleFigure(poses[i].pose.rightElbow.x, stickScale, 300, i);
        sElbowRY = scaleFigure(poses[i].pose.rightElbow.y, stickScale, 500, i);
        sWristLX = scaleFigure(poses[i].pose.leftWrist.x, stickScale, 300, i);
        sWristLY = scaleFigure(poses[i].pose.leftWrist.y, stickScale, 500, i)
        sWristRX = scaleFigure(poses[i].pose.rightWrist.x, stickScale, 300, i);
        sWristRY = scaleFigure(poses[i].pose.rightWrist.y, stickScale, 500, i);
        sHipX = scaleFigure((poses[i].pose.rightHip.x + poses[i].pose.leftHip.x) / 2, stickScale, 300, i);
        sHipY = scaleFigure((poses[i].pose.rightHip.y + poses[i].pose.leftHip.y) / 2, stickScale, 500, i);
        sKneeLX = scaleFigure(poses[i].pose.leftKnee.x, stickScale, 300, i);
        sKneeLY = scaleFigure(poses[i].pose.leftKnee.y, stickScale, 500, i);
        sKneeRX = scaleFigure(poses[i].pose.rightKnee.x, stickScale, 300, i);
        sKneeRY = scaleFigure(poses[i].pose.rightKnee.y, stickScale, 500, i);
        sAnkleLX = scaleFigure(poses[i].pose.leftAnkle.x, stickScale, 300, i);
        sAnkleLY = scaleFigure(poses[i].pose.leftAnkle.y, stickScale, 500, i);
        sAnkleRX = scaleFigure(poses[i].pose.rightAnkle.x, stickScale, 300, i);
        sAnkleRY = scaleFigure(poses[i].pose.rightAnkle.y, stickScale, 500, i);

        playerArray = []
        let player = new StickFigure(i,
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
          sKneeLX,
          sKneeLY,
          sKneeRX,
          sKneeRY,
          sAnkleLX,
          sAnkleLY,
          sAnkleRX,
          sAnkleRY);
        playerArray.push(player);

        //neckX = lerp(previousPoses[i] ? previousPoses[i].neckX : 0, neckX1, lerpAmount);
        //neckY = lerp(previousPoses[i] ? previousPoses[i].neckY : 0, neckY1, lerpAmount);
        // sHipX = lerp(previousPoses[i] ? previousPoses[i].hipX : 0, sHipX, lerpAmount);
        // sHipY = lerp(previousPoses[i] ? previousPoses[i].hackipY : 0, sHipY, lerpAmount);
        // sElbowRX = lerp(previousPoses[i] ? previousPoses[i].rElbowX : 0, sElbowRX, lerpAmount);
        // sElbowRY = lerp(previousPoses[i] ? previousPoses[i].rElbowX : 0, sElbowRY, lerpAmount);
        // sElbowLX = lerp(previousPoses[i] ? previousPoses[i].lElbowX : 0, sElbowLX, lerpAmount);
        // sElbowLY = lerp(previousPoses[i] ? previousPoses[i].lElbowY : 0, sElbowLY, lerpAmount);
        // sWristRX = lerp(previousPoses[i] ? previousPoses[i].rWristX : 0, rWristX1, lerpAmount);
        // sWristRY = lerp(previousPoses[i] ? previousPoses[i].rWristY : 0, rWristY1, lerpAmount);
        // sWristLX = lerp(previousPoses[i] ? previousPoses[i].lWristX : 0, lWristX1, lerpAmount);
        // sWristLY = lerp(previousPoses[i] ? previousPoses[i].lWristY : 0, lWristY1, lerpAmount);
        // sKneeRX = lerp(previousPoses[i] ? previousPoses[i].rKneeX : 0, rKneeX1, lerpAmount);
        // sKneeRY = lerp(previousPoses[i] ? previousPoses[i].rKneeY : 0, rKneeY1, lerpAmount);
        // sKneeLX= lerp(previousPoses[i] ? previousPoses[i].lKneeX : 0, lKneeX1, lerpAmount);
        // sKneeLY = lerp(previousPoses[i] ? previousPoses[i].lKneeY : 0, lKneeY1, lerpAmount);
        // sAnkleRX = lerp(previousPoses[i] ? previousPoses[i].rAnkleX : 0, rAnkleX1, lerpAmount);
        // sAnkleRY = lerp(previousPoses[i] ? previousPoses[i].rAnkleY : 0, rAnkleY1, lerpAmount);
        // sAnkleLX = lerp(previousPoses[i] ? previousPoses[i].lAnkleX : 0, lAnkleX1, lerpAmount);
        // sAnkleLY = lerp(previousPoses[i] ? previousPoses[i].lAnkleY : 0, lAnkleY1, lerpAmount);

      }
    }
  }
}

function startMenu() {

  fill(0, 0, 0, 200)
  textFont(fontLemon);
  textSize(20);
  text('SKETCHY HUMANS', 0, 0)

  mainTitle = createImg('images/gameTitle.png');
  mainTitle.position(50, gameHeight / 2 - 50, 500, 200);
  background(bgImages[0])
  startButton = createImg('images/button_saveGame.png');
  startButton.position(200, gameHeight / 2 + 50);

  startButton.mousePressed(startGame);
  console.log("Menu started")

}

function startGame() {
  runGame = true;

  console.log("game started")
}

function scaleFigure(value, stickScale, startPosDist, playerIndex) {

  let mapVal = map(value, 0, width, 0, (width * stickScale)) + 100


  return mapVal
}

function modelReady() {
  //change the "Model loading" to "Model loaded" status
  select('#status').html('Ready to Play!');
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
    for (let i = 0; i < playerLimit + 1; i++) {
      let playerLife = "Human " + i;
      text(playerLife, startPosition, 40 + (20 * i));
      image(heartImg, startPosition + 70, 23 + (20 * i), 30, 20);
      image(heartImg, startPosition + 90, 23 + (20 * i), 30, 20);
      image(heartImg, startPosition + 110, 23 + (20 * i), 30, 20);
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
        stroke(255,255,255,200);
        fill(0, 0, 0, 0);
        ellipse(this.sNoseX, this.sNoseY, headSizeX, headSizeY);


      }
      // let hipX = (pose.rightHip.x + pose.leftHip.x)/2
      // let hipY = (pose.rightHip.y + pose.leftHip.y)/
      strokeWeight(3);
      stroke(0,0,0,200)
      let hipX = pose.nose.x
      let hipY = pose.nose.y + 120
      let neckX = pose.nose.x
      let neckY = pose.nose.y + 50
      ellipse(pose.nose.x, pose.nose.y, headSizeX,headSizeY)
      line(pose.nose.x, pose.nose.y, hipX, hipY);
      //Draw the right arm
      line(neckX, neckY, pose.rightElbow.x, pose.rightElbow.y);
      line(pose.rightElbow.x, pose.rightElbow.y, pose.rightWrist.x, pose.rightWrist.y);
      //Draw the left arm
      line(neckX, neckY, pose.leftElbow.x, pose.leftElbow.y);
      line(pose.leftElbow.x, pose.leftElbow.y, pose.leftWrist.x, pose.leftWrist.y);

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
