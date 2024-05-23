// src/lib/createStore.ts
import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

// Define a minimal generic interface for items
interface BaseItem {
  id: string;
  [key: string]: any;  // Allow additional arbitrary properties
}

// Store configuration interface with generics
interface StoreConfig<T extends BaseItem, Type extends string> {
  key: string;  // Local storage key
  createDefaultItem: (type: Type, customProps?: Partial<T>) => T;  // Function to create default items
}

// Factory function to create a store
export function createStore<T extends BaseItem, Type extends string>(config: StoreConfig<T, Type>) {
  const isBrowser: boolean = typeof window !== 'undefined';
  const initial: T[] = isBrowser ? JSON.parse(localStorage.getItem(config.key) || '[]') : [];
  const { subscribe, set, update } = writable<T[]>(initial);

  const updateLocalStorage = (items: T[]) => {
    if (isBrowser) {
      localStorage.setItem(config.key, JSON.stringify(items));
    }
  };

  return {
    subscribe,
    add: (type: Type, customProps?: Partial<T>) => {
      const newItem = config.createDefaultItem(type, customProps);
      update(items => {
        const updated = [...items, newItem];
        updateLocalStorage(updated);
        return updated;
      });
    },
    update: (index: number, content: any) => update(items => {
      const updated = items.map((item, i) => i === index ? { ...item, ...content } : item);
      updateLocalStorage(updated);
      return updated;
    }),
    remove: (index: number) => update(items => {
      const updated = items.filter((_, i) => i !== index);
      updateLocalStorage(updated);
      return updated;
    }),
    set: (value: T[]) => {
      set(value);
      updateLocalStorage(value);
    },
  };
}
