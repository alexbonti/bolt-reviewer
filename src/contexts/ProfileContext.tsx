import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export interface ProfileData {
  fullName: string;
  title: string;
  location: string;
  about: string;
  experience: string;
  email: string;
  website: string;
  photoURL: string;
}

interface ProfileContextType {
  profile: ProfileData | null;
  loading: boolean;
  updateProfile: (data: ProfileData) => Promise<void>;
  uploadProfileImage: (file: File) => Promise<string>;
}

const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  loading: true,
  updateProfile: async () => {},
  uploadProfileImage: async () => '',
});

interface ProfileProviderProps {
  children: ReactNode;
}

const defaultProfile: ProfileData = {
  fullName: '',
  title: '',
  location: '',
  about: '',
  experience: '',
  email: '',
  website: '',
  photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

export function ProfileProvider({ children }: ProfileProviderProps) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const storage = getStorage();

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const profileDoc = await getDoc(doc(db, 'profiles', user.uid));
          if (profileDoc.exists()) {
            setProfile(profileDoc.data() as ProfileData);
          } else {
            // Initialize with default profile if none exists
            const initialProfile = {
              ...defaultProfile,
              email: user.email || '',
              fullName: user.displayName || '',
            };
            await setDoc(doc(db, 'profiles', user.uid), initialProfile);
            setProfile(initialProfile);
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (data: ProfileData) => {
    if (!user) return;

    try {
      await setDoc(doc(db, 'profiles', user.uid), data);
      setProfile(data);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const uploadProfileImage = async (file: File): Promise<string> => {
    if (!user) throw new Error('No user logged in');

    try {
      const storageRef = ref(storage, `profile-images/${user.uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, loading, updateProfile, uploadProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
