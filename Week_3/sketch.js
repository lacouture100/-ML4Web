// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
let balls = [];
let counters = [];
let isPlaying = false;
let song;
let noseX = 0, noseY = 0;
let imagePosX=0, imagePosY=0;

let img;



let ballAmount = 50;
let videoPosX=0;
let videoPosY=0;
let trainVideo;


// function preload() {
//   //song = loadSound('assets/coinEffect.mp3');
// }

function setup() {
  rectMode(CENTER);
  createCanvas(640, 480);
  background(55);

  video = createCapture(VIDEO);
  video.size(width, height);
  img = loadImage('assets/insideSubway2.png');
  trainVideo=createVideo('assets/outsideSubway_short.mp4',vidLoad);
  trainVideo.size(1280,720);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, 'multiple', modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
  trainVideo.hide();
}

function modelReady() {
  select('#status').html('Video and Model Loaded');
}

function draw() {
  // Flip the video from left to right, mirror the video
  translate(width, 0)
  scale(-1, 1);
  image(trainVideo, videoPosX, videoPosY-200, 0, 0);
  noStroke();
  moveImage();
  drawPose();

  //videoPosX+=1;
    //console.log(videoPosY);
    //stroke(255);
    //line(0, height/2,width,height/2);
    translate(width,0);

    image(img,imagePosX-width*1.75,imagePosY-200,1600,900);


}


function drawPose() {
  //console.log(poses);
  for (let pose in poses){
  //console.log(poses[pose].pose.rightEye.x);
  }

  for(let i=0;i<2;i++){
    if (poses[i] && poses[i].pose) {

      let noseX1=poses[i].pose.nose.x;
      noseX =lerp(noseX,noseX1,0.2);
      let noseY1=poses[i].pose.nose.y;
      noseY =lerp(noseY,noseY1,0.2);

      videoPosX = ((noseX*-1));
      videoPosY = ((noseY*-1));
      //ellipse(noseX,noseY,30,30);
    }

  }
}
function moveImage(){
  imagePosX=imagePosX+ random(-2,2);
  imagePosY=imagePosY+ random(-2,2);
}
function vidLoad() {
  trainVideo.play();
  trainVideo.loop();
  trainVideo.volume(0);
}
