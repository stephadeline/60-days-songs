<script>
  import Chart from "./components/LineChart/Chart.svelte";
  import data from "./data/joined.json";

  const countries = [
    "Argentina",
    "Switzerland",
    "India",
    "China",
    "United States",
  ];
  
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

</script>

<div class="small-line-chart-container">

{#each indicators as i}
<div class="small-line-chart">
  <p>{i}</p>

    <Chart
      data={filterData(i)}
      height="200"
      width="400"
      groupList={continents}
      selectedLabel={countries}
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
</style>
