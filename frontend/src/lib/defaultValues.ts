// src/lib/defaultValues.ts
import type { ContentType } from './types';

export const defaultContentValues: Record<ContentType, string> = {
  codeBlock: '// Your code here\nconsole.log("Hello, world!");',
  headline: 'Neue Überschrift 2',
  image: 'https://example.com/image.jpg',
  table: 'Initialer Tabelleninhalt',
};
