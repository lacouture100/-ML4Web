var seaRoseLines;
function preload() {
  seaRoseLines = loadStrings('sea_rose.txt');
}
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(50);
  textSize(16);
  noStroke();
  textAlign(LEFT, TOP);
  for (var i = 0; i < seaRoseLines.length; i++) {
    var words = seaRoseLines[i].split(" ");
    var currentOffset = 0;
    for (var j = 0; j < words.length; j++) {
      var wordWidth = textWidth(words[j]);
      fill(128+(i*10));
      rect(25+currentOffset, 25+i*20,wordWidth, 16);
      if (mouseIsPressed) {
        fill(0);
        text(words[j], 25+currentOffset, 25+i*20);
      }
      // four pixels between words
      currentOffset += wordWidth + 4;
    }
  }
}

var classLines;
function preload() {
  classLines = loadStrings('sea_rose.txt');
}
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(50);
  textSize(16);
  noStroke();
  textAlign(LEFT, TOP);
  for (var i = 0; i < classLines.length; i++) {
    var words = classLines[i].split("\n");
    var currentOffset = 0;
    for (var j = 0; j < words.length; j++) {
      var wordWidth = textWidth(words[j]);
      fill(128+(i*10));
      rect(25+currentOffset, 25+i*20,wordWidth, 16);

      fill(0);
      text(words[j], 25+currentOffset, 25+i*20);

      // four pixels between words
      currentOffset += wordWidth + 4;
    }
  }
}
