// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyCeoDG8EApceefk_FgOkTn4xDg498YEsFs",
    authDomain: "hydroponics-5c336.firebaseapp.com",
    databaseURL: "https://hydroponics-5c336.firebaseio.com",
    projectId: "hydroponics-5c336",
    storageBucket: "hydroponics-5c336.appspot.com",
    messagingSenderId: "34094511378",
    appId: "1:34094511378:web:71c8a9a75775077023efcb",
    measurementId: "G-KH69WTVKVR"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let db = firebase.firestore();
let nft_db = db.collection("systems").doc("nft");

function updateDisplay() {
    nft_db.get().then((nft_doc) => {
        let nft_data = nft_doc.data();
        console.log(nft_data);
    
        ph_element = document.getElementById("ph_value")
        ph_element.textContent = nft_data.ph;
        if(nft_data.ph <= 6) {
            ph_element.style.color = "red";
        } else if (nft_data.ph <= 8) {
            ph_element.style.color = "green";
        } else {
            ph_element.style.color = "blue";
        }
        text_element = document.getElementById("test_value")
        text_element.textContent = nft_data.test;
    
    });
}

updateDisplay();
let updateDisplayID = setInterval(updateDisplay, 5000000);
