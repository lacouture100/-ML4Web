class textObj{
  constructor(text,textSizeVar,x,y){
    this.text=text;
    this.textSizeVar= textSizeVar;
    this.x=x;
    this.y=y;

  }
  show(){
    stroke(2);
    fill(255,0,0);
    textSize(textSizeVar);
    text(this.text,this.x,this.y);

  }

}
