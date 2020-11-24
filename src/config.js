import firebase from "firebase/app"
import 'firebase/database'
import 'firebase/analytics'


let firebaseConfig = {
    apiKey: "AIzaSyBkTOhg496UgCGCguKLMj-ZL4x9Xlwpoak",
    authDomain: "easylearn-13f1d.firebaseapp.com",
    databaseURL: "https://easylearn-13f1d.firebaseio.com",
    projectId: "easylearn-13f1d",
    storageBucket: "easylearn-13f1d.appspot.com",
    messagingSenderId: "1018113147776",
    appId: "1:1018113147776:web:1f62c66633289cb0877765",
    measurementId: "G-1J5EJL4PP1"
};

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig)
// firebase.analytics()


    firebase.initializeApp(firebaseConfig)
    firebase.analytics()

let database = firebase.database();

export default database