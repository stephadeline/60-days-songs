<script>
	import * as Plot from '@observablehq/plot';

	export let data = [];

	export let yDomain = undefined;
	export let xDomain = undefined;

	/** @type {HTMLElement} */
	$: plotEl = Plot.plot({
		className: 'plot__line',
		y: { grid: true, domain: yDomain },
		x: { domain: xDomain },
		marks: [
			Plot.circle(data, {
				x: 'x',
				y: 'y',
				r: 3
			})
		]
	});
</script>

<div class="plot">
	{@html plotEl.outerHTML}
</div>

<style>
	.plot > :global(.plot__line) {
		background: transparent;
	}
</style>
