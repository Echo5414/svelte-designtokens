<script lang="ts">
  export let id: string;
  export let token: {
    $description: string | null;
    $value: string;
  };
</script>

<div>
  <p>{token.$description}</p>
  <div style="margin: {token.$value}; padding: {token.$value}; border: 1px solid #000;">
    Example Spacing
  </div>
</div>
