<script>
  /* importoidaan juurikomponentille lapsikomponentit, joita käytetään. */
  import Jako from './Jako.svelte';
  import Kerto from './Kerto.svelte';
  import Miinus from './Miinus.svelte';
  import Plussa from './Plussa.svelte';
  import Copyright from './Copyright.svelte';
  import Tuloslista from './Tuloslista.svelte';

  export let yritys;
  export let sovellus;
  export let vuosi;

</script>
<!-- sovelluksen juurikomponentti, jossa ei juurikaan ole muuta kuin määritellään missä kohtaan sovellusta luotuja komponentteja käytetään -->
<main>
  <h1 id="title">MATEMATIIKKAA 1-3 LUOKALLE</h1>
  <container>
    <div class="laatikko-plus">
      <Plussa />
    </div>

    <div class="laatikko-plus">
      <Miinus />
    </div>

    <div class="laatikko-plus">
      <Kerto />
    </div>

    <div class="laatikko-plus">
      <Jako />
    </div>
    <div class="laatikko-plus">
      <Tuloslista />
    </div>
  </container>
  <Copyright {yritys} {sovellus} {vuosi} /> <!-- Copyright-komponentti propseilla -->
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }
  container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 3em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  #title {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  .laatikko-plus {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 70%;
  }
</style>
