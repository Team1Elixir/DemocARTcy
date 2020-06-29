import firebase from 'firebase/app';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyA8VsN_dUu4Hob8TPGqM6b2BI3J8oNuUM0",
    authDomain: "democartcy.firebaseapp.com",
    databaseURL: "https://democartcy.firebaseio.com",
    projectId: "democartcy",
    storageBucket: "democartcy.appspot.com",
    messagingSenderId: "163495085252",
    appId: "1:163495085252:web:d9082a9fc7237033fab591"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}
