let w = window.innerWidth;
let h = window.innerHeight;
let y_range = 0.25;

let y = 0;
let max_blur = 20;

window.addEventListener('wheel', function(e) {
    // console.log('asdf');
    // console.log(e);
    y += e.deltaY;
    // console.log(y);
    if (y < 0){
        y = 0;
    } else if (y > max_blur*100) {
        y = max_blur*100;
    }

    let blur = max_blur - (y/100);
    if (blur < 0) {
        blur = 0;
    } 
    blurred_elements = document.getElementsByClassName("blur");

    for(let i=0; i<blurred_elements.length; i++){
        // let color = blurred_elements[i].style.textShadow.split(' ');
        // console.log(blurred_elements[i].style.textShadow.split(' '));

        if (blurred_elements[i].classList.contains("white-blur")) {
            blurred_elements[i].style.textShadow = "0 0 "+blur+"px #FFF";
        } else {
            blurred_elements[i].style.textShadow = "0 0 "+blur+"px #000";
        }

        // blurred_elements[i].style.textShadow = "0 0 "+blur+"px";
    }
    return false;
}, true)

function changeBackground(event){

    let m_y = event.clientY/h;
    let r = 255;
    if ((m_y > (0.5-y_range)) && (m_y < (0.5+y_range))){
        r = 255 - (255/y_range)*(m_y-(0.5-y_range));
    } else if (m_y >= 0.6){
        r = 0;
    }
    document.body.style.backgroundColor = "rgb("+r+","+r+","+r+")";

}

// function deblur(event){
//     console.log('asdf')
//     console.log(event);
// }