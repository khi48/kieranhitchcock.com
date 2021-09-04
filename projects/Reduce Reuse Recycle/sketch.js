let letterClasses = []

document.getElementById("resume-link").onmouseover = resumeHover;
document.getElementById("resume-link").onmouseout  = resumeOff;

let intervalID = setInterval(updateLetters, 10);

function updateLetters() {
    for (let i=0; i<letterClasses.length; i++) {
        letterClasses[i].updatePosition();
    }
}


function resumeHover() { 
    // alert("Hover!"); 
    
    let resumeBtn = document.getElementById("resume-link");
    let btnRect = resumeBtn.getBoundingClientRect();
    let text = resumeBtn.innerText;

    console.log(text)
    for (let i=0; i<text.length; i++){
        let l = text[i];

        for (let j=0; j<letterClasses.length; j++) {
            if (letterClasses[j].element.innerText.toLowerCase() == l){
                if (i == 0) {
                    letterClasses[j].setNewPosition(btnRect.top, btnRect.left);
                    break;
                } else {
                    letterClasses[j].setNewPosition(btnRect.top, btnRect.left);
                    break;
                }
            }
        }
    }
}

function resumeOff() { 
    for (let i=0; i<letterClasses.length; i++){
        letterClasses[i].backToOldPosition();
    }
}

function setup(){
    sentence = "RPCerosonujtmeaect";
    
    let title = document.getElementById("title");
    
    let letterSpans = []
    for (let i=0; i<sentence.length; i++){
        let letter = sentence[i];
        let letterSpan = document.createElement('span')
        letterSpan.innerHTML = letter;
        title.appendChild(letterSpan);

        letterSpans.push(letterSpan);
    }   
    
    // have to call this afterwards to ensure all parts are put into the correct place
    for (let i=0; i<letterSpans.length; i++){
        letterClasses[i] = new Letter(letterSpans[i])
    }

    for (let i=0; i<letterClasses.length; i++){
        letterClasses[i].setOriginalPosition();
    }
}

setup()