import { tokenStore } from './tokenStore';
import type { TokenType, DesignToken } from './types';

export function addToken(type: TokenType, value: string | number | boolean | Record<string, unknown>) {
  tokenStore.add(type, {
    name: `New ${type}`,
    type,
    value,
    $description: '',
    $extensions: null,
  });
}

export function updateToken(category: string, index: string, updatedProps: Partial<DesignToken>) {
  tokenStore.update(category, index, updatedProps);
}

export function deleteToken(category: string, index: string) {
  tokenStore.remove(category, index);
}
