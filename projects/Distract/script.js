// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAF-K89_hI8zjwRKNaWTiqUUNvD6N6z9Cs",
    authDomain: "no-distractions-1cde4.firebaseapp.com",
    databaseURL: "https://no-distractions-1cde4.firebaseio.com",
    projectId: "no-distractions-1cde4",
    storageBucket: "no-distractions-1cde4.appspot.com",
    messagingSenderId: "52006949321",
    appId: "1:52006949321:web:d3a3a3bdac24d214145818",
    measurementId: "G-JESEFCJT9G"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// instance of firebase
let userName = "Kieran"
let db = firebase.firestore();
let user_db = db.collection("User").doc(userName);

function updateFirebase(distractionState) {

    let updateValues = {
        distract: false
    };

    updateValues.distract = distractionState;
    user_db.update(updateValues)

    user_db.get().then((user_db) => {
        let kieran_data = user_db.data();
        console.log("document:")
        console.log(kieran_data);
        console.log("distract:");
        console.log(kieran_data.distract);
    
    });
}

function loadDistractionState() {
    user_db.get().then((user_db) => {
        let kieran_data = user_db.data();
        distract = kieran_data.distract;
        toggleVisibility(false);
        document.documentElement.style.visibility = "visible"; // showing document only after changes have been made to hide change when laoding
    });
}


let distract = false; // false means dont distract 

function setup(){
    console.log("setup");
    let title = document.getElementById("title");
    title.onclick = toggleVisibility;
    loadDistractionState();
}

function toggleVisibility(toggle=true) {
    let toggleElements = document.getElementsByClassName("toggle"); // probably dont have to do this every time, could make it global?

    if (toggle) {
        distract = !distract;
    }

    for (let i=0; i<toggleElements.length; i++){
        if (!distract) {
            toggleElements[i].style.visibility = "visible";
            document.title = "Don't Distract";
        } else {
            toggleElements[i].style.visibility = "hidden";
            document.title = "Distract";
        }
    }

    updateFirebase(distract);
}

setup();


