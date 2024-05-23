import sampleData from '$lib/schemasSample.json';
import { loadTokens, saveTokens } from '$utils/localStorage';
import type { Tokens } from '$utils/localStorage';

export function initializeLocalStorage() {
  if (typeof window !== 'undefined' && window.localStorage) {
    const tokens: Tokens | null = loadTokens();
    if (!tokens) {
      saveTokens(sampleData.tokens as Tokens);
    }
  }
}
