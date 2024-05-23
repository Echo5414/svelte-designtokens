import type { ContentItem, DesignToken } from './types';

export const defaultContentItems: ContentItem[] = [
  {
    id: '1',
    type: 'headline',
    content: 'Neue Überschrift',
  },
  {
    id: '2',
    type: 'image',
    content: 'https://example.com/image.jpg',
  },
  // Add more default content items as needed
];

export const defaultDesignTokens: Record<string, DesignToken[]> = {
  color: [
    {
      id: '1',
      name: 'White Color',
      type: 'color',
      value: '#FFFFFF',
      $description: 'Default white color',
      $extensions: null,
    },
    {
      id: '2',
      name: 'Black Color',
      type: 'color',
      value: '#000000',
      $description: 'Default black color',
      $extensions: null,
    },
  ],
  typography: [
    {
      id: '3',
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
      $extensions: null,
    },
  ],
  // Add more default token types as needed
};
