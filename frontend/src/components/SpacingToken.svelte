<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { SpacingToken as SpacingTokenType, Tokens } from '../utils/localStorage';
  import { get } from 'svelte/store';
  import { tokensStore } from '../stores/tokens';

  const EXTENSION_NAMESPACE = import.meta.env.VITE_EXTENSION_NAMESPACE;

  export let id: string;
  export let token: SpacingTokenType;

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
          if (collection.spacing[referenceId]) {
            referenceTokenValue = collection.spacing[referenceId].$value;
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
            if (collection.spacing[referenceId]) {
              editedToken.$value = collection.spacing[referenceId].$value;
              break;
            }
          }
        }
      }
    }

    dispatch('save', { id, token: editedToken, type: 'spacing' });
    toggleEditMode();
  }

  function handleDelete() {
    dispatch('delete', { id, type: 'spacing' });
  }
</script>

<div class="list">
  {#if editMode}
    <input type="text" bind:value={extensionName} placeholder="Name" class="cell" />
    <input type="text" bind:value={description} placeholder="Description" class="cell" />
    <div>
      <label>
        <input type="radio" bind:group={isReference} value={false} /> Pick Value
      </label>
      <label>
        <input type="radio" bind:group={isReference} value={true} /> Reference Value
      </label>
    </div>
    {#if isReference}
      <select bind:value={reference}>
        <option value={''}>Select reference</option>
        {#each Object.entries($tokensStore).flatMap(([collectionName, collectionTokens]) => 
          Object.entries(collectionTokens.spacing).map(([spacingId, spacingToken]) => ({
            collectionName,
            spacingId,
            spacingToken
          }))
        ) as spacing}
          <option value={spacing.spacingId}>{spacing.spacingToken.$extensions?.[EXTENSION_NAMESPACE]?.name}</option>
        {/each}
      </select>
    {:else}
      <input type="text" bind:value={editedToken.$value} placeholder="Value" class="cell" />
    {/if}
    <button on:click={handleSave} class="cell">Save</button>
    <button on:click={toggleEditMode} class="cell">Cancel</button>
  {:else}
    <div class="cell">{displayName}</div>
    <p class="cell">{token.$description}</p>
    <div class="value">
      {#if referenceTokenValue}
        <p>Reference: {token.$extensions?.[EXTENSION_NAMESPACE]?.reference} (Value: {referenceTokenValue})</p>
      {:else}
        <p>{token.$value}</p>
      {/if}
    </div>
    <button on:click={toggleEditMode} class="cell">Edit</button>
  {/if}
  <button on:click={handleDelete} class="cell">Delete</button>
</div>