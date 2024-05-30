<script lang="ts">
  export let id: string;
  export let token: {
    $description: string | null;
    $value: string;
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
  <div style="background-color: {token.$value}; width: 100px; height: 100px;"></div>
  <p>{token.$value}</p>
</div>
