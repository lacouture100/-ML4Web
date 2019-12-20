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

let bgImages = ['', ];

let neckX = 0;
let neckY = 0;
let hipX = 0;
let hipY = 0;
let rElbowX = 0;
let rElbowY = 0;
let lElbowX = 0;
let lElbowY = 0;
let rWristX = 0;
let rWristY = 0;
let lWristX = 0;
let lWristY = 0;
let rKneeX = 0;
let rKneeY = 0;
let lKneeX = 0;
let lKneeY = 0;
let rAnkleX = 0;
let rAnkleY = 0;
let lAnkleX = 0;
let lAnkleY = 0;

let neckX1 = 0;
let neckY1 = 0;
let rElbowX1 = 0;
let rElbowY1 = 0;
let lElbowX1 = 0;
let lElbowY1 = 0;
let rWristX1 = 0;
let rWristY1 = 0;
let lWristX1 = 0;
let lWristY1 = 0;
let rKneeX1 = 0;
let rKneeY1 = 0;
let lKneeX1 = 0;
let lKneeY1 = 0;
let rAnkleX1 = 0;
let rAnkleY1 = 0;
let lAnkleX1 = 0;
let lAnkleY1 = 0;

//Create a hip point: the midpoint between the right hip and the left hip
let hipX1;
let hipY1;

let notebookPage;
let bg;

let gameWidth = 640;
let gameHeight = 480;

let lerpAmount = 0.5;

let stickScale = 0.12;

let headSizeX = 20;
let headSizeY = 30;

let startPosX = 150;
let startPosY = 350;

let playersDetected = "No players Detected";
let playerLimit = 5;

let fontSubscriber;
let rock;
let heartImg;
let supermanImg;

let confidenceMin = 0.9;

let count = 0
let lastCountPeople = 0
let countPeople = 0
let stable = false


function preload() {
  //loads the background notebook image
  notebookPage = loadImage("images/notebookTest.jpg");
  //loads the rock obstacle image
  rock = loadImage('images/rock.png');
  heartImg = loadImage('images/heart.png');
  supermanImg = loadImage('images/supermanPose.jpg');
  fontSubscriber = loadFont('fonts/DK-Brush-Crush.otf');


  for (var i = 0; i < bgImages.length; i++) {
    bgImages[i] = loadImage("images/nb" + i + ".jpg");

  }
}

function setup() {

  frameRate(12);
  //create the sketch canvas
  createCanvas(gameWidth, gameHeight);

  //creates the video capture from the webcam
  video = createCapture(VIDEO);
  video.size(gameWidth, gameHeight);

  //hide the video feed
  //video.hide();
  //hide the cursor
  noCursor();

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, type = "multiple", modelReady);

  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
}

function modelReady() {
  //change the "Model loading" to "Model loaded" status
  select('#status').html('Ready to Play!');
}

function draw() {


  for (let i = 0; i < bgImages.length; i++) {
    background(bgImages[i]);

  }
  //Draw the video image as the background
  image(video, width, 0, width, height);

  //Draw the notebook page as the background image

  strokeWeight(2);

  //text(playersDetected, 20, 40);
  fill(0, 0, 0, 255);
  strokeWeight(10);

  // We can call both functions to draw the stickmans
  fill(0, 0, 0, 0);
  strokeWeight(2);
  //background(notebookPage);

  displayPlayerlife();
  drawStickHuman();
  drawKeypoints();
  drawSkeleton();

  // console.log(poses.length)
  if (lastCountPeople === poses.length) {
    count++
  } else {
    count = 0
    lastCountPeople = poses.length
    stable = false
  }
  if (count > 50 && !stable) {
    stable = true
    countPeople = lastCountPeople
    console.log(`real count: ${countPeople}`)
  }
}



