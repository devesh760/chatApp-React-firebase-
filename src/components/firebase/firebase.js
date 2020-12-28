import React from 'react';
import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAdMoTlx15atV6HGbyS4UNYwV6jVwrL2do",
    authDomain: "chatapp-639b6.firebaseapp.com",
    databaseURL: "https://chatapp-639b6-default-rtdb.firebaseio.com",
    projectId: "chatapp-639b6",
    storageBucket: "chatapp-639b6.appspot.com",
    messagingSenderId: "716353437126",
    appId: "1:716353437126:web:e4036683f80c37d5a146c7"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;