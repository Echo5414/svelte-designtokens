import { writable, type Writable } from 'svelte/store';
import type { Tokens } from '../utils/localStorage';
import sampleData from '../lib/schemasSample.json';

const storedTokens = localStorage.getItem('designTokens');
const initialTokens: Tokens = storedTokens ? JSON.parse(storedTokens) : sampleData;

export const tokensStore: Writable<Tokens> = writable<Tokens>(initialTokens);

export function updateToken(type: keyof Tokens, id: string, updatedToken: Tokens[keyof Tokens][string]) {
  tokensStore.update((tokens: Tokens) => {
    tokens[type][id] = updatedToken;
    localStorage.setItem('designTokens', JSON.stringify(tokens));
    return tokens;
  });
}
