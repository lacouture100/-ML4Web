class Drawing {
  constructor( image,x,y,w,h,speed){
    this.image = image;
    this.x=x;
    this.y=y;
    this.w=w;
    this.h=h;
    this.speed=speed;
    this.r = 20
  }

  show(){
    image(this.image, this.x, this.y, this.w, this.h);
  }
  move(){
    this.x = this.x - this.speed;
  }
}
