import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDYFLQYIcPzj1j-J6hO87hPAOoyKb5TTH4',
    authDomain: 'referee-60959.firebaseapp.com',
    databaseURL: 'https://referee-60959.firebaseio.com',
    projectId: 'referee-60959',
    storageBucket: 'referee-60959.appspot.com',
    messagingSenderId: '881564158476',
    appId: '1:881564158476:web:2d47c30afe4167059abc29'
};

export const initFirebase = () => {
    console.log('as', firebase.apps.length);

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        console.log('init_done');
    }
};

export const resetPassword = (email: string) => {
    const auth = firebase.auth();
    auth.sendPasswordResetEmail(email)
        .then(function () {
            console.log('Request sent');
        })
        .catch(function (error) {
            console.warn('Request error', error);
        });
};

//const dbh = firebase.firestore();
