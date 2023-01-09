<script>
  import data from "./data/joined.json";
  import { extent, max } from "d3-array";
  import Select from "svelte-select";
  import { scaleOrdinal, scaleLinear, scaleSqrt, scaleLog } from "d3-scale";
  import { schemeTableau10 } from "d3-scale-chromatic";
  import { axisBottom, axisLeft } from "d3-axis";
  import { select } from "d3-selection";
  import {
    getUnitsFromIndicator,
    getFormattedValue,
  } from "./components/helperFunctions.js";

  let margin = { top: 60, right: 250, bottom: 40, left: 60 };
  $: width = 1200;
  $: height = 500;

  ////--------------------------------- creating dropdown lists ------------------------------------------------------------------
  const indicatorsX = [
    "GDP (expenditure, multiple price benchmarks)",
    "GDP per capita (expenditure, multiple price benchmarks)",
    "Productivity: output per hour worked",
    "Gini coefficient",
    "Palma ratio (S90/S40 ratio)",
  ];

  const indicatorsY = [
    "Agriculture activity (meat): consumption",
    "Agriculture activity (total): consumption",
    "Electricity activity (per capita)",
    "New EV sales per million capita",
    "Consumption of households and government per capita",
    "Beef consumption",
    "Poultry consumption",
    "Sheep consumption",
    "Pig consumption"
  ];

  const continents = Array.from(new Set(data.map((d) => d.continent)));
  let years = Array.from(new Set(data.map((d) => d.year)));
  const valuesToShow = [10000000, 100000000, 1000000000];


  function handleOnChange(event) {
    selectedYear = event.target.value;
  }

  ////--------------------------------- Selectors ------------------------------------------------------------------
  $: selectedX = indicatorsX[0];
  $: selectedY = indicatorsY[0];
  $: unitX = getUnitsFromIndicator(selectedX) || ""
  $: unitY = getUnitsFromIndicator(selectedY);

  $: yearRange = extent(data.filter(d => d[selectedX] && d[selectedY]), d => d.year)
  $: minYear = yearRange[0]
  $: maxYear = yearRange[1]
  $: selectedYear = minYear;


  ////--------------------------------- Filtering data  ------------------------------------------------------------------
  $: filteredData = data
    .filter(
      (d) =>
        d.country_name && d.year == selectedYear && d[selectedX] && d[selectedY]
    )
    .map((d) => {
      let newData = {
        country_name: d["country_name"],
        continent: d["continent"],
        pop: d["Population"],
        x: d[selectedX],
        y: d[selectedY],
        year: d.year,
      };
      return newData;
    })
    .sort((a, b) => b.pop - a.pop);

  ////----------------------- scales depending on the variable ----------------------
  $: rScale = scaleSqrt()
    .domain([0, max(filteredData, (d) => d["pop"])])
    .range([0, 50]);

  const scale = scaleSqrt()
    .domain([0, max(valuesToShow, (d) => d)])
    .range([0, 50]);

  $: xScale = scaleLog()
    .domain(extent(data, (d) => d[selectedX]))
    .range([margin.left, width - margin.right]);

  $: yScale = scaleLinear()
    .domain([0, max(data, (d) => d[selectedY])])
    .nice()
    .range([height - margin.bottom, margin.top]);

  ////---------------------------------set color scheme -----------------------------------

  const color = scaleOrdinal().domain(continents).range(schemeTableau10);

  ////------------------------ text square with information ---------------------------------


  const tooltip = select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "1")
    .style("visibility", "hidden")
    .style("padding", "10px")
    .style("background", "rgba(0,0,0,0.6)")
    .style("border-radius", "4px")
    .style("color", "#fff");

  function onMouseover(e, d) {
    const tooltipWidth = tooltip.node().offsetWidth;
    const tooltipHeight = tooltip.node().offsetHeight;

    e.target.style.strokeWidth = "3";

    tooltip
      .style("left", e.pageX - tooltipWidth + "px")
      .style("top", e.pageY - tooltipHeight - 10 + "px")
      .style("visibility", "visible").html(`<b>Country</b>: ${
      d.country_name
    } <br/>
                <b>${[selectedY]}</b>: ${getFormattedValue(
      selectedY,
      d.y
    )} <br />  
                <b>Population</b>: ${getFormattedValue(
                  "Population",
                  d.pop
                )}</br>
                <b>${[selectedX]}</b>: ${getFormattedValue(selectedX, d.x)}`);
  }

  ////--------------------------------- axis ---------------------------------

  let pinXAxis;
  let pinYAxis;
  $: if (pinXAxis) {
    select(pinXAxis).call(axisBottom(xScale));
  }

  $: if (pinYAxis) {
    select(pinYAxis).call(axisLeft(yScale));
  }

  let opacityProperties = continents.reduce(
    (o, key) => ({ ...o, [key]: 0 }),
    {}
  );

  $: handleLegendClicked = function (event, continent) {
    opacityProperties[continent] += 1;
  };

  $: opacity = function (continent) {
    if (opacityProperties[continent] % 2 == 0) {
      return 0.8;
    } else {
      return 0.2;
    }
  };
</script>

<div class="scatterplot">
  <div class="scatterplotSelectors">
    <h2>Build your own scatterplot</h2>
    <p>
      <label
        >Year :
        <input
          type="number"
          bind:value={selectedYear}
          min={minYear}
          max={maxYear}
          on:change={handleOnChange}
        />
        <input
          type="range"
          bind:value={selectedYear}
          min={minYear}
          max={maxYear}
          on:change={handleOnChange}
        />
      </label>
    </p>
    <div class="y-selector">
    <h4>Select consumption indicator (Y):</h4>
    <Select
      items={indicatorsY}
      value={indicatorsY[0]}
      bind:justValue={selectedY}
      clearable={false}
      showChevron
    />
  </div>
  <div class="x-selector">
    <h4>Select wealth or inequality indicator (X):</h4>
    <Select
      items={indicatorsX}
      value={indicatorsX[0]}
      bind:justValue={selectedX}
      clearable={false}
      showChevron
    />
  </div>
  </div>

  <div class="scatterplot-chart">
    <svg viewBox="0 0 {width} {height}" {width} {height}>
      <!-- ------------------------ axis ----------------------------------->
      <g
        class="xAxis"
        bind:this={pinXAxis}
        transform="translate(0,{height - margin.bottom})"
      >
        <text
          alignment-baseline="middle"
          font-size="15"
          fill="black"
          stroke-width="0.8px"
          x={width - margin.right}
          y="30"
          text-anchor="start"
          dominant-baseline="middle">{unitX}</text
        >
      </g>

      <g
        class="yAxis"
        bind:this={pinYAxis}
        transform="translate({margin.left},0)"
        ><text
          alignment-baseline="middle"
          font-size="15"
          fill="black"
          stroke-width="0.8px"
          x="-30"
          y="40"
          text-anchor="start"
          dominant-baseline="middle">{unitY}</text
        >
      </g>

      <!------------------------- data ---------------------------------->
      {#each filteredData as d}
        <circle
          cx={xScale(d.x)}
          cy={yScale(d.y)}
          r={rScale(d["pop"])}
          fill={color(d.continent)}
          fill-opacity={opacity(d.continent)}
          stroke-opacity={opacity(d.continent)}
          stroke="black"
          stroke-width="1"
          on:mouseover={(e) => {
            onMouseover(e, d);
          }}
          on:mouseout={(e) => {
            e.target.style.strokeWidth = "1";
            tooltip.style("visibility", "hidden");
          }}
        />
      {/each}

      <!------------------- cotinents legend ----------------------------->
      <g
        transform={`translate(${width - 140}, ${margin.top})`}
        class="clickeable-legend"
      >
      <text y="-10" font-size="12px">Continents (click to filter)</text>
        {#each color.domain() as continent, i}
          <g
            transform={`translate(0, ${i * 20})`}
            on:click={(event) => handleLegendClicked(event, continent)}
            style="opacity: {opacity(continent)}"
          >
            <circle cx="15" cy="8" r="6" fill={color(continent)} />
            <text x="24" y="9" dy="0.35em">{continent}</text>
          </g>
        {/each}
      </g>

      <!------------------- selected year ----------------------------->
      <g>
        <text
          x={width - 145}
          y="220"
          alignment-baseline="middle"
          font-size="20"
          fill="grey"
          >Selected Year:
        </text>
        <text
          x={width - 145}
          y="260"
          alignment-baseline="middle"
          font-size="50"
          fill="grey">{selectedYear}</text
        >
      </g>

      <!------------------- population legend --------------------------->
      <g transform={`translate(${width - 100}, ${margin.bottom})`}>
        {#each valuesToShow as value, i}
          <g>
            <circle
              cx="10"
              cy={height - 70 - scale(value)}
              r={scale(value)}
              fill="none"
              stroke="black"
              stroke-width="1"
            />
            <text
              x="70"
              y={height - 70 - scale(value)}
              alignment-baseline="middle"
              font-size="10">{value / 1000000}</text
            >
            <line
              x1="70"
              x2="20"
              y1={height - 70 - scale(value)}
              y2={height - 70 - scale(value)}
              stroke="grey"
              stroke-dasharray="2,2"
            />
          </g>
        {/each}
        <text x="-30" y="450" alignment-baseline="middle" font-size="15"
          >Population (M)</text
        >
      </g>
    </svg>
  </div>
</div>

<style type="text/css">
  text.selected {
    opacity: 0.4;
  }

  g.clickeable-legend:hover {
    cursor: pointer;
  }
  text.non_selected {
    opacity: 1;
  }

  @media screen and (min-width: 800px) {
  .scatterplotSelectors {
    max-width: 1000px;
    margin: auto;
  }

  .scatterplot {
    display: inline-block;
  }

  .y-selector, .x-selector {
    width: 48%;
    float: left;
  }

  .y-selector {
    padding-right: 10px;

  }
}
</style>
