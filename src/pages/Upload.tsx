import React, { useState } from 'react';
import { Upload as UploadIcon } from 'lucide-react';

export function Upload() {
  const [isDragging, setIsDragging] = useState(false);

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
    // Handle file upload logic here
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
              />
            </label>
            <p className="pl-1 text-gray-600">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500 mt-2">PDF up to 10MB</p>
        </div>
      </div>
    </div>
  );
}