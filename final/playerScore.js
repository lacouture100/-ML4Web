class playerScore{
  constructor(playerText,
              textSize,
              textContainerW,

              heartContainerW,
              heartContainerH,
              heartSizeX,
              heartSizeY,
              heartSizeW,
              heartSizeH,

              ContainerX,
              ContainerY,
              ContainerW,
              ContainerH,
              lives){

    this.playerText = playerText;
    this.textSize = textSize;
    this.textContainerW = textContainerW;

    this.heartContainerW = heartContainerW;
    this.heartContainerH = heartContainerH;
    this.heartContainerX = heartContainerX;
    this.heartContainerY = heartContainerY;
    this.heartSizeW =  heartSizeW;
    this.heartSizeH = heartSizeH;

    this.containerX = containerX;
    this.containerY = containerY;
    this.containerW = containerW;
    this.containerH = containerH;


    this.lives = lives;

    createHearts(){
        
      image(heartImg, (this.containerW - (5/6 * this.heartContainerW)), this.ContainerY, this.heartSizeW, this.heartSize);

    }
    createName(){
      text(this.playerText, this.heartContainerX, this.heartContainerY, (this.heartContainerX + this.textWidth), (this.heartContainerY + this.heartContainerH);
    }
  }
}
