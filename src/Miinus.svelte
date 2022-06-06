<!-- koodi hyvin pitkälti samaa kuin Plussa-komponentissa, joten kommentoinnit siellä -->
<script>
  import tulokset from './tuloksetStore';
  import Painike from './Painike.svelte';

  export let xm = 0;
  export let ym = 0;
  function miinus1() {
    xm = Math.floor(Math.random() * (50 - 1) + 1);
  }
  function miinus2() {
    ym = Math.floor(Math.random() * (50 - 1) + 1);
  }
  let erotus = 0;
  function vahenna() {
    erotus = xm - ym;
  }
  let am = 0;
  let bm = 0;
  am = Math.floor(Math.random() * (100 - 1) + 1);
  bm = Math.floor(Math.random() * (50 - 1) + 1);
  let cm = am - bm;

  function arvoLuvut() {
    am = Math.floor(Math.random() * (50 - 1) + 1);
    bm = Math.floor(Math.random() * (50 - 1) + 1);
    cm = am - bm;
    vastaus = null;
    document.getElementById('outputM').innerHTML = '';
    clicked = false;
  }

  let vastaus;
  let visited = false;
  let laskuNakyvissa = true;

  $: validiVastaus = !isNaN(vastaus);

  function tyhjenna() {
    xm = 0;
    ym = 0;
    erotus = 0;
  }
  let clicked = false;
  let outputHtml = '';
  const tarkista = (window.onload = function () {
    setTimeout(() => {clicked = true}, 1000);
    if (visited && !validiVastaus) {
      outputHtml = '<div>' + 'Vastaus pitää olla numeroita!' + '</div>';
    }
    if (visited && vastaus == cm && validiVastaus) {
      outputHtml = '<div>' + 'Hienoa, oikein meni!' + '</div>';
    } else if (visited && vastaus != cm && validiVastaus) {
      outputHtml = '<div">' + 'Harmi, meni väärin!' + '</div>';
    }
    document.getElementById('outputM').innerHTML = outputHtml;
  });

  const tallennaTulokset = () => {
    tulokset.update((tulokset) => [
      ...tulokset,
      `Miinuslaskut: ${am} - ${bm} ja sinun vastaus oli ${vastaus}`,
    ]);
  };
</script>

<div class="miinus">
  <div class="yhteenlasku">
    <h3>Laske miinuslasku</h3>
    <p>Oikean vastauksen jälkeen voit ottaa uuden laskun</p>
    {#if laskuNakyvissa}
      <p>
        {am} - {bm} =
        <input
          type="vastaus"
          id="kysymys"
          bind:value={vastaus}
          on:input={() => (
            (visited = false),
            (document.getElementById('outputM').innerHTML = '')
          )}
          on:focus={() => (
            (visited = false),
            (document.getElementById('outputM').innerHTML = '')
          )}
          on:blur={() => (visited = true)}
          placeholder="?"
        />
        <button
          id="tarkista"
          on:click={tarkista}
          on:click={tallennaTulokset}>Tarkista</button
        >
      </p>
      <div id="outputM" />
      <br />
    {/if}
    {#if vastaus == cm && clicked}
      <Painike on:click={arvoLuvut}>Uusi lasku</Painike>
    {/if}
  </div>
  <div class="marvonta">
    <h3>Miinuslaskuarvonta</h3>
    <h3>{xm} - {ym}</h3>
    <button on:click={miinus1}> ARVO NUMERO 1 </button>
    <button on:click={miinus2}> ARVO NUMERO 2 </button>
    <h3>
      Vastaus on: {erotus}
    </h3>
    <button on:click={vahenna}> VASTAUS </button>
    <button on:click={tyhjenna}>TYHJENNÄ</button>
  </div>
</div>

<style>
  .miinus {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .marvonta {
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
