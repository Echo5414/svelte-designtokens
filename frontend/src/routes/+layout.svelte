<script lang="ts">
  import { onMount } from 'svelte';
  import { tokensStore } from '../stores/tokens';
  import { updateCssVariables } from '../utils/styleUpdater';
  import '../global.scss';

  onMount(() => {
    const unsubscribe = tokensStore.subscribe((tokens) => {
      updateCssVariables(tokens);
    });

    return () => unsubscribe();
  });
</script>

<slot />

