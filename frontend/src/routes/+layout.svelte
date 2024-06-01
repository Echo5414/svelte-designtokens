<script lang="ts">
  import { onMount } from 'svelte';
  import { initializeLocalStorage } from '../utils/localStorage';

  onMount(() => {
    console.log('Calling initializeLocalStorage'); // Add this line
    initializeLocalStorage();
  });
</script>

<slot />

<style>
  :global(:root) {
    --primary-color: #22ff00; /* Default value */
  }
</style>
