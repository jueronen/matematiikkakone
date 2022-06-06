<script>
  import tulokset from './tuloksetStore';
  import Painike from './Painike.svelte';

  export let x = 0;
  export let y = 0;
  function plussaX() {
    x = Math.floor(Math.random() * (50 - 1) + 1);
  }
  function plussaY() {
    y = Math.floor(Math.random() * (50 - 1) + 1);
  }
  let summa = 0;
  function laskeYhteen() {
    summa = x + y;
  }
  let a = 0;
  let b = 0;
  a = Math.floor(Math.random() * (50 - 1) + 1);
  b = Math.floor(Math.random() * (50 - 1) + 1);
  let c = a + b;

  function arvoLuvut() {
    a = Math.floor(Math.random() * (50 - 1) + 1);
    b = Math.floor(Math.random() * (50 - 1) + 1);
    c = a + b;
    vastaus = null;
    document.getElementById('output').innerHTML = '';
    clicked = false;
  }

  let vastaus;
  let visited = false;
  let laskuNakyvissa = true;

  $: validiVastaus = !isNaN(vastaus);

  function tyhjenna() {
    x = 0;
    y = 0;
    summa = 0;
  }
  let clicked = false;
  let outputHtml = '';
  const tarkista = window.onload = function () {
    setTimeout(() => {clicked = true}, 1000);
    
    if (visited && !validiVastaus) {
      outputHtml = 'Vastaus pitää olla numeroita!';
    }
    if (visited && vastaus == c && validiVastaus) {
      outputHtml = 'Hienoa, oikein meni!';
    } else if (visited && vastaus != c && validiVastaus) {
      outputHtml = 'Harmi, meni väärin!';
    }
    document.getElementById('output').innerHTML = outputHtml;
  };
  
  const tallennaTulokset = () => {
    tulokset.update((tulokset) => [...tulokset, `Plussalaskut: ${a} + ${b} ja sinun vastaus oli ${vastaus}`]);
  };

</script>

<div class="plussa">
  <div class="yhteenlasku">
    <h3>Laske yhteenlasku</h3>
    <p>Oikean vastauksen jälkeen voit ottaa uuden laskun</p>
    {#if laskuNakyvissa}
      <p>
        {a} + {b} =
        <input
          type="vastaus"
          id="kysymys"
          bind:value={vastaus}
          on:input={() => (
            (visited = false),
            (document.getElementById('output').innerHTML = '')
          )}
          on:focus={() => (
            (visited = false),
            (document.getElementById('output').innerHTML = '')
          )}
          on:blur={() => (visited = true)}
          placeholder="?"
        />
        <button
          id="tarkista"
          on:click={tarkista} on:click={tallennaTulokset}>Tarkista</button
        >
      </p>
      <div id="output" />
      <br />
    {/if}
    {#if vastaus == c && clicked}
      <Painike on:click={arvoLuvut}>Uusi lasku</Painike>
    {/if}
  </div>
  <div class="parvonta">
    <h3>Plussalaskuarvonta</h3>
    <h3>{x} + {y}</h3>
    <button on:click={plussaX}> ARVO NUMERO 1 </button>
    <button on:click={plussaY}> ARVO NUMERO 2 </button>
    <h3>
      Vastaus on: {summa}
    </h3>
    <button on:click={laskeYhteen}> VASTAUS </button>
    <button on:click={tyhjenna}>TYHJENNÄ</button>
  </div>
</div>

<style>
  .plussa {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .parvonta {
    padding: 2em;
    width: 50%;
    border: solid thin red;
  }
  .yhteenlasku {
    padding: 2em;
    width: 50%;
    border: solid thin red;
  }
  h3 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 1.5em;
    font-weight: 100;
  }

</style>
