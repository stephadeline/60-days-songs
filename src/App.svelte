<script>
	import LineChart from './LineChart.svelte'
	import ScatterPlot from './ScatterPlot.svelte'
	import BarChart from './BarChart.svelte'
	import data from './data/joined.json';

	import SmallMultipleLine from './SmallMultipleLine.svelte'
	import SmallMultipleLineMeat from './SmallMultipleLineMeat.svelte'

</script>

<main>
	<h1>This is Group 2's final project</h1>
	<h3>Small multiple line charts</h3>
	<SmallMultipleLine />
	<SmallMultipleLineMeat />

	<BarChart/>
	<ScatterPlot/>
	<LineChart/>
</main>


<style>

</style>
