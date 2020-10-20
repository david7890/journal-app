import * as firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBIk8Ru8O1obwyYdHIchgg0i-PQ8ALyJU8",
    authDomain: "react-app-522b0.firebaseapp.com",
    databaseURL: "https://react-app-522b0.firebaseio.com",
    projectId: "react-app-522b0",
    storageBucket: "react-app-522b0.appspot.com",
    messagingSenderId: "863324713773",
    appId: "1:863324713773:web:0e029c07cfc1d5031799a4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

  export {
      db,
      googleAuthProvider,
      firebase,
  }
