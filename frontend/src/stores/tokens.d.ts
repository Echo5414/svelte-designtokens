import type { Writable } from 'svelte/store';
import type { Tokens } from '../utils/localStorage';

declare module 'stores/tokens' {
  export const tokensStore: Writable<Tokens>;
}
