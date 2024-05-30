<script lang="ts">
  import { tokensStore } from '../stores/tokens';
  import { v4 as uuidv4 } from 'uuid';
  import type { Tokens, ColorToken, TypographyToken, SpacingToken } from '../utils/localStorage';

  type Token = ColorToken | TypographyToken | SpacingToken;

  let type: keyof Tokens = 'color';
  let newToken: Token;
  let name: string = '';
  let colorValue: string = '#000000';
  let typographyValue: TypographyToken['$value'] = {
    'font-family': '',
    'font-size': '',
    'font-weight': 400,
    'line-height': 1.2,
    'letter-spacing': '0px'
  };
  let spacingValue: string = '8px';

  const EXTENSION_NAMESPACE = import.meta.env.VITE_EXTENSION_NAMESPACE;

  const initializeNewToken = (tokenType: keyof Tokens) => {
    name = '';
    if (tokenType === 'color') {
      newToken = {
        $type: 'color',
        $description: '',
        $value: '#000000',
        $extensions: {
          [EXTENSION_NAMESPACE]: {
            name: ''
          }
        }
      } as ColorToken;
      colorValue = '#000000';
    } else if (tokenType === 'typography') {
      newToken = {
        $type: 'typography',
        $description: '',
        $value: {
          'font-family': '',
          'font-size': '',
          'font-weight': 400,
          'line-height': 1.2,
          'letter-spacing': '0px'
        },
        $extensions: {
          [EXTENSION_NAMESPACE]: {
            name: ''
          }
        }
      } as TypographyToken;
      typographyValue = {
        'font-family': '',
        'font-size': '',
        'font-weight': 400,
        'line-height': 1.2,
        'letter-spacing': '0px'
      };
    } else if (tokenType === 'spacing') {
      newToken = {
        $type: 'spacing',
        $description: '',
        $value: '8px',
        $extensions: {
          [EXTENSION_NAMESPACE]: {
            name: ''
          }
        }
      } as SpacingToken;
      spacingValue = '8px';
    }
  };

  initializeNewToken(type);

  function addToken() {
    if (newToken.$extensions) {
      newToken.$extensions[EXTENSION_NAMESPACE].name = name;
    }
    if (newToken.$type === 'color') {
      newToken.$value = colorValue;
    } else if (newToken.$type === 'typography') {
      newToken.$value = {
        ...typographyValue,
        'font-size': appendDefaultUnit(typographyValue['font-size']),
        'line-height': formatLineHeight(typographyValue['line-height']),
        'letter-spacing': appendDefaultUnit(typographyValue['letter-spacing']),
      };
    } else if (newToken.$type === 'spacing') {
      newToken.$value = spacingValue;
    }
    tokensStore.update((currentTokens) => {
      const id = uuidv4();
      currentTokens[type][id] = newToken;
      return currentTokens;
    });
    initializeNewToken(type);
  }

  function appendDefaultUnit(value: string | number): string {
    return typeof value === 'number' || /^\d+$/.test(value) ? `${value}px` : value;
  }

  function formatLineHeight(value: string | number): string | number {
    return typeof value === 'number' || /^\d+(\.\d+)?$/.test(value) ? value : appendDefaultUnit(value);
  }
</script>

<form on:submit|preventDefault={addToken}>
  <div>
    <label for="type">Type:</label>
    <select id="type" bind:value={type} on:change={() => initializeNewToken(type)}>
      <option value="color">Color</option>
      <option value="typography">Typography</option>
      <option value="spacing">Spacing</option>
    </select>
  </div>
  <div>
    <label for="name">Name:</label>
    <input type="text" id="name" bind:value={name} />
  </div>
  <div>
    <label for="description">Description:</label>
    <input type="text" id="description" bind:value={newToken.$description} />
  </div>

  {#if newToken.$type === 'color'}
    <div>
      <label for="colorValue">Value:</label>
      <input type="color" id="colorValue" bind:value={colorValue} />
    </div>
  {/if}

  {#if newToken.$type === 'typography'}
    <div>
      <label for="fontFamily">Font Family:</label>
      <input type="text" id="fontFamily" bind:value={typographyValue['font-family']} />
    </div>
    <div>
      <label for="fontSize">Font Size:</label>
      <input type="text" id="fontSize" bind:value={typographyValue['font-size']} />
    </div>
    <div>
      <label for="fontWeight">Font Weight:</label>
      <input type="number" id="fontWeight" bind:value={typographyValue['font-weight']} />
    </div>
    <div>
      <label for="lineHeight">Line Height:</label>
      <input type="text" id="lineHeight" bind:value={typographyValue['line-height']} />
    </div>
    <div>
      <label for="letterSpacing">Letter Spacing:</label>
      <input type="text" id="letterSpacing" bind:value={typographyValue['letter-spacing']} />
    </div>
  {/if}

  {#if newToken.$type === 'spacing'}
    <div>
      <label for="spacingValue">Value:</label>
      <input type="text" id="spacingValue" bind:value={spacingValue} />
    </div>
  {/if}

  <button type="submit">Add Token</button>
</form>
