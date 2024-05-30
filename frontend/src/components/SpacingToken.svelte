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
  <div style="margin: {token.$value}; padding: {token.$value}; border: 1px solid #000;">
    Example Spacing
  </div>
</div>
