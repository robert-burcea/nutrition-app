import { initializeApp } from "firebase/app";
import { 
    getFirestore, collection
  } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB296kBqHFjFhSlXsjDgtpTHjy56HDRrc0",
    authDomain: "delirest-app.firebaseapp.com",
    projectId: "delirest-app",
    storageBucket: "delirest-app.appspot.com",
    messagingSenderId: "877470612620",
    appId: "1:877470612620:web:174933ddf79026d4734fa9",
    measurementId: "G-P62W04TQ3C"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { app }
export default db;