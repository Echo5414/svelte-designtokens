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
  };
</script>

<div>
  <p>{token.$description}</p>
  <div style="font-family: {token.$value['font-family']}; font-size: {token.$value['font-size']}; font-weight: {token.$value['font-weight']}; line-height: {token.$value['line-height']}; letter-spacing: {token.$value['letter-spacing']}">
    Example Text
  </div>
</div>
