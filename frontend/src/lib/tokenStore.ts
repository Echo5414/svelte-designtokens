import { createStore } from './createStore';
import { v4 as uuidv4 } from 'uuid';
import type { DesignToken, TokenType } from './types';
import { defaultDesignTokens } from './defaultValues';

export const tokenStore = createStore<DesignToken>({
  key: 'designTokens',
  createDefaultItem: (category: string, customProps = {}) => {
    const defaultValue = (category === 'typography') ? {} : '';
    return {
      id: uuidv4(),
      name: customProps.name || category,
      type: category as TokenType,  // Cast category to TokenType
      value: customProps.value || defaultValue,
      $description: customProps.$description || null,
      $extensions: customProps.$extensions || null,
      ...customProps
    };
  },
  defaultItems: defaultDesignTokens,
});
