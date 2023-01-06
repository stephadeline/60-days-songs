<script>
  import Chart from "./components/LineChart/Chart.svelte";
  import data from "./data/joined.json";
  import {scaleOrdinal} from "d3-scale"
  import { schemeTableau10 } from "d3-scale-chromatic";



  const countries = [
    "Argentina",
    "Switzerland",
    "India",
    "Indonesia",
    "China",
    "United States",
  ];

  const group1 = [
    "Argentina",
    "China",
  ];

  const group2 = [
    "Switzerland",
    "United States",
  ];


  const group3 = [
    "Indonesia",
    "India",
  ];
  
  $: focus = {group1: false, group2: false, group3: false}

  $: selectedCountries = focus.group1 ? group1 : focus.group2 ? group2 : focus.group3 ? group3 : countries

  $: handleFocus = function(groupN) {
    for (let [key, value] of Object.entries(focus)) {
      if (key === groupN) {
        value = !value
      } else {
        value = false;
      }
      focus[key] = value;
    }
  }
 
  const indicators = [
    "Agriculture activity (meat): consumption",
    "GDP per capita (expenditure, multiple price benchmarks)",
    "Gini coefficient",
  ]

  $: filterData = function(i) {
    const newData = data
    .filter((d) => countries.includes(d.country_name))
    .map((d) => {
      return {
        country_name: d["country_name"],
        continent: d["continent"],
        x: d["year"],
        y: d[i],
      };
    });
    return newData
  }
  $: continents = Array.from(new Set(data.map((d) => d.continent)));

  $: colorScale = scaleOrdinal().domain(continents).range(schemeTableau10);


</script>

<div class="small-line-chart-container">
  <h3>Is meat consumption related to wealth or inequality? Yes, but the relationship is not so straightforward.</h3>
  <div class="explanation group1">
    <p>For <span style="color: {colorScale("Americas")}">Argentina</span> and <span style="color: {colorScale("Asia")}">China</span>
    <button on:click={handleFocus("group1")}>{focus.group1 ? "Click to unfocus" : "Click to focus"}</button>, meat consumption increasing as GDP increases. However the two countries differ in that Argentina’s inequality trends downward as the country gets richer.

  </p>
  </div>

  <div class="explanation group2">
    <p>For <span style="color: {colorScale("Europe")}">Switzerland</span> and <span style="color: {colorScale("Americas")}">US</span>
      <button on:click={handleFocus("group2")}>{focus.group2 ? "Click to unfocus" : "Click to focus"}</button>, which are developed, wealthier nations, both inequality and GDP has been increasing since the 1990s. Contrary to Argentina and China, meat consumption in Switzerland is decreasing as the nation gets richer. For the US, meat consumption dropped when GDP dropped slightly around 2010, and then increased as GDP rises again.
  </p>
  </div>

  <div class="explanation group3">
    <p>For <span style="color: {colorScale("Asia")}">Indonesia</span> and <span style="color: {colorScale("Asia")}">India</span>
      <button on:click={handleFocus("group3")}>{focus.group3 ? "Click to unfocus" : "Click to focus"}</button>, developing countries where meat consumption is relatively lower than most countries, GDP has been growing since the 2018. In India, the meat consumption stayed low and is even going down slightly. In Indonesia, however, the dips and peaks in all three indicators seem to align. When GDP dropped, so did inequality and meat consumption.
  </p>
  </div>

{#each indicators as i}
<div class="small-line-chart">
  <p class="chart-label">{i}</p>

    <Chart
      data={filterData(i)}
      height=200
      width=400
      groupList={continents}
      selectedLabel={selectedCountries}
      zoom={true}
      yKey={i}
    />
  </div>
{/each}

</div>

<p>Looking at these 6 countries as examples, we see that a country’s wealth and inequality may have an impact on meat consumption, although the effect varies between countries. There may be other factors involved, such as how popular vegetarianism is in the country, and what food resources are most available in the country.
</p>

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
  
  p, h3 {
    text-align: left;
    margin: 20px auto;
    max-width: 700px;
  }

  button {
    padding: 3px;
    font-size: 12px;
    border-color: lightgrey;
  }

  .explanation span {
    font-weight: bold;
  }

  p.chart-label {
    font-size: 13px;
  }
</style>
