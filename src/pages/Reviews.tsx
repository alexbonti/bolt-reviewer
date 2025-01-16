import React from 'react';
    import { PaperList } from '../components/PaperList';
    import { usePapers } from '../contexts/PaperContext';

    export function Reviews() {
      const { papers } = usePapers();

      return (
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Paper Reviews</h1>
            <p className="mt-1 text-gray-600">Manage and review your research papers</p>
          </div>
          <PaperList papers={papers} />
        </div>
      );
    }
