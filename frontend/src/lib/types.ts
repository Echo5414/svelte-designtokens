export type ContentType = 'codeBlock' | 'headline' | 'image' | 'table';

export interface ContentItem {
  id: string;
  type: ContentType;
  content: string;
}

export type TokenType = 'color' | 'number' | 'string' | 'boolean' | 'typography'; // Include 'typography'

export interface DesignToken {
  id: string;
  name: string;
  type: TokenType;
  value: string | number | boolean | Record<string, any>; // Allow 'value' to be an object
  $description?: string | null;
  $extensions?: Record<string, unknown> | null;
}

export interface Store<T> {
  subscribe: (this: void, run: (value: T[]) => void, invalidate?: (value: T[]) => void) => () => void;
  add: (type: string, item: Partial<T>) => void;
  update: (index: number, item: Partial<T>) => void;
  remove: (index: number) => void;
  set: (items: T[]) => void;
}
