<script lang="ts">
  export let id: string;
  export let token: {
    $description: string | null;
    $value: string;
  };
</script>

<div>
  <p>{token.$description}</p>
  <div style="background-color: {token.$value}; width: 100px; height: 100px;"></div>
  <p>{token.$value}</p>
</div>
