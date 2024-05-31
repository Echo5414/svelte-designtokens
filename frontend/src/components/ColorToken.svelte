<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  const EXTENSION_NAMESPACE = import.meta.env.VITE_EXTENSION_NAMESPACE;
  export let id: string;
  export let token: {
    $type: 'color';
    $description: string | null;
    $value: string;
    $extensions: {
      [key: string]: {
        name: string;
      };
    } | null;
  };
  export let currentlyEditingId: string | null;
  export let setCurrentlyEditingId: (id: string | null) => void;

  let editMode = false;
  let editedToken = { ...token };
  let extensionName = editedToken.$extensions?.[EXTENSION_NAMESPACE]?.name || '';
  const dispatch = createEventDispatcher();
  let nameInputElement: HTMLInputElement | null = null;

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
      type: 'color',
    });
    editMode = false;
    setCurrentlyEditingId(null);
  }

  function handleCancel() {
    editedToken = { ...token };
    extensionName = editedToken.$extensions?.[EXTENSION_NAMESPACE]?.name || '';
    editMode = false;
    setCurrentlyEditingId(null);
  }

  function handleDelete() {
    dispatch('delete', { id, type: 'color' });
  }

  function handleNameBlur() {
    handleSave();
  }

  function handleNameDoubleClick() {
    setCurrentlyEditingId(id);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      handleSave();
    }
  }

  function handleClickOutside(event: MouseEvent) {
    if (currentlyEditingId === id && !(event.target as HTMLElement).closest('.list')) {
      handleSave();
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
  });

  onDestroy(() => {
    document.removeEventListener('click', handleClickOutside);
  });

  $: {
    if (currentlyEditingId === id && nameInputElement) {
      nameInputElement.focus();
    }
  }
</script>

<div class="list">
  {#if editMode}
    <input type="text" bind:value={editedToken.$description} placeholder="Description" class="cell" />
    <input type="color" bind:value={editedToken.$value} placeholder="Value" class="cell" />
    <input type="text" bind:value={extensionName} placeholder="Name" class="cell" />
    <button on:click={handleSave} class="cell">Save</button>
    <button on:click={handleCancel} class="cell">Cancel</button>
  {:else}
    {#if currentlyEditingId === id}
      <input type="text" bind:value={extensionName} on:blur={handleNameBlur} on:keydown={handleKeyDown} class="cell" bind:this={nameInputElement} />
    {:else}
      <div
        class="cell editable-name"
        role="button"
        tabindex="0"
        on:dblclick={handleNameDoubleClick}
        on:keydown={(e) => e.key === 'Enter' && handleNameDoubleClick()}
      >
        {token.$extensions?.[EXTENSION_NAMESPACE]?.name}
      </div>
    {/if}
    <p class="cell">{token.$description} - {token.$value}</p>
    <div class="color-swatch" style="background-color: {token.$value};"></div>
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
    padding: 8px;
  }
  .editable-name {
    cursor: pointer;
  }
  .editable-name:focus {
    outline: 2px solid blue;
  }
  .color-swatch {
    width: 100%;
    height: 50%;
  }
  button {
    height: 100%;
    width: auto;
  }
</style>