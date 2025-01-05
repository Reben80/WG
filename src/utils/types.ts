export interface Pattern {
  id: string;
  pattern: string;
  htmlPath: string;
  pdfPath: string;
  location: string;
  symmetry: string;
  website: string;
}

export interface PatternGroup {
  name: string;
  patterns: Pattern[];
}