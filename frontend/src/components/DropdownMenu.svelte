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