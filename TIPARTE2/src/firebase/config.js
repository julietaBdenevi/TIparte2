import firebase from 'firebase';
import app from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyBINTr6kWMTM9MwForqh2iL8QIUx1103b4",
    authDomain: "ti-p2-96d81.firebaseapp.com",
    projectId: "ti-p2-96d81",
    storageBucket: "ti-p2-96d81.firebasestorage.app",
    messagingSenderId: "737824686365",
    appId: "1:737824686365:web:f2e1ce21cfa365f00d21f4"
  };

  app.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const storage = app.storage();
  export const db = app.firestore();
