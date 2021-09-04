var swat_img;
var swat_location = [0,0];
var swat_size = [0,0];
var swat_scale = 0.2;

var fly_img;
var fly_location = [0,0];
var fly_size = [0,0];
var fly_scale = 0.3;

var squashed_fly_img;
var squashed_flies = [];

// var speedX = 3;
// var speedY = 4;

var tx = 0;
var ty = 10000;

var speed_change = 1;
var max_speed = 6;
var min_speed = 4;

var angle_change = 10;

var angle = angle_change;
var speed = min_speed;

var fly_swat_count = 0
var text_size = 24

var squish_sound;
var fly_buzzing;


var num_control_systems = 3
var control_system = 0;

function preload() {
  swat_img = loadImage("assets/swat.png");
  fly_img = loadImage("assets/fly2.png");
  squashed_fly_img = loadImage("assets/squashed_fly2.png");
  // squish_sound = loadSound('assets/squish.mp3');
  // fly_buzzing = loadSound('assets/fly-noise.mp3');
}

function generateNewFlyLocaction() {
  fly_location = [random(width-fly_size[0]), random(height-fly_size[1])];

  angle = random(0, 360);
  speed = random(min_speed, max_speed);
}

function updateFlyLocaction(){  

  angle += (noise(tx)-0.5)*angle_change;
  speed += (noise(ty)-0.5)*speed_change;

  if (speed > max_speed) {
    speed = max_speed;
  } else if (speed < min_speed){
    speed = min_speed;
  }

  // if the ball hits the top or the bottom, change the direction of the ball 	
  let padding = 1;
  if (fly_location[0] >= width-fly_size[0]-padding || fly_location[0] <= 0+padding) {
    angle += radians(270);
  }
  if (fly_location[1] >= height-fly_size[1]-padding || fly_location[1] <= 0+padding) {
    angle += radians(270);
  }

  fly_location[0] += speed*cos(angle);
  fly_location[1] += speed*sin(angle);
 
  tx += 0.01;
  ty += 0.01;

}

function rotate_and_draw_image(img, x, y, img_width, img_height, angle){
  imageMode(CENTER);
  translate(x+img_width/2, y+img_width/2);
  rotate(angle);
  image(img, 0, 0, img_width, img_height);
  rotate(-angle);
  translate(-(x+img_width/2), -(y+img_width/2));
  imageMode(CORNER);
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  control_system =  int(random(num_control_systems));

  swat_size[0] = swat_scale*swat_img.width;
  swat_size[1] = swat_scale*swat_img.height;

  fly_size[0] = fly_scale*fly_img.width;
  fly_size[1] = fly_scale*fly_img.height;

  angle_change = radians(angle_change)

  generateNewFlyLocaction()

  // fly_buzzing.play();
} 

function checkCollision(){
// l1: Top Left coordinate of first rectangle.
// r1: Bottom Right coordinate of first rectangle.
// l2: Top Left coordinate of second rectangle.
// r2: Bottom Right coordinate of second rectangle.

  // rect(swat_location[0], swat_location[1], swat_size[0], swat_size[1])

  var l1_x = swat_location[0];
  var l1_y = swat_location[1];
  var r1_x = swat_location[0] + swat_size[0];
  var r1_y = swat_location[1] - swat_size[1];


  // rect(fly_location[0]+fly_size[0]/6, fly_location[1]+fly_size[1]/6, fly_size[0]-fly_size[0]/3, fly_size[1]-fly_size[1]/3);

  // putting in offset to try and minimise fly area
  var l2_x = fly_location[0] + fly_size[0]/6;
  var l2_y = fly_location[1] + fly_size[1]/6;
  var r2_x = fly_location[0] + fly_size[0] - fly_size[0]/3;
  var r2_y = fly_location[1] - fly_size[1] -fly_size[1]/3;

  if (l1_x >= r2_x || l2_x >= r1_x) {
    return false; 
  }
  
  // If one rectangle is above other 
  if (l1_y <= r2_y || l2_y <= r1_y) {
    return false; 
  }

  return true; 

}

function mousePressed() {
  print(checkCollision())
  if (checkCollision()) {

    // squish_sound.play();
    fly_swat_count += 1;

    squashed_flies.push([fly_location[0], fly_location[1]])

    max_speed += 0.2;
    min_speed += 0.2;

    generateNewFlyLocaction();

    // control_system = int(random(num_control_systems));
  }
}

function draw() {
  updateFlyLocaction()

  // if (!(fly_buzzing.isPlaying())) {
  //   fly_buzzing.play();
  // }


  background(255)
  let i = 0;

  for (i=0;i<squashed_flies.length;i++){
    image(squashed_fly_img, squashed_flies[i][0], squashed_flies[i][1], fly_size[0], fly_size[1]); 
  }
  // rect(swat_location[0], swat_location[1], swat_size[0], swat_size[1])
  // rect(fly_location[0]+fly_size[0]/6, fly_location[1]+fly_size[1]/6, fly_size[0]-fly_size[0]/3, fly_size[1]-fly_size[1]/3)
  // print(fly_size[0]);
  // print(fly_size[1]);
  // image(img, width-mouseX, height-mouseY);


  // swat_location[0] = width - (mouseX - (swat_scale*swat_img.width*0.5));
  // swat_location[1] = height - (mouseY - (swat_scale*swat_img.height*0.8));

  swat_location[0] = width - mouseX;
  swat_location[1] = height - mouseY;


  // if (control_system == 0){
  //   /* Regular Mouse Control */
  //   swat_location[0] = mouseX - (swat_scale*swat_img.width*0.5);
  //   swat_location[1] = mouseY - (swat_scale*swat_img.height*0.8);
  // } else if (control_system == 1){
  //   /* Inverted Mouse Control (moving mouse left moves swatter right) */
    // swat_location[0] = width - (mouseX - (swat_scale*swat_img.width*0.5));
    // swat_location[1] = height - (mouseY - (swat_scale*swat_img.height*0.8));
  // } else if (control_system = 2){
  //   /* Inverted and Swapped Mouse Control (moving mouse left move swatter down) */
  //   swat_location[0] =  mouseY*width/height - (swat_scale*swat_img.width*0.5);
  //   swat_location[1] = mouseX*height/width - (swat_scale*swat_img.height*0.8);
  // }

  //image(fly_img, fly_location[0], fly_location[1], fly_size[0], fly_size[1]); 
  rotate_and_draw_image(fly_img, fly_location[0], fly_location[1], fly_size[0], fly_size[1], angle);
  image(swat_img, swat_location[0], swat_location[1], swat_size[0], swat_size[1]); 


  let s = 'Flies Swatted: ' + String(fly_swat_count);
  textSize(text_size);
  // fill(0, 102, 153);
  text(s, text_size/2, text_size); 

}