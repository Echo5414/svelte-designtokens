import sampleTokens from '../lib/schemasSample.json';

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY || 'tokens';

export interface TokenExtensions {
  name: string;
  reference?: string;
}

export interface ColorToken {
  $type: 'color';
  $description: string | null;
  $value: string;
  $extensions: {
    [key: string]: TokenExtensions | null;
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
    [key: string]: TokenExtensions | null;
  } | null;
}

export interface SpacingToken {
  $type: 'spacing';
  $description: string | null;
  $value: string;
  $extensions: {
    [key: string]: TokenExtensions | null;
  } | null;
}

export interface Tokens {
  color: Record<string, ColorToken>;
  typography: Record<string, TypographyToken>;
  spacing: Record<string, SpacingToken>;
}

export function loadTokens(): { [key: string]: Tokens } | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }
  return null;
}

export function saveTokens(tokens: { [key: string]: Tokens }): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
  }
}

export function initializeLocalStorage(): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    const existingTokens = loadTokens();
    if (!existingTokens || Object.keys(existingTokens).length === 0) {
      saveTokens(sampleTokens as unknown as { [key: string]: Tokens });
    }
  }
}
