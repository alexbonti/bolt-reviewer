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
    } from 'firebase/firestore';

    interface PaperContextType {
      papers: Paper[];
      addPaper: (paper: Paper) => Promise<void>;
      updatePaper: (paperId: string, updatedPaper: Partial<Paper>) => Promise<void>;
    }

    const PaperContext = createContext<PaperContextType>({
      papers: [],
      addPaper: async () => {},
      updatePaper: async () => {},
    });

    interface PaperProviderProps {
      children: ReactNode;
    }

    export function PaperProvider({ children }: PaperProviderProps) {
      const [papers, setPapers] = useState<Paper[]>([]);
      const papersCollection = collection(db, 'papers');

      useEffect(() => {
        const fetchPapers = async () => {
          try {
            const querySnapshot = await getDocs(papersCollection);
            const fetchedPapers = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as Paper[];
            setPapers(fetchedPapers);
          } catch (error) {
            console.error('Error fetching papers:', error);
          }
        };

        fetchPapers();
      }, []);

      const addPaper = async (paper: Paper) => {
        try {
          await addDoc(papersCollection, paper);
          setPapers((prevPapers) => [...prevPapers, paper]);
        } catch (error) {
          console.error('Error adding paper:', error);
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

      return (
        <PaperContext.Provider value={{ papers, addPaper, updatePaper }}>
          {children}
        </PaperContext.Provider>
      );
    }

    export function usePapers() {
      return useContext(PaperContext);
    }
