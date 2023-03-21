<script>
  export let index;
  export let audioIndex;
  export let text = "Lorem ipsum";
  let song;
  export let src = "https://p.scdn.co/mp3-preview/2cdf5bc166d9d6231af6c5e00d2f2e35e78e2851?cid=774b29d4f13844c495f206cafdad9c86";
  export let allowAudio = false;

  let symbol = '▶️'

  $:  playAudio = function() {
    if ((allowAudio === true)) {
      if (song.paused) {
        song.play();
				symbol = '⏹️'
      } else if (!song.paused) {
        song.pause();
				symbol = '▶️'
      } else {
        song.pause();
				symbol = '▶️'
      }
    }
  }

  // $: console.log(song)

  $: if (allowAudio && song && audioIndex !== index) {
        song.pause();
				symbol = '▶️'
  }


</script>

<button class="play-audio-button" on:click={playAudio}>{symbol} {text}</button>

<audio
  src={src}
  bind:this={song}
>
</audio>

<style>
  	button.play-audio-button {
		padding: 2px 7px;
		background: rgba(67,92,117,1);
		color: white;
		border: none;
		border-radius: 0px;

	}

	button.play-audio-button:hover {
		background: rgba(67,92,117,0.5);
		border: none;
	}
</style>