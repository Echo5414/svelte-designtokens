<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { get } from 'svelte/store';
  import { tokensStore } from '../stores/tokens';
  import type { Tokens } from '../utils/localStorage';
  const EXTENSION_NAMESPACE = import.meta.env.VITE_EXTENSION_NAMESPACE;

  export let id: string;
  export let token: {
    $type: 'color';
    $description: string | null;
    $value: string;
    $extensions: {
      [key: string]: {
        name: string;
        reference?: string;
      };
    } | null;
  };
  export let currentlyEditingId: string | null;
  export let setCurrentlyEditingId: (id: string | null) => void;
  export let isPrimitive: boolean = false;

  let editMode = false;
  let editedToken = { ...token };
  let extensionName = editedToken.$extensions?.[EXTENSION_NAMESPACE]?.name || '';
  let reference = editedToken.$extensions?.[EXTENSION_NAMESPACE]?.reference || '';
  const dispatch = createEventDispatcher();
  let nameInputElement: HTMLInputElement | null = null;
  let isFocusing = false;

  let displayValue = token.$value;

  function initializeDisplayValues() {
    const store = get(tokensStore) as { [key: string]: Tokens };

    if (reference) {
      const referencedToken = store.PRIMITIVES.color[reference];
      if (referencedToken) {
        displayValue = referencedToken.$value;
      }
    } else {
      displayValue = token.$value;
    }
  }

  $: initializeDisplayValues();

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
          <input type="radio" bind:group={reference} value={''} checked={!reference} /> Pick Color
        </label>
        <label>
          <input type="radio" bind:group={reference} value={'reference'} checked={!!reference} /> Reference Color
        </label>
      </div>

      {#if reference}
        <select bind:value={reference}>
          {#each Object.entries($tokensStore).flatMap(([collectionName, collectionTokens]) => 
            Object.entries(collectionTokens.color).map(([colorId, colorToken]) => ({
              collectionName,
              colorId,
              colorToken
            }))
          ) as color}
            <option value={color.colorId}>{color.colorToken.$extensions?.[EXTENSION_NAMESPACE]?.name}</option>
          {/each}
        </select>
      {/if}
    {/if}

    <input type="color" bind:value={editedToken.$value} placeholder="Value" class="cell" />
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
        {extensionName}
      </div>
    {/if}
    <p class="cell">{token.$description}</p>
    <div class="color">
      {#if reference && !isPrimitive}
        <p>Reference: {reference} (Value: {displayValue})</p>
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
