// createStore.ts
import { writable } from 'svelte/store';

export function createStore<T>({
  key,
  createDefaultItem,
  defaultItems,
}: {
  key: string;
  createDefaultItem: (type: string, customProps?: Partial<T>) => T;
  defaultItems: Record<string, Record<string, T>>;
}) {
  const isBrowser = typeof window !== 'undefined';

  const initial = isBrowser
    ? JSON.parse(localStorage.getItem(key) || 'null') || defaultItems
    : defaultItems;

  const { subscribe, set, update } = writable<Record<string, Record<string, T>>>(initial);

  subscribe(items => {
    if (isBrowser) {
      localStorage.setItem(key, JSON.stringify(items));
    }
  });

  return {
    subscribe,
    add: (category: string, customProps?: Partial<T>) => {
      const newItem = createDefaultItem(category, customProps);
      update(items => {
        const categoryItems = items[category] || {};
        const newIndex = Object.keys(categoryItems).length.toString();
        return {
          ...items,
          [category]: {
            ...categoryItems,
            [newIndex]: newItem,
          },
        };
      });
    },
    update: (category: string, index: string, updatedItem: Partial<T>) => {
      update(items => ({
        ...items,
        [category]: {
          ...items[category],
          [index]: {
            ...items[category][index],
            ...updatedItem,
          },
        },
      }));
    },
    remove: (category: string, index: string) => {
      update(items => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [index]: _, ...remainingItems } = items[category];
        return {
          ...items,
          [category]: remainingItems,
        };
      });
    },
    set,
  };
}
