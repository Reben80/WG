import { Pattern } from './types';

// Constants for data organization
const DATA_FOLDERS = ['data10', 'data164', 'data190', 'data197'] as const;
type DataFolder = typeof DATA_FOLDERS[number];

interface PdfPathConfig {
  baseDir: string;
  folders: readonly string[];
}

const PDF_CONFIG: PdfPathConfig = {
  baseDir: '/src/assets/data',
  folders: DATA_FOLDERS
};

/**
 * Validates if a folder exists in our data structure
 */
const isValidDataFolder = (folder: string): folder is DataFolder => {
  return DATA_FOLDERS.includes(folder as DataFolder);
};

/**
 * Extracts folder name from a PDF path
 */
const extractFolder = (pdfPath: string): string => {
  const match = pdfPath.match(/contents\/(data\d+)\//);
  return match ? match[1] : '';
};

/**
 * Gets the local path for a PDF file
 */
export const getLocalPdfPath = (pdfPath: string): string => {
  const folder = extractFolder(pdfPath);
  if (!folder || !isValidDataFolder(folder)) {
    console.warn(`Invalid or missing folder in path: ${pdfPath}`);
    return '';
  }

  // Remove 'contents/' and construct the path
  const relativePath = pdfPath.replace('contents/', '');
  return `${PDF_CONFIG.baseDir}/${relativePath}`;
};

/**
 * Loads a PDF from a pattern
 */
export const loadPdfFromData = (pattern: Pattern): string => {
  return getLocalPdfPath(pattern.pdfPath);
};