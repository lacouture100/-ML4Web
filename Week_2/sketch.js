// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example adaptation by Alvaro Lacouture
KNN Classification on Webcam Images with mobileNet. Built with p5.js
=== */
let label;
let video;
let video2;
let canvas;
let winner;

// Create a KNN classifier
const knnClassifier = ml5.KNNClassifier();
let featureExtractor;
let result=[];
let player1Score=0;
let player2Score=0;
let player3Score=0;

let video1Snap;
let playerCounters = [player1Score,player2Score,player3Score];

function setup() {
  // Create a featureExtractor that can extract the already learned features from MobileNet
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  canvas =createCanvas(400,80);
  canvas.parent('sketchHolder');
  // Create a video element
  video = createCapture(VIDEO);
  // Append it to the videoContainer DOM element
  video.parent('videoContainer');

  // Create the UI buttons
  createButtons();
}
function draw(){
  background(255);
  counterStart();


}
function modelReady(){
  select('#status').html(' ');
  let readyMessage = createElement('h1', 'READY TO PLAY!');
  readyMessage.parent('#status');
  readyMessage.style('background-color', 'pink');
}
function playAgain(){

}

// Add the current frame from the video to the classifier
function addExample(label) {
  const features = featureExtractor.infer(video, 'conv_preds');
  // You can list all the endpoints by calling the following function
  //console.log('All endpoints: ', featureExtractor.mobilenet.endpoints)

  // Add an example with a label to the classifier
  knnClassifier.addExample(features, label);
  updateCounts();
}
// Predict the current frame.
function classify() {
  // Get the total number of labels from knnClassifier
  const numLabels = knnClassifier.getNumLabels();
  if (numLabels <= 0) {
    console.error('There is no examples in any label');
    return;
  }
  //console.log(numLabels);
  // Get the features of the input video
  const features = featureExtractor.infer(video);

  // Use knnClassifier to classify which label do these features belong to
  // You can pass in a callback function `gotResults` to knnClassifier.classify function
  knnClassifier.classify(features, gotResults);
  // You can also pass in an optional K value, K default to 3
  // knnClassifier.classify(features, 3, gotResults);
}

// Show the results
function gotResults(err, result) {
  // Display any error
  if (err) {
    console.error(err);
  }
  // let result1 = result[0];
  // console.log(result1);
  // if (result.confidencesByLabel) {
  //   const confidences = result.confidencesByLabel;
  //   // result.label is the label that has the highest confidence
  //   if (result.label) {
  //     select('#result').html(result.label);
  //     select('#confidence').html(`${confidences[result.label] * 100} %`);
  //   }
  //
  //   select('#confidencePlayer1').html(`${confidences['Player1'] ? confidences['Player1'] * 100 : 0} %`);
  //   select('#confidencePlayer2').html(`${confidences['Player2'] ? confidences['Player2'] * 100 : 0} %`);
  //   select('#confidencePlayer3').html(`${confidences['Player3'] ? confidences['Player3'] * 100 : 0} %`);
  // }

  classify();
  console.log(result.label);
  if (result.label == 'Player1'){
    player1Score+=1;
    //select('#player1Score').html('Player 1 Score: '+player1Score);
  }else if (result.label == 'Player2') {
    player2Score+=1;
    //select('#player2Score').html('Player 2 Score: '+player2Score);
  }else if(result.label == 'Player3') {
    player3Score+=1;
    //select('#player3Score').html('Player 3 Score: '+player3Score);
  }else{
    return;
  }

}

function counterStart(){
  fill(255,0,0);
  text('Player1',0,20)
  rect(60,5,player1Score,20);
  fill(0,255,0);
  text('Player2',0,45)
  rect(60,30,player2Score,20);
  fill(0,0,255);
  text('Player3',0,70)
  rect(60,55,player3Score,20);

    if (player1Score >=400){
      winner = createElement('h2', 'Player 1 won!');
      winner.parent('winnerContainer');
      player1Score = 0;
      player2Score = 0;
      player3Score = 0;
      clearAllLabels()
    }else if (player2Score >=400) {
      console.log('player 2 won');
      winner = createElement('h2', 'Player 2 won!');
      winner.parent('winnerContainer');
      player1Score = 0;
      player2Score = 0;
      player3Score = 0;
      clearAllLabels()
    }else if (player3Score >=400) {
      winner = createElement('h2', 'Player 3 won!');
      winner.parent('winnerContainer');
      player1Score = 0;
      player2Score = 0;
      player3Score = 0;
      clearAllLabels()
    }else {
      return;
    }
}


// A util function to create UI buttons
function createButtons() {
  // When the A button is pressed, add the current frame
  // from the video with a label of "Player1" to the classifier
  buttonA = select('#addClassPlayer1');
  buttonA.mousePressed(function() {
    addExample('Player1');
  });

  buttonB = select('#addClassPlayer2');
  buttonB.mousePressed(function() {
    addExample('Player2');
  });

  buttonC = select('#addClassPlayer3');
  buttonC.mousePressed(function() {
    addExample('Player3');
  });

  // Reset buttons
  resetBtnA = select('#resetPlayer1');
  resetBtnA.mousePressed(function() {
    clearLabel('Player1');
  });

  resetBtnB = select('#resetPlayer2');
  resetBtnB.mousePressed(function() {
    clearLabel('Player2');
  });

  resetBtnC = select('#resetPlayer3');
  resetBtnC.mousePressed(function() {
    clearLabel('Player3');
  });

  // Predict button
  buttonPredict = select('#buttonPredict');
  buttonPredict.mousePressed(classify);

  // Clear all classes button
  buttonClearAll = select('#clearAll');
  buttonClearAll.mousePressed(clearAllLabels);

  // Load saved classifier dataset
  buttonSetData = select('#load');
  buttonSetData.mousePressed(loadMyKNN);

  // Get classifier dataset
  buttonGetData = select('#save');
  buttonGetData.mousePressed(saveMyKNN);
}

// Update the example count for each label
function updateCounts() {
  const counts = knnClassifier.getCountByLabel();
  let totalNumLabels = knnClassifier.getNumLabels();
  //console.log(totalNumLabels);

  select('#examplePlayer1').html(counts['Player1'] || 0);

//  console.log('Player1 count updated');
//  console.log('['+counts['Player1'] + ']' +' Player #1 images saved');
  select('#examplePlayer2').html(counts['Player2'] || 0);
  console.log('Player2 count updated');
  console.log('['+ counts['Player2'] + ']' +' Player #2 images saved');
  select('#examplePlayer3').html(counts['Player3'] || 0);
//  console.log('Player3 count updated');
//  console.log('['+counts['Player3'] + ']' +' Player #3 images saved');
}

// Clear the examples in one label
function clearLabel(label) {
  knnClassifier.clearLabel(label);
  updateCounts();
}

// Clear all the examples in all labels
function clearAllLabels() {
  knnClassifier.clearAllLabels();
  updateCounts();
}

// Save dataset as myKNNDataset.json
function saveMyKNN() {
  knnClassifier.save('myKNNDataset');
}

// Load dataset to the classifier
function loadMyKNN() {
  knnClassifier.load('./myKNNDataset.json', updateCounts);
}
