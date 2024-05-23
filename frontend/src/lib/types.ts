export type ContentType = 'codeBlock' | 'headline' | 'image' | 'table';

export interface ContentItem {
  id: string;
  type: ContentType;
  content: string;
}

export type TokenType = 'color' | 'number' | 'string' | 'boolean';

export interface DesignToken {
  id: string;
  name: string; // Ensure name is not optional
  type: TokenType;
  value: string | number | boolean;
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
