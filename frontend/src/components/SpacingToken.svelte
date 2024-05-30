<script lang="ts">
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

  function toggleEditMode() {
    editMode = !editMode;
  }

  function handleSave() {
    if (editedToken.$extensions) {
      editedToken.$extensions[EXTENSION_NAMESPACE] = { name: extensionName };
    } else {
      editedToken.$extensions = { [EXTENSION_NAMESPACE]: { name: extensionName } };
    }
    const saveEvent = new CustomEvent('save', {
      detail: {
        id,
        token: editedToken,
      },
    });
    dispatchEvent(saveEvent);
    editMode = false;
  }
</script>

<div>
  {#if editMode}
    <input type="text" bind:value={editedToken.$description} placeholder="Description" />
    <input type="text" bind:value={editedToken.$value} placeholder="Value" />
    <input type="text" bind:value={extensionName} placeholder="Name" />
    <button on:click={handleSave}>Save</button>
    <button on:click={toggleEditMode}>Cancel</button>
  {:else}
    <p>Name: {token.$extensions ? token.$extensions[EXTENSION_NAMESPACE]?.name : 'N/A'}</p>
    <p>{token.$description}</p>
    <div style="margin: {token.$value}; padding: {token.$value}; border: 1px solid #000;">
      Example Spacing
    </div>
    <button on:click={toggleEditMode}>Edit</button>
  {/if}
</div>
