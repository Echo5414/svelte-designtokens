import { writable } from 'svelte/store';
import type { Tokens, ColorToken, TypographyToken, SpacingToken } from '../utils/localStorage';
import { loadTokens, saveTokens } from '../utils/localStorage';

const isBrowser = typeof window !== 'undefined';

const initialData: { [key: string]: Tokens } = isBrowser ? (loadTokens() || {}) : {};

export const tokensStore = writable<{ [key: string]: Tokens }>(initialData);

if (isBrowser) {
  tokensStore.subscribe((value) => {
    saveTokens(value);
  });
}

export function addCollection(name: string) {
  tokensStore.update((collections) => {
    collections[name] = { color: {}, typography: {}, spacing: {} };
    return collections;
  });
}

export function deleteCollection(name: string) {
  tokensStore.update((collections) => {
    delete collections[name];
    return collections;
  });
}

export function updateToken(collection: string, type: keyof Tokens, id: string, token: ColorToken | TypographyToken | SpacingToken) {
  tokensStore.update((collections) => {
    collections[collection][type][id] = token;
    return collections;
  });
}

export function addToken(collection: string, type: keyof Tokens, id: string, token: ColorToken | TypographyToken | SpacingToken) {
  tokensStore.update((collections) => {
    collections[collection][type][id] = token;
    return collections;
  });
}

export function deleteToken(collection: string, type: keyof Tokens, id: string) {
  tokensStore.update((collections) => {
    if (collections[collection] && collections[collection][type] && collections[collection][type][id]) {
      delete collections[collection][type][id];
    }
    return collections;
  });
}
