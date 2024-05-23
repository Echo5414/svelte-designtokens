<script>
  import { tokens } from '../stores/tokens';
  import { v4 as uuidv4 } from 'uuid';

  let type = 'color'; // or 'typography'
  let newToken = {
    $type: type,
    $description: '',
    $value: type === 'color' ? '' : {
      'font-family': '',
      'font-size': '',
      'font-weight': 400,
      'line-height': 1.2,
      'letter-spacing': '0px'
    },
    $extensions: null
  };

  function addToken() {
    tokens.update(currentTokens => {
      const id = uuidv4();
      currentTokens[type][id] = newToken;
      return currentTokens;
    });
  }
</script>

<form on:submit|preventDefault={addToken}>
  <div>
    <label>Description:</label>
    <input type="text" bind:value={newToken.$description} />
  </div>

  {#if type === 'color'}
  <div>
    <label>Value:</label>
    <input type="color" bind:value={newToken.$value} />
  </div>
  {/if}

  {#if type === 'typography'}
  <div>
    <label>Font Family:</label>
    <input type="text" bind:value={newToken.$value['font-family']} />
  </div>
  <div>
    <label>Font Size:</label>
    <input type="text" bind:value={newToken.$value['font-size']} />
  </div>
  <div>
    <label>Font Weight:</label>
    <input type="number" bind:value={newToken.$value['font-weight']} />
  </div>
  <div>
    <label>Line Height:</label>
    <input type="text" bind:value={newToken.$value['line-height']} />
  </div>
  <div>
    <label>Letter Spacing:</label>
    <input type="text" bind:value={newToken.$value['letter-spacing']} />
  </div>
  {/if}

  <button type="submit">Add Token</button>
</form>
