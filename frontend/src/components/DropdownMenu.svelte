<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';

  const dispatch = createEventDispatcher();

  let dropdownOpen = false;

  function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
  }

  function handleClickOutside(event: MouseEvent) {
    if (!event.target.closest('.dropdown')) {
      dropdownOpen = false;
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  function handleAction(action: string) {
    dispatch('action', { action });
    dropdownOpen = false;
  }
</script>

<div class="dropdown">
  <button class="dropdown-button" on:click={toggleDropdown}>...</button>
  {#if dropdownOpen}
    <div class="dropdown-content">
      <button on:click={() => handleAction('add')}>Add Collection</button>
      <button on:click={() => handleAction('rename')}>Rename Collection</button>
      <button on:click={() => handleAction('delete')}>Delete Collection</button>
    </div>
  {/if}
</div>

<style>
  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }

  .dropdown-content {
    position: absolute;
    background-color: white;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    display: flex;
    flex-direction: column;
  }

  .dropdown-content button {
    background-color: white;
    color: black;
    border: none;
    padding: 12px 16px;
    text-decoration: none;
    text-align: left;
    width: 100%;
    cursor: pointer;
  }

  .dropdown-content button:hover {
    background-color: #ddd;
  }
</style>
