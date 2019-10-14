var serial; // variable to hold an instance of the serialport library
var portName = 'COM5'; // fill in your serial port name here
var inData; // for incoming serial data
var outByte = 0; // for outgoing data
var video;

let noseX=0;
let noseY = 0;

let poseNet;
let poses = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.open(portName);

  poseNet = ml5.poseNet(video, 'multiple', modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  })
}

function draw() {
  // black background, white text:
  background(0);
  fill(255);
  // display the incoming serial data as a string:
  text("incoming value: " + inData, 30, 30);
  drawPose();
  serial.write(outByte);
  fill(255,0,0);
  //ellipse(noseX, noseY,20,20);
  stroke(255);
  line(noseX,0,noseX,height);
  line(0,noseY,width,noseY);
}


function modelReady() {
  select('#status').html('Video and Model Loaded');
}
function drawPose(){
  for (let i = 0; i < 2; i++) {
    if (poses[i] && poses[i].pose) {

      let noseX1 = poses[i].pose.nose.x;
      noseX = lerp(noseX, noseX1, 0.2);
      let noseY1 = poses[i].pose.nose.y;
      noseY = lerp(noseY, noseY1, 0.2);

      outByte = map(noseX, 0, width, 0, 179);

    }
  }
}


function serialEvent() {
  // read a byte from the serial port:
  var inByte = serial.read();
  // store it in a global variable:
  inData = inByte;
  console.log(inData);
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}


function mouseDragged() {
  //map the mouseY to a range from 0 to 255:
  // outByte = int(map(mouseY, 0, height, 0, 255));
  // //send it out the serial port:
  // serial.write(outByte);
}

function keyPressed() {
  if (key >= 0 && key <= 9) { // if the user presses 0 through 9
    //outByte = byte(key * 25); // map the key to a range from 0 to 225
  }
  //serial.write(outByte); // send it out the serial port
}
