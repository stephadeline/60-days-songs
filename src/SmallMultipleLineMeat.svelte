<script>
  import Chart from "./components/LineChart/Chart.svelte";
  import data from "./data/meatChart.json";
  let scaleAdjusted = false;

  let projections = true

  const countries = [
    "Argentina",
    "China",
    "Switzerland",
    "United States",
    "India",
    "Indonesia",
  ];
  
  const types = [
    "BEEF",
    "LAMB",
    "POULTRY",
    "PORK"
  ]

  $: filterData = function(c) {
    const newData = data
    .filter((d) => types.includes(d.type))
    .map((d) => {
      return {
        type: d.type,
        x: d["year"],
        y: d[c],
      };
    });
    return newData
  }
  $: maxYOverride = scaleAdjusted ? null : 55.559

</script>

<div class="small-line-chart-container">
  <h3>Argentina and India like night and day in meat consumption</h3>

  <p>When it comes to meat consumption, Argentina is clearly in the lead, confirming some clichés, but just partly, because this paradise for beef-lovers has seen poultry surpass the food coming from cows in the past few years.</p>

  <p>At the other end of the rankings, India’s consumption of meat has been very small for decades. Cows are especially sacred for Hindu culture, but none of the other main types of meat is popular either in the second most populated country on Earth.</p> 

  <p>The levels of consumption and the preference of animal vary depending on the country.
These small multiple line charts show how much of each type of meat several countries across the globe eat.</p>

  <div class="scale-toggle">
    <label>
      Adjust scale:
      <input type="checkbox" bind:checked={scaleAdjusted}/>
    </label>
    <label>| Dashed lines <svg height="10" width="20">
      <line x1="0" y1="5" x2="20" y2="5" stroke-width="2" stroke="grey" stroke-dasharray="5,5">
      </line>
    </svg>
    indicates projection data
  </label>
  
  </div>
  

{#each countries as c}
<div class="small-line-chart">
  <p>{c}</p>
    <Chart
      data={filterData(c)}
      label="type"
      group="type"
      groupList={types}
      selectedLabel={types}
      selectedGroup={types}
      maxYOverride={maxYOverride}
      yKey="Pork consumption"
      {projections}
    />
  </div>
{/each}
</div>

<style>
  .small-line-chart {
  width: calc(100%/3);
  float: left;  
  }

  .small-line-chart p {
      font-size: 15px;
      font-weight: bold;
  }

  @media screen and (max-width: 700px) {
      .small-line-chart {
        width: 100%;
        float: left;  
    }
    
  }

  .small-line-chart-container {
    display: inline-block;
  }

  .scale-toggle {
    text-align: left;
    max-width: 700px;
    margin: auto;
  }

  p, h1, h4, h3 {
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
</style>
