<script lang="ts">
  import { tokensStore, updateToken, addToken, deleteToken } from '../stores/tokens';
  import ColorToken from '../components/ColorToken.svelte';
  import TypographyToken from '../components/TypographyToken.svelte';
  import SpacingToken from '../components/SpacingToken.svelte';
  import TokenForm from '../components/TokenForm.svelte';
  import { onMount } from 'svelte';
  import type { Tokens, ColorToken as ColorTokenType, TypographyToken as TypographyTokenType, SpacingToken as SpacingTokenType } from '../utils/localStorage';

  const EXTENSION_NAMESPACE = import.meta.env.VITE_EXTENSION_NAMESPACE;

  let currentTokens: Tokens = { color: {}, typography: {}, spacing: {} };
  let currentlyEditingId: string | null = null;

  onMount(() => {
    const unsubscribe = tokensStore.subscribe((value: Tokens) => {
      currentTokens = value;
    });
    return unsubscribe;
  });

  function handleDeleteToken(event: CustomEvent<{ id: string; type: keyof Tokens }>) {
    const { id, type } = event.detail;
    deleteToken(type, id);
  }

  type TokenEventDetail = { id: string; token: ColorTokenType | TypographyTokenType | SpacingTokenType; type: keyof Tokens };

  function handleAddToken(event: CustomEvent<TokenEventDetail>) {
    const { id, token, type } = event.detail;
    addToken(type, id, token);
  }

  function handleSaveToken(event: CustomEvent<TokenEventDetail>) {
    const { id, token, type } = event.detail;
    updateToken(type, id, token);
  }

  function setCurrentlyEditingId(id: string | null) {
    currentlyEditingId = id;
  }
</script>

<main>
  <h1>Design Tokens</h1>

  <TokenForm on:add={handleAddToken} />

  <h2>Colors</h2>
  {#if currentTokens.color}
    {#each Object.entries(currentTokens.color) as [id, token]}
      <div class="token-container">
        <ColorToken {id} {token} {currentlyEditingId} {setCurrentlyEditingId} on:save={handleSaveToken} on:delete={handleDeleteToken} />
      </div>
    {/each}
  {/if}

  <h2>Typography</h2>
  {#if currentTokens.typography}
    {#each Object.entries(currentTokens.typography) as [id, token]}
      <div class="token-container">
        <TypographyToken {id} {token} on:save={handleSaveToken} on:delete={handleDeleteToken} />
      </div>
    {/each}
  {/if}

  <h2>Spacing</h2>
  {#if currentTokens.spacing}
    {#each Object.entries(currentTokens.spacing) as [id, token]}
      <div class="token-container">
        <SpacingToken {id} {token} on:save={handleSaveToken} on:delete={handleDeleteToken} />
      </div>
    {/each}
  {/if}
</main>

<style>
  main {
    background-color: var(--primary-color);
  }
  .token-container {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
</style>
