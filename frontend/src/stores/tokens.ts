// src/stores/tokens.ts
import { writable } from 'svelte/store';
import { loadTokens, saveTokens } from '../utils/localStorage';
import sampleData from '../lib/schemasSample.json';
import type { Tokens } from '../utils/localStorage';

const initialTokens = (loadTokens() || sampleData.tokens) as Tokens;

export const tokensStore = writable<Tokens>(initialTokens);

tokensStore.subscribe((value: Tokens) => {
  saveTokens(value);
});
