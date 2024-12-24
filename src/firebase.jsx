// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtP7RHYyB784UD8cocXJa-MeVrIB5HNk8",
  authDomain: "todo-task-d50d1.firebaseapp.com",
  databaseURL: "https://todo-task-d50d1-default-rtdb.firebaseio.com",
  projectId: "todo-task-d50d1",
  storageBucket: "todo-task-d50d1.firebasestorage.app",
  messagingSenderId: "251394773030",
  appId: "1:251394773030:web:cad8e4c66bb30f6b1316e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);