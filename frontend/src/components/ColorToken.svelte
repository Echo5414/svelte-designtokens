<script lang="ts">
  export let id: string;
  export let token: {
    $description: string | null;
    $value: string;
    $extensions: {
      name: string;
    } | null;
  };
</script>

<div>
  <p>Name: {token.$extensions?.name}</p>
  <p>{token.$description}</p>
  <div style="background-color: {token.$value}; width: 100px; height: 100px;"></div>
  <p>{token.$value}</p>
</div>
