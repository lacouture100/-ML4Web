
#include <Servo.h>

Servo myservo;

void setup() {
  Serial.begin(9600);        
  myservo.attach(9);// initialize serial communications
  pinMode(0, OUTPUT);
}

void loop() {

  if (Serial.available() > 0) { // if there's serial data available
    int inByte = Serial.read();   // read it
    Serial.write(inByte);         // send it back out as raw binary data
    analogWrite(0,  inByte);
    myservo.write(inByte);
  } 
  
}
