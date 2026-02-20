// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBV3tVv-cQ_RacYAeot35j686F25pjQRlQ',
  authDomain: 'scissors-75bb7.firebaseapp.com',
  projectId: 'scissors-75bb7',
  storageBucket: 'scissors-75bb7.firebasestorage.app',
  messagingSenderId: '463285884782',
  appId: '1:463285884782:web:6c4c1cbb5a1678c033137f',
  measurementId: 'G-VMCXH7SGTN',
};
/* テンプレートから下記三つをimport */
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
/* 初期設定 */
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
export { auth, provider, db };
