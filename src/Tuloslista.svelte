<script>
  import tulokset from './tuloksetStore.js';
  import TyhjennaLista from './TyhjennaLista.svelte';
  import { scale } from 'svelte/transition';

  const tyhjaaTulokset = () => tulokset.update((tulokset) => (tulokset = '')); /* metodi, jolla tyhjennetään storen tulokset-taulukko */
</script>

<div class="sisalto">
  <div class="tuloslista">
    <h3>TULOSLISTA</h3>

    {#if $tulokset.length > 0} <!-- tarkistetaan onko taulukossa tavaraa ja jos on niin ajetaan each:llä tulokset ja jos ei ole tuloksia niin listassa lukee ei tuloksia. -->
      {#each $tulokset as tulos} <!-- hyödynnetään storen automaattitilausta $-merkillä -->
        <p transition:scale>
          {tulos}
        </p>
      {/each}
    {:else}
      <p>Ei tuloksia</p>
    {/if}
    <TyhjennaLista on:tyhjennaLista={tyhjaaTulokset} /> <!-- Käytetään custom eventtinä luotua Tyhjennälista -komponentin eventtiä. Painiketta klikkaamalla tyhjennetään tuloslista. -->
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
