// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLyB_bJz63COyWeh1-d2zxh112k1j6FDU",
  authDomain: "dropbox-clone-9aa8a.firebaseapp.com",
  projectId: "dropbox-clone-9aa8a",
  storageBucket: "dropbox-clone-9aa8a.appspot.com",
  messagingSenderId: "98271564597",
  appId: "1:98271564597:web:dceb7a68e024fe4323f27c"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }