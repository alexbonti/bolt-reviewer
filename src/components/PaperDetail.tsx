import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Brain, Plus } from 'lucide-react';
import type { Paper, Note } from '../types';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

interface PaperDetailProps {
  paper: Paper;
  onAddNote: (note: string) => void;
  onRequestAiReview: () => void;
}

export function PaperDetail({ paper, onAddNote, onRequestAiReview }: PaperDetailProps) {
  const [newNote, setNewNote] = useState('');
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(newNote);
      setNewNote('');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{paper.title}</h1>
          <p className="text-gray-600">{paper.authors.join(', ')}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Abstract</h2>
          <p className="text-gray-700">{paper.abstract}</p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Notes</h2>
            <button
              onClick={onRequestAiReview}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Brain className="h-4 w-4 mr-2" />
              Request AI Review
            </button>
          </div>

          {paper.aiReview && (
            <div className="mb-4 p-4 bg-indigo-50 rounded-lg">
              <h3 className="text-md font-semibold text-indigo-900 mb-2">AI Review</h3>
              <p className="text-indigo-700">{paper.aiReview}</p>
            </div>
          )}

          <div className="space-y-4">
            {paper.notes.map((note: Note) => (
              <div key={note.id} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">{note.content}</p>
                <p className="text-sm text-gray-500 mt-2">{note.timestamp}</p>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button
                onClick={handleAddNote}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Note
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">PDF Preview</h2>
          <div className="h-[600px] border rounded">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <Viewer
                fileUrl={paper.pdfUrl}
                plugins={[defaultLayoutPluginInstance]}
              />
            </Worker>
          </div>
        </div>
      </div>
    </div>
  );
}