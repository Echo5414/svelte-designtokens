<script lang="ts">
  const EXTENSION_NAMESPACE = import.meta.env.VITE_EXTENSION_NAMESPACE;
  export let id: string;
  export let token: {
    $description: string | null;
    $value: {
      'font-family': string;
      'font-size': string;
      'font-weight': number;
      'line-height': number | string;
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
    <input type="text" bind:value={editedToken.$value['font-family']} placeholder="Font Family" />
    <input type="text" bind:value={editedToken.$value['font-size']} placeholder="Font Size" />
    <input type="number" bind:value={editedToken.$value['font-weight']} placeholder="Font Weight" />
    <input type="text" bind:value={editedToken.$value['line-height']} placeholder="Line Height" />
    <input type="text" bind:value={editedToken.$value['letter-spacing']} placeholder="Letter Spacing" />
    <input type="text" bind:value={extensionName} placeholder="Name" />
    <button on:click={handleSave}>Save</button>
    <button on:click={toggleEditMode}>Cancel</button>
  {:else}
    <p>{token.$description}</p>
    <p>{token.$value['font-family']} - {token.$value['font-size']} - {token.$value['font-weight']} - {token.$value['line-height']} - {token.$value['letter-spacing']}</p>
    <p>{token.$extensions?.[EXTENSION_NAMESPACE]?.name}</p>
    <button on:click={toggleEditMode}>Edit</button>
  {/if}
</div>
