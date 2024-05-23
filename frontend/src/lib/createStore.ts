import { writable } from 'svelte/store';

interface StoreConfig<T> {
  key: string;
  createDefaultItem: (category: string, customProps?: Partial<T>) => T;
  defaultItems: Record<string, T[]>;
}

export function createStore<T>(config: StoreConfig<T>) {
  const isBrowser: boolean = typeof window !== 'undefined';
  const initial: Record<string, T[]> = isBrowser ? JSON.parse(localStorage.getItem(config.key) || '{}') : config.defaultItems;
  const { subscribe, set, update } = writable(initial);

  const updateLocalStorage = (items: Record<string, T[]>) => {
    if (isBrowser) {
      localStorage.setItem(config.key, JSON.stringify(items));
    }
  };

  return {
    subscribe,
    add: (category: string, customProps?: Partial<T>) => {
      const newItem = config.createDefaultItem(category, customProps);
      update(items => {
        const updatedCategory = [...(items[category] || []), newItem];
        const updatedItems = { ...items, [category]: updatedCategory };
        updateLocalStorage(updatedItems);
        return updatedItems;
      });
    },
    update: (category: string, index: string, updatedItem: Partial<T>) => {
      update(items => {
        const updatedCategory = items[category].map((item, i) => i === parseInt(index) ? { ...item, ...updatedItem } : item);
        const updatedItems = { ...items, [category]: updatedCategory };
        updateLocalStorage(updatedItems);
        return updatedItems;
      });
    },
    remove: (category: string, index: string) => {
      update(items => {
        const updatedCategory = items[category].filter((_, i) => i !== parseInt(index));
        const updatedItems = { ...items, [category]: updatedCategory };
        updateLocalStorage(updatedItems);
        return updatedItems;
      });
    },
    set,
  };
}
