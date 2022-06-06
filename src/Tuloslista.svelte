<script>
  import tulokset from './tuloksetStore.js';
  import TyhjennaLista from './TyhjennaLista.svelte';
  import { scale } from 'svelte/transition';

  const tyhjaaTulokset = () => tulokset.update((tulokset) => (tulokset = ''));
</script>

<div class="sisalto">
  <div class="tuloslista">
    <h3>TULOSLISTA</h3>

    {#if $tulokset.length > 0}
      {#each $tulokset as tulos}
        <p transition:scale>
          {tulos}
        </p>
      {/each}
    {:else}
      <p>Ei tuloksia</p>
    {/if}
    <TyhjennaLista on:tyhjennaLista={tyhjaaTulokset} />
  </div>
</div>

<style>
  h3 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 1.5em;
    font-weight: 100;
  }
  .sisalto {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .tuloslista {
    padding: 2em;
    width: 100%;
    border: solid thin red;
  }
</style>
