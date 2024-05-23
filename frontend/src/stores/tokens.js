import { writable } from 'svelte/store';
import { loadTokens, saveTokens } from '../utils/localStorage';

const initialTokens = loadTokens() || {
  color: {},
  typography: {}
};

export const tokens = writable(initialTokens);

tokens.subscribe(value => {
  saveTokens(value);
});
