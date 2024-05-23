<script lang="ts">
  import { tokens } from '../stores/tokens';
  import ColorToken from '../components/ColorToken.svelte';
  import TypographyToken from '../components/TypographyToken.svelte';
  import TokenForm from '../components/TokenForm.svelte';
  import type { Writable } from 'svelte/store';

  interface ColorToken {
    $type: 'color';
    $description: string | null;
    $value: string;
    $extensions: Record<string, any> | null;
  }

  interface TypographyToken {
    $type: 'typography';
    $description: string | null;
    $value: {
      'font-family': string;
      'font-size': string;
      'font-weight': number;
      'line-height': string | number;
      'letter-spacing': string;
    };
    $extensions: Record<string, any> | null;
  }

  interface Tokens {
    color: Record<string, ColorToken>;
    typography: Record<string, TypographyToken>;
  }

  let currentTokens: Tokens;

  $: tokens.subscribe((value: Tokens) => {
    currentTokens = value;
  });

  function deleteToken(id: string, tokenType: 'color' | 'typography') {
    tokens.update((currentTokens) => {
      delete currentTokens[tokenType][id];
      return currentTokens;
    });
  }
</script>

<main>
  <h1>Design Tokens</h1>

  <TokenForm />

  <h2>Colors</h2>
  {#each Object.entries(currentTokens.color) as [id, token]}
    <div>
      <ColorToken {id} {token} />
      <button on:click={() => deleteToken(id, 'color')}>Delete</button>
    </div>
  {/each}

  <h2>Typography</h2>
  {#each Object.entries(currentTokens.typography) as [id, token]}
    <div>
      <TypographyToken {id} {token} />
      <button on:click={() => deleteToken(id, 'typography')}>Delete</button>
    </div>
  {/each}
</main>
