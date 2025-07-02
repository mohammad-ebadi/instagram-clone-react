// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrPbUMM-eyqHlfsi8-P4NpvdKTecX3QyQ",
  authDomain: "insta-react-mohammad.firebaseapp.com",
  projectId: "insta-react-mohammad",
  storageBucket: "insta-react-mohammad.firebasestorage.app",
  messagingSenderId: "193197918033",
  appId: "1:193197918033:web:3d4664591eeec30c96b570",
  measurementId: "G-74F6R93EGZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);


//Export
export{db}
