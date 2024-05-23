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
    <div class="token-container">
      <ColorToken {id} {token} />
      <button class="delete-button" on:click={() => deleteToken(id, 'color')}>Delete</button>
    </div>
  {/each}

  <h2>Typography</h2>
  {#each Object.entries(currentTokens.typography) as [id, token]}
    <div class="token-container typography-token">
      <TypographyToken {id} {token} />
      <button class="delete-button" on:click={() => deleteToken(id, 'typography')}>Delete</button>
    </div>
  {/each}
</main>

<style>
  .token-container {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1rem;
  }
  .token-container p {
    margin: 0;
    padding: 0;
  }
  .token-container .delete-button {
    margin-left: 1rem;
    align-self: flex-start;
  }
  .typography-token {
    flex-direction: column;
  }
  .typography-token .example-text {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
