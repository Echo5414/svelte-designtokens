const TOKEN_KEY = 'design-tokens';

export function loadTokens() {
  if (typeof window !== 'undefined') {
    const tokens = localStorage.getItem(TOKEN_KEY);
    return tokens ? JSON.parse(tokens) : null;
  }
}

export function saveTokens(tokens) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
  }
}
