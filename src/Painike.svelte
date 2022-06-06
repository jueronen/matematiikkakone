<script>
  import { fade, slide } from 'svelte/transition';
</script>

<button in:slide out:fade on:click><slot /></button>
