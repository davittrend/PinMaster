import { useState, useEffect } from 'react';
import { 
User,
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
signOut,
onAuthStateChanged,
GoogleAuthProvider,
signInWithPopup,
sendEmailVerification
} from 'firebase/auth';
import { auth } from '../config/firebase';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useFirebaseAuth() {
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(true);
const navigate = useNavigate();

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setLoading(false);
  });

  return () => unsubscribe();
}, []);

// Rest of the code remains the same...
}
