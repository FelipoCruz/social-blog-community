import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const key = process.env.FIREBASEKEY
const key2 = process.env.COUDINARYKE
const key3 = process.env.COUDINARYURL
console.log(key)
console.log(key2);
console.log(key3);

const firebaseConfig = {
  apiKey: "AIzaSyCHNE3hCPYDPI-9pLB06NQJ1wWAYoSNqxA",
  authDomain: "trinity1-6d22d.firebaseapp.com",
  projectId: "trinity1-6d22d",
  storageBucket: "trinity1-6d22d.appspot.com",
  messagingSenderId: "904774931337",
  appId: "1:904774931337:web:50cdc9bf3989fbc6a70758"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
};

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();


