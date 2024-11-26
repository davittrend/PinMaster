import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, Download, AlertCircle, Loader } from 'lucide-react';
import { useScheduledPins } from '../../hooks/useScheduledPins';
import toast from 'react-hot-toast';

interface CSVPin {
  title: string;
  description: string;
  link?: string;
  imageUrl: string;
  boardId: string;
  scheduledTime: string;
}

export function BulkUploadForm() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { scheduleBulkPins } = useScheduledPins();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/csv': ['.csv']
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setIsProcessing(true);
      try {
        const text = await file.text();
        const pins = parseCSV(text);
        
        if (pins.length === 0) {
          throw new Error('No valid pins found in CSV file');
        }

        const scheduled = await scheduleBulkPins(pins);
        toast.success(`Successfully scheduled ${scheduled} pins`);
      } catch (error) {
        console.error('CSV processing error:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to process CSV file');
      } finally {
        setIsProcessing(false);
      }
    }
  });

  const parseCSV = (csv: string): CSVPin[] => {
    const lines = csv.split('\n');
    if (lines.length < 2) throw new Error('CSV file is empty or invalid');

    const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
    const requiredHeaders = ['title', 'description', 'imageurl', 'boardid', 'scheduledtime'];
    
    // Validate headers
    for (const required of requiredHeaders) {
      if (!headers.includes(required)) {
        throw new Error(`Missing required column: ${required}`);
      }
    }

    const pins: CSVPin[] = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(',').map(v => v.trim());
      if (values.length !== headers.length) {
        console.warn(`Skipping invalid line ${i + 1}: incorrect number of columns`);
        continue;
      }

      const pin: any = {};
      headers.forEach((header, index) => {
        pin[header] = values[index];
      });

      // Validate required fields
      if (!pin.title || !pin.description || !pin.imageUrl || !pin.boardId || !pin.scheduledTime) {
        console.warn(`Skipping invalid line ${i + 1}: missing required fields`);
        continue;
      }

      pins.push(pin as CSVPin);
    }

    return pins;
  };

  const downloadTemplate = () => {
    const headers = ['title', 'description', 'imageUrl', 'boardId', 'scheduledTime', 'link'];
    const csv = [
      headers.join(','),
      'Example Pin,A great description,https://example.com/image.jpg,board123,2024-03-20T15:00:00,https://example.com'
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pinterest-pins-template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">CSV Format Requirements</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Your CSV file must include the following columns:</p>
              <ul className="list-disc list-inside mt-1">
                <li>title (required)</li>
                <li>description (required)</li>
                <li>imageUrl (required) - must be a valid image URL</li>
                <li>boardId (required)</li>
                <li>scheduledTime (required) - format: YYYY-MM-DDTHH:mm:ss</li>
                <li>link (optional)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={downloadTemplate}
          className="flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Template
        </button>
      </div>

      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          ${isDragActive ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-500'}
          ${isProcessing ? 'cursor-not-allowed opacity-50' : ''}
        `}
      >
        <input {...getInputProps()} disabled={isProcessing} />
        {isProcessing ? (
          <div className="flex flex-col items-center">
            <Loader className="h-12 w-12 text-red-500 animate-spin" />
            <p className="mt-2 text-sm text-gray-600">Processing CSV file...</p>
          </div>
        ) : (
          <>
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag & drop your CSV file here, or click to select
            </p>
          </>
        )}
      </div>
    </div>
  );
}
