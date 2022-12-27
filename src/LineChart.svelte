<script>
	import Chart from './components/LineChart/Chart.svelte'
  // import MultiSelect from './components/LineChart/MultiSelect.svelte'
  import MultiSelect from 'svelte-multiselect'

	import data from './data/joined.json'


  const consumptionIndicators = [
    'Agriculture activity (meat): consumption',
    'Agriculture activity (total): consumption',
    'Electricity activity (per capita)',
    'New EV sales per million capita',
    'Consumption of households and government per capita',
  ]

  const wealthIndicators = [
    'GDP (expenditure, multiple price benchmarks)',
    'Consumption of households and government (single price benchmark)',
    'GDP per capita (expenditure, multiple price benchmarks)',
    'Productivity: output per hour worked',
    'Gini coefficient',
  ]

  let zoom = false;

  $: selectedIndicator = consumptionIndicators[0];
  $: selectedWealth = wealthIndicators[0]

  $: consumptionData = data.filter(d => d[selectedIndicator])
                            .map(d => {
                              let newData = {
                              country_name: d["country_name"],
                              continent: d["continent"],
                              x: d["year"],
                              y: d[selectedIndicator],
                              }
                              return newData
                            })

  
  $: wealthData = data.filter(d => d[selectedIndicator])
                            .map(d => {
                              let newData = {
                              country_name: d["country_name"],
                              continent: d["continent"],
                              x: d["year"],
                              y: d[selectedWealth],
                              }
                              return newData
                            })

  $: countries =  Array.from(new Set(consumptionData.map((d) => d.country_name)))
  $: selectedCountries = []


  $: continents =  Array.from(new Set(data.map((d) => d.continent)))
  $: selectedContinents = ["Asia"];

  $: selected = selectedCountries.length > 0 || selectedContinents.length > 0



</script>

<div class="line-chart-container">
<h2>Compare consumption and wealth indicator trends overtime</h2>
<div class="line-chart-selectors">
<div class="select-country">
<!-- <select bind:value={selectedCountry}>
  {#each countries as country}
    <option value={country}>
      {country}
    </option>
  {/each}
</select> -->

<h4>Select continents highlight:</h4>
<MultiSelect bind:selected={selectedContinents} options={continents} />

<h4>Or select countries to highlight:</h4>
<MultiSelect bind:selected={selectedCountries} options={countries} />


<!-- {#each continents as continent}
	<label>
		<input type=checkbox bind:group={selectedContinents} name="continents" value={continent}>
		{continent}
	</label>
{/each} -->
</div>

{#if selected}
<label>
  Click to adjust scale to selection:
  <input type=checkbox bind:checked={zoom}>
  <p>Note: This is useful to view the rise and fall of indicator values overtime</p>
</label>
{/if}
</div>

<div class="line-chart">
<select bind:value={selectedIndicator}>
  {#each consumptionIndicators as indicator}
    <option value={indicator}>
      {indicator}
    </option>
  {/each}
</select>


<Chart data={consumptionData} selectedLabel={selectedCountries} selectedGroup={selectedContinents} {zoom} groupList={continents} height=200 width=800/>

<select bind:value={selectedWealth}>
  {#each wealthIndicators as indicator}
    <option value={indicator}>
      {indicator}
    </option>
  {/each}
</select>

<Chart data={wealthData} selectedLabel={selectedCountries} selectedGroup={selectedContinents} {zoom} groupList={continents} height=200 width=800/>

</div>
</div>
<!-- 
<iframe width="100%" height="1008" frameborder="0"
  src="https://observablehq.com/embed/f9b6545ddbf85d55@451?cells=viewof+selectedContinent%2Cviewof+selectedCountry%2Cviewof+zoom%2Cviewof+isLog%2Cwarn%2Cviewof+yVarLine%2CconsumptionChart%2Cviewof+wealthIndicator%2CindicatorChart"></iframe> -->

  <style>
    .line-chart-selectors {
      width: 30%;
      float: left;
    }

    .line-chart {
      width: 70%;
      float: right;
      text-align: left;
    }

    .line-chart-container {
      width: 80vw;
      height: 80vh;
    }
  </style>