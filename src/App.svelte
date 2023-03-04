<script>
	import Scroller from '@sveltejs/svelte-scroller';
	import LoremIpsum from './LoremIpsum.svelte';
	// import DraggableLabel from './DraggableLabel.svelte';
	import Visual from "./SvgVisual.svelte"
	let count;
	let index;
	let offset = 0;
	let progress;
	let top = 0.1;
	let threshold = 0.5;
	let bottom = 0.9;
</script>

<div class='demo'>
	<!-- <LoremIpsum/>  -->

	<Scroller
		{top}
		{threshold}
		{bottom}
		bind:count
		bind:index
		bind:offset
		bind:progress
	>
		<div slot="background">
			<!-- <p>current section: <strong>{index + 1}/{count}</strong></p>
			<progress value="{count ? (index + 1) / count : 0}"></progress>

			<p>offset in current section</p>
			<progress value={offset || 0}></progress>

			<p>total progress</p>
			<progress value={progress || 0}></progress> -->
      <Visual {index}/>
		</div>

		<div slot="foreground">
			<section><p class="scrolly-text intro">Mornings are the worst.</p></section>
			<section><p class="scrolly-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.{index + 1}</p></section>
			<section><p class="scrolly-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.{index + 1}</p></section>
			<section><p class="scrolly-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.{index + 1}</p></section>
			<section><p class="scrolly-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.{index + 1}</p></section>
			<section><p class="scrolly-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.{index + 1}</p></section>

			<section><p class="scrolly-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.{index + 1}</p></section>

			<section><p class="scrolly-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.{index + 1}</p></section>

			<section><p class="scrolly-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.{index + 1}</p></section>

			<section><p class="scrolly-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.{index + 1}</p></section>

			<section><p class="scrolly-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.{index + 1}</p></section>


		</div>
	</Scroller>

	<!-- <LoremIpsum/> -->

</div>

<style>
	.demo {
		/* background-color: #7FB1CB; */
		width: 100%;

	}
	
	[slot="background"] {
		/* background-color: rgba(255,62,0,0.05);
		border-top: 2px solid #ff3e00;
		border-bottom: 2px solid #ff3e00; */
		font-size: 1.4em;
		overflow: hidden;
		padding: 1em;
	}
	
	[slot="background"] p {
		margin: 0;
	}
	
	[slot="foreground"] {
		pointer-events: none;
	}
	
	[slot="foreground"] section {
		pointer-events: all;
	}
	
	section {
		height: 120vh;
		/* background-color: rgba(0,0,0,0.5);
		color: white; */
		padding: 1em;
		margin: 0 auto;
		max-width: 400px;
	}

  .scrolly-text {
    margin-top: 50vh;
    background-color: #fff;
    color: #000;
    text-align: left;
    padding: 10px;
    max-width: 400px;
  }
	.intro {
		background: none;
		color: white;
		text-align: center;
		font-weight: bold;
	}
</style>