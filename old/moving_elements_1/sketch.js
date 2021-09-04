class Element {
  constructor(obj){
    this.obj = obj;
    this.speed = createVector();
    this.cursor_radius = 100;
  }

  update(mouse_pos){

    //this.updateSize();
    let w = this.obj.width;
    let h = this.obj.height;

    // adding width and height of button to shift it from top left corner to centre
    let pos = createVector(this.obj.position().x+w/2, this.obj.position().y+h/2);


    let distance = pos.dist(mouse_pos);
    if (distance < this.cursor_radius){
      this.speed = p5.Vector.sub(pos, mouse_pos).mult((this.cursor_radius-distance)/25);
    }

    let speed_mag = this.speed.mag();
    if (speed_mag > 0.5){
      this.speed.setMag(speed_mag*0.8);
    } else {
        this.speed.setMag(0);
    }

    if (pos.x >= (width-w/2)){

      this.speed.x *= -1;
      pos.x = width-w/2;
    } else if (pos.x <= (0+w/2)) {
      this.speed.x *= -1;
      pos.x = w/2;
    }

    if (pos.y >= (height-h/2)){
      this.speed.y *= -1;
      pos.y = height-h/2;
    } else if (pos.y <= (0+h/2)) {
      this.speed.y *= -1;
      pos.y = h/2;
    }

    pos.add(this.speed);

    // removing width and height of button to shift it back to top left corner
    let x = pos.x-w/2;
    let y = pos.y-h/2;

    this.obj.position(x, y);


  }
}

let obj_list = [];

function projectsPage(){
  location.href='projects.html';
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(255);
  frameRate(60);



  let p = "Yeah I haven't really done anything yet, you can try to push the buttons if you want..."
  let paragraph = createButton(p);
  paragraph.size(width*3/4);
  paragraph.position(width/2-paragraph.width/2, height*2/4);
  paragraph.style("font-size", str(width/45) + "px");
  paragraph.style("color", "black");

  let title = 'Kieran Hitchcock';
  let text_size = width/10;
  textSize(text_size);
  let title_len = textWidth(title);
  let x = width/2-title_len/2;

  for (i in title){
    let letter = title[i];
    let letter_len = textWidth(letter);

    let letter_span = createSpan(letter); 
    letter_span.size(letter_len, text_size);
    letter_span.position(x, height/4);  
    x += letter_len;
    letter_span.style("font-size", str(text_size) + "px");
    letter_span.style("color", "black");

    obj_list.push(new Element(letter_span));

    letter_span.id('p'+str(i))
  }

  let button_size = createVector(width/8, width/24);
  let button_text_size = button_size.x/6
  let resume_btn = createButton('Resume');
  resume_btn.size(button_size.x, button_size.y);
  resume_btn.position(width/4-resume_btn.width/2, height*3/4);
  resume_btn.style("font-size", str(button_text_size) + "px");
  resume_btn.style("background-color", "#FAEFD0"); 

  obj_list.push(new Element(resume_btn));

  let projects_btn = createButton('Projects'); 
  projects_btn.size(button_size.x, button_size.y);
  projects_btn.position(width/2-projects_btn.width/2, height*3/4);
  projects_btn.style("font-size", str(button_text_size) + "px");
  projects_btn.style("background-color", "#B9E3B1"); 
  projects_btn.mousePressed(projectsPage);
  obj_list.push(new Element(projects_btn));

  let contact_btn = createButton('Contact'); 
  contact_btn.size(button_size.x, button_size.y);
  contact_btn.position(width*3/4-contact_btn.width/2, height*3/4);
  contact_btn.style("font-size", str(button_text_size) + "px");
  contact_btn.style("background-color", "#C2EDFF");

  obj_list.push(new Element(contact_btn));
  
}

    
function draw(){
  background(255);
 

  fill(255);
  //ellipse(b1.x, b1.pos.y, 50, 50);
  let mouse_pos = createVector(mouseX, mouseY);
  for (i in obj_list){
    obj_list[i].update(mouse_pos);
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}