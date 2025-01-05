import React from 'react';
import { Upload, FolderOpen } from 'lucide-react';

interface PDFSelectorProps {
  onFileSelect: (file: File) => void;
  onCollectionSelect: () => void;
}

export const PDFSelector: React.FC<PDFSelectorProps> = ({ onFileSelect, onCollectionSelect }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Single PDF Upload */}
      <div className="p-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors">
        <div className="space-y-4 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div>
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="mt-2 block text-sm font-semibold text-blue-600 hover:text-blue-500">
                Upload a single PDF
              </span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </label>
            <p className="mt-1 text-xs text-gray-500">Upload a PDF with geometric pattern</p>
          </div>
        </div>
      </div>

      {/* Collection Selection */}
      <div 
        className="p-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors cursor-pointer"
        onClick={onCollectionSelect}
      >
        <div className="space-y-4 text-center">
          <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
          <div>
            <span className="mt-2 block text-sm font-semibold text-blue-600 hover:text-blue-500">
              Choose from Collection
            </span>
            <p className="mt-1 text-xs text-gray-500">Select from pre-loaded patterns with metadata</p>
          </div>
        </div>
      </div>
    </div>
  );
};