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
      // Revert changes if canceling
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
      type: 'color',
    });
    editMode = false;
  }

  function handleCancel() {
    editedToken = { ...token };
    extensionName = editedToken.$extensions?.[EXTENSION_NAMESPACE]?.name || '';
    editMode = false;
  }

  function handleDelete() {
    dispatch('delete', { id, type: 'color' });
  }
</script>

<div class="list">
  {#if editMode}
    <input type="text" bind:value={editedToken.$description} placeholder="Description" />
    <input type="color" bind:value={editedToken.$value} placeholder="Value" />
    <input type="text" bind:value={extensionName} placeholder="Name" />
    <button on:click={handleSave}>Save</button>
    <button on:click={handleCancel}>Cancel</button>
  {:else}
    <p>{token.$extensions?.[EXTENSION_NAMESPACE]?.name}</p>
    <p>{token.$description} - {token.$value}</p>
    <div style="background-color: {token.$value}; width: 100px; height: 100%;"></div>
    <button on:click={toggleEditMode}>Edit</button>
  {/if}
  <button on:click={handleDelete}>Delete</button>
</div>

<style>
  p {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: small;
  }
  .list {
    display: flex; 
    height: 48px; 
    background-color: rgb(208, 206, 206);
    align-items: center;
  }
  button {
    margin-left: 10px;
  }
</style>
