import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyB6dw9VQeVtiUCvoVPwvoMl4TIQxbC13Ik",
    authDomain: "ecommerce-monwar.firebaseapp.com",
    projectId: "ecommerce-monwar",
    storageBucket: "ecommerce-monwar.appspot.com",
    messagingSenderId: "906005903295",
    appId: "1:906005903295:web:566486d3c64cd1bb37130a",
    measurementId: "G-L24JR1VZKH"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: "select_account"})

export const auth = firebase.auth();
export const signInWithGoogle = () => auth.signInWithRedirect(provider);


