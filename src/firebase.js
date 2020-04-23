import firebase from "@firebase/app";
import "firebase/firestore";
import "firebase/firebase-auth";
import "firebase/firebase-analytics";
import "firebase/storage";

// Initialize Firebase
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB9F3gLDprV4LjENnD4c0mmHOhvteiXiv8",
  authDomain: "vue-shop-b3aa4.firebaseapp.com",
  databaseURL: "https://vue-shop-b3aa4.firebaseio.com",
  projectId: "vue-shop-b3aa4",
  storageBucket: "vue-shop-b3aa4.appspot.com",
  messagingSenderId: "1007226744762",
  appId: "1:1007226744762:web:cf4b3948e49b1f30f57783",
  measurementId: "G-DL19S2V4TN"
};

// var firebaseConfig = {
//   apiKey: "AIzaSyBPquFwJV57nowCP9DmJWNa8hjAfdG-t0E",
//   authDomain: "tomsdata-ca128.firebaseapp.com",
//   databaseURL: "https://tomsdata-ca128.firebaseio.com",
//   projectId: "tomsdata-ca128",
//   storageBucket: "tomsdata-ca128.appspot.com",
//   messagingSenderId: "221914274559",
//   // appId: "1:221914274559:web:137a7c9f97a3a3882b8aca",
//   // measurementId: "G-9R25N4KV62"
// };

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const fa = firebase.analytics();

export { fa, fb, db };
