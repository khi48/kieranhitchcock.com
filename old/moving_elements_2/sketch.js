class MoveableElement {
    constructor(obj) {
      this.obj = obj;
      this.speed = createVector();
      this.cursor_radius = 100;
      this.w = this.obj.width;
      this.h = this.obj.height;
      this.pos = this.obj.position();
    }

    savePos() {
        this.pos = this.obj.position();
    }
  
    update(mouse_pos) {

        // adding width and height of button to shift it from top left corner to centre
        let pos = createVector(this.pos.x + this.w/2, this.pos.y + this.h/2);
        
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


        // Checking Edges of Screen
        if (pos.x >= (width-this.w/2)){
            this.speed.x *= -1;
            pos.x = width-this.w/2;
        } else if (pos.x <= (0+this.w/2)) {
            this.speed.x *= -1;
            pos.x = this.w/2;
        }

        if (pos.y >= (height-this.h/2)){
            this.speed.y *= -1;
            pos.y = height-this.h/2;
        } else if (pos.y <= (0+this.h/2)) {
            this.speed.y *= -1;
            pos.y = this.h/2;
        }

        // Updating Element Position
        pos.add(this.speed);


        // Removing width and height of button to shift it back to top left corner
        let x = pos.x-this.w/2;
        let y = pos.y-this.h/2;

        // Updating Elements Position
        this.obj.position(x, y);

        this.pos = {x: x, y: y};
    }
}



let obj_list = [];


function addTitle() {
    let title = "Kieran Hitchcock";
    let title_el = createElement('h1', '');
    title_el.parent(document.getElementById('index-wrapper'));
    title_el.style("grid-area", "title");

    for (i = 0; i < title.length; i++) {
        let letter = title[i];

        let span = createSpan(letter);
        span.className = "m";

        title_el.child(span);

        obj_list.push(new MoveableElement(span)); 

    }
}


function addButtons() {
    resume_btn = createButton('Resume');
    resume_btn.id("resume-btn");
    resume_btn.className = 'm';
    resume_btn.parent(document.getElementById('index-wrapper'));
    obj_list.push(new MoveableElement(resume_btn)); 

    project_btn = createButton('Projects'); 
    project_btn.id("project-btn");
    project_btn.className = 'm';
    project_btn.parent(document.getElementById('index-wrapper'));
    obj_list.push(new MoveableElement(project_btn)); 

    contact_btn = createButton('Contact'); 
    contact_btn.id("contact-btn");
    contact_btn.className = 'm';
    contact_btn.parent(document.getElementById('index-wrapper'));
    obj_list.push(new MoveableElement(contact_btn)); 
}

  
function setup(){
    c = createCanvas(windowWidth, windowHeight);
    c.position(0,0);
    clear();

    frameRate(60);

    addTitle();
    addButtons();

}

function draw(){

    background(255);
    clear();

    let mouse_pos = createVector(mouseX, mouseY);
    for (i in obj_list){
        obj_list[i].savePos();
    }

    for (i in obj_list){
        obj_list[i].update(mouse_pos);
    }
    
}

  
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}