// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from 'firebase/auth';




const firebaseConfig = {
apiKey: "AIzaSyAHm0Y5KS9tGrHOIP8k8wmzf4HdnjL6Yg8",  authDomain: "truthnews-7c748.firebaseapp.com",
  projectId: "truthnews-7c748",
  storageBucket: "truthnews-7c748.appspot.com",
  messagingSenderId: "224362589394",
  appId: "1:224362589394:web:c985376d61f67fc182d10b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };