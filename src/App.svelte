<script>
	import Scatter from './lib/Scatter.svelte';
	import RangePlayback from './lib/RangePlayback.svelte';
	import deathsCsv from './data/Children that died before 5 years of age per woman - Gapminder (2017).csv?raw';
	import survivedCsv from './data/Children that survived past 5 years of age per woman - Gapminder (2017).csv?raw';
	import * as aq from 'arquero';
	const { op } = aq;

	const yearMin = 1970;
	const yearMax = 2015;

	const data = aq.fromCSV(deathsCsv)
						.join(aq.fromCSV(survivedCsv))
						.rename({
						'Children that died before 5 years of age per woman (based on Gapminder (2017))': 'x',
						'Children that survived past 5 years of age per woman (based on Gapminder (2017))': 'y'	
						})

	const max = data.rollup({ 
		y: op.max('y'),
		x: op.max('x')
	}).object()

	$: selectedYear = 2015;

	$: scatterPlotData = data.params({ 'filterYear': selectedYear })
								  .filter((d, p) => d.Year === p['filterYear']).objects()

</script>

<main>
	<div class="year-controls">
		<div>{selectedYear}</div>
		<RangePlayback min={yearMin} max={yearMax} bind:value={selectedYear} />
	</div>

	<Scatter data={scatterPlotData} yDomain={[0, max.y]} xDomain={[0, max.x]} />
</main>


<style>
	.year-controls {
		display: flex;
		align-items: center;
		justify-content: center;
		column-gap: 10px;
	}
</style>
