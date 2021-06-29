import firebase from 'firebase/app' ;

import "firebase/auth" ;


export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyAqrmVq__dyaKboWmb2VYzA2PAZIPWSZ1U",
    authDomain: "unichat-19baa.firebaseapp.com",
    projectId: "unichat-19baa",
    storageBucket: "unichat-19baa.appspot.com",
    messagingSenderId: "293404179951",
    appId: "1:293404179951:web:33c2c2ac87d361507b8a1a"
  }).auth();