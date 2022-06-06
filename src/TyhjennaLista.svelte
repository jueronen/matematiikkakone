<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<button on:click={() => dispatch('tyhjennaLista')}>Tyhjennä tuloslista</button>
