import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyABmTnCk-tqZLPW9qZGNMyDPlSTpzu5-Zk",
    authDomain: "p3-parte2-c28db.firebaseapp.com",
    projectId: "p3-parte2-c28db",
    storageBucket: "p3-parte2-c28db.firebasestorage.app",
    messagingSenderId: "666362437157",
    appId: "1:666362437157:web:1aff1bc3379194ddd9e9cc"
  };

  app.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const storage = app.storage();
  export const db = app.firestore();
