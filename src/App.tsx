import React, { useState, useEffect } from 'react';
import { PDFViewer } from './components/PDFViewer';
import { FlowChart } from './components/FlowChart';
import { Pattern } from './utils/types';
import { parseCSV } from './utils/csvParser';
import { getRandomPattern } from './utils/pdfSelector';
import { FileText } from 'lucide-react';

function App() {
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null);
  const [identifiedGroup, setIdentifiedGroup] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load the CSV file when the component mounts
    fetch('/src/assets/data/wallpapers.csv')
      .then(response => response.blob())
      .then(blob => parseCSV(new File([blob], 'wallpapers.csv')))
      .then(parsedPatterns => {
        setPatterns(parsedPatterns);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading patterns:', error);
        setLoading(false);
      });
  }, []);

  const handleRandomPattern = () => {
    const pattern = getRandomPattern(patterns);
    if (pattern) {
      setSelectedPattern(pattern);
      setPdfUrl(pattern.pdfPath);
      setIdentifiedGroup('');
    }
  };

  const handleGroupIdentified = (group: string) => {
    setIdentifiedGroup(group);
    if (selectedPattern && group) {
      const isCorrect = selectedPattern.symmetry.toLowerCase() === group.toLowerCase();
      console.log(`Identified group ${group} is ${isCorrect ? 'correct' : 'incorrect'}!`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading patterns...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Wallpaper Group Identifier
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 space-y-8">
          {!pdfUrl && (
            <div className="flex justify-center">
              <button
                onClick={handleRandomPattern}
                className="px-6 py-4 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
              >
                <FileText className="w-5 h-5" />
                <span>Show Random Pattern</span>
              </button>
            </div>
          )}

          {pdfUrl && (
            <>
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Pattern Preview</h2>
                  <button
                    onClick={handleRandomPattern}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Try Another Pattern</span>
                  </button>
                </div>
                <PDFViewer pdfUrl={pdfUrl} />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Identify the Wallpaper Group
                </h2>
                <FlowChart onGroupIdentified={handleGroupIdentified} />
                {selectedPattern && identifiedGroup && (
                  <div className={`mt-4 p-4 rounded-lg ${
                    selectedPattern.symmetry.toLowerCase() === identifiedGroup.toLowerCase()
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <p className="font-medium">
                      {selectedPattern.symmetry.toLowerCase() === identifiedGroup.toLowerCase()
                        ? 'Correct! This pattern belongs to the ' + selectedPattern.symmetry + ' group.'
                        : 'Not quite! This pattern actually belongs to the ' + selectedPattern.symmetry + ' group.'}
                    </p>
                    {selectedPattern.website && (
                      <a
                        href={selectedPattern.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-500 mt-2 inline-block"
                      >
                        Learn more about this pattern
                      </a>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;