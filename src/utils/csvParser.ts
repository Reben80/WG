import { Pattern, PatternGroup } from './types';

export const parseCSV = async (file: File): Promise<Pattern[]> => {
  const text = await file.text();
  const lines = text.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1)
    .filter(line => line.trim())
    .map((line, index) => {
      const values = line.split(',').map(v => v.trim());
      const pattern: Pattern = {
        id: index.toString(),
        pattern: values[headers.indexOf('pattern')] || '',
        htmlPath: values[headers.indexOf('html_path')] || '',
        pdfPath: values[headers.indexOf('pdf_path')] || '',
        location: values[headers.indexOf('location')] || '',
        symmetry: values[headers.indexOf('symmetry')] || '',
        website: values[headers.indexOf('website')] || ''
      };
      return pattern;
    });
};

export const groupPatternsByFolder = (patterns: Pattern[]): PatternGroup[] => {
  const groups = new Map<string, Pattern[]>();
  
  patterns.forEach(pattern => {
    const folder = pattern.pdfPath.split('/')[1]; // e.g., "data164" from "contents/data164/P157.pdf"
    if (!groups.has(folder)) {
      groups.set(folder, []);
    }
    groups.get(folder)!.push(pattern);
  });

  return Array.from(groups.entries())
    .map(([name, patterns]) => ({
      name,
      patterns: patterns.sort((a, b) => a.pattern.localeCompare(b.pattern))
    }));
};