class StickFigure {
  constructor(playerIndex, sNoseX,
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
  ) {

    this.playerIndex = playerIndex
    this.sNoseX = sNoseX
    this.sNoseY = sNoseY
    this.sNeckX = sNeckX
    this.sNeckY = sNeckY
    this.sElbowLX = sElbowLX
    this.sElbowLY = sElbowLY
    this.sElbowRX = sElbowRX
    this.sElbowRY = sElbowRY
    this.sWristLX = sWristLX
    this.sWristLY = sWristLY
    this.sWristRX = sWristRX
    this.sWristRY = sWristRY
    this.sHipX = this.sNeckX
    this.sHipY = this.sNeckY + 23
    this.r = 50;


    // this.sKneeLX = sKneeLX,
    // this.sKneeLY = sKneeLY,
    // this.sKneeRX = sKneeRX,
    // this.sKneeRY = sKneeRY,
    // this.sAnkleLX = sAnkleLX,
    // this.sAnkleLY = sAnkleLY,
    // this.sAnkleRX = sAnkleRX,
    // this.sAnkleRY = sAnkleRY
  }





  draw() {
    let headSizeX = 20;
    let headSizeY = 30;


    strokeWeight(5);

    //if (this.playerIndex == 0) {
    stroke(0, 0, 0, 200);
    fill(0, 0, 0, 0);
    ellipse(this.sNoseX, this.sNoseY, headSizeX, headSizeY);
    //ellipse(this.sWristRX, this.sWristRY, 10, 10);
    //ellipse(this.sWristLX, this.sWristLY, 10, 10);
    image(planeImg, this.sNoseX - 100, this.sNoseY - 52);
    line(this.sNeckX, this.sNeckY, this.sHipX, this.sHipY);
    //Draw the right arm
    line(this.sNeckX, this.sNeckY, this.sElbowRX, this.sElbowRY);
    line(this.sElbowRX, this.sElbowRY, this.sWristRX, this.sWristRY);
    //Draw the left arm
    line(this.sNeckX, this.sNeckY, this.sElbowLX, this.sElbowLY);
    line(this.sElbowLX, this.sElbowLY, this.sWristLX, this.sWristLY);
    console.log(sWristLX)
    //Draw the right leg
    // line(this.sHipX, this.sHipY, this.sKneeRX, this.sKneeRY);
    // line(this.sKneeRX, this.sKneeRY, this.sAnkleRX, this.sAnkleRY);
    // //Draw the left leg
    // line(this.sHipX,this.sHipY, this.sKneeLX, this.sKneeLY);
    // line(this.sKneeLX, this.sKneeLY, this.sAnkleLX, this.sAnkleLY);
    //}
  }
  move(movementX, movementY) {
    let previousPoses = []

    this.movementX = movementX;
    this.movementY = movementY

    //let moveVert = (this.sWristLX - this.sWristRX);
    let textPosX = 45;
    //console.log(this.moveDirection)

    this.sNoseX += this.movementX;
    this.sNeckX += this.movementX;
    this.sElbowLX += this.movementX;
    this.sElbowRX += this.movementX;
    this.sWristLX += this.movementX;
    this.sWristRX += this.movementX;
    this.sHipX += this.movementX;

    this.sNoseY += this.movementY;
    this.sNeckY += this.movementY;
    this.sElbowLY += this.movementY;
    this.sElbowRY += this.movementY;
    this.sWristLY += this.movementY;
    this.sWristRY += this.movementY;
    this.sHipY += movementY;


  }


  // strokeWeight(1);
  // textFont(fontOpen);
  // textSize(40);
  //
  // text(('Move right:' + moveRight),textPosX,height-120)
  // text(('Move left:' + moveLeft),textPosX,height-80)
  // text(('Move Direction:' + this.moveDirection),textPosX,height-40)
  //
  //
  // text(('NoseX:' + this.sNoseX),textPosX,height-200)
  // text(('NoseY:' + this.sNoseY),textPosX,height-160)
   hits(drawing){
    let d = dist(this.sNoseX, this.sNoseY, drawing.x, drawing.y)
    if (d< this.r + drawing.r){
      return true;
    }else{
      return false;
    }
    




  }
}
