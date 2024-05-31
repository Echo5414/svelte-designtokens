<script lang="ts">
  import { tokensStore, addCollection, deleteCollection, updateToken, addToken, deleteToken } from '../stores/tokens';
  import ColorToken from '../components/ColorToken.svelte';
  import TypographyToken from '../components/TypographyToken.svelte';
  import SpacingToken from '../components/SpacingToken.svelte';
  import TokenForm from '../components/TokenForm.svelte';
  import { onMount } from 'svelte';
  import type { Tokens, ColorToken as ColorTokenType, TypographyToken as TypographyTokenType, SpacingToken as SpacingTokenType } from '../utils/localStorage';

  const EXTENSION_NAMESPACE = import.meta.env.VITE_EXTENSION_NAMESPACE;

  let collections: { [key: string]: Tokens } = {};
  let selectedCollection: string | null = null;
  let currentlyEditingColorId: string | null = null;
  let currentlyEditingTypographyId: string | null = null;
  let currentlyEditingSpacingId: string | null = null;
  let newCollectionName = '';

  onMount(() => {
    const unsubscribe = tokensStore.subscribe((value: { [key: string]: Tokens }) => {
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

  type TokenEventDetail = { id: string; token: ColorTokenType | TypographyTokenType | SpacingTokenType; type: keyof Tokens };

  function handleAddToken(event: CustomEvent<TokenEventDetail>) {
    const { id, token, type } = event.detail;
    if (selectedCollection) {
      addToken(selectedCollection, type, id, token);
    }
  }

  function handleSaveToken(event: CustomEvent<TokenEventDetail>) {
    const { id, token, type } = event.detail;
    if (selectedCollection) {
      updateToken(selectedCollection, type, id, token);
    }
  }

  function setCurrentlyEditingId(id: string | null, type: keyof Tokens) {
    if (type === 'color') currentlyEditingColorId = id;
    if (type === 'typography') currentlyEditingTypographyId = id;
    if (type === 'spacing') currentlyEditingSpacingId = id;
  }
</script>

<main>
  <h1>Design Tokens</h1>

  <div>
    <h2>Collections</h2>
    <input type="text" bind:value={newCollectionName} placeholder="New Collection Name" />
    <button on:click={handleAddCollection}>Add Collection</button>

    <ul>
      {#each Object.keys(collections) as collection}
        <li>
          <button on:click={() => selectedCollection = collection}>{collection}</button>
          <button on:click={() => handleDeleteCollection(collection)}>Delete</button>
        </li>
      {/each}
    </ul>
  </div>

  {#if selectedCollection}
    <h2>Current Collection: {selectedCollection}</h2>

    <TokenForm on:add={handleAddToken} />

    <h3>Colors</h3>
    {#if collections[selectedCollection].color}
      {#each Object.entries(collections[selectedCollection].color) as [id, token]}
        <div class="token-container">
          <ColorToken 
            {id} 
            {token} 
            currentlyEditingId={currentlyEditingColorId} 
            setCurrentlyEditingId={(id) => setCurrentlyEditingId(id, 'color')} 
            on:save={handleSaveToken} 
            on:delete={handleDeleteToken} 
          />
        </div>
      {/each}
    {/if}

    <h3>Typography</h3>
    {#if collections[selectedCollection].typography}
      {#each Object.entries(collections[selectedCollection].typography) as [id, token]}
        <div class="token-container">
          <TypographyToken 
            {id} 
            {token} 
            currentlyEditingId={currentlyEditingTypographyId} 
            setCurrentlyEditingId={(id) => setCurrentlyEditingId(id, 'typography')} 
            on:save={handleSaveToken} 
            on:delete={handleDeleteToken} 
          />
        </div>
      {/each}
    {/if}

    <h3>Spacing</h3>
    {#if collections[selectedCollection].spacing}
      {#each Object.entries(collections[selectedCollection].spacing) as [id, token]}
        <div class="token-container">
          <SpacingToken 
            {id} 
            {token} 
            currentlyEditingId={currentlyEditingSpacingId} 
            setCurrentlyEditingId={(id) => setCurrentlyEditingId(id, 'spacing')} 
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
</style>
