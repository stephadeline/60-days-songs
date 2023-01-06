<script>
	import LineChartInteractive from './LineChartInteractive.svelte'
	import ScatterPlot from './ScatterPlot.svelte'
	import BarChart from './BarChart.svelte'
	import SmallMultipleLine from './SmallMultipleLine.svelte'
	import SmallMultipleLineMeat from './SmallMultipleLineMeat.svelte'

</script>

<main>
	<h1><span>Argentina leads world in football ⚽🏆…</span><br/>and meat-eating 🥩🍗</h1>
	<p class="byline">By Guifré Jordan, Marina Rovira Boix and Stephanie Adeline</p>

	<h4 style="font-weight: bold;">About the project</h4>
	<p>This project focuses on the consumption of meat across the globe over the past three decades, comparing some selected countries according to their continent, wealth and level of inequality. The spotlight is on meat-eating, but it also allows users to explore the trends in consumption in general, and also of some specific goods, such as electric vehicles.</p>

		<p>For this work official data from the OECD, as well as a dataset from the Climate Action Tracker independent scientific analysis. It also uses the Penn World Table, maintained by the University of California and the University of Groningen, and the World Inequality Database (WID), maintained by the World Inequality Lab, located in Paris.
		</p>


	<SmallMultipleLineMeat />

	<p>These small multiple line charts show how much of each type of meat several countries across the globe eat, and the results are significant: Argentina is clearly in the lead, confirming some clichés, but just partly, because this paradise for beef-lovers has seen poultry surpass the food coming from cows in the past few years.</p>

	<p>At the other end of the rankings, India’s consumption of meat has been very small for decades. Cows are especially sacred for Hindu culture, but none of the other main types of meat is popular either in the second most populated country on Earth.</p>


	<SmallMultipleLine />

	<p>Potential reasons why countries have high/low meat consumption</p>
	<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut at ex debitis dolores error qui distinctio expedita excepturi suscipit laboriosam incidunt voluptate porro illo dolorum, iure doloremque vero. Adipisci, tempore.</p>

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
	p, h1, h4 {
		text-align: left;
		margin: 10px auto 10px auto;
		max-width: 700px;
	}

	@media screen and (max-width: 700px) {
		p{
			max-width: 100vw;
			margin: 10px auto 10px auto;
		}
	}
	h1 span {
		font-size: 35px;
	}

 p.byline {
	padding-bottom: 30px;
 }
</style>
