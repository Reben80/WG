import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, FolderOpen } from 'lucide-react';
import { Pattern, PatternGroup } from '../utils/types';

interface CollectionViewerProps {
  groups: PatternGroup[];
  onSelect: (pattern: Pattern) => void;
  onBack: () => void;
}

export const CollectionViewer: React.FC<CollectionViewerProps> = ({ groups, onSelect, onBack }) => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const patternsPerPage = 6;

  const selectedPatterns = selectedGroup 
    ? groups.find(g => g.name === selectedGroup)?.patterns || []
    : [];

  const totalPages = Math.ceil(selectedPatterns.length / patternsPerPage);
  const startIndex = (currentPage - 1) * patternsPerPage;
  const displayedPatterns = selectedPatterns.slice(startIndex, startIndex + patternsPerPage);

  if (!selectedGroup) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-500"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Selection
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map(group => (
            <div
              key={group.name}
              className="p-4 border rounded-lg hover:border-blue-500 cursor-pointer"
              onClick={() => setSelectedGroup(group.name)}
            >
              <div className="flex items-center space-x-3">
                <FolderOpen className="w-6 h-6 text-blue-500" />
                <div>
                  <h3 className="font-medium text-gray-900">{group.name}</h3>
                  <p className="text-sm text-gray-500">{group.patterns.length} patterns</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={() => setSelectedGroup(null)}
          className="flex items-center text-blue-600 hover:text-blue-500"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Groups
        </button>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedPatterns.map(pattern => (
          <div
            key={pattern.id}
            className="p-4 border rounded-lg hover:border-blue-500 cursor-pointer"
            onClick={() => onSelect(pattern)}
          >
            <h3 className="font-medium text-gray-900">{pattern.pattern}</h3>
            <p className="text-sm text-gray-500 mt-1">{pattern.location}</p>
            <p className="text-sm text-blue-500 mt-1">Group: {pattern.symmetry}</p>
          </div>
        ))}
      </div>
    </div>
  );
};