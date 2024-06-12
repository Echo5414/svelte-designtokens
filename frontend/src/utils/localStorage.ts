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

export interface TokenCollections {
  [key: string]: Tokens;
}

interface SampleTokens {
  [key: string]: Tokens;
}

export function loadTokens(): TokenCollections | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    const data = localStorage.getItem(STORAGE_KEY);
    console.log('Loaded tokens from localStorage:', data); // Debug log
    return data ? JSON.parse(data) : null;
  }
  return null;
}

export function saveTokens(tokens: TokenCollections): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    console.log('Saving tokens to localStorage:', JSON.stringify(tokens, null, 2)); // Debug log
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
  }
}

export function initializeLocalStorage(): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    const existingTokens = loadTokens();
    console.log('Existing tokens:', existingTokens); // Debug log
    if (!existingTokens || Object.keys(existingTokens).length === 0) {
      const formattedTokens = formatSampleTokens(sampleTokens as SampleTokens);
      console.log('No tokens found, loading sample tokens:', JSON.stringify(formattedTokens, null, 2)); // Debug log
      saveTokens(formattedTokens);
    }
  }
}

function formatSampleTokens(rawTokens: SampleTokens): TokenCollections {
  const formattedTokens: TokenCollections = {};

  for (const key in rawTokens) {
    formattedTokens[key] = rawTokens[key];
  }

  console.log('Formatted tokens:', JSON.stringify(formattedTokens, null, 2)); // Debug log
  return formattedTokens;
}
