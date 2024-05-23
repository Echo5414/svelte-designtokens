import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

interface BaseItem {
  id: string;
  [key: string]: any;
}

interface StoreConfig<T extends BaseItem, Type extends string> {
  key: string;
  createDefaultItem: (type: Type, customProps?: Partial<T>) => T;
  defaultItems?: T[];
}

export function createStore<T extends BaseItem, Type extends string>(config: StoreConfig<T, Type>): Writable<T[]> & {
  add: (type: Type, item: Partial<T>) => void;
  update: (index: number, item: Partial<T>) => void;
  remove: (index: number) => void;
  set: (items: T[]) => void;
} {
  const isBrowser: boolean = typeof window !== 'undefined';
  let initial: T[] = isBrowser ? JSON.parse(localStorage.getItem(config.key) || '[]') : [];
  
  if (isBrowser && initial.length === 0 && config.defaultItems) {
    initial = config.defaultItems;
    localStorage.setItem(config.key, JSON.stringify(initial));
  }
  
  const { subscribe, set, update } = writable<T[]>(initial);

  const updateLocalStorage = (items: T[]) => {
    if (isBrowser) {
      localStorage.setItem(config.key, JSON.stringify(items));
    }
  };

  return {
    subscribe,
    set: (items: T[]) => {
      set(items);
      updateLocalStorage(items);
    },
    add: (type: Type, item: Partial<T>) => {
      update(items => {
        const newItem = config.createDefaultItem(type, item);
        const updated = [...items, newItem];
        updateLocalStorage(updated);
        return updated;
      });
    },
    update: (index: number, item: Partial<T>) => {
      update(items => {
        const updated = items.map((current, i) => i === index ? { ...current, ...item } : current);
        updateLocalStorage(updated);
        return updated;
      });
    },
    remove: (index: number) => {
      update(items => {
        const updated = items.filter((_, i) => i !== index);
        updateLocalStorage(updated);
        return updated;
      });
    },
  };
}
