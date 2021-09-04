let current_time;
let previous_time;

let font;
function preload() {
  font = loadFont('assets/Helvetica.ttf');
}

let points = [];
let morph = [];
let morph_letter = [];
let k = 0;
let letter_count = 0;
let fr = 60;

let transition_seconds = 10;

let max_len = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255,255,0);
    frameRate(fr);

    let sentence = "Kieran";


    for (let i in sentence) {

        points[i] = [];

        let font_size = 200;
        let x_pos = width/2-font_size/4;
        let y_pos = height/2+font_size/3
        let p = font.textToPoints(sentence[i], x_pos, y_pos, font_size, {
            sampleFactor: 2,
            simplifyThreshold: 0
        });

        let index = 0; 

        let min_value = Infinity;
        let min_index = 0;
        p.forEach(function(j) {
            
            let distance = (j.x-0)**2 + (j.y-height)**2;
            if (distance <= min_value){
                min_value = distance;
                min_index = index;
            }

            points[i].push(createVector(j.x, j.y));
            index += 1;
        });


        points_front = points[i].splice(min_index);
        points[i].unshift(...points_front);

        if ((points[i].length) > max_len) {
            max_len = points[i].length;
        }
    }


    for (let i=0; i<max_len; i++){
        morph[i] = createVector(windowWidth/2, windowHeight/2);
    }


    current_time = millis();
    previous_time = millis();

    morph_letter = points[0];
}


let i = 0;
function draw() {

    // Morphing text
    background(255,255,0);

    current_time = millis();

    k += ((current_time-previous_time)/(transition_seconds*2000));

    if (k > 1) {
        previous_time = millis();
        k = 0;
        letter_count += 1;
        morph_letter = points[letter_count%(points.length)];
    }


    for (let i=0; i<morph.length; i++){
        morph[i].lerp(morph_letter[floor(i*morph_letter.length/max_len)], k);
    }

 

    // strokeWeight(1);

    noStroke();
    smooth();

    beginShape();
    for (let i=0; i<morph.length; i++) {
        vertex(morph[i].x , morph[i].y);
    }
    endShape(CLOSE);

    // beginShape();
    // for (let i=0; i<points[2].length; i++) {
    //     vertex(points[2][i].x , points[2][i].y);
    // }
    // endShape(CLOSE);






    
    // Writing out text point by point

    // point(morph_letter[i].x , morph_letter[i].y);

    // i += 1;

    // if (i>=morph_letter.length) {
    //     console.log('changing letter')
    //     console.log(i);
    //     console.log(morph_letter.length)
    //     background(255,255,0);
    //     i = 0;
    //     letter_count += 1;
    //     morph_letter = points[letter_count%points.length];
    //     console.log(letter_count%points.length)
    // }

        
    
    




}