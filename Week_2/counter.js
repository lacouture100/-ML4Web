class CounterBar{
  constructor(startValue, endValue, currentValue,corner1X,corner1Y,corner2X){
    this.startValue = startValue;
    this.endValue = endValue;
    this.currentValue = currentValue;

  }
  show(){
    stroke(2);
    fill(255,0,0);
    //rectMode(CORNERS) interprets the first two parameters of rect()
   //as the location of one corner,and the third and fourth parameters
   //as the location of the opposite corner.
    rectMode(CORNERS);
    this.corner2X = ((width/2)/100) * currentValue;
    rect(this.corner1X,this.corner1Y,this.corner2X,(this.corner2Y+20));
  }
}
