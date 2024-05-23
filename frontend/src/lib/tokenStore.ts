import { createStore } from './createStore';
import { v4 as uuidv4 } from 'uuid';
import type { DesignToken, TokenType, Store } from './types';
import { defaultDesignTokens } from './defaultValues';

export const tokenStore = createStore<DesignToken, TokenType>({
  key: 'designTokens',
  createDefaultItem: (type: TokenType, customProps = {}) => ({
    id: uuidv4(),
    name: customProps.name || '', // Ensure name is provided
    type,
    value: customProps.value || '', // Ensure value is provided
    $description: customProps.$description || null, // Default description
    $extensions: customProps.$extensions || null, // Default extensions
    $type: type,
    $value: customProps.$value || '', // Default value
    ...customProps
  }),
  defaultItems: defaultDesignTokens
}) as unknown as Store<DesignToken>;
