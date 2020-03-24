import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAF5Dmgx0RsrxpfMgYBXbCGM6JQ9DANFwc",
  authDomain: "auth-test-6a595.firebaseapp.com",
  databaseURL: "https://auth-test-6a595.firebaseio.com",
  projectId: "auth-test-6a595",
  storageBucket: "auth-test-6a595.appspot.com",
  messagingSenderId: "871085748954",
  appId: "1:871085748954:web:8a3c9fea11af7134956be3",
  measurementId: "G-QT47RGSKQL"

}

export const createUserProfileDocument = async (userAuth,additionalData) =>{
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get();

  if(!snapShot.exists) {

    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })

    } catch(err)
    {
      console.log('error creating user',err.message)
    }

  }
    return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
