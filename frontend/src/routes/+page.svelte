<script lang="ts">
  import { tokensStore } from '../stores/tokens';  // Updated to use path alias
  import ColorToken from '../components/ColorToken.svelte';
  import TypographyToken from '../components/TypographyToken.svelte';
  import TokenForm from '../components/TokenForm.svelte';
  import type { Tokens } from '../utils/localStorage';

  let currentTokens: Tokens;

  $: tokensStore.subscribe((value: Tokens) => {
    currentTokens = value;
  });

  function deleteToken(id: string, tokenType: 'color' | 'typography') {
    tokensStore.update((currentTokens) => {
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
