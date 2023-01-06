<script>
  import { scaleOrdinal } from "d3-scale";
  import { schemeTableau10 } from "d3-scale-chromatic";
  import Chart from "./components/LineChart/Chart.svelte";
  import MultiSelect from "svelte-multiselect";
  import Select from "svelte-select";
  import data from "./data/joined.json";

  const consumptionIndicators = [
    "Agriculture activity (meat): consumption",
    "Agriculture activity (total): consumption",
    "Electricity activity (per capita)",
    "New EV sales per million capita",
    "Consumption of households and government per capita",
    "BEEF",
    "PIG",
    "POULTRY", 
    "SHEEP"
  ];

  const wealthIndicators = [
    "GDP (expenditure, multiple price benchmarks)",
    "GDP per capita (expenditure, multiple price benchmarks)",
    "Productivity: output per hour worked",
    "Gini coefficient",
    "Palma ratio (S90/S40 ratio)",
  ];

  let zoom = false;
  let isLog = false;

  const continents = Array.from(new Set(data.map((d) => d.continent)));

  const colorScale = scaleOrdinal() 
    .domain(continents)
    .range(schemeTableau10)

  $: selectedIndicator = consumptionIndicators[0];
  $: selectedWealth = wealthIndicators[0];

  $: consumptionData = data
    .filter((d) => d[selectedIndicator])
    .map((d) => {
      let newData = {
        country_name: d["country_name"],
        continent: d["continent"],
        x: d["year"],
        y: d[selectedIndicator],
      };
      return newData;
    });

  $: wealthData = data
    .filter((d) => d[selectedIndicator])
    .map((d) => {
      let newData = {
        country_name: d["country_name"],
        continent: d["continent"],
        x: d["year"],
        y: d[selectedWealth],
      };
      return newData;
    });

  $: countries = Array.from(
    new Set(consumptionData.map((d) => d.country_name))
  );
  $: selectedCountries = [];

  $: selectedContinents = ["Asia"];

  $: selected = selectedCountries.length > 0 || selectedContinents.length > 0;
</script>

<div class="line-chart-container">
  <h2>Compare consumption and wealth indicator trends overtime</h2>
  <div class="line-chart-selectors">
    <div class="select-country">

      <h4>Select continents highlight:</h4>
      <MultiSelect bind:selected={selectedContinents} options={continents}>

      <span let:option slot="option">
        {option}
        <svg height="10" width="20">
          <line x1="2" y1="5" x2="20" y2="5" stroke-width="2" stroke={colorScale(option)}>
          </line>
        </svg>
      </span>
      <span let:option slot="selected">
        {option}
        <svg height="10" width="20">
          <line x1="2" y1="5" x2="20" y2="5" stroke-width="2" stroke={colorScale(option)}>
          </line>
        </svg>
      </span>
    </MultiSelect>

      <h4>Or select countries to highlight:</h4>
      <MultiSelect bind:selected={selectedCountries} options={countries} />

    </div>

    <div class="log-toggle">
    <label>
      Use logarithmic scale:
      <input type="checkbox" bind:checked={isLog} />
    </label>
  </div>

    {#if selected}
    <div class="scale-toggle">

      <label>
        Adjust scale to selection:
        <input type="checkbox" bind:checked={zoom} />
        <p class="note">
          Note: This is useful to view the rise and fall of indicator values
          overtime
        </p>
      </label>
      </div>
    {/if}
    
  </div>

  <div class="line-chart">

    <div class="line-chart-selector">
      <Select
        items={consumptionIndicators}
        value={consumptionIndicators[0]}
        bind:justValue={selectedIndicator}
        clearable={false}
        showChevron
      />
    </div>

    <Chart
      data={consumptionData}
      selectedLabel={selectedCountries}
      selectedGroup={selectedContinents}
      {zoom}
      {isLog}
      groupList={continents}
    />

    <div class="line-chart-selector">
      <Select
        class="line-chart-selector"
        items={wealthIndicators}
        value={wealthIndicators[0]}
        bind:justValue={selectedWealth}
        clearable={false}
        showChevron
      />
    </div>

    <Chart
      data={wealthData}
      selectedLabel={selectedCountries}
      selectedGroup={selectedContinents}
      groupList={continents}
      {zoom}
      {isLog}
    />
  </div>
</div>

<style>
  @media screen and (min-width: 700px) {
    .line-chart-selectors {
      width: 30%;
      float: left;
      text-align: left;
    }

    .line-chart {
      width: 70%;
      float: right;
      text-align: left;
    }
  }

  .line-chart-container {
    width: 80vw;
    height: 80vh;
    margin: 20px auto;
  }

  .line-chart-selector {
    max-width: 600px;
    text-align: left;
    margin: 10px 20px;
  }

  .note, label {
    font-size: 13px;
    line-height: 15px;
  }

  .log-toggle {
    margin-bottom: 10px;
    margin-top: 10px;
  }
</style>
