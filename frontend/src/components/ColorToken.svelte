<script lang="ts">
  import { EXTENSION_NAMESPACE } from '../../env';
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

  // Ensure EXTENSION_NAMESPACE is correctly typed and defined
  const namespace = EXTENSION_NAMESPACE as string;
</script>

<div>
  <p>Name: {token.$extensions?.[namespace]?.name}</p>
  <p>{token.$description}</p>
  <div style="background-color: {token.$value}; width: 100px; height: 100px;"></div>
  <p>{token.$value}</p>
</div>
