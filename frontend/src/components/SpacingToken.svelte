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
      type: 'spacing',
    });
    editMode = false;
  }

  function handleCancel() {
    editedToken = { ...token };
    extensionName = editedToken.$extensions?.[EXTENSION_NAMESPACE]?.name || '';
    editMode = false;
  }
</script>

<div>
  {#if editMode}
    <input type="text" bind:value={editedToken.$description} placeholder="Description" />
    <input type="text" bind:value={editedToken.$value} placeholder="Value" />
    <input type="text" bind:value={extensionName} placeholder="Name" />
    <button on:click={handleSave}>Save</button>
    <button on:click={handleCancel}>Cancel</button>
  {:else}
    <p>{token.$description} - {token.$value} - {token.$extensions?.[EXTENSION_NAMESPACE]?.name}</p>
    <button on:click={toggleEditMode}>Edit</button>
  {/if}
</div>
