<script>
  export let id;
  export let token;
</script>

<div>
  <p>{token.$description}</p>
  <div style="font-family: {token.$value['font-family']}; font-size: {token.$value['font-size']}; font-weight: {token.$value['font-weight']}; line-height: {token.$value['line-height']}; letter-spacing: {token.$value['letter-spacing']}">
    Example Text
  </div>
</div>
