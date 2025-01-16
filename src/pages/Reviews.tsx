import React from 'react';
import { PaperList } from '../components/PaperList';

// Temporary mock data
const mockPapers = [
  {
    id: '1',
    title: 'Understanding Deep Learning Requires Rethinking Generalization',
    authors: ['Zhang, C.', 'Bengio, S.', 'Hardt, M.'],
    abstract: 'Deep neural networks have achieved excellent performance...',
    pdfUrl: 'https://arxiv.org/pdf/1611.03530.pdf',
    status: 'reviewed',
    notes: [],
    uploadDate: '2024-03-10',
  },
  {
    id: '2',
    title: 'Attention Is All You Need',
    authors: ['Vaswani, A.', 'Shazeer, N.', 'Parmar, N.'],
    abstract: 'The dominant sequence transduction models are based on complex recurrent...',
    pdfUrl: 'https://arxiv.org/pdf/1706.03762.pdf',
    status: 'new',
    notes: [],
    uploadDate: '2024-03-12',
  },
] as const;

export function Reviews() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Paper Reviews</h1>
        <p className="mt-1 text-gray-600">Manage and review your research papers</p>
      </div>
      <PaperList papers={mockPapers} />
    </div>
  );
}