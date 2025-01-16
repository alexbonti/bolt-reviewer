import React from 'react';
    import { Link } from 'react-router-dom';
    import { FileText, CheckCircle, Trash2 } from 'lucide-react';
    import type { Paper } from '../types';
    import { usePapers } from '../contexts/PaperContext';

    interface PaperListProps {
      papers: Paper[];
    }

    export function PaperList({ papers }: PaperListProps) {
      const { deletePaper } = usePapers();

      const handleDeletePaper = async (paperId: string) => {
        if (window.confirm('Are you sure you want to delete this paper?')) {
          await deletePaper(paperId);
        }
      };

      return (
        <div className="bg-white shadow rounded-lg">
          <ul className="divide-y divide-gray-200">
            {papers.map((paper) => (
              <li key={paper.id}>
                <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                  <Link
                    to={`/paper/${paper.id}`}
                    className="block hover:bg-gray-50 transition-colors flex-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          {paper.title}
                        </p>
                      </div>
                      <div className="flex items-center">
                        {paper.status === 'reviewed' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Reviewed
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            New
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="text-sm text-gray-500">
                            {paper.authors.join(', ')}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p>Uploaded on {paper.uploadDate}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <button
                    onClick={() => handleDeletePaper(paper.id)}
                    className="text-red-600 hover:text-red-800 focus:outline-none"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    }
