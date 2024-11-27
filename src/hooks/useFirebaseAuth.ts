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
import { useNavigate, useLocation } from 'react-router-dom';

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // If user is authenticated and on auth page, redirect to dashboard
      if (currentUser && location.pathname === '/auth') {
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      }
    });

    return () => unsubscribe();
  }, [navigate, location]);

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      toast.success('Account created! Please check your email for verification.');
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
      return userCredential.user;
    } catch (error: any) {
      console.error('Sign up error:', error);
      const errorMessage = error.code === 'auth/email-already-in-use' 
        ? 'Email already in use. Please sign in instead.'
        : error.message || 'Failed to create account';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success('Successfully signed in!');
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
      return userCredential.user;
    } catch (error: any) {
      console.error('Sign in error:', error);
      const errorMessage = error.code === 'auth/invalid-credential'
        ? 'Invalid email or password'
        : error.message || 'Failed to sign in';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      toast.success('Successfully signed in with Google!');
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
      return result.user;
    } catch (error: any) {
      console.error('Google sign in error:', error);
      const errorMessage = error.code === 'auth/popup-closed-by-user'
        ? 'Sign in cancelled'
        : error.message || 'Failed to sign in with Google';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      toast.success('Successfully logged out');
      navigate('/auth', { replace: true });
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error(error.message || 'Failed to log out');
      throw error;
    }
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logOut
  };
}
