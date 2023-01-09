<script>
  import * as d3 from "d3";
  import data from "./data/totalMeatDifference.json";
  import AxisBar from "./components/AxisBar.svelte";
  import {colorScale} from "./components/helperFunctions.js";

  let total_meat_2018 = data
    .filter(
  (d) => d.alpha3 !== 'UKR' && d.alpha3 !== 'RUS' && d.alpha3 !== 'KAZ' && d.alpha3 !== 'ETH')
    .sort((a, b) => b.continent.localeCompare(a.continent))
    .sort((a, b) => b.difference - a.difference);

  //Bar chart with D3

  const margin = { top: 30, right: 20, bottom: 20, left: 40 }; //margin object
  let width = 1300; //width of SVG in pixels
  let height = 500; //height of SVG in pixels

  const yScale = d3
    .scaleLinear()
    .domain([
      d3.min(total_meat_2018, (d) => d.difference),
      d3.max(total_meat_2018, (d) => d.difference),
    ])
    .range([height - margin.bottom, margin.top]);

  const xScale = d3
    .scaleBand()
    .domain(total_meat_2018.map((d) => d.alpha3))
    .range([margin.left, width - margin.right])
    .padding(0.2);

</script>

<div class="bar-chart" bind:clientWidth={width} bind:clientHeight={height}>
<svg
  xmlns:svg="https://www.w3.org/2000/svg"
  viewBox="0 0 {width} {height}"
  {width}
  {height}
>
  <AxisBar scale={yScale} {width} {margin} />

  {#each total_meat_2018 as d}
    <rect
      height={Math.abs(yScale(0) - yScale(d.difference))}
      width={xScale.bandwidth()}
      y={d.difference < 0 ? yScale(0) : yScale(d.difference)}
      x={xScale(d.alpha3)}
      fill={colorScale(d.continent)}
      stroke="none"
    />
    <text
      y={height - margin.bottom + 5}
      x={xScale(d.alpha3) + xScale.bandwidth() / 2}
      font-size="0.75rem"
      text-anchor="middle"
      alignment-baseline="hanging"
    >
      {d.alpha3}
    </text>
  {/each}

  <!-- legend here -->

  <g transform={`translate(${width - margin.right - 120}, ${margin.top})`}>
    {#each colorScale.domain() as continent, i}
      <g transform={`translate(0, ${i * 20})`}>
        <rect width="18" height="18" fill={colorScale(continent)} />
        <text x="24" y="9" dy="0.35em">{continent}</text>
      </g>
    {/each}
  </g>
</svg>

</div>
<style>
</style>
