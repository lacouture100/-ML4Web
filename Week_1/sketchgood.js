// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */

let classifier;
let video;
let resultsP;
let result1;
let resultArray = [];
let probArray = [];
let results = [];
let label = '';
let prob = '';
let yPos =10;

let index = 0;
function setup() {
  createCanvas(400,4000);
  // Create a camera input
  video = createCapture(VIDEO);
  // Initialize the Image Classifier method with MobileNet and the video as the second argument
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);
  resultsP = createP('Loading model and video...');
}

function modelReady() {
  console.log('Model Ready');
  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(gotResult);
}

// When we get a result
function gotResult(err, results) {
  // The results are in an array ordered by confidence.
  resultsP.html(results[0].label + ' ' + nf(results[0].confidence, 0, 2));
  classifyVideo();

  label = str(results[0].label);
  prob = str(results[0].confidence);

  resultArray.push(results[0].label);
  probArray.push(results[0].confidence);

}

function draw(){
  background(255);

  //textSize(30);
  //text(label,10,yPos);


  for (var i=0;i<resultArray.length;i++){
    stroke(1);
    fill(i);
    textAlign(CENTER);
    text(resultArray[i],200,(i+yPos)*3);
    textSize(probArray[i]*100);
    //yPos+=1;
    if(yPos > height|| yPos < 0){
      i=0;
      yPos= -yPos;
    }

  }


}
