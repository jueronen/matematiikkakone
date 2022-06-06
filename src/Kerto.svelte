<script>
  import tulokset from './tuloksetStore';
  import Painike from './Painike.svelte';


  export let xk = 0;
  export let yk = 0;
  function kerro1() {
    xk++;
    if (xk > 10) {
      xk = 0;
    }
  }
  function kerro2() {
    yk++;
    if (yk > 10) {
      yk = 0;
    }
  }
  let tulo = 0;
  function kerro() {
    tulo = xk * yk;
  }
  let ak = 0;
  let bk = 0;
  ak = Math.floor(Math.random() * (10 - 1) + 1);
  bk = Math.floor(Math.random() * (10 - 1) + 1);
  let ck = ak * bk;

  function arvoLuvut() {
    ak = Math.floor(Math.random() * (10 - 1) + 1);
    bk = Math.floor(Math.random() * (10 - 1) + 1);
    ck = ak * bk;
    vastaus = null;
    document.getElementById('outputK').innerHTML = '';
    clicked = false;
  }

  let vastaus;
  let visited = false;
  let laskuNakyvissa = true;

  $: validiVastaus = !isNaN(vastaus);

  function tyhjenna() {
    xk = 0;
    yk = 0;
    tulo = 0;
  };
  let clicked = false;
  let outputHtml = '';
  const tarkista = window.onload = function () {
    setTimeout(() => {clicked = true}, 1000);
    if (visited && !validiVastaus) {
      outputHtml = '<div>' + 'Vastaus pitää olla numeroita!' + '</div>';
    }
    if (visited && vastaus == ck && validiVastaus) {
      outputHtml = '<div>' + 'Hienoa, oikein meni!' + '</div>';
    } else if (visited && vastaus != ck && validiVastaus) {
      outputHtml = '<div>' + 'Harmi, meni väärin!' + '</div>';
    }
    document.getElementById('outputK').innerHTML = outputHtml;
  };
  
  const tallennaTulokset = () => {
    tulokset.update((tulokset) => [
      ...tulokset,
      `Kertolaskut: ${ak} x ${bk} ja sinun vastaus oli ${vastaus}`,
    ]);
  };
</script>

<div class="kerto">
  <div class="kertolasku">
    <h3>Laske kertolasku</h3>
    <p>Oikean vastauksen jälkeen voit ottaa uuden laskun</p>
    {#if laskuNakyvissa}
      <p>
        {ak} x {bk} =
        <input
          type="vastaus"
          id="kysymys"
          bind:value={vastaus}
          on:input={() => (
            (visited = false),
            (document.getElementById('outputK').innerHTML = '')
          )}
          on:focus={() => (
            (visited = false),
            (document.getElementById('outputK').innerHTML = '')
          )}
          on:blur={() => (visited = true)}
          placeholder="?"
        />
        <button
          
          on:click={tarkista}
          on:click={tallennaTulokset}>Tarkista</button
        >
      </p>
      <div id="outputK" />
      <br />
    {/if}
    {#if vastaus == ck && clicked}
      <Painike on:click={arvoLuvut}>Uusi lasku</Painike>
    {/if}
  </div>

  <div class="kertokone">
    <h3>Kertolasku</h3>
    <h3>{xk} x {yk}</h3>
    <button on:click={kerro1}> LISÄÄ YKSI </button>
    <button on:click={kerro2}> LISÄÄ YKSI </button>
    <h3>
      Vastaus on: {tulo}
    </h3>
    <button on:click={kerro}> VASTAUS </button>
    <button on:click={tyhjenna}>TYHJENNÄ</button>
  </div>
</div>

<style>
  .kerto {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .kertokone {
    padding: 2em;
    width: 50%;
    border: solid thin red;
  }
  .kertolasku {
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
