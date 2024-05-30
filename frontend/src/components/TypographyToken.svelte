<script lang="ts">
  export let id: string;
  export let token: {
    $description: string | null;
    $value: {
      'font-family': string;
      'font-size': string;
      'font-weight': number;
      'line-height': string | number;
      'letter-spacing': string;
    };
    $extensions: {
      [key: string]: {
        name: string;
      };
    } | null;
  };

  const EXTENSION_NAMESPACE = import.meta.env.VITE_EXTENSION_NAMESPACE;
</script>

<div>
  <p>Name: {token.$extensions ? token.$extensions[EXTENSION_NAMESPACE]?.name : 'N/A'}</p>
  <p>{token.$description}</p>
  <div style="font-family: {token.$value['font-family']}; font-size: {token.$value['font-size']}; font-weight: {token.$value['font-weight']}; line-height: {token.$value['line-height']}; letter-spacing: {token.$value['letter-spacing']}">
    Example Text
  </div>
</div>
