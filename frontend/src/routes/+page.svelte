<script lang="ts">
  import { onMount } from 'svelte';
  import { contentStore } from '../lib/contentStore';
  import { tokenStore } from '../lib/tokenStore';
  import { dndzone } from 'svelte-dnd-action';
  import { addToken, updateToken, deleteToken } from '../lib/storeUtils';
  import type { ContentItem, DesignToken, TokenType } from '../lib/types';

  // Reactive subscription to content items
  $: contentItems = $contentStore.default;

  // Reactive subscription to design tokens
  $: tokens = $tokenStore;

  let pendingDeleteContent: ContentItem | null = null;

  onMount(() => {
    const interval = setInterval(() => {
      if (pendingDeleteContent) {
        contentStore.remove('default', pendingDeleteContent.id);
        pendingDeleteContent = null;
      }
    }, 100);
    return () => clearInterval(interval);
  });

  function safeEventValue(event: Event): string {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    return target ? (target.value || target.textContent || '') : '';
  }

  // Helper function to convert tokens object to array for dndzone
  function tokensToArray(tokens: Record<string, Record<string, DesignToken>>): { id: string, category: string, token: DesignToken }[] {
    return Object.entries(tokens).flatMap(([category, tokenGroup]) => 
      Object.entries(tokenGroup).map(([id, token]) => ({
        id,
        category,
        token
      }))
    );
  }

  $: tokensArray = tokensToArray(tokens);

  function handleTokenInput(category: string, id: string, event: Event) {
    const target = event.target as HTMLInputElement;
    updateToken(category, id, { value: target.value });
  }

  function handleTypographyInput(category: string, id: string, key: string, event: Event) {
    const target = event.target as HTMLInputElement;
    const token = tokens[category][id];
    const updatedValue = {
      ...(token.value as Record<string, unknown>),
      [key]: target.value
    };
    updateToken(category, id, { value: updatedValue });
  }

  function handleDndUpdate(event: CustomEvent<{ items: { id: string, category: string, token: DesignToken }[] }>) {
    const { items } = event.detail;
    const updatedTokens = items.reduce((acc: Record<string, Record<string, DesignToken>>, { id, category, token }) => {
      if (!acc[category]) acc[category] = {};
      acc[category][id] = token;
      return acc;
    }, {});
    tokenStore.set(updatedTokens);
  }

  function getTokenValue(token: DesignToken): string {
    return typeof token.value === 'string' ? token.value : '';
  }

  function getTypographyValue(token: DesignToken, key: string): string {
    const value = (token.value as Record<string, string | number>)[key];
    return typeof value === 'string' ? value : String(value);
  }
</script>

<!-- UI for adding content items -->
<div>
  <button on:click={() => contentStore.add('codeBlock', { content: '// Your code here\nconsole.log("Hello, world!");' })}>+ Codeblock</button>
  <button on:click={() => contentStore.add('headline', { content: 'Neue Überschrift' })}>+ Headline</button>
  <button on:click={() => contentStore.add('image', { content: 'https://example.com/image.jpg' })}>+ Image</button>
  <button on:click={() => contentStore.add('table', { content: 'Initialer Tabelleninhalt' })}>+ Table</button>
</div>

<!-- UI for displaying and managing content items with drag-and-drop -->
<div use:dndzone={{ items: contentItems, flipDurationMs: 300 }} on:consider={(event) => contentStore.set('default', event.detail.items)} on:finalize={(event) => contentStore.set('default', event.detail.items)}>
  {#each contentItems as item (item.id)}
    <div>
      {#if item.type === 'codeBlock'}
        <textarea on:input={(event) => contentStore.update('default', item.id, { content: safeEventValue(event) })}>{item.content}</textarea>
      {:else if item.type === 'headline'}
        <h1 contenteditable="true" on:input={(event) => contentStore.update('default', item.id, { content: safeEventValue(event) })}>{item.content}</h1>
      {:else if item.type === 'image'}
        <img src={item.content} alt="Image"/>
      {:else if item.type === 'table'}
        <table contenteditable="true" on:input={(event) => contentStore.update('default', item.id, { content: safeEventValue(event) })}>{item.content}</table>
      {/if}
      <button on:click={() => contentStore.remove('default', item.id)}>Delete</button>
    </div>
  {/each}
</div>

<!-- UI for adding design tokens -->
<div>
  <button on:click={() => addToken('color', '#FFFFFF')}>+ Color Token</button>
  <button on:click={() => addToken('typography', {
    "font-family": "Arial",
    "font-size": "16px",
    "font-weight": 400,
    "line-height": 1.2,
    "letter-spacing": "0px"
  })}>+ Typography Token</button>
</div>

<!-- UI for displaying and managing tokens grouped by type with drag-and-drop -->
{#each Object.entries(tokens) as [category, tokenGroup]}
  <h2>{category}</h2>
  <div use:dndzone={{ items: tokensArray.filter(item => item.category === category), flipDurationMs: 300 }} on:consider={handleDndUpdate} on:finalize={handleDndUpdate}>
    {#each tokensArray.filter(item => item.category === category) as { id, token }}
      <div>
        <label>{token.name}</label>: 
        {#if token.type === 'color'}
          <input type="color" bind:value={getTokenValue(token)} on:input={(event) => handleTokenInput(category, id, event)} />
        {:else if token.type === 'typography'}
          {#each Object.entries(token.value as Record<string, string | number>) as [key, val]}
            <label>{key.replace('-', ' ')}</label>
            <input bind:value={val} on:input={(event) => handleTypographyInput(category, id, key, event)} />
          {/each}
        {/if}
        <button on:click={() => deleteToken(category, id)}>Delete</button>
      </div>
    {/each}
  </div>
{/each}
