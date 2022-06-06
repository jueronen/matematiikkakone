<script>
  export let sovellus = 'Matematiikkakone';
  export let yritys = 'Ersin koodipaja';
  export let vuosi = 2022;
</script>

<footer>{sovellus} - Copyright by {yritys} {vuosi}</footer> <!-- komponentti, jolla luodaan footer elementti sovellukseen, johon tiedot välitetään propseina. -->

<style>
  footer {
    color: #ff3e00;
    padding: 1em;
  }
</style>