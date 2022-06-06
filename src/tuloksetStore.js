import {writable} from 'svelte/store'

const tulokset = writable([]); /* otetaan store muuttujaan ja alustetaan se tyhjäksi taulukoksi, johon laskutoimitukset ja vastauksen sijoitetaan. */

export default tulokset;