<script lang="ts">
  import { tokens } from '../stores/tokens';
  import { v4 as uuidv4 } from 'uuid';

  type ColorToken = {
    $type: 'color';
    $description: string | null;
    $value: string;
    $extensions: {
      name: string;
    } | null;
  };

  type TypographyToken = {
    $type: 'typography';
    $description: string | null;
    $value: {
      'font-family': string;
      'font-size': string;
      'font-weight': number;
      'line-height': number | string;
      'letter-spacing': string;
    };
    $extensions: {
      name: string;
    } | null;
  };

  type Token = ColorToken | TypographyToken;

  let type: 'color' | 'typography' = 'color';

  let newToken: Token;

  let name: string = '';
  let colorValue: string = '#000000';  // Default color value
  let typographyValue: TypographyToken['$value'] = {
    'font-family': '',
    'font-size': '',
    'font-weight': 400,
    'line-height': 1.2,
    'letter-spacing': '0px'
  };

  const initializeNewToken = (tokenType: 'color' | 'typography') => {
    name = '';
    if (tokenType === 'color') {
      newToken = {
        $type: 'color',
        $description: '',
        $value: '#000000',  // Default color value
        $extensions: { name: '' }
      } as ColorToken;
      colorValue = '#000000';  // Default color value
    } else {
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
        $extensions: { name: '' }
      } as TypographyToken;
      typographyValue = {
        'font-family': '',
        'font-size': '',
        'font-weight': 400,
        'line-height': 1.2,
        'letter-spacing': '0px'
      };
    }
  };

  // Initialize newToken with default type
  initializeNewToken(type);

  function addToken() {
    if (newToken.$extensions) {
      newToken.$extensions.name = name;
    }
    if (newToken.$type === 'color') {
      newToken.$value = colorValue;
    } else {
      newToken.$value = typographyValue;
    }
    tokens.update((currentTokens) => {
      const id = uuidv4();
      currentTokens[type][id] = newToken;
      return currentTokens;
    });
    initializeNewToken(type); // Reset the form
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
    </select>
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

  <button type="submit">Add Token</button>
</form>
