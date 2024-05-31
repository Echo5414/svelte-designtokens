<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const EXTENSION_NAMESPACE = import.meta.env.VITE_EXTENSION_NAMESPACE;
  export let id: string;
  export let token: {
    $description: string | null;
    $value: string;
    $extensions: {
      [key: string]: {
        name: string;
      };
    } | null;
  };

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
    <p class="cell">{token.$extensions?.[EXTENSION_NAMESPACE]?.name}</p>
    <p class="cell">{token.$description}</p>
    <p>{token.$value}</p>
    <div class="spacing-swatch cell">
      Example Spacing
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
  .cell {
    padding: 8px, 0px 8px 0px;
  }
  .spacing-swatch {
    width: 100%;
    height: 50%;
  }
  button {
    height: 100%;
    width: auto;
  }
</style>
