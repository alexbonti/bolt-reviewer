import React, {
      createContext,
      useState,
      useContext,
      ReactNode,
      useEffect,
    } from 'react';
    import type { Paper } from '../types';
    import { db } from '../firebase';
    import {
      collection,
      addDoc,
      getDocs,
      doc,
      updateDoc,
      deleteDoc,
      query,
      where,
      DocumentReference,
    } from 'firebase/firestore';
    import { useAuth } from './AuthContext';

    interface PaperContextType {
      papers: Paper[];
      addPaper: (paper: Paper) => Promise<DocumentReference>;
      updatePaper: (paperId: string, updatedPaper: Partial<Paper>) => Promise<void>;
      deletePaper: (paperId: string) => Promise<void>;
    }

    const PaperContext = createContext<PaperContextType>({
      papers: [],
      addPaper: async () => {
        return {} as DocumentReference;
      },
      updatePaper: async () => {},
      deletePaper: async () => {},
    });

    interface PaperProviderProps {
      children: ReactNode;
    }

    export function PaperProvider({ children }: PaperProviderProps) {
      const [papers, setPapers] = useState<Paper[]>([]);
      const papersCollection = collection(db, 'papers');
      const { user } = useAuth();

      useEffect(() => {
        const fetchPapers = async () => {
          if (user) {
            try {
              const q = query(papersCollection, where('userId', '==', user.uid));
              const querySnapshot = await getDocs(q);
              const fetchedPapers = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })) as Paper[];
              setPapers(fetchedPapers);
            } catch (error) {
              console.error('Error fetching papers:', error);
            }
          } else {
            setPapers([]);
          }
        };

        fetchPapers();
      }, [user]);

      const addPaper = async (paper: Paper) => {
        try {
          const docRef = await addDoc(papersCollection, paper);
          setPapers((prevPapers) => [...prevPapers, { ...paper, id: docRef.id }]);
          return docRef;
        } catch (error) {
          console.error('Error adding paper:', error);
          throw error;
        }
      };

      const updatePaper = async (paperId: string, updatedPaper: Partial<Paper>) => {
        try {
          const paperDoc = doc(db, 'papers', paperId);
          await updateDoc(paperDoc, updatedPaper);
          setPapers((prevPapers) =>
            prevPapers.map((paper) =>
              paper.id === paperId ? { ...paper, ...updatedPaper } : paper
            )
          );
        } catch (error) {
          console.error('Error updating paper:', error);
        }
      };

      const deletePaper = async (paperId: string) => {
        try {
          const paperDoc = doc(db, 'papers', paperId);
          await deleteDoc(paperDoc);
          setPapers((prevPapers) => prevPapers.filter((paper) => paper.id !== paperId));
        } catch (error) {
          console.error('Error deleting paper:', error);
        }
      };

      return (
        <PaperContext.Provider value={{ papers, addPaper, updatePaper, deletePaper }}>
          {children}
        </PaperContext.Provider>
      );
    }

    export function usePapers() {
      return useContext(PaperContext);
    }
