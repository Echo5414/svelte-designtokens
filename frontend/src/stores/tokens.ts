import { writable, type Writable } from 'svelte/store';
import type { Tokens } from '../utils/localStorage';
import sampleData from '../lib/schemasSample.json';

const STORAGE_KEY = 'design-tokens';

function getStoredTokens(): Tokens {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedTokens = localStorage.getItem(STORAGE_KEY);
    return storedTokens ? JSON.parse(storedTokens) : sampleData as Tokens;
  }
  return sampleData as Tokens;
}

const initialTokens: Tokens = getStoredTokens();

export const tokensStore: Writable<Tokens> = writable<Tokens>(initialTokens);

export function updateToken(type: keyof Tokens, id: string, updatedToken: Tokens[keyof Tokens][string]) {
  tokensStore.update((tokens) => {
    tokens[type][id] = updatedToken;
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
    }
    return tokens;
  });
}

export function deleteToken(type: keyof Tokens, id: string) {
  tokensStore.update((tokens) => {
    delete tokens[type][id];
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
    }
    return tokens;
  });
}
