<script lang="ts">
  import { onMount } from 'svelte';
  import { tokensStore } from '../stores/tokens';
  import { updateCssVariables } from '../utils/styleUpdater';

  onMount(() => {
    const unsubscribe = tokensStore.subscribe((tokens) => {
      updateCssVariables(tokens);
    });

    return () => unsubscribe();
  });
</script>

<slot />

<style>
  :global(body) {
    background-color: var(--System-color-bodyBackground);
  }
</style>
