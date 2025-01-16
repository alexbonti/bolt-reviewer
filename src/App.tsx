import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Reviews } from './pages/Reviews';
import { Upload } from './pages/Upload';
import { PaperDetail } from './components/PaperDetail';

// Temporary mock data for demonstration
const mockPaper = {
  id: '1',
  title: 'Understanding Deep Learning Requires Rethinking Generalization',
  authors: ['Zhang, C.', 'Bengio, S.', 'Hardt, M.'],
  abstract: 'Deep neural networks have achieved excellent performance...',
  pdfUrl: 'https://arxiv.org/pdf/1611.03530.pdf',
  status: 'new',
  notes: [
    {
      id: '1',
      content: 'Interesting perspective on generalization in deep learning',
      timestamp: '2024-03-12 14:30',
    },
  ],
  uploadDate: '2024-03-10',
} as const;

function App() {
  const handleAddNote = (note: string) => {
    console.log('Adding note:', note);
  };

  const handleRequestAiReview = () => {
    console.log('Requesting AI review');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/reviews" replace />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="upload" element={<Upload />} />
          <Route
            path="paper/:id"
            element={
              <PaperDetail
                paper={mockPaper}
                onAddNote={handleAddNote}
                onRequestAiReview={handleRequestAiReview}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;