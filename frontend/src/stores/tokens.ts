import { writable } from 'svelte/store';
import type { Tokens, Collection, ColorToken, TypographyToken, SpacingToken } from '../utils/localStorage';
import { loadTokens, saveTokens } from '../utils/localStorage';

const initialData: Collection = loadTokens() || {};

export const tokensStore = writable<Collection>(initialData);

if (typeof window !== 'undefined' && window.localStorage) {
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
    delete collections[collection][type][id];
    return collections;
  });
}
