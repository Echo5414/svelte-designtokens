// src/utils/localStorage.ts

export interface ColorToken {
  $type: 'color';
  $description: string | null;
  $value: string;
  $extensions: {
    name: string;
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
    name: string;
  } | null;
}

export interface SpacingToken {
  $type: 'spacing';
  $description: string | null;
  $value: string;
  $extensions: {
    name: string;
  } | null;
}

export interface Tokens {
  color: Record<string, ColorToken>;
  typography: Record<string, TypographyToken>;
  spacing: Record<string, SpacingToken>;
  [key: string]: Record<string, ColorToken | TypographyToken | SpacingToken>; // Index signature
}

export function loadTokens(): Tokens | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    const data = localStorage.getItem('design-tokens');
    return data ? JSON.parse(data) : null;
  }
  return null;
}

export function saveTokens(tokens: Tokens): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('design-tokens', JSON.stringify(tokens));
  }
}
