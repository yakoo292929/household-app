/**
 * ===========================================================================================
 * SYSTEM NAME    : household-app
 * PROGRAM ID     : src/firebase.ts
 * PROGRAM NAME   : firebase.ts
 *                : FireBase初期化処理
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/10/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';

/////////////////////////////////////////////
// Firebase Configration
/////////////////////////////////////////////
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

/////////////////////////////////////////////
// Initialize Firebase
/////////////////////////////////////////////

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
