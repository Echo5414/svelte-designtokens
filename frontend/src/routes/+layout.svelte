<script lang="ts">
  import { initializeLocalStorage } from '../utils/localStorage';
  import { tokensStore } from '../stores/tokens';
  import { onMount } from 'svelte';
  import type { Tokens } from '../utils/localStorage';

  let tokens: { [key: string]: Tokens };
  let primaryColor = '#22ff00'; // Default fallback color

  onMount(() => {
    initializeLocalStorage();

    const unsubscribe = tokensStore.subscribe((value: { [key: string]: Tokens }) => {
      tokens = value;
      // Get the primary color from the system tokens, referencing the primitives
      const systemTokenColor = tokens["System Tokens"]?.color["f2ee7d68-8552-41b6-a239-ca9bd58b8349"];
      const referenceId = systemTokenColor?.$extensions?.["com.username.myapp"]?.reference;

      if (referenceId) {
        primaryColor = tokens.Primitives?.color[referenceId]?.$value || primaryColor;
      }

      document.documentElement.style.setProperty('--primary-color', primaryColor);
    });

    return () => unsubscribe();
  });
</script>

<slot></slot>

<style>
  :global(:root) {
    --primary-color: #22ff00; /* Default value */
  }
</style>
