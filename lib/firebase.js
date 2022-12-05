import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDQ5XGfFcBYTNHSkmwTt97Nn38hMXLHrzo",
  authDomain: "medium2-f91e6.firebaseapp.com",
  projectId: "medium2-f91e6",
  storageBucket: "medium2-f91e6.appspot.com",
  messagingSenderId: "68898521259",
  appId: "1:68898521259:web:05aca9472ce6de942af7ee"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
};

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();


