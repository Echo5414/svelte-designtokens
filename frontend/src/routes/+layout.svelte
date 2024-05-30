<script lang="ts">
  import { initializeLocalStorage } from '../utils/localStorage';
  import { onMount } from 'svelte';

  onMount(() => {
    initializeLocalStorage();
  });
</script>

<slot></slot>
