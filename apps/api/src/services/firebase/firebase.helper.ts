import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import config from 'config';

const firebaseConfig = {
  apiKey: config.FIREBASE_API_KEY,
  authDomain: config.FIREBASE_AUTH_DOMAIN,
  projectId: config.FIREBASE_PROJECT_ID,
  storageBucket: config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
  appId: config.FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(firebaseApp, config.FIREBASE_STORAGE_BUCKET);

export default {
  firebaseApp,
  firebaseStorage,
};
