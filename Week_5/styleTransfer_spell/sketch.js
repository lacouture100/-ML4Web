// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Style Transfer Image Example using p5.js
This uses a pre-trained model of The Great Wave off Kanagawa and Udnie (Young American Girl, The Dance)
=== */

let style;
let video;
let resultImg;
let width = 400;
let height = 400;



function setup() {
  createCanvas(width, height).parent('canvasContainer');

  video = createCapture(VIDEO);
  //video.hide();

  // The results image from the style transfer
  resultImg = createImg(video);
  resultImg.size(width,height),

  // Create a new Style Transfer method with a defined style.
  // We give the video as the second argument
  style = ml5.styleTransfer('models/pantone', video, modelLoaded);
}

function draw(){
  image(resultImg, 0, 0, width, height);
  image(video, 0, 0, width, height);
}

// A function to call when the model has been loaded.
function modelLoaded() {
  select('#status').html('Model Loaded');
  style.transfer(gotResult);
}

// When we get the results, update the result image src
function gotResult(err, img) {
  resultImg.attribute('src', img.src);
  style.transfer(gotResult);
}
