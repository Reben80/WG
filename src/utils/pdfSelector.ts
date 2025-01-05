import { Pattern } from './types';

/**
 * Gets a random PDF from the available patterns
 */
export const getRandomPattern = (patterns: Pattern[]): Pattern | null => {
  if (patterns.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * patterns.length);
  return patterns[randomIndex];
};