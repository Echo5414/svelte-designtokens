<script lang="ts">
  import { tokensStore } from '../stores/tokens';
  import { v4 as uuidv4 } from 'uuid';
  import type { Tokens, ColorToken, TypographyToken, SpacingToken } from '../utils/localStorage';

  type TokenType = 'color' | 'typography' | 'spacing';

  let type: TokenType = 'color';
  let newToken: ColorToken | TypographyToken | SpacingToken;
  let name: string = '';
  let value: any = '';

  const initializeNewToken = (tokenType: TokenType) => {
    name = '';
    if (tokenType === 'color') {
      value = '#000000';
      newToken = {
        $type: 'color',
        $description: '',
        $value: value,
        $extensions: { name: '' }
      } as ColorToken;
    } else if (tokenType === 'typography') {
      value = {
        'font-family': '',
        'font-size': '',
        'font-weight': 400,
        'line-height': 1.2,
        'letter-spacing': '0px'
      };
      newToken = {
        $type: 'typography',
        $description: '',
        $value: value,
        $extensions: { name: '' }
      } as TypographyToken;
    } else if (tokenType === 'spacing') {
      value = '8px';
      newToken = {
        $type: 'spacing',
        $description: '',
        $value: value,
        $extensions: { name: '' }
      } as SpacingToken;
    }
  };

  initializeNewToken(type);

  function addToken() {
    if (newToken.$extensions) {
      newToken.$extensions.name = name;
    }
    newToken.$value = value;

    tokensStore.update((currentTokens) => {
      const id = uuidv4();
      (currentTokens as any)[type][id] = newToken;
      return currentTokens;
    });
    initializeNewToken(type);
  }
</script>

<form on:submit|preventDefault={addToken}>
  <div>
    <label for="name">Name:</label>
    <input type="text" id="name" bind:value={name} />
  </div>
  <div>
    <label for="description">Description:</label>
    <input type="text" id="description" bind:value={newToken.$description} />
  </div>

  <div>
    <label for="type">Type:</label>
    <select id="type" bind:value={type} on:change={() => initializeNewToken(type)}>
      <option value="color">Color</option>
      <option value="typography">Typography</option>
      <option value="spacing">Spacing</option>
    </select>
  </div>

  {#if newToken.$type === 'color'}
    <div>
      <label for="value">Value:</label>
      <input type="color" id="value" bind:value={value} />
    </div>
  {/if}

  {#if newToken.$type === 'typography'}
    <div>
      <label for="fontFamily">Font Family:</label>
      <input type="text" id="fontFamily" bind:value={value['font-family']} />
    </div>
    <div>
      <label for="fontSize">Font Size:</label>
      <input type="text" id="fontSize" bind:value={value['font-size']} />
    </div>
    <div>
      <label for="fontWeight">Font Weight:</label>
      <input type="number" id="fontWeight" bind:value={value['font-weight']} />
    </div>
    <div>
      <label for="lineHeight">Line Height:</label>
      <input type="text" id="lineHeight" bind:value={value['line-height']} />
    </div>
    <div>
      <label for="letterSpacing">Letter Spacing:</label>
      <input type="text" id="letterSpacing" bind:value={value['letter-spacing']} />
    </div>
  {/if}

  {#if newToken.$type === 'spacing'}
    <div>
      <label for="value">Value:</label>
      <input type="text" id="value" bind:value={value} />
    </div>
  {/if}

  <button type="submit">Add Token</button>
</form>
