import type { ContentItem, ContentType, DesignToken, TokenType } from './types';

export const defaultContentValues: Record<ContentType, string> = {
  codeBlock: '// Your code here\nconsole.log("Hello, world!");',
  headline: 'Neue Überschrift',
  image: 'https://example.com/image.jpg',
  table: 'Initialer Tabelleninhalt',
};

export const defaultContentItems: ContentItem[] = [
  {
    id: '1',
    type: 'headline',
    content: defaultContentValues['headline'],
  },
  {
    id: '2',
    type: 'image',
    content: defaultContentValues['image'],
  },
  {
    id: '3',
    type: 'codeBlock',
    content: defaultContentValues['codeBlock'],
  },
  {
    id: '4',
    type: 'table',
    content: defaultContentValues['table'],
  },
  // Add more default content items as needed
];

export const defaultDesignTokens: DesignToken[] = [
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
  // Add more default tokens as needed
];
