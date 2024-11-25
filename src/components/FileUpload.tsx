import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileType } from 'lucide-react';
import toast from 'react-hot-toast';

export default function FileUpload() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Handle file upload logic here
      toast.success('File uploaded successfully!');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
      'text/csv': ['.csv']
    },
    maxFiles: 1
  });

  return (
    <div className="mb-8">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-pink-500 bg-pink-50' : 'border-gray-300 hover:border-pink-500'}`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600 mb-2">
          {isDragActive
            ? "Drop your file here..."
            : "Drag and drop your file here, or click to browse"}
        </p>
        <p className="text-sm text-gray-500">
          Supported formats: CSV, JSON
        </p>
      </div>
      
      <button className="mt-4 text-sm text-pink-600 hover:text-pink-700 flex items-center gap-2">
        <FileType className="w-4 h-4" />
        View Example File
      </button>
    </div>
  );
}