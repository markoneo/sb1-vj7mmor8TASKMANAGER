import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDF2jHSCp8XTuqK3WH3_qua-xeoRSUZSoY",
  authDomain: "test1-685de.firebaseapp.com",
  projectId: "test1-685de",
  storageBucket: "test1-685de.firebasestorage.app",
  messagingSenderId: "523800255496",
  appId: "1:523800255496:web:cfd54f3129f46207dc05bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Enable auth persistence
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error('Auth persistence error:', error);
});

// Enable Firestore offline persistence
enableIndexedDbPersistence(db).catch((error) => {
  if (error.code === 'failed-precondition') {
    console.warn('Firestore persistence unavailable - multiple tabs open');
  } else if (error.code === 'unimplemented') {
    console.warn('Firestore persistence unavailable - browser unsupported');
  }
});