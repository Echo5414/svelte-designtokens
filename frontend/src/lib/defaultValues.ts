// defaultValues.ts
import type { ContentItem, DesignToken } from './types';

export const defaultContentItems: Record<string, Record<string, ContentItem>> = {
  default: {
    '1': { id: '1', type: 'headline', content: 'Neue Überschrift' },
    '2': { id: '2', type: 'image', content: 'https://example.com/image.jpg' },
  },
};

export const defaultDesignTokens: Record<string, Record<string, DesignToken>> = {
  color: {
    '1': { id: '1', name: 'White Color', type: 'color', value: '#FFFFFF', $description: 'Default white color', $extensions: null },
    '2': { id: '2', name: 'Black Color', type: 'color', value: '#000000', $description: 'Default black color', $extensions: null },
  },
  typography: {
    '1': {
      id: '1',
      name: 'Default Typography',
      type: 'typography',
      value: {
        'font-family': 'Arial',
        'font-size': '16px',
        'font-weight': 400,
        'line-height': 1.2,
        'letter-spacing': '0px'
      },
      $description: 'Default typography settings',
      $extensions: null
    },
  }
};
