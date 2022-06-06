<script>
  import tulokset from './tuloksetStore';
  import Painike from './Painike.svelte';

  export let x = 0;
  export let y = 0;
  function plussaX() {
    x = Math.floor(Math.random() * (50 - 1) + 1); /* funktio, jossa x-muuttajaan sijoitetaan random arvo 1-50 väliltä */
  }
  function plussaY() {
    y = Math.floor(Math.random() * (50 - 1) + 1); /* funktio, jossa y-muuttajaan sijoitetaan random arvo 1-50 väliltä */
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
  /* arvoLuvut funktio sijoittaa random arvot a ja b, a ja b summa sijoitetaan muuttuja c-arvoksi,
  tyhjennetään vastaus ja html-elementtiin tulostettu teksti ja clicked muuttuja arvoon false */
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

  $: validiVastaus = !isNaN(vastaus); /* tarkistetaan input-elementin vastausta reaktiivisesti, että onko annettu stringi numero vai ei  */

  function tyhjenna() {
    x = 0;
    y = 0;
    summa = 0;
  }
  let clicked = false;
  let outputHtml = '';
  const tarkista = window.onload = function () { /* window.onload eventti aktivoituu, kun koko sivu on ladattu, jolloin voidaan sijoittaa myöhemmin tulevaan html-elementtiin tietoa */
    setTimeout(() => {clicked = true}, 1000); /* hidastetaan hieman, jotta uusi lasku -painike tulee animoituna ja jännitys säilyy pääsekö ottamaan uutta kysymystä */
    
    if (visited && !validiVastaus) { /* eri iffittelyitä, joilla määritellään vastauksen oikein/väärin/ei validi teksti */
      outputHtml = 'Vastaus pitää olla numeroita!';
    }
    if (visited && vastaus == c && validiVastaus) {
      outputHtml = 'Hienoa, oikein meni!';
    } else if (visited && vastaus != c && validiVastaus) {
      outputHtml = 'Harmi, meni väärin!';
    }
    document.getElementById('output').innerHTML = outputHtml; /* vastauksen mukaisen viestin sijoitus html-elementtiin id:n perusteella. */
  };
  
  const tallennaTulokset = () => {
    tulokset.update((tulokset) => [...tulokset, `Plussalaskut: ${a} + ${b} ja sinun vastaus oli ${vastaus}`]); /* viedään storeen tietoa spreadillä. Vastattu lasku ja vastaus */
  };

</script>

<div class="plussa">
  <div class="yhteenlasku">
    <h3>Laske yhteenlasku</h3>
    <p>Oikean vastauksen jälkeen voit ottaa uuden laskun</p>
    {#if laskuNakyvissa}
      <p>
        {a} + {b} =
        <!-- input-elementissä useita tapahtumia, jottei validointi tekstiä/oikein-väärin viestiä näytetä liian aikaisin value on kaksisuuntaisesti sidottu, jotta saadaan kokoajan tietoa sen arvosta -->
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
        ><!-- tarkista painikkeessa on kaksi on:click tapahtumaa. Toinen tarkistaa vastauksen ja toinen päivittää tiedon storeen. -->
      </p>
      <div id="output" /> <!-- html-elementti, jossa näytetään vastauksen perusteella viesti -->
      <br />
    {/if}
    {#if vastaus == c && clicked} <!-- mikäli vastaus on oikein ja tarkista painiketta on clicked niin 'uusi lasku' -painike ilmestyy näkyviin -->
      <Painike on:click={arvoLuvut}>Uusi lasku</Painike>
    {/if}
  </div>
  <div class="parvonta">
    <!-- yksinkertainen lukujen arvonta kone -->
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
