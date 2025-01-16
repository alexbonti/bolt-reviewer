import React, { useState, useEffect } from 'react';
    import { Brain, Plus, CheckCircle, Edit } from 'lucide-react';
    import type { Paper, Note } from '../types';
    import { usePapers } from '../contexts/PaperContext';
    import { useParams } from 'react-router-dom';

    interface PaperDetailProps {}

    export function PaperDetail({}: PaperDetailProps) {
      const { papers, updatePaper } = usePapers();
      const { id } = useParams();
      const paper = papers.find((paper) => paper.id === id);
      const [newNote, setNewNote] = useState('');
      const [notes, setNotes] = useState<Note[]>([]);
      const [status, setStatus] = useState<'new' | 'reviewed'>('new');
      const [showFallback, setShowFallback] = useState(false);
      const [isEditing, setIsEditing] = useState(false);
      const [editedTitle, setEditedTitle] = useState('');
      const [editedAuthors, setEditedAuthors] = useState('');
      const [editedAbstract, setEditedAbstract] = useState('');

      useEffect(() => {
        if (paper) {
          setNotes(paper.notes || []);
          setStatus(paper.status);
          setEditedTitle(paper.title);
          setEditedAuthors(paper.authors.join(', '));
          setEditedAbstract(paper.abstract);
        }
      }, [paper]);

      if (!paper) {
        return <div className="p-4">Paper not found</div>;
      }

      const handleAddNote = () => {
        if (newNote.trim()) {
          const noteToAdd = {
            id: String(Date.now()),
            content: newNote,
            timestamp: new Date().toLocaleString(),
          };
          setNotes((prevNotes) => [...prevNotes, noteToAdd]);
          setNewNote('');
          updatePaper(paper.id, { notes: [...notes, noteToAdd] });
        }
      };

      const handleStatusChange = async () => {
        const newStatus = status === 'new' ? 'reviewed' : 'new';
        setStatus(newStatus);
        await updatePaper(paper.id, { status: newStatus });
      };

      const handleIframeError = () => {
        setShowFallback(true);
      };

      const handleEditClick = () => {
        setIsEditing(true);
      };

      const handleSaveClick = async () => {
        setIsEditing(false);
        const updatedAuthors = editedAuthors.split(',').map((author) => author.trim());
        if (
          editedTitle !== paper.title ||
          updatedAuthors.join(',') !== paper.authors.join(',') ||
          editedAbstract !== paper.abstract
        ) {
          await updatePaper(paper.id, {
            title: editedTitle,
            authors: updatedAuthors,
            abstract: editedAbstract,
          });
        }
      };

      const handleCancelClick = () => {
        setIsEditing(false);
        setEditedTitle(paper.title);
        setEditedAuthors(paper.authors.join(', '));
        setEditedAbstract(paper.abstract);
      };

      return (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="mb-6 flex justify-between items-center">
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="text-2xl font-bold text-gray-900 mb-2 border-b border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{paper.title}</h1>
                )}
                {isEditing ? (
                  <input
                    type="text"
                    value={editedAuthors}
                    onChange={(e) => setEditedAuthors(e.target.value)}
                    className="text-gray-600 border-b border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                ) : (
                  <p className="text-gray-600">{paper.authors.join(', ')}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSaveClick}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelClick}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleEditClick}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={handleStatusChange}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        status === 'reviewed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {status === 'reviewed' ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Reviewed
                        </>
                      ) : (
                        'New'
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Abstract</h2>
              {isEditing ? (
                <textarea
                  value={editedAbstract}
                  onChange={(e) => setEditedAbstract(e.target.value)}
                  className="w-full text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              ) : (
                <p className="text-gray-700">{paper.abstract}</p>
              )}
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Email</h2>
              <p className="text-gray-700">{paper.email}</p>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Notes</h2>
                <button
                  onClick={() => {}}
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
                {notes.map((note: Note) => (
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
              <div className="h-[600px] border rounded overflow-auto">
                {!showFallback ? (
                  <iframe
                    src={paper.pdfUrl}
                    title="PDF Preview"
                    className="w-full h-full"
                    onError={handleIframeError}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <a
                      href={paper.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Download PDF
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
