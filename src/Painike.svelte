<script>
  import { fade, slide } from 'svelte/transition'; /* liikettä buttoniin haetaan fade ja slide animoinneilla, jotka otetaan svelte-kirjastosta käyttöön. */
</script>

<button in:slide out:fade on:click><slot /></button> <!-- esimerkki tapahtuman välittämisestä tällä buttonilla, johon on animoinnit laitettu sekä buttonin teksti slotilla -->
