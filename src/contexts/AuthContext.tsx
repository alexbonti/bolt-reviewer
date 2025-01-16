import React, {
      createContext,
      useState,
      useEffect,
      useContext,
      ReactNode,
    } from 'react';
    import { auth } from '../firebase';
    import {
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      signOut,
      onAuthStateChanged,
      User,
    } from 'firebase/auth';

    interface AuthContextType {
      user: User | null;
      login: (email: string, password: string) => Promise<void>;
      signup: (email: string, password: string) => Promise<void>;
      logout: () => Promise<void>;
    }

    const AuthContext = createContext<AuthContextType>({
      user: null,
      login: async () => {},
      signup: async () => {},
      logout: async () => {},
    });

    interface AuthProviderProps {
      children: ReactNode;
    }

    export function AuthProvider({ children }: AuthProviderProps) {
      const [user, setUser] = useState<User | null>(null);

      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
        return () => unsubscribe();
      }, []);

      const login = async (email: string, password: string) => {
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        }
      };

      const signup = async (email: string, password: string) => {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
          console.error('Signup failed:', error);
          throw error;
        }
      };

      const logout = async () => {
        try {
          await signOut(auth);
        } catch (error) {
          console.error('Logout failed:', error);
          throw error;
        }
      };

      return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
          {children}
        </AuthContext.Provider>
      );
    }

    export function useAuth() {
      return useContext(AuthContext);
    }
