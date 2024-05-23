import { createStore } from './createStore';
import { v4 as uuidv4 } from 'uuid';
import type { DesignToken, TokenType } from './types';
import { defaultDesignTokens } from './defaultValues';

export const tokenStore = createStore<DesignToken>({
  key: 'designTokens',
  createDefaultItem: (category: TokenType, customProps = {}) => ({
    id: uuidv4(),
    name: 'New Token',
    type: category,
    value: category === 'color' ? '' : {},
    $description: null,
    $extensions: null,
    ...customProps
  }),
  defaultItems: defaultDesignTokens,
});
