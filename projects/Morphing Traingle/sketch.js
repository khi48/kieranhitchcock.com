let circleR = 100;
let divisions = 1000;

let circle_points = [];
let traingle_points = [];

let current_time;
let previous_time;

function setup(){
    createCanvas(windowWidth, windowHeight);

    let theta = 2*PI/divisions;

    let p1 = createVector(circleR*sin(0)+windowWidth/2,-circleR*cos(0)+windowHeight/2);
    let p2 = createVector(circleR*sin(2/3*PI)+windowWidth/2, -circleR*cos(2/3*PI)+windowHeight/2);
    let p3 = createVector(circleR*sin(4/3*PI)+windowWidth/2, -circleR*cos(4/3*PI)+windowHeight/2);
    let p_list = [p1, p2, p3];

    // let p = floor(divisions/3)
    // for (let i=0; i<p; i++) {
    //     traingle_points.push(lerp(p1, p2, i/p));
    // }

    // for (let i=0; i<p; i++) {
    //     traingle_points.push(lerp(p2, p3, i/(divisions/3)));
    // }

    // for (let i=0; i<p; i++) {
    //     traingle_points.push(lerp(p3, p1, i/(divisions/3)));
    // }

    let j = 0;

    for (let i=0; i<divisions; i++) {
        circle_points.push(createVector(circleR*sin(theta*i)+windowWidth/2, -circleR*cos(theta*i)+windowHeight/2));

        let lerp_amt = (i-j*(divisions/3))/(divisions/3);

        if (lerp_amt>1){
            j += 1;
            lerp_amt = (i-j*(divisions/3))/(divisions/3);

        }

        traingle_points.push(p5.Vector.lerp(p_list[(j)%p_list.length], p_list[(j+1)%p_list.length], lerp_amt));

    }

    // console.log(traingle_points);
    // console.log(p_list[(j)%p_list.length]);
    // console.log(p_list[(j+1)%p_list.length]);
    // console.log(p5.Vector.lerp(p_list[(j)%p_list.length], p_list[(j+1)%p_list.length], 0.5));

    current_time = millis();
    previous_time = millis();
    
}

let morph = [];
let k = 0;
let dir = 1;
let fr = 60;


function draw() {
    background(255,255,0);
    frameRate(fr);

    // circle(windowWidth/2, windowHeight/2, circleD);
    strokeWeight(3);
    // stroke(255, 204, 0);


    // k += dir*0.01; // has to be multipe of 1...

    current_time = millis();
    // console.log(previous_time)

    k += dir*0.005;//((current_time-previous_time)/600);

    if (k > 1) {
        console.log('too large')
        previous_time = current_time;
        dir = -1;
    } else if (k < 0) {
        console.log('too small')

        previous_time = current_time;
        dir = 1;
    } 

    console.log(k)



    

    for (let i=0; i<divisions; i++){
        morph[i] = p5.Vector.lerp(circle_points[i], traingle_points[i], k);
    }

    fill('red');
    beginShape();
    for (let i=0; i<divisions; i++) {
        vertex(morph[i].x, morph[i].y);
    }
    endShape(CLOSE);


    // strokeWeight(10);

    // // beginShape();
    // for (let i=0; i<divisions; i++) {
    //     point(traingle_points[i].x, traingle_points[i].y);
    // }
    // // endShape(CLOSE);

    // // beginShape();
    // for (let i=0; i<divisions; i++) {
    //     point(circle_points[i].x, circle_points[i].y);
    // }
    // // endShape(CLOSE);


    // point(circle_points[999].x, circle_points[999].y);
    // point(traingle_points[999].x, traingle_points[999].y);

}