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
  let referencePath: string | null = null;
  let referenceName: string | null = null;

  // Helper function to format the reference path
  function formatReference(reference: string | undefined): string | undefined {
    return reference?.replace(/\./g, '/');
  }

  // Compute the display value, either the direct value or the reference value
  $: {
    if (token.$extensions && token.$extensions[EXTENSION_NAMESPACE]?.reference) {
      const store = get(tokensStore) as { [key: string]: Tokens };
      const referenceId = token.$extensions[EXTENSION_NAMESPACE]?.reference;
      if (referenceId) {
        for (const [collectionName, collection] of Object.entries(store)) {
          for (const [type, tokens] of Object.entries(collection)) {
            if (tokens[referenceId]) {
              referenceTokenValue = tokens[referenceId].$value;
              referencePath = `${collectionName}/${type}/${tokens[referenceId].$extensions?.[EXTENSION_NAMESPACE]?.name}`;
              referenceName = tokens[referenceId].$extensions?.[EXTENSION_NAMESPACE]?.name ?? null;
              displayName = token.$extensions[EXTENSION_NAMESPACE]?.name ?? null;
              break;
            }
          }
        }
      }
    } else {
      referenceTokenValue = null;
      referencePath = null;
      referenceName = null;
      displayName = token.$extensions?.[EXTENSION_NAMESPACE]?.name ?? null;
    }
  }

  let editMode = false;
  let editedToken = { ...token };

  let description = token.$description ?? '';
  let extensionName = token.$extensions?.[EXTENSION_NAMESPACE]?.name ?? '';
  let reference = token.$extensions?.[EXTENSION_NAMESPACE]?.reference ?? '';
  let isReference = !!reference;

  function toggleEditMode() {
    editMode = !editMode;
    if (editMode) {
      editedToken = { ...token };
      description = editedToken.$description ?? '';
      extensionName = editedToken.$extensions?.[EXTENSION_NAMESPACE]?.name ?? '';
      reference = editedToken.$extensions?.[EXTENSION_NAMESPACE]?.reference ?? '';
      isReference = !!reference;
    } else {
      editedToken = { ...token };
    }
  }

  function handleSave() {
    editedToken.$description = description;
    if (!editedToken.$extensions) {
      editedToken.$extensions = { [EXTENSION_NAMESPACE]: { name: extensionName, reference: isReference ? reference : undefined } };
    } else {
      if (!editedToken.$extensions[EXTENSION_NAMESPACE]) {
        editedToken.$extensions[EXTENSION_NAMESPACE] = { name: extensionName };
      }
      editedToken.$extensions[EXTENSION_NAMESPACE]!.name = extensionName;
      if (!isReference) {
        editedToken.$extensions[EXTENSION_NAMESPACE]!.reference = undefined;
        editedToken.$value = editedToken.$value;
      } else {
        editedToken.$extensions[EXTENSION_NAMESPACE]!.reference = reference;
        const store = get(tokensStore) as { [key: string]: Tokens };
        const referenceId = reference;
        if (referenceId) {
          for (const collection of Object.values(store)) {
            for (const tokens of Object.values(collection)) {
              if (tokens[referenceId]) {
                editedToken.$value = tokens[referenceId].$value;
                break;
              }
            }
          }
        }
      }
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
    <div class="cell">
      <label>
        <input type="radio" bind:group={isReference} value={false} /> Pick Color
      </label>
      <label>
        <input type="radio" bind:group={isReference} value={true} /> Reference Color
      </label>
      {#if isReference}
        <select bind:value={reference}>
          <option value={''}>Select reference</option>
          {#each Object.entries($tokensStore).flatMap(([collectionName, collectionTokens]) => 
            Object.entries(collectionTokens.color).map(([colorId, colorToken]) => ({
              collectionName,
              colorId,
              colorToken
            }))
          ) as color}
            <option value={color.colorId}>{color.colorToken.$extensions?.[EXTENSION_NAMESPACE]?.name}</option>
          {/each}
        </select>
      {:else}
        <input type="color" bind:value={editedToken.$value} class="color-picker" />
      {/if}
    </div>
    <div class="button-container">
      <button on:click={handleSave} class="cell">Save</button>
      <button on:click={toggleEditMode} class="cell">Cancel</button>
      <button on:click={handleDelete} class="cell">Delete</button>
    </div>
  {:else}
    <p class="cell">{displayName}</p>
    <p class="cell">{token.$description}</p>
    <div>
      {#if referenceTokenValue}
        <div class="color">
          <span class="color-preview" style="background-color: {token.$value};"></span>
          <!-- <p class="ellipsis">{referencePath}</p> -->
          <p>{referenceName}</p>
        </div>
      {:else}
      <div class="color">
        <span class="color-preview" style="background-color: {token.$value};"></span>
        <p>{token.$value}</p>
      </div>
      {/if}
    </div>
    <div class="button-container">
      <button on:click={toggleEditMode} class="cell">Edit</button>
      <button on:click={handleDelete} class="cell">Delete</button>
    </div>
  {/if}
</div>
