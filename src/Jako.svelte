<script>
  import tulokset from './tuloksetStore';
  import Painike from './Painike.svelte';

  export let xj = 0;
  export let yj = 0;
  function jaa1() {
    xj++;
    if (xj > 10) {
      xj = 0;
    }
  }
  function jaa2() {
    yj++;
    if (yj > 10) {
      yj = 0;
    }
  }
  let osamaara = 0;
  function jaa() {
    osamaara = xj / yj;
  }
  let aj = 0;
  let bj = 0;
  aj = Math.floor(Math.random() * (50 - 1) + 1);
  bj = Math.floor(Math.random() * (10 - 1) + 1);
  let cj = aj / bj;
  cj = Math.round(cj * 100) / 100
  

  function arvoLuvut() {
    aj = Math.floor(Math.random() * (10 - 1) + 1);
    bj = Math.floor(Math.random() * (10 - 1) + 1);
    cj = aj / bj;
    cj = Math.round(cj * 100) / 100
    vastaus = null;
    document.getElementById('outputJ').innerHTML = '';
    clicked = false;
  }

  let vastaus;
  let visited = false;
  let laskuNakyvissa = true;

  $: validiVastaus = !isNaN(vastaus);

  function tyhjenna() {
    xj = 0;
    yj = 0;
    osamaara = 0;
  };
  let clicked = false;
  let outputHtml = '';
  const tarkista = window.onload = function () {
    setTimeout(() => {clicked = true}, 1000);
    if (visited && !validiVastaus) {
      outputHtml = 'Vastaus pitää olla numeroita!';
    }
    if (visited && vastaus == cj && validiVastaus) {
      outputHtml = 'Hienoa, oikein meni!';
    } else if (visited && vastaus != cj && validiVastaus) {
      outputHtml = 'Harmi, meni väärin!';
    }
    document.getElementById('outputJ').innerHTML = outputHtml;
  };
  
  const tallennaTulokset = () => {
    tulokset.update((tulokset) => [
      ...tulokset,
      `Jakolaskut: ${aj} : ${bj} ja sinun vastaus oli ${vastaus}`,
    ]);
  };
</script>

<div class="jako">
  <div class="jakolasku">
    <h3>Laske jakolasku</h3>
    <p>Mikäli luku ei ole kokonaisluku niin anna vastaus kahteen desimaalin pyöristettynä ja pisteellä erotettuna.</p>
    {#if laskuNakyvissa}
      <p>
        {aj} : {bj} =
        <input
          type="vastaus"
          id="kysymys"
          bind:value={vastaus}
          on:input={() => (
            (visited = false),
            (document.getElementById('outputJ').innerHTML = '')
          )}
          on:focus={() => (
            (visited = false),
            (document.getElementById('outputJ').innerHTML = '')
          )}
          on:blur={() => (visited = true)}
          placeholder="?"
        />
        <button

          on:click={tarkista}
          on:click={tallennaTulokset}>Tarkista</button
        >
      </p>
      <div id="outputJ" />
      <br />
    {/if}
    {#if vastaus == cj && clicked}
      <Painike on:click={arvoLuvut}>Uusi lasku</Painike>
    {/if}
  </div>

  <div class="jakokone">
    <h3>Jakolasku</h3>
    <h3>{xj} : {yj}</h3>
    <button on:click={jaa1}> LISÄÄ YKSI </button>
    <button on:click={jaa2}> LISÄÄ YKSI </button>
    <h3>
      Vastaus on: {osamaara}
    </h3>
    <button on:click={jaa}> VASTAUS </button>
    <button on:click={tyhjenna}>TYHJENNÄ</button>
  </div>
</div>

<style>
  .jako {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .jakokone {
    padding: 2em;
    width: 50%;
    border: solid thin red;
  }
  .jakolasku {
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
