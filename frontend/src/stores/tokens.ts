import { writable } from 'svelte/store';
import type { Tokens, ColorToken, TypographyToken, SpacingToken, TokenCollections } from '../utils/localStorage';
import { loadTokens, saveTokens, initializeLocalStorage } from '../utils/localStorage';

const isBrowser = typeof window !== 'undefined';

initializeLocalStorage(); // Ensure localStorage is initialized

const initialData: TokenCollections = isBrowser ? (loadTokens() || {}) : {};

export const tokensStore = writable<TokenCollections>(initialData);

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

export function updateToken(
  collection: string,
  type: keyof Tokens,
  id: string,
  token: ColorToken | TypographyToken | SpacingToken
) {
  tokensStore.update((collections) => {
    collections[collection][type][id] = token;

    Object.values(collections).forEach((col) => {
      Object.keys(col).forEach((tokenType) => {
        Object.entries(col[tokenType as keyof Tokens]).forEach(([key, tkn]) => {
          if (tkn.$extensions?.[import.meta.env.VITE_EXTENSION_NAMESPACE]?.reference === id) {
            col[tokenType as keyof Tokens][key].$value = token.$value;
          }
        });
      });
    });

    return collections;
  });
}

export function addToken(
  collection: string,
  type: keyof Tokens,
  id: string,
  token: ColorToken | TypographyToken | SpacingToken
) {
  tokensStore.update((collections) => {
    collections[collection][type][id] = token;
    return collections;
  });
}

export function deleteToken(collection: string, type: keyof Tokens, id: string) {
  tokensStore.update((collections) => {
    if (collections[collection] && collections[collection][type] && collections[collection][type][id]) {
      delete collections[collection][type][id];

      Object.values(collections).forEach((col) => {
        Object.keys(col).forEach((tokenType) => {
          Object.entries(col[tokenType as keyof Tokens]).forEach(([key, tkn]) => {
            if (tkn.$extensions?.[import.meta.env.VITE_EXTENSION_NAMESPACE]?.reference === id) {
              col[tokenType as keyof Tokens][key].$extensions![import.meta.env.VITE_EXTENSION_NAMESPACE]!.reference = undefined;
            }
          });
        });
      });
    }
    return collections;
  });
}
