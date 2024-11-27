// src/hooks/useFirebaseAuth.ts
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

export function useFirebaseAuth() {
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setLoading(false);
  });

  return () => unsubscribe();
}, []);

// ... (rest of your signUp, signIn, etc. functions remain unchanged)

return {
  user,
  loading,
  signUp,
  signIn,
  signInWithGoogle,
  logOut
};
}
