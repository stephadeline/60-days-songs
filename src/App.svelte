<script>
	import Scroller from '@sveltejs/svelte-scroller';
	import LoremIpsum from './LoremIpsum.svelte';
	// import DraggableLabel from './DraggableLabel.svelte';
	import Visual from "./SvgVisual.svelte"

	import { fade, fly, blur } from "svelte/transition";
  import { timeSaturday, treemapBinary, treemapSliceDice } from 'd3';

function scrollIntoView({ target }) {
	const el = document.getElementById("section-2");
	if (!el) return;
	el.scrollIntoView({
		behavior: 'smooth'
	});
}
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
			<section><p class="scrolly-text intro">Mornings are <b>the worst.</b></p>
			  <a href="#section-2" on:click|preventDefault={scrollIntoView}>
					<button out:fade class="alarm-button">Wake up!</button>
					</a> 
				</section>
			<section id="section-2"><p class="scrolly-text">No matter how much I've tried, I could never be a morning person. {index + 1}</p></section>
			<section><p class="scrolly-text">And oftentimes, the bustle of mornings just prevent me from seeing the sun. {index + 1}</p></section>
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
    background-color: rgba(255,255,255,0.7);
    color: black;
    text-align: left;
    padding: 10px;
    max-width: 400px;
  }
	.intro {
		background: none;
		color: white;
		text-align: center;
	}

	.alarm-button {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 70vh;
    text-align: center;
    width: 200px;
    border-radius: 50px;
    background: orange;
    color: white;
  }

</style>