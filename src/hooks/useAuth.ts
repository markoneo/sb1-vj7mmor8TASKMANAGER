import { useState, useEffect, useCallback } from 'react';
import { 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser 
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { User, AuthState } from '../types/auth';

const googleProvider = new GoogleAuthProvider();

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          setAuthState({
            user: {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || firebaseUser.email || '',
              photoURL: firebaseUser.photoURL || ''
            },
            loading: false,
            error: null
          });
        } else {
          setAuthState({
            user: null,
            loading: false,
            error: null
          });
        }
      },
      (error) => {
        console.error('Auth state change error:', error);
        setAuthState({
          user: null,
          error: 'Authentication error occurred',
          loading: false
        });
      }
    );

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      await signInWithPopup(auth, googleProvider);
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to login with Google';
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
      return { success: false, error: errorMessage };
    }
  }, []);

  const loginWithEmail = useCallback(async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      if (!email || !password) {
        throw new Error('Please provide both email and password');
      }

      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to login';
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
      return { success: false, error: errorMessage };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }));
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to logout'
      }));
    }
  }, []);

  return {
    ...authState,
    loginWithEmail,
    loginWithGoogle,
    logout
  };
}