// A function to a stick figure over the detected keypoints
function drawStickHuman() {
  previousPoses = [];

  // Loop through all the poses detected
  //for (let i = 0; i < poses.length; i++) {
  //
  for (let i = 0; i < countPeople; i++) {
    for (let i = 0; i < poses.length; i++) {
      // For each pose detected, loop through all the keypoints
      let pose = poses[i].pose;
      //console.log(poses[i]);

      // Only draw an ellipse is the pose confidence is bigger than confidenceMin
      if (pose.nose.confidence > confidenceMin) {

        //fill(0, 0, 0, 200);
        stroke(0, 0, 0, 200);
        ellipseMode(CENTER);
        //console.log("Keypoint: " + keypoint + "keypoint score:" + keypoint.score)

        neckX1 = (poses[i].pose.nose.x);
        neckY1 = (poses[i].pose.nose.y + 120);
        rElbowX1 = (poses[i].pose.rightElbow.x);
        rElbowY1 = (poses[i].pose.rightElbow.y);
        lElbowX1 = (poses[i].pose.leftElbow.x);
        lElbowY1 = (poses[i].pose.leftElbow.y);
        rWristX1 = (poses[i].pose.rightWrist.x);
        rWristY1 = (poses[i].pose.rightWrist.y);
        lWristX1 = (poses[i].pose.leftWrist.x);
        lWristY1 = (poses[i].pose.leftWrist.y);
        rKneeX1 = (poses[i].pose.rightKnee.x);
        rKneeY1 = (poses[i].pose.rightKnee.y);
        lKneeX1 = (poses[i].pose.leftKnee.x);
        lKneeY1 = (poses[i].pose.leftKnee.y);
        rAnkleX1 = (poses[i].pose.rightAnkle.x);
        rAnkleY1 = (poses[i].pose.rightAnkle.y);
        lAnkleX1 = (poses[i].pose.leftAnkle.x);
        lAnkleY1 = (poses[i].pose.leftAnkle.y);;

        //Create a hip point: the midpoint between the right hip and the left hip
        hipX1 = ((poses[i].pose.rightHip.x + poses[i].pose.leftHip.x) / 2);
        hipY1 = ((poses[i].pose.rightHip.y + poses[i].pose.leftHip.y) / 2);

        //Smooth the movement of the neck keypoint

        neckX = lerp(previousPoses[i] ? previousPoses[i].neckX : 0, neckX1, lerpAmount);
        neckY = lerp(previousPoses[i] ? previousPoses[i].neckY : 0, neckY1, lerpAmount);

        //Smooth the movement of the neck keypoint
        hipX = lerp(previousPoses[i] ? previousPoses[i].hipX : 0, hipX1, lerpAmount);
        hipY = lerp(previousPoses[i] ? previousPoses[i].hackipY : 0, hipY1, lerpAmount);
        rElbowX = lerp(previousPoses[i] ? previousPoses[i].rElbowX : 0, rElbowX1, lerpAmount);
        rElbowY = lerp(previousPoses[i] ? previousPoses[i].rElbowX : 0, rElbowX1, lerpAmount);
        lElbowX = lerp(previousPoses[i] ? previousPoses[i].lElbowX : 0, lElbowX1, lerpAmount);
        lElbowY = lerp(previousPoses[i] ? previousPoses[i].lElbowY : 0, lElbowY1, lerpAmount);
        rWristX = lerp(previousPoses[i] ? previousPoses[i].rWristX : 0, rWristX1, lerpAmount);
        rWristY = lerp(previousPoses[i] ? previousPoses[i].rWristY : 0, rWristY1, lerpAmount);
        lWristX = lerp(previousPoses[i] ? previousPoses[i].lWristX : 0, lWristX1, lerpAmount);
        lWristY = lerp(previousPoses[i] ? previousPoses[i].lWristY : 0, lWristY1, lerpAmount);
        rKneeX = lerp(previousPoses[i] ? previousPoses[i].rKneeX : 0, rKneeX1, lerpAmount);
        rKneeY = lerp(previousPoses[i] ? previousPoses / 9[i].rKneeY : 0, rKneeY1, lerpAmount);
        lKneeX = lerp(previousPoses[i] ? previousPoses[i].lKneeX : 0, lKneeX1, lerpAmount);
        lKneeY = lerp(previousPoses[i] ? previousPoses[i].lKneeY : 0, lKneeY1, lerpAmount);
        rAnkleX = lerp(previousPoses[i] ? previousPoses[i].rAnkleX : 0, rAnkleX1, lerpAmount);
        rAnkleY = lerp(previousPoses[i] ? previousPoses[i].rAnkleY : 0, rAnkleY1, lerpAmount);
        lAnkleX = lerp(previousPoses[i] ? previousPoses[i].lAnkleX : 0, lAnkleX1, lerpAmount);
        lAnkleY = lerp(previousPoses[i] ? previousPoses[i].lAnkleY : 0, lAnkleY1, lerpAmount);

        //The thickness of the stick figure bodies
        strokeWeight(5);
        for (let i = 2; i <= pose.length; i++) {
          for (point in pose) {
            console.log(point);

            point.x = (map(point.x, 0, width, 0, (width * stickScale))) + startPosX * i
            point.y = (map(point.y, 0, width, 0, (width * stickScale))) + startPosX * i
            ellipse(point.x, point.y, 10, 10);
          }

          // let scaledNoseX = (map(pose.nose.x, 0, width, 0, (width * stickScale))) + startPosX * i;
          // let scaledNoseY = (map(pose.nose.y, 0, height, 0, (height * stickScale))) + startPosY;
          // let scaledNeckX = (map(neckX1, 0, width, 0, (width * stickScale))) + startPosX * i;
          // let scaledNeckY = (map(neckY1, 0, height, 0, (height * stickScale))) + startPosY;
          // let scaledRElbowX = (map(rElbowX1, 0, width, 0, (width * stickScale))) + startPosX * i;
          // let scaledRElbowY = (map(rElbowY1, 0, height, 0, (height * stickScale))) + startPosY;
          // let scaledLElbowX = (map(lElbowX1, 0, width, 0, (width * stickScale))) + startPosX * i;
          // let scaledLElbowY = (map(lElbowY1, 0, height, 0, (height * stickScale))) + startPosY;
          // let scaledRWristX = (map(rWristX1, 0, width, 0, (width * stickScale))) + startPosX * i;
          // let scaledRWristY = (map(rWristY1, 0, height, 0, (height * stickScale))) + startPosY;
          // let scaledLWristX = (map(lWristX1, 0, width, 0, (width * stickScale))) + startPosX * i;
          // let scaledLWristY = (map(lWristY1, 0, height, 0, (height * stickScale))) + startPosY;
          // let scaledHipX = (map(hipX1, 0, width, 0, (width * stickScale))) + startPosX * i;
          // let scaledHipY = (map(hipY1, 0, height, 0, (height * stickScale))) + startPosY;
          // let scaledRKneeX = (map(rKneeX1, 0, width, 0, (width * stickScale))) + startPosX * i;
          // let scaledRKneeY = (map(rKneeY1, 0, height, 0, (height * stickScale))) + startPosY;
          // let scaledLKneeX = (map(lKneeX1, 0, width, 0, (width * stickScale))) + startPosX * i;
          // let scaledLKneeY = (map(lKneeY1, 0, height, 0, (height * stickScale))) + startPosY;
          // let scaledRAnkleX = (map(rAnkleX1, 0, width, 0, (width * stickScale))) + startPosX * i;
          // let scaledRAnkleY = (map(rAnkleY1, 0, height, 0, (height * stickScale))) + startPosY;
          // let scaledLAnkleX = (map(lAnkleX1, 0, width, 0, (width * stickScale))) + startPosX * i;
          // let scaledLAnkleY = (map(lAnkleY1, 0, height, 0, (height * stickScale))) + startPosY;

          //Draw the head of the stick figures

          // ellipse(scaledNoseX, scaledNoseY, headSizeX, headSizeY);
          //
          // //Draw the body
          // line(scaledNeckX, scaledNeckY, scaledHipX, scaledHipY);
          //
          // //Draw the right arm
          // line(scaledNeckX, scaledNeckY, scaledRElbowX, scaledRElbowY);
          // line(scaledRElbowX, scaledRElbowY, scaledRWristX, scaledRWristY);
          //
          // //Draw the left arm
          // line(scaledNeckX, scaledNeckY, scaledLElbowX, scaledLElbowY);
          // line(scaledLElbowX, scaledLElbowY, scaledLWristX, scaledLWristY);
          //
          // //Draw the right leg
          // line(scaledHipX, scaledHipY, scaledRKneeX, scaledRKneeY);
          // line(scaledRKneeX, scaledRKneeY, scaledRAnkleX, scaledRAnkleY);
          //
          // //Draw the left leg
          // line(scaledHipX, scaledHipY, scaledLKneeX, scaledLKneeY);
          // line(scaledLKneeX, scaledLKneeY, scaledLAnkleX, scaledLAnkleY);

          //line(stickNeckX1,stickNeckY1,stickHipX1,stickHipY1);
          //line(stickHipX1,stickHipY1,stickRKneeX1,stickRKneeY1);
          //line(stickRKneeX1,stickRKneeY1,stickRAnkleX1,stickRAnkleY1);
          //line(stickHipX1,stickHipY1,stickLKneeX1,stickLKneeY1);
          //line(stickLKneeX1,stickLKneeY1,stickLAnkleX1,stickLAnkleY1);

          previousPoses.push({
            neckX,
            neckY,
            hipX,
            hipY,
            rElbowX,
            rElbowY,
            lElbowX,
            lElbowY,
            rWristX,
            rWristY,
            lWristX,
            lWristY,
            rKneeX,
            rKneeY,
            lKneeX,
            lKneeY,
            rAnkleX,
            rAnkleY,
            lAnkleX,
            lAnkleY,
          });
        }
      }
    }
  }


  function displayPlayerlife() {
    if (!poses.length == 0) {
      let startPosition = 60;

      textFont(fontSubscriber);
      textSize(20);
      //ellipse(20, 40, 10);
      for (let i = 1; i < (poses.length + 1); i++) {

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
        // Only draw an ellipse is the pose probability is bigger than 0.2
        if (keypoint.score > 0.2) {
          fill(255, 0, 0);
          noStroke();
          ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
        }
      }
    }
  }

  // A function to draw the skeletons
  function drawSkeleton() {
    // Loop through all the skeletons detected
    for (let i = 0; i < poses.length; i++) {
      let skeleton = poses[i].skeleton;
      // For every skeleton, loop through all body connections
      for (let j = 0; j < skeleton.length; j++) {
        let partA = skeleton[j][0];
        let partB = skeleton[j][1];
        //console.log(skeleton[0]);
        // console.log(skeleton);
        // console.log("Part A: "+partA);
        // console.log("Part B: "+partB);
        console.log(poses.length);
        ellipse();
        stroke(255, 0, 0);
        line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
      }
    }
  }
  }
