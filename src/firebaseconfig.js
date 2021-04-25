import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCjQo6mqvjPLvdM0QDFJwjL-2C2Y-lW4bQ",
  authDomain: "identity-c2803.firebaseapp.com",
  projectId: "identity-c2803",
  storageBucket: "identity-c2803.appspot.com",
  messagingSenderId: "525025785741",
  appId: "1:525025785741:web:38ea294432bf5aaee2afc4",
  measurementId: "G-WG1YVJSV00",
};

let firebaseapp = firebase.initializeApp(firebaseConfig);
let storage = firebaseapp.storage();
let auth = firebaseapp.auth();
let firedb = firebaseapp.firestore();

export { storage, auth, firedb };
