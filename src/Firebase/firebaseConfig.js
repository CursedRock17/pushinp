import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

require('dotenv').config({path: '../../.env'});

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };