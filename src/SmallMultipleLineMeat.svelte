<script>
  import Chart from "./components/LineChart/Chart.svelte";
  import data from "./data/meatChart.json";
  let scaleAdjusted = false;

  const countries = [
    "Argentina",
    "Switzerland",
    "India",
    "China",
    "United States",
  ];
  
  const types = [
    "BEEF",
    "SHEEP",
    "POULTRY",
    "PIG"
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

  <div class="scale-toggle">
    <label>
      Adjust scale:
      <input type="checkbox" bind:checked={scaleAdjusted}/>
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
</style>
