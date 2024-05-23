<script>
  import { tokens } from '../stores/tokens';
  import ColorToken from '../components/ColorToken.svelte';
  import TypographyToken from '../components/TypographyToken.svelte';
  import TokenForm from '../components/TokenForm.svelte';

  let currentTokens;

  $: tokens.subscribe(value => {
    currentTokens = value;
  });
</script>

<main>
  <h1>Design Tokens</h1>

  <TokenForm />

  <h2>Colors</h2>
  {#each Object.entries(currentTokens.color) as [id, token]}
    <ColorToken {id} {token} />
  {/each}

  <h2>Typography</h2>
  {#each Object.entries(currentTokens.typography) as [id, token]}
    <TypographyToken {id} {token} />
  {/each}
</main>
