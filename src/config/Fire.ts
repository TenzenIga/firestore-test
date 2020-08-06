import firebase from 'firebase/app'


const firebaseConfig = {
    apiKey: "AIzaSyDOC3Y2gwiw9mM6hMHzgEeqakM6Xnt7SeU",
    authDomain: "gotovo-685c1.firebaseapp.com",
    databaseURL: "https://gotovo-685c1.firebaseio.com",
    projectId: "gotovo-685c1",
    storageBucket: "gotovo-685c1.appspot.com",
    messagingSenderId: "909975993210",
    appId: "1:909975993210:web:091236dd5a7b8fa2c4b4c3"
  };
  // Initialize Firebase
 firebase.initializeApp(firebaseConfig);


export default firebase;