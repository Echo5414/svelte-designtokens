<script lang="ts">
  import DropdownMenu from '../components/DropdownMenu.svelte';
  import TokenManager from '../components/TokenManager.svelte';
  import { tokensStore, addCollection, deleteCollection, renameCollection, updateToken, addToken, deleteToken } from '../stores/tokens';
  import ColorToken from '../components/ColorToken.svelte';
  import TypographyToken from '../components/TypographyToken.svelte';
  import SpacingToken from '../components/SpacingToken.svelte';
  import TokenForm from '../components/TokenForm.svelte';
  import { onMount } from 'svelte';
  import type { Tokens, ColorToken as ColorTokenType, TypographyToken as TypographyTokenType, SpacingToken as SpacingTokenType } from '../utils/localStorage';
  import { get } from 'svelte/store';

  let collections: { [key: string]: Tokens } = {};
  let selectedCollection: string | null = null;
  let theme = "dark";
  let errorMessage = '';

  onMount(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const unsubscribe = tokensStore.subscribe((value) => {
      collections = value;
      if (!selectedCollection && Object.keys(collections).length > 0) {
        selectedCollection = Object.keys(collections)[0];
      }
    });
    return unsubscribe;
  });

  function handleDropdownAction(event) {
    const { action } = event.detail;
    switch(action) {
      case 'add':
        handleAddCollection();
        break;
      case 'rename':
        handleRenameCollection();
        break;
      case 'delete':
        handleDeleteCollection();
        break;
    }
  }

  function handleAddCollection() {
    let newCollectionName = prompt("Enter new collection name:");
    if (newCollectionName && newCollectionName.trim() && !collections[newCollectionName.trim()]) {
      addCollection(newCollectionName.trim());
      selectedCollection = newCollectionName.trim();
      errorMessage = '';
    } else {
      errorMessage = 'Collection name already exists or is empty';
      alert(errorMessage);
    }
  }

  function handleRenameCollection() {
    if (selectedCollection) {
      let newName = prompt("Enter new name:", selectedCollection);
      if (newName && newName.trim() && newName !== selectedCollection && !collections[newName.trim()]) {
        renameCollection(selectedCollection, newName.trim());
        selectedCollection = newName.trim();
        errorMessage = '';
      } else {
        errorMessage = 'Collection name already exists or is empty';
        alert(errorMessage);
      }
    }
  }

  function handleDeleteCollection() {
    if (selectedCollection) {
      if (confirm(`Are you sure you want to delete the collection "${selectedCollection}"?`)) {
        deleteCollection(selectedCollection);
        collections = get(tokensStore);
        selectedCollection = Object.keys(collections)[0] || null;
      }
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

  function setTheme(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    theme = selectElement.value;
    document.documentElement.setAttribute('data-theme', theme);
  }
</script>

<main>
  <h1>Design Tokens</h1>

  <div class="theme-selector">
    <label for="theme-select">Choose Theme:</label>
    <div class="custom-select">
      <select id="theme-select" on:change={setTheme} bind:value={theme}>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
      <app-icon class="arrow-icon">▾</app-icon>
    </div>
  </div>

  <div>
    <h2>Collections</h2>
    <select bind:value={selectedCollection}>
      {#each Object.keys(collections) as collection}
        <option value={collection}>{collection}</option>
      {/each}
    </select>

    {#if selectedCollection}
      <DropdownMenu on:action={handleDropdownAction} />
    {/if}

    {#if errorMessage}
      <p class="error-message">{errorMessage}</p>
    {/if}
  </div>

  <TokenManager />
  

  {#if selectedCollection}
    <h2>Current Collection: {selectedCollection}</h2>
    <TokenForm on:add={(event) => handleAddToken(event.detail)} />

    <h3>Colors</h3>
    <div class="list">
      <div class="header"><small>Name</small></div>
      <div class="header"><small>Description</small></div>
      <div class="header"><small>Color</small></div>
      <div class="header"><small>Options</small></div>
    </div>

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
    <div class="list">
      <div class="header"><small>Name</small></div>
      <div class="header"><small>Description</small></div>
      <div class="header"><small>Options</small></div>
    </div>

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
    <div class="list">
      <div class="header"><small>Name</small></div>
      <div class="header"><small>Description</small></div>
      <div class="header"><small>Options</small></div>
    </div>

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
