// src/lib/types.ts

import { writable } from 'svelte/store';

export type TokenType = 'color' | 'number' | 'string' | 'boolean';

export interface DesignToken {
    id: string;
    name: string;
    type: TokenType;
    value: string | number | boolean;
}

const isBrowser: boolean = typeof window !== 'undefined';

function createTokenStore() {
    const initial: DesignToken[] = isBrowser ? JSON.parse(localStorage.getItem('designTokens') || '[]') : [];
    const { subscribe, update } = writable<DesignToken[]>(initial);

    const updateLocalStorage = (tokens: DesignToken[]) => {
        if (isBrowser) {
            localStorage.setItem('designTokens', JSON.stringify(tokens));
        }
    };

    return {
        subscribe,
        add: (token: DesignToken) => update(tokens => {
            const updated = [...tokens, token];
            console.log('Adding token:', token);
            updateLocalStorage(updated);
            return updated;
        }),
        update: (index: number, value: string | number | boolean) => update(tokens => {
            const updated = tokens.map((token, i) => i === index ? { ...token, value } : token);
            console.log(`Updating token at index ${index} with value:`, value);
            updateLocalStorage(updated);
            return updated;
        }),
        remove: (index: number) => update(tokens => {
            const updated = tokens.filter((_, i) => i !== index);
            console.log(`Removing token at index ${index}`);
            updateLocalStorage(updated);
            return updated;
        }),
        set: (value: DesignToken[]) => {
            update(_ => {
                updateLocalStorage(value);
                return value;
            });
        }
    };
}

export const tokenStore = createTokenStore();