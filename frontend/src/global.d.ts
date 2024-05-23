// Remove the conflicting declaration
declare module 'stores/tokens' {
  import type { Writable } from 'svelte/store';
  import type { Tokens } from 'utils/localStorage';

  export const tokensStore: Writable<Tokens>;
}
