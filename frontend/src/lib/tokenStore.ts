import { createStore } from './createStore';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4
import type { DesignToken, TokenType, Store } from './types';

export const tokenStore = createStore<DesignToken, TokenType>({
  key: 'designTokens',
  createDefaultItem: (type: TokenType, customProps = {}) => ({
    id: uuidv4(),
    name: '', // Default name, customizable
    type,
    value: '', // Default value based on type, customizable
    ...customProps
  })
}) as unknown as Store<DesignToken>; // Ensure tokenStore implements Store<DesignToken>
