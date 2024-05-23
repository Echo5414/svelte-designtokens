import { defaultContentValues } from './defaultValues';
import type { ContentType, TokenType, ContentItem, DesignToken, Store } from './types';
import { v4 as uuidv4 } from 'uuid';

export function addItem(store: Store<ContentItem>, type: ContentType, customContent?: string): void {
  const content = customContent || defaultContentValues[type] || '';
  store.add(type, { id: uuidv4(), type, content });
}

export function updateItem(store: Store<ContentItem>, index: number, event: Event): void {
  const target = event.target as HTMLTextAreaElement | HTMLElement;
  if (target) {
    const newValue = target instanceof HTMLTextAreaElement ? target.value : target.textContent || '';
    store.update(index, { content: newValue });
  }
}

export function deleteItem(store: Store<ContentItem>, index: number): void {
  store.remove(index);
}

export function handleDndUpdate(store: Store<ContentItem>, event: any): void {
  const { detail } = event;
  store.set(detail.items);
}

export function addToken(store: Store<DesignToken>, type: TokenType, value: string | number | boolean): void {
  store.add(type, { id: uuidv4(), name: type, type, value });
}

export function updateToken(store: Store<DesignToken>, index: number, event: Event): void {
  const target = event.target as HTMLInputElement;
  if (target) {
    store.update(index, { value: target.value });
  }
}

export function deleteToken(store: Store<DesignToken>, index: number): void {
  store.remove(index);
}
