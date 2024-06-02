<script lang="ts">
  let fileInput: HTMLInputElement;

  function exportTokens() {
    const tokens = localStorage.getItem('tokens');
    if (tokens) {
      const blob = new Blob([JSON.stringify(JSON.parse(tokens), null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'tokens.json';
      a.click();
      URL.revokeObjectURL(url);
    } else {
      console.error('No tokens found in local storage');
    }
  }

  function importTokens() {
    fileInput.click();
  }

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          const tokens = JSON.parse(result);
          localStorage.setItem('tokens', JSON.stringify(tokens));
          location.reload(); // to reflect changes, can be handled better
        }
      };
      reader.readAsText(file);
    }
  }
</script>

<button on:click={exportTokens}>Export Tokens</button>
<button on:click={importTokens}>Import Tokens</button>
<input type="file" accept=".json" bind:this={fileInput} on:change={handleFileChange} style="display: none;" />
