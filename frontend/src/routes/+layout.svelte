<script lang="ts">
  import { initializeLocalStorage } from '../utils/localStorage';
  import { tokensStore } from '../stores/tokens';
  import { onMount } from 'svelte';
  import type { Tokens } from '../utils/localStorage';

/*   let tokens: Tokens;
  let primaryColor = ''; */

  onMount(() => {
    initializeLocalStorage();

/*     const unsubscribe = tokensStore.subscribe((value: Tokens) => {
      tokens = value;
      primaryColor = tokens.color['478e37bf-e5aa-43de-b6cc-01072309d7bd']?.$value || '#22ff00'; // Fallback to white if token not found
      document.documentElement.style.setProperty('--primary-color', primaryColor);
    });
    return () => unsubscribe(); */
  });
</script>

<slot></slot>

<style>
  :global(:root) {
    --primary-color: #22ff00; /* Default value */
  }
</style>
