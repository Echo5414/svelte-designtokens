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
  let isFocusing = false;

  function toggleEditMode() {
    editMode = !editMode;
    if (!editMode) {
      editedToken = { ...token };
      extensionName = editedToken.$extensions?.[EXTENSION_NAMESPACE]?.name || '';
    }
  }

  function handleSave() {
    console.log('handleSave triggered for id:', id);
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
    console.log('handleCancel triggered for id:', id);
    editedToken = { ...token };
    extensionName = editedToken.$extensions?.[EXTENSION_NAMESPACE]?.name || '';
    editMode = false;
    setCurrentlyEditingId(null);
  }

  function handleDelete() {
    console.log('handleDelete triggered for id:', id);
    dispatch('delete', { id, type: 'color' });
  }

  function handleNameBlur() {
    console.log('handleNameBlur triggered for id:', id);
    if (!isFocusing) {
      handleSave();
    }
  }

  function handleNameDoubleClick() {
    console.log('Double click detected for id:', id);
    setCurrentlyEditingId(id);
    console.log('currentlyEditingId set to:', id);
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

  function handleFocus() {
    console.log('handleFocus triggered for id:', id);
    isFocusing = true;
  }

  function handleFocusOut() {
    console.log('handleFocusOut triggered for id:', id);
    isFocusing = false;
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
  });

  onDestroy(() => {
    document.removeEventListener('click', handleClickOutside);
  });

  $: {
    console.log('Reactive update: currentlyEditingId:', currentlyEditingId, 'id:', id);
    if (currentlyEditingId === id && nameInputElement) {
      nameInputElement.focus();
    }
  }
</script>

<div class="list">
  {#if editMode}
    <input type="text" bind:value={extensionName} placeholder="Name" class="cell" />
    <input type="text" bind:value={editedToken.$description} placeholder="Description" class="cell" />
    <input type="color" bind:value={editedToken.$value} placeholder="Value" class="cell" />
    <button on:click={handleSave} class="cell">Save</button>
    <button on:click={handleCancel} class="cell">Cancel</button>
  {:else}
    {#if currentlyEditingId === id}
      <input type="text" bind:value={extensionName} on:focus={handleFocus} on:blur={handleNameBlur} on:focusout={handleFocusOut} on:keydown={handleKeyDown} class="cell" bind:this={nameInputElement} />
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
    <p class="cell">{token.$description}</p>
    <div class="color">
      <span class="color-swatch" style="background-color: {token.$value};"></span>
      <p>{token.$value}</p>
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
  .color {
    display: flex;
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
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 2px;
  }
  button {
    height: 100%;
    width: auto;
  }
</style>
