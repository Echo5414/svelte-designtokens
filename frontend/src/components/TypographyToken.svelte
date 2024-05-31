<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const EXTENSION_NAMESPACE = import.meta.env.VITE_EXTENSION_NAMESPACE;
  export let id: string;
  export let token: {
    $description: string | null;
    $value: {
      'font-family': string;
      'font-size': string;
      'font-weight': number;
      'line-height': string | number;
      'letter-spacing': string;
    };
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
      type: 'typography',
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
    <input type="text" bind:value={editedToken.$value['font-family']} placeholder="Font Family" />
    <input type="text" bind:value={editedToken.$value['font-size']} placeholder="Font Size" />
    <input type="number" bind:value={editedToken.$value['font-weight']} placeholder="Font Weight" />
    <input type="text" bind:value={editedToken.$value['line-height']} placeholder="Line Height" />
    <input type="text" bind:value={editedToken.$value['letter-spacing']} placeholder="Letter Spacing" />
    <input type="text" bind:value={extensionName} placeholder="Name" />
    <button on:click={handleSave}>Save</button>
    <button on:click={handleCancel}>Cancel</button>
  {:else}
    <p>{token.$description} - {token.$value['font-family']} - {token.$value['font-size']} - {token.$extensions?.[EXTENSION_NAMESPACE]?.name}</p>
    <button on:click={toggleEditMode}>Edit</button>
  {/if}
</div>
