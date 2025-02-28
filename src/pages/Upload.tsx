import React, { useState } from 'react';
    import { Upload as UploadIcon } from 'lucide-react';
    import { useNavigate } from 'react-router-dom';
    import { usePapers } from '../contexts/PaperContext';
    import { useAuth } from '../contexts/AuthContext';

    export function Upload() {
      const [isDragging, setIsDragging] = useState(false);
      const [file, setFile] = useState<File | null>(null);
      const [previewUrl, setPreviewUrl] = useState<string | null>(null);
      const [title, setTitle] = useState('');
      const [authors, setAuthors] = useState('');
      const [email, setEmail] = useState('');
      const navigate = useNavigate();
      const { addPaper } = usePapers();
      const { user } = useAuth();

      const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
      };

      const handleDragLeave = () => {
        setIsDragging(false);
      };

      const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        handleFileChange(droppedFile);
      };

      const handleFileChange = (selectedFile: File | null) => {
        if (selectedFile) {
          setFile(selectedFile);
          const url = URL.createObjectURL(selectedFile);
          setPreviewUrl(url);
        }
      };

      const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        handleFileChange(selectedFile);
      };

      const handleUpload = async () => {
        if (file && user) {
          const newPaper = {
            title: title || file.name.replace(/\.[^/.]+$/, ''),
            authors: authors ? authors.split(',').map((author) => author.trim()) : ['Default Author'],
            abstract: 'Default Abstract',
            pdfUrl: previewUrl || '',
            status: 'new',
            notes: [],
            uploadDate: new Date().toLocaleDateString(),
            userId: user.uid,
            email: email || user.email || 'no-email@provided.com',
          };
          try {
            const docRef = await addPaper(newPaper);
            navigate(`/paper/${docRef.id}`);
          } catch (error) {
            console.error('Error adding paper:', error);
          }
        }
      };

      return (
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Upload Paper</h1>
            <p className="mt-1 text-gray-600">Upload a new research paper for review</p>
          </div>

          <div
            className={`max-w-xl mx-auto mt-8 p-6 border-2 border-dashed rounded-lg ${
              isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept=".pdf"
                    onChange={handleFileInputChange}
                  />
                </label>
                <p className="pl-1 text-gray-600">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">PDF up to 10MB</p>
            </div>
          </div>

          {previewUrl && (
            <div className="max-w-xl mx-auto mt-8 p-6 border rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">File Preview</h2>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Paper Title"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="authors"
                >
                  Authors
                </label>
                <input
                  type="text"
                  id="authors"
                  value={authors}
                  onChange={(e) => setAuthors(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Author Names (comma separated)"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Email"
                />
              </div>
              <iframe
                src={previewUrl}
                title="File Preview"
                className="w-full h-[600px]"
              />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleUpload}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Upload
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }
