<script>
	import LineChartInteractive from './LineChartInteractive.svelte'
	import ScatterPlot from './ScatterPlot.svelte'
	import BarChart from './BarChart.svelte'
	import SmallMultipleLine from './SmallMultipleLine.svelte'
	import SmallMultipleLineMeat from './SmallMultipleLineMeat.svelte'

</script>

<main>
	<h1>Title of project</h1>

	<p>Introduction</p>
	<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut at ex debitis dolores error qui distinctio expedita excepturi suscipit laboriosam incidunt voluptate porro illo dolorum, iure doloremque vero. Adipisci, tempore.</p>

	<SmallMultipleLine />

	<p>Potential reasons why countries have high/low meat consumption</p>
	<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut at ex debitis dolores error qui distinctio expedita excepturi suscipit laboriosam incidunt voluptate porro illo dolorum, iure doloremque vero. Adipisci, tempore.</p>

	<SmallMultipleLineMeat />

	<p>Potential reasons explaining trends above</p>
	<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut at ex debitis dolores error qui distinctio expedita excepturi suscipit laboriosam incidunt voluptate porro illo dolorum, iure doloremque vero. Adipisci, tempore.</p>

	<BarChart/>

	<p>Potential reasons explaining trends above</p>

	<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut at ex debitis dolores error qui distinctio expedita excepturi suscipit laboriosam incidunt voluptate porro illo dolorum, iure doloremque vero. Adipisci, tempore.</p>

	<p>Intro to scatterplot interactive</p>

	<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut at ex debitis dolores error qui distinctio expedita excepturi suscipit laboriosam incidunt voluptate porro illo dolorum, iure doloremque vero. Adipisci, tempore.</p>

	<ScatterPlot/>

	<p>Intro to line chart interactive</p>
	<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut at ex debitis dolores error qui distinctio expedita excepturi suscipit laboriosam incidunt voluptate porro illo dolorum, iure doloremque vero. Adipisci, tempore.</p>

	<LineChartInteractive/>
</main>


<style>
	p {
		text-align: left;
		margin: 10px auto 10px auto;
		max-width: 700px;
	}

</style>
