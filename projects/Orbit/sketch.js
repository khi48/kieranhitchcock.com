class Planet {

  constructor(colour, size, radius) {
    this.size = size;
    this.colour = colour;
    this.radius = radius;
    this.randomise();
  }

  randomise() {
    this.angle = 0; // random(0, 2*PI);
    this.angular_speed = random(1,5)*PI/180;
    this.x = this.radius*cos(this.angle);
    this.y = this.radius*sin(this.angle);
    this.update();
  }
  
  update() {
    this.x = this.radius*cos(this.angle);
    this.y = this.radius*sin(this.angle);
    this.angle += this.angular_speed;
  }

  draw(width, height){
    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(width/2, height/2, this.radius*2, this.radius*2);
    strokeWeight(1);
    stroke(0);
    fill(this.colour[0], this.colour[1], this.colour[2]);
    ellipse(this.x + width/2, this.y + height/2, this.size, this.size);
  }
}

function venus_and_earth_planets() {
  planet_list[0].angle = 0; //random(0, 2*PI);
  planet_list[0].angular_speed = 1.625*3*PI/180; //planet_list[1].angular_speed;
  planet_list[0].radius = 0.723*outer_radius;
  planet_list[0].update();

  planet_list[1].angle = 0; //random(0, 2*PI);
  planet_list[1].angular_speed = 3*PI/180;
  planet_list[1].radius = outer_radius;
  planet_list[1].update();

  // planet_pos = [];

  pg = createGraphics(width, height);
  pg.translate(width/2, height/2);
  
  // pg.fill(0);
  // pg.rect(-displayWidth/2-1, -displayHeight/2-1, displayWidth, displayHeight);

}

function random_planets() {
  planet_list[0].radius = Math.floor((Math.random() * outer_radius/4) + outer_radius/2);
  planet_list[1].radius = outer_radius;
  planet_list[0].randomise()
  planet_list[1].randomise()

  // planet_pos = [];

  pg = createGraphics(width, height);
  pg.translate(width/2, height/2);

  // pg.fill(0);
  // pg.rect(-displayWidth/2-1, -displayHeight/2-1, displayWidth, displayHeight);

}


var planet_list = [];
var planet_pos = [];
var fr = 30;

var line_count = 1;
var count = line_count;

var venus_earth_button;
var random_button;

var pg;

let outer_radius;
let inner_radius;

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);

  pg = createGraphics(width, height);
  pg.translate(width/2, height/2);
  // pg.fill(0);
  // pg.rect(-displayWidth/2-1, -displayHeight/2-1, displayWidth, displayHeight);

  
  frameRate(fr);
  background(0);

  outer_radius = width*0.4;
  if (height < width){
    outer_radius = height*0.4;
  }

  inner_radius = Math.floor((Math.random() * outer_radius/4) + outer_radius/2);

  planet_list.push(new Planet([255,172,65], 20, outer_radius)); // Earth 6,371km, distance to sun 150.51 million km
  planet_list.push(new Planet([255,30,86], 20, inner_radius)); // Sun 696,340km // 171.4

  venus_earth_button = createButton('Venus and Earth');
  venus_earth_button.size(120,35);
  venus_earth_button.style("font-family", "Bodoni");
  venus_earth_button.style("font-size", "14px");
  venus_earth_button.position(width-300, height-50);
  venus_earth_button.mousePressed(venus_and_earth_planets);

  random_button = createButton('Randomize')
  random_button.size(120,35);
  random_button.style("font-family", "Bodoni");
  random_button.style("font-size", "14px");
  random_button.position(width-150, height-50);
  random_button.mousePressed(random_planets);
}


function draw() {
  // put drawing code here
  // line(100, 100, 50, 50);

  // fill(0, 12);
  // rect(0, 0, displayWidth, displayHeight);


  background(0); //, 12);

  // count -= 1;
  // if (count < 0) {
  //   count = line_count;
  // }


  pg.fill(255);
  //pg.fill(0);
  pg.stroke(255) //, 50);
  pg.strokeWeight(0.2);
  // stroke(0, 255, 255, 100);

  //pg.rect(0,0, displayWidth, displayHeight);
  

  //pg.line(planet_list[0].x+displayWidth/2, planet_list[0].y+displayHeight/2, planet_list[1].x+displayWidth/2, planet_list[1].y+displayHeight/2);
  pg.line(planet_list[0].x, planet_list[0].y, planet_list[1].x, planet_list[1].y);

  // let j = 0;
  // for (j=0; j<(planet_pos.length/2); j++){
  //   line(planet_pos[2*j][0], planet_pos[2*j][1], planet_pos[2*j+1][0], planet_pos[2*j+1][1]);
  // }

    

  image(pg, 0, 0);
  
  let i = 0;
  noStroke();
  for (i=0; i<planet_list.length; i++){
    planet_list[i].update();
    planet_list[i].draw(width, height);

    // if (count <= 0) {
    //   planet_pos.push([planet_list[i].x+displayWidth/2, planet_list[i].y+displayHeight/2]);
    // }
  }



  //ellipse(displayWidth/2, displayHeight/2, 50, 50);
  // print("asdf")
}