<script>
  export let id;
  export let token;
</script>

<div>
  <p>{token.$description}</p>
  <div style="background-color: {token.$value}; width: 100px; height: 100px;"></div>
  <p>{token.$value}</p>
</div>
