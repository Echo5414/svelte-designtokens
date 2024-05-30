// src/stores/tokens.ts

import { writable } from 'svelte/store';
import { loadTokens, saveTokens } from '../utils/localStorage';
import sampleData from '../lib/schemasSample.json';
import type { Writable } from 'svelte/store';

// Importing the Tokens type from localStorage.ts
import type { Tokens } from '../utils/localStorage';

// Directly assert sampleData as Tokens
const initialTokens = (loadTokens() || sampleData) as Tokens;

export const tokensStore: Writable<Tokens> = writable<Tokens>(initialTokens);

tokensStore.subscribe((value: Tokens) => {
  saveTokens(value);
});


