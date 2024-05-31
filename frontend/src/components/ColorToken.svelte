<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { tokensStore } from '../stores/tokens';
  const EXTENSION_NAMESPACE = import.meta.env.VITE_EXTENSION_NAMESPACE;
  export let id: string;
  export let token: {
    $type: 'color';
    $description: string | null;
    $value: string;
    $extensions: {
      [key: string]: {
        name: string;
        reference?: string; // Reference to another color token
      };
    } | null;
  };
  export let currentlyEditingId: string | null;
  export let setCurrentlyEditingId: (id: string | null) => void;
  export let isPrimitive: boolean = false; // New prop to indicate if the token is a primitive

  let editMode = false;
  let editedToken = { ...token };
  let extensionName = editedToken.$extensions?.[EXTENSION_NAMESPACE]?.name || '';
  let reference = editedToken.$extensions?.[EXTENSION_NAMESPACE]?.reference || '';
  const dispatch = createEventDispatcher();
  let nameInputElement: HTMLInputElement | null = null;
  let isFocusing = false;

  function toggleEditMode() {
    editMode = !editMode;
    if (!editMode) {
      editedToken = { ...token };
      extensionName = editedToken.$extensions?.[EXTENSION_NAMESPACE]?.name || '';
      reference = editedToken.$extensions?.[EXTENSION_NAMESPACE]?.reference || '';
    }
  }

  function handleSave() {
    if (editedToken.$extensions) {
      editedToken.$extensions[EXTENSION_NAMESPACE] = { name: extensionName, reference: isPrimitive ? undefined : reference };
    } else {
      editedToken.$extensions = { [EXTENSION_NAMESPACE]: { name: extensionName, reference: isPrimitive ? undefined : reference } };
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
    reference = editedToken.$extensions?.[EXTENSION_NAMESPACE]?.reference || '';
    editMode = false;
    setCurrentlyEditingId(null);
  }

  function handleDelete() {
    dispatch('delete', { id, type: 'color' });
  }

  function handleNameBlur() {
    setTimeout(() => {
      if (!isFocusing && currentlyEditingId === id) {
        handleSave();
      }
    }, 200);
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

  function handleFocus() {
    isFocusing = true;
  }

  function handleFocusOut() {
    isFocusing = false;
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
    <input type="text" bind:value={extensionName} placeholder="Name" class="cell" />
    <input type="text" bind:value={editedToken.$description} placeholder="Description" class="cell" />
    
    {#if !isPrimitive}
      <div>
        <label>
          <input type="radio" bind:group={reference} value={''} /> Pick Color
        </label>
        <label>
          <input type="radio" bind:group={reference} value={'reference'} /> Reference Color
        </label>
      </div>

      {#if reference}
        <select bind:value={reference}>
          {#each Object.keys($tokensStore.Primitives.color) as colorId}
            <option value={colorId}>{$tokensStore.Primitives.color[colorId].$extensions?.[EXTENSION_NAMESPACE]?.name || colorId}</option>
          {/each}
        </select>
      {:else}
        <input type="color" bind:value={editedToken.$value} placeholder="Value" class="cell" />
      {/if}
    {:else}
      <input type="color" bind:value={editedToken.$value} placeholder="Value" class="cell" />
    {/if}
    
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
      {#if reference && !isPrimitive}
        <span class="color-swatch" style="background-color: {$tokensStore.Primitives.color[reference]?.$value};"></span>
        <p>Reference: {reference} (Value: {$tokensStore.Primitives.color[reference]?.$value})</p>
      {:else}
        <span class="color-swatch" style="background-color: {token.$value};"></span>
        <p>{token.$value}</p>
      {/if}
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
