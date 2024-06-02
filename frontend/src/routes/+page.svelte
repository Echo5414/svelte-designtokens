<script lang="ts">
  import TokenManager from '../components/TokenManager.svelte';
  import { tokensStore, addCollection, deleteCollection, updateToken, addToken, deleteToken } from '../stores/tokens';
  import ColorToken from '../components/ColorToken.svelte';
  import TypographyToken from '../components/TypographyToken.svelte';
  import SpacingToken from '../components/SpacingToken.svelte';
  import TokenForm from '../components/TokenForm.svelte';
  import { onMount } from 'svelte';
  import type { Tokens, ColorToken as ColorTokenType, TypographyToken as TypographyTokenType, SpacingToken as SpacingTokenType } from '../utils/localStorage';

  let collections: { [key: string]: Tokens } = {};
  let selectedCollection: string | null = null;
  let newCollectionName = '';

  onMount(() => {
    const unsubscribe = tokensStore.subscribe((value) => {
      collections = value;
      if (!selectedCollection && Object.keys(collections).length > 0) {
        selectedCollection = Object.keys(collections)[0];
      }
    });
    return unsubscribe;
  });

  function handleAddCollection() {
    if (newCollectionName.trim()) {
      addCollection(newCollectionName.trim());
      newCollectionName = '';
    }
  }

  function handleDeleteCollection(name: string) {
    deleteCollection(name);
    if (selectedCollection === name) {
      selectedCollection = Object.keys(collections)[0] || null;
    }
  }

  function handleDeleteToken(event: CustomEvent<{ id: string; type: keyof Tokens }>) {
    const { id, type } = event.detail;
    if (selectedCollection) {
      deleteToken(selectedCollection, type, id);
    }
  }

  function handleSaveToken(event: CustomEvent<{ id: string; token: ColorTokenType | TypographyTokenType | SpacingTokenType; type: keyof Tokens }>) {
    const { id, token, type } = event.detail;
    if (selectedCollection) {
      updateToken(selectedCollection, type, id, token);
    }
  }

  function handleAddToken(detail: { id: string; token: ColorTokenType | TypographyTokenType | SpacingTokenType; type: keyof Tokens }) {
    const { id, token, type } = detail;
    if (selectedCollection) {
      addToken(selectedCollection, type, id, token);
    }
  }
</script>

<main>
  <h1>Design Tokens</h1>

  <div>
    <h2>Collections</h2>
    <input type="text" bind:value={newCollectionName} placeholder="New Collection Name" />
    <button on:click={handleAddCollection}>Add Collection</button>

    <select bind:value={selectedCollection}>
      {#each Object.keys(collections) as collection}
        <option value={collection}>{collection}</option>
      {/each}
    </select>

    {#if selectedCollection}
      <button on:click={() => selectedCollection && handleDeleteCollection(selectedCollection)}>Delete Current Collection</button>
    {/if}
  </div>

  {#if selectedCollection}
    <TokenManager />
    <h2>Current Collection: {selectedCollection}</h2>

    <TokenForm on:add={(event) => handleAddToken(event.detail)} />

    <h3>Colors</h3>
    {#if collections[selectedCollection]?.color}
      {#each Object.entries(collections[selectedCollection].color) as [id, token]}
        <div class="token-container">
          <ColorToken 
            id={id} 
            token={token} 
            on:save={handleSaveToken} 
            on:delete={handleDeleteToken} 
          />
        </div>
      {/each}
    {/if}

    <h3>Typography</h3>
    {#if collections[selectedCollection]?.typography}
      {#each Object.entries(collections[selectedCollection].typography) as [id, token]}
        <div class="token-container">
          <TypographyToken 
            id={id}
            token={token} 
            on:save={handleSaveToken} 
            on:delete={handleDeleteToken} 
          />
        </div>
      {/each}
    {/if}

    <h3>Spacing</h3>
    {#if collections[selectedCollection]?.spacing}
      {#each Object.entries(collections[selectedCollection].spacing) as [id, token]}
        <div class="token-container">
          <SpacingToken 
            id={id}
            token={token} 
            on:save={handleSaveToken} 
            on:delete={handleDeleteToken} 
          />
        </div>
      {/each}
    {/if}
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
  select {
    margin-top: 1rem;
    padding: 0.5rem;
  }
  button {
    margin-left: 0.5rem;
  }
</style>
