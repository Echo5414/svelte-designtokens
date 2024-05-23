<script context="module" lang="ts">
  import { initializeLocalStorage } from '$utils/populateLocalStorage';

  // Ensure the initialization runs only once in the browser
  if (typeof window !== 'undefined') {
    initializeLocalStorage();
  }
</script>

<script lang="ts">
  export let data: any;
</script>

<slot />
