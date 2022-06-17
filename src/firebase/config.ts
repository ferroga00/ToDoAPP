import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCUcwSVndXlu3ZzwvND_n9mV5afFtmCWAo",
    authDomain: "todo-app-71b5a.firebaseapp.com",
    projectId: "todo-app-71b5a",
    storageBucket: "todo-app-71b5a.appspot.com",
    messagingSenderId: "307380618491",
    appId: "1:307380618491:web:490f1906f001af82879c5e",
    measurementId: "G-QMEF4B0ZLJ"
};

// init firebase
firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectAuth, projectFirestore, timestamp };