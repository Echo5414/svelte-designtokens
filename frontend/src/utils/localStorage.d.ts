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

export interface Tokens {
  color: Record<string, ColorToken>;
  typography: Record<string, TypographyToken>;
}

export function loadTokens(): Tokens | null;
export function saveTokens(tokens: Tokens): void;
