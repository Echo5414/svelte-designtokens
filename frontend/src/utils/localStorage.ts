import { writable } from 'svelte/store';
import sampleTokens from '../lib/schemasSample.json';

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY || 'tokens';

export interface ColorToken {
  $type: 'color';
  $description: string | null;
  $value: string;
  $extensions: {
    [key: string]: {
      name: string;
      reference?: string;
    };
  } | null;
}

export interface TypographyToken {
  $type: 'typography';
  $description: string | null;
  $value: {
    'font-family': string;
    'font-size': string;
    'font-weight': number;
    'line-height': number | string;
    'letter-spacing': string;
  };
  $extensions: {
    [key: string]: {
      name: string;
    };
  } | null;
}

export interface SpacingToken {
  $type: 'spacing';
  $description: string | null;
  $value: string;
  $extensions: {
    [key: string]: {
      name: string;
    };
  } | null;
}

export interface Tokens {
  color: Record<string, ColorToken>;
  typography: Record<string, TypographyToken>;
  spacing: Record<string, SpacingToken>;
}

export const tokensStore = writable<{ [key: string]: Tokens }>({});

export function loadTokens(): { [key: string]: Tokens } | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    const data = localStorage.getItem(STORAGE_KEY);
    console.log('Loaded tokens from local storage:', data); // Add this line
    return data ? JSON.parse(data) : null;
  }
  return null;
}

export function saveTokens(tokens: { [key: string]: Tokens }): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
    console.log('Saved tokens to local storage:', tokens); // Add this line
  }
}

export function initializeLocalStorage(): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    const existingTokens = loadTokens();
    if (!existingTokens || Object.keys(existingTokens).length === 0) {
      console.log('No existing tokens found, initializing with sample tokens'); // Add this line
      console.log('Sample tokens:', sampleTokens); // Add this line
      saveTokens(sampleTokens as unknown as { [key: string]: Tokens });
      tokensStore.set(sampleTokens as unknown as { [key: string]: Tokens });
    } else {
      console.log('Existing tokens found, loading into store:', existingTokens); // Add this line
      tokensStore.set(existingTokens);
    }
  }
}
