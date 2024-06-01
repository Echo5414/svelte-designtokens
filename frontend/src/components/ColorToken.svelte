<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { ColorToken as ColorTokenType, Tokens } from '../utils/localStorage';
  import { get } from 'svelte/store';
  import { tokensStore } from '../stores/tokens';

  const EXTENSION_NAMESPACE = import.meta.env.VITE_EXTENSION_NAMESPACE;

  export let id: string;
  export let token: ColorTokenType;

  const dispatch = createEventDispatcher();
  let referenceTokenValue: string | null = null;
  let displayName: string | null = null;

  // Compute the display value, either the direct value or the reference value
  $: {
    if (token.$extensions && token.$extensions[EXTENSION_NAMESPACE]?.reference) {
      const store = get(tokensStore) as { [key: string]: Tokens };
      const referenceId = token.$extensions[EXTENSION_NAMESPACE]?.reference;
      if (referenceId) {
        for (const collection of Object.values(store)) {
          if (collection.color[referenceId]) {
            referenceTokenValue = collection.color[referenceId].$value;
            displayName = token.$extensions[EXTENSION_NAMESPACE]?.name ?? null;
            break;
          }
        }
      }
    } else {
      referenceTokenValue = null;
      displayName = token.$extensions?.[EXTENSION_NAMESPACE]?.name ?? null;
    }
  }

  let editMode = false;
  let editedToken = { ...token };

  let description = token.$description ?? '';
  let extensionName = token.$extensions?.[EXTENSION_NAMESPACE]?.name ?? '';

  function toggleEditMode() {
    editMode = !editMode;
    if (editMode) {
      editedToken = { ...token };
      description = editedToken.$description ?? '';
      extensionName = editedToken.$extensions?.[EXTENSION_NAMESPACE]?.name ?? '';
    } else {
      editedToken = { ...token };
    }
  }

  function handleSave() {
    editedToken.$description = description;
    if (editedToken.$extensions) {
      if (!editedToken.$extensions[EXTENSION_NAMESPACE]) {
        editedToken.$extensions[EXTENSION_NAMESPACE] = { name: '' };
      }
      editedToken.$extensions[EXTENSION_NAMESPACE]!.name = extensionName;
    } else {
      editedToken.$extensions = { [EXTENSION_NAMESPACE]: { name: extensionName } };
    }

    dispatch('save', { id, token: editedToken, type: 'color' });
    toggleEditMode();
  }

  function handleDelete() {
    dispatch('delete', { id, type: 'color' });
  }
</script>

<div class="list">
  {#if editMode}
    <input type="text" bind:value={extensionName} placeholder="Name" class="cell" />
    <input type="text" bind:value={description} placeholder="Description" class="cell" />
    <input type="color" bind:value={editedToken.$value} class="cell" />
    <button on:click={handleSave} class="cell">Save</button>
    <button on:click={toggleEditMode} class="cell">Cancel</button>
  {:else}
    <div class="cell">{displayName}</div>
    <p class="cell">{token.$description}</p>
    <div class="color">
      {#if referenceTokenValue}
        Reference: {token.$extensions?.[EXTENSION_NAMESPACE]?.reference} (Value: {referenceTokenValue})
      {:else}
        <span class="color-swatch" style="background-color: {token.$value};"></span>
        <p>{token.$value}</p>
      {/if}
    </div>
    <button on:click={toggleEditMode} class="cell">Edit</button>
  {/if}
  <button on:click={handleDelete} class="cell">Delete</button>
</div>

<style>
  .list {
    display: grid;
    grid-template-columns: repeat(6, auto);
    width: 100%;
    background-color: rgb(208, 206, 206);
    align-items: center;
  }
  .color {
    display: flex;
    align-items: center;
  }
  .cell {
    padding: 8px;
  }
  .color-swatch {
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 2px;
  }
  button {
    height: 100%;
    width: auto;
  }
</style>
