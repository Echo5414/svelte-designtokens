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

    // Check for tokens referencing this token if it's a color token
    if (type === 'color') {
      const colorToken = token as ColorToken;
      Object.values(collections).forEach((col) => {
        Object.entries(col.color).forEach(([key, tkn]) => {
          if (tkn.$extensions?.[import.meta.env.VITE_EXTENSION_NAMESPACE]?.reference === id) {
            col.color[key].$value = colorToken.$value;
          }
        });
      });
    }

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

      // Check for tokens referencing this token and remove reference
      if (type === 'color') {
        Object.values(collections).forEach((col) => {
          Object.entries(col.color).forEach(([key, tkn]) => {
            if (tkn.$extensions?.[import.meta.env.VITE_EXTENSION_NAMESPACE]?.reference === id) {
              col.color[key].$extensions![import.meta.env.VITE_EXTENSION_NAMESPACE]!.reference = undefined;
            }
          });
        });
      }
    }
    return collections;
  });
}
