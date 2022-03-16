import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDO5tdDx0cE-PhnK5i5BGhncVynHuTikOQ",
  authDomain: "bookdiarydb.firebaseapp.com",
  projectId: "bookdiarydb",
  storageBucket: "bookdiarydb.appspot.com",
  messagingSenderId: "95726604136",
  appId: "1:95726604136:web:3f22a5df1f736fcdd1d0dd"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();