<script lang="ts">
  import { onMount } from 'svelte';
  import { contentStore } from '../lib/contentStore';
  import { tokenStore } from '../lib/tokenStore';
  import { dndzone } from 'svelte-dnd-action';
  import { addItem, updateItem, deleteItem, handleDndUpdate, addToken, updateToken, deleteToken } from '../lib/storeUtils';
  import type { ContentItem, ContentType } from '../lib/types';
  import type { DesignToken, TokenType } from '../lib/types';

  $: contentItems = $contentStore;
  $: tokens = $tokenStore;

  let pendingDeleteContent: ContentItem | null = null;

  onMount(() => {
    const interval = setInterval(() => {
      if (pendingDeleteContent) {
        deleteItem(contentStore, contentItems.indexOf(pendingDeleteContent));
        pendingDeleteContent = null;
      }
    }, 100);
    return () => clearInterval(interval);
  });
</script>

<div>
  <button on:click={() => addItem(contentStore, 'codeBlock')}>+ Codeblock</button>
  <button on:click={() => addItem(contentStore, 'headline')}>+ Headline</button>
  <button on:click={() => addItem(contentStore, 'image')}>+ Image</button>
  <button on:click={() => addItem(contentStore, 'table')}>+ Table</button>
</div>

<div use:dndzone={{ items: contentItems, flipDurationMs: 300 }} on:consider={(event) => handleDndUpdate(contentStore, event)} on:finalize={(event) => handleDndUpdate(contentStore, event)}>
  {#each contentItems as item, i (item.id)}
    <div>
      {#if item.type === 'codeBlock'}
        <textarea on:input={(event) => updateItem(contentStore, i, event)}>{item.content}</textarea>
      {:else if item.type === 'headline'}
        <h1 contenteditable="true" on:input={(event) => updateItem(contentStore, i, event)}>{item.content}</h1>
      {:else if item.type === 'image'}
        <img src={item.content} alt="Image"/>
      {:else if item.type === 'table'}
        <table contenteditable="true" on:input={(event) => updateItem(contentStore, i, event)}>{item.content}</table>
      {/if}
      <button on:click={() => deleteItem(contentStore, i)}>Delete</button>
    </div>
  {/each}
</div>

<div>
  <button on:click={() => addToken(tokenStore, 'color', '#FFFFFF')}>+ Color Token</button>
</div>

<div use:dndzone={{ items: tokens, flipDurationMs: 300 }} on:consider={(event) => handleDndUpdate(tokenStore, event)} on:finalize={(event) => handleDndUpdate(tokenStore, event)}>
  {#each tokens as token, i (token.id)}
    <div>
      <label>{token.name}</label>: <input bind:value={token.value} on:input={(event) => updateToken(tokenStore, i, event)} />
      <button on:click={() => deleteToken(tokenStore, i)}>Delete</button>
    </div>
  {/each}
</div>

<style>
	.content-block {
		background-color: #f5f5f5;
		border: 1px solid #ddd;
		padding: 10px;
		margin-bottom: 10px;
	}

	.add-button,
	.delete-button {
		padding: 10px 20px;
		font-size: 16px;
		cursor: pointer;
		margin-bottom: 20px;
	}

	textarea,
	h1 {
		width: 100%;
		background-color: #f5f5f5;
		border: none;
		font-family: monospace;
	}

	h1 {
		min-height: 30px;
	}

  .dropzone {
  height: 20px;
  background-color: #f0f0f0;
  border: 1px dashed #ccc;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
}
</style>