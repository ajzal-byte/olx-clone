import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firebase';
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbNitNwZcOXR8wwsa_GrA3crrN7g1kPo4",
  authDomain: "olx-clone-38f60.firebaseapp.com",
  projectId: "olx-clone-38f60",
  storageBucket: "olx-clone-38f60.appspot.com",
  messagingSenderId: "445146236939",
  appId: "1:445146236939:web:a574d4c129a17847fcdf0e",
  measurementId: "G-F47PMNL6M6"
};
export default firebase.initializeApp(firebaseConfig);