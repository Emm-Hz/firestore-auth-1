import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDpU33IrRHF27rFsuskVygFAflavnV452s',
    authDomain: 'fir-auth-83fc6.firebaseapp.com',
    projectId: 'fir-auth-83fc6',
    storageBucket: 'fir-auth-83fc6.appspot.com',
    messagingSenderId: '726032685851',
    appId: '1:726032685851:web:5b96a9ec2dfeabd7df51be',
};

if (!firebase.apps.length) {
    //Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();
const marcTime = firebase.firestore.FieldValue.serverTimestamp;

firebase.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsuscribe = firebase.auth().onAuthStateChanged(user => {
            unsuscribe()
            resolve(user)
        }, reject)
    })
}

export { db, auth, marcTime, firebase };
