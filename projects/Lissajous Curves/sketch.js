class Circle{
  // angles and angluar speed in radians

  constructor(theta, ang_vel, x, y, radius, dir){
    this.theta = theta;
    this.ang_vel = ang_vel;
    this.centre_x = x;
    this.centre_y = y;
    this.radius = radius;

    this.dir = dir;
    this.line_length = height-100;

    this.point_radius = 5;
    this.update_point();

  }

  update_point(){
    this.point_x = this.radius*cos(this.theta) + this.centre_x;
    this.point_y = this.radius*sin(this.theta) + this.centre_y;
    this.theta += this.ang_vel;
  }

  draw(){

    noFill();
    stroke(127);
    ellipse(this.centre_x, this.centre_y, this.radius*2, this.radius*2);
    noStroke();
    fill(192, 0, 0);
    ellipse(this.point_x, this.point_y, this.point_radius, this.point_radius);
    stroke(127, 100);
    strokeWeight(2); 
    line(this.point_x, this.point_y, this.point_x + (1-this.dir)*this.line_length, this.point_y + (this.dir)*this.line_length)
    strokeWeight(1); 
  }
}

var horizontal_circle_list = [];
var vertical_circle_list = [];
var num_circles = 5;

var colours = [[192, 192, 0], [255, 255, 192], [255, 192, 192], [0, 128, 64], [128, 192, 64], [128, 192, 128], [64, 192, 192], [64, 128, 128], [80, 0, 192], [128, 64, 255], [160, 160, 160], [64, 64, 64], [128, 0, 128], [192, 128, 192], [192, 192, 255], [128, 128, 64]];

//var fr = 100;
var g;

function setup() {

  // put setup code here
  createCanvas(windowWidth, windowHeight);
  g = createGraphics(width, height);
  background(15);
  //frameRate(fr);

  // make x direction circles
  let i = 0;
  let radius = ((height-200)/(5*num_circles))
  for (i=0; i<num_circles; i++){
    horizontal_circle_list.push(new Circle(random(PI), (i+1)*PI/random(5,10)/120, i*(height/(num_circles+0.5)) + radius*4, 0, radius, 1));
  }

  // make y direction circles
  for (i=0; i<num_circles; i++){
    vertical_circle_list.push(new Circle(random(PI), (i+1)*PI/random(5,10)/120, 0, i*(height/(num_circles+0.5)) + radius*4, radius, 0));
  }
}


function draw() {
  translate(width/4, 50);
  background(15);

  let col = 0;

  let i = 0;
  for (i=0; i<num_circles; i++){
    horizontal_circle_list[i].update_point();
    horizontal_circle_list[i].draw();
    vertical_circle_list[i].update_point();
    vertical_circle_list[i].draw();
    let j = 0;
    let x = horizontal_circle_list[i].point_x;
    for (j=0; j<num_circles; j++){
      g.stroke(colours[col]); // Change the color

      if (col >= (colours.length-1)){
        col = 0;
      } else {
        col += 1;
      }

      g.strokeWeight(1.5); // Make the points 10 pixels in size
      g.point(x, vertical_circle_list[j].point_y);
    }
  } 
  // put drawing code here
  // line(100, 100, 50, 50);
  // noFill();
  // ellipse(50, 50, 80, 80);
  // print("asdf")
  image(g, 0, 0);
}