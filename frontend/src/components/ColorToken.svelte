<script lang="ts">
  const EXTENSION_NAMESPACE = import.meta.env.VITE_EXTENSION_NAMESPACE;
  export let id: string;
  export let token: { $description: string | null; $value: string; $extensions: { [key: string]: { name: string } } | null };

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
    <input type="color" bind:value={editedToken.$value} placeholder="Value" />
    <input type="text" bind:value={extensionName} placeholder="Name" />
    <button on:click={handleSave}>Save</button>
    <button on:click={toggleEditMode}>Cancel</button>
  {:else}
    <p>{token.$description} - {token.$value} - {token.$extensions?.[EXTENSION_NAMESPACE]?.name}</p>
    <button on:click={toggleEditMode}>Edit</button>
  {/if}
</div>
