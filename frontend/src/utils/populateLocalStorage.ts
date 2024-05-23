import sampleTokens from '../lib/schemasSample.json';
import type { Tokens } from '../utils/localStorage';
import { loadTokens, saveTokens } from '../utils/localStorage';

export function initializeLocalStorage() {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const existingTokens = loadTokens();
    if (!existingTokens) {
      saveTokens(sampleTokens as unknown as Tokens);
    }
  }
}

initializeLocalStorage();
