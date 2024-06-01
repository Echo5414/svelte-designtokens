<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { SpacingToken as SpacingTokenType } from '../utils/localStorage';

  const EXTENSION_NAMESPACE = import.meta.env.VITE_EXTENSION_NAMESPACE;

  export let id: string;
  export let token: SpacingTokenType;

  let editMode = false;
  let editedToken = { ...token };
  let extensionName = editedToken.$extensions?.[EXTENSION_NAMESPACE]?.name || '';
  const dispatch = createEventDispatcher();

  function toggleEditMode() {
    editMode = !editMode;
    if (!editMode) {
      editedToken = { ...token };
      extensionName = editedToken.$extensions?.[EXTENSION_NAMESPACE]?.name || '';
    }
  }

  function handleSave() {
    if (editedToken.$extensions) {
      editedToken.$extensions[EXTENSION_NAMESPACE] = { name: extensionName };
    } else {
      editedToken.$extensions = { [EXTENSION_NAMESPACE]: { name: extensionName } };
    }

    dispatch('save', {
      id,
      token: editedToken,
      type: 'spacing',
    });
    editMode = false;
  }

  function handleCancel() {
    editedToken = { ...token };
    extensionName = editedToken.$extensions?.[EXTENSION_NAMESPACE]?.name || '';
    editMode = false;
  }

  function handleDelete() {
    dispatch('delete', { id, type: 'spacing' });
  }
</script>

<div class="list">
  {#if editMode}
    <input type="text" bind:value={extensionName} placeholder="Name" class="cell" />
    <input type="text" bind:value={editedToken.$description} placeholder="Description" class="cell" />
    <input type="text" bind:value={editedToken.$value} placeholder="Value" class="cell" />
    <button on:click={handleSave} class="cell">Save</button>
    <button on:click={handleCancel} class="cell">Cancel</button>
  {:else}
    <div class="cell">{extensionName}</div>
    <p class="cell">{token.$description}</p>
    <p class="cell">{token.$value}</p>
    <button on:click={toggleEditMode} class="cell">Edit</button>
    <button on:click={handleDelete} class="cell">Delete</button>
  {/if}
</div>

<style>
  .list {
    display: grid;
    grid-template-columns: repeat(4, auto);
    width: 100%;
    background-color: rgb(208, 206, 206);
    align-items: center;
  }
  .cell {
    padding: 8px;
  }
  button {
    height: 100%;
    width: auto;
  }
</style>
