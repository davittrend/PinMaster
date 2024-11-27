import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCRB4M7HxbiiNs9W0dpoCdXreFCjn_rv4c",
  authDomain: "pin-master-4f55a.firebaseapp.com",
  projectId: "pin-master-4f55a",
  storageBucket: "pin-master-4f55a.firebasestorage.app",
  messagingSenderId: "206305887483",
  appId: "1:206305887483:web:71070f8b0a3e16a2e59c5e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
