<script lang="ts">
  import { onMount } from 'svelte';
  import { initializeLocalStorage } from '../utils/localStorage';

  onMount(() => {
    initializeLocalStorage();
  });
</script>

<slot />

<style>
  :global(:root) {
    --primary-color: #22ff00; /* Default value */
  }
</style>